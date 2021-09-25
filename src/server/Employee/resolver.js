import { EmployeeRole, HrRole } from "@/configs/roleConfigs";
import { setAuthTokenCookie } from "@/utils/authCookies";
import { checkPasswordValidity } from "@/utils/bcryptUtils";
import { createJWT } from "@/utils/jwt";
import {
  applyEmployeeLeave,
  createNewEmployee,
  findAllEmployees,
  findEmployeeByEmail,
  findEmployeeById,
  findLeaveAndUpdateStatus,
  isEmployee,
  removeEmployeeById,
} from "./controller";

const QueryResolvers = {
  /**
   *
   * Get all Employees data
   * @returns Employee
   * @Role "HR"
   * @Permission "READ:EMPLOYEE"
   */
  async getAllEmployees(_parent, _args, { Employee, authUser }) {
    try {
      if (!authUser) {
        throw new Error("Not logged in??, please login!");
      }
      if (authUser.roles.includes(HrRole)) {
        if (authUser.permissions.includes("READ:EMPLOYEE")) {
          return await findAllEmployees(Employee);
        } else throw new Error("No appropriate permission for your role");
      } else throw new Error("Not authorized!");
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const MutationResolvers = {
  /**
   *
   * Registers Employee
   * @returns Employee
   * @Role "HR"
   * @Permission "READ:EMPLOYEE"
   */
  async registerEmployee(_parent, { input }, { Employee, authUser }) {
    try {
      if (!authUser) {
        throw new Error("Not logged in??, You need to login as Hr");
      }
      if (!authUser.roles.includes(HrRole)) {
        throw new Error("Not authorized!");
      }
      if (!authUser.permissions.includes("CREATE:EMPLOYEE")) {
        throw new Error("No appropriate permission for your role");
      }

      const existingEmp = await isEmployee(input.email, Employee);

      if (existingEmp) {
        return new Error(`Employee with ${input.email} already exist!!`);
      }
      // safe to spread input as its restricted by schema
      const newEmp = await createNewEmployee({ ...input }, Employee);
      return newEmp;
    } catch (error) {
      throw new Error("registering Employee error: " + error.message);
    }
  },

  // login mutation
  async loginEmployee(_parent, { input }, { Employee, res }) {
    try {
      const { email, password } = input;
      const employee = await findEmployeeByEmail(email, Employee);

      if (!employee) {
        return new Error("No such employee found");
      }
      const validPassword = await checkPasswordValidity(
        password,
        employee.password
      );
      if (validPassword) {
        const time_now = new Date().toString();
        employee.lastLoginAt = time_now;
        await employee.save();
        const jwtToken = createJWT(employee);
        setAuthTokenCookie(res, jwtToken);
        return employee;
      }
    } catch (error) {
      throw new Error("Error logging in Employee: " + error.message);
    }
  },

  // leave
  /**
   *
   * Apply for leave
   * @returns Leave
   * @Role "Employee"
   * @Permission "UPDATE:ME"
   */
  async applyLeave(_parent, { date, reason }, { Employee, authUser }) {
    try {
      if (!authUser) {
        throw new Error(
          "Not logged in??, You need to login before applying for leave"
        );
      }
      if (!authUser.roles.includes(EmployeeRole)) {
        throw new Error("Not authorized!");
      }
      if (!authUser.permissions.includes("UPDATE:ME")) {
        throw new Error("No appropriate permission for your role");
      }

      const employee = await findEmployeeById(authUser.uid, Employee);

      if (employee) {
        if (employee.leaves.length >= employee.totalLeaves) {
          throw new Error("No more leaves available");
        }
        const present = employee.leaves.filter(
          ({ date: leaveDate }) => date === leaveDate
        );
        if (present.length) {
          throw new Error("Leave already applied!");
        }
        return await applyEmployeeLeave(authUser.uid, date, reason, Employee);
      } else {
        throw new Error("Employee Not Found!");
      }
    } catch (error) {
      throw new Error("Error applying leave: " + error.message);
    }
  },

  /**
   *
   * Delete Employee account
   * @returns boolean
   * @Role "HR"
   * @Permission "DELETE:EMPLOYEE"
   */
  async removeEmployee(_parent, { id }, { Employee, authUser }) {
    try {
      if (!authUser) {
        throw new Error("Not logged in??, please login!");
      }
      if (!authUser.roles.includes(HrRole)) {
        throw new Error("Not authorized!");
      }
      if (!authUser.permissions.includes("DELETE:EMPLOYEE")) {
        throw new Error("No appropriate permission for your role!");
      }
      const deletedEmp = await removeEmployeeById(id, Employee);
      return Boolean(deletedEmp);
    } catch (error) {
      throw new Error("Error deleting Employee: " + error.message);
    }
  },

  async changeLeaveStatus(
    _parent,
    { id, date: leaveDate, leaveId, status },
    { Employee, authUser }
  ) {
    try {
      if (!authUser) {
        throw new Error("Not logged in??, You need to login as Hr");
      }
      if (!authUser.roles.includes(HrRole)) {
        throw new Error("Not authorized!");
      }
      if (!authUser.permissions.includes("UPDATE:EMPLOYEE")) {
        throw new Error("No appropriate permission for your role");
      }

      return await findLeaveAndUpdateStatus(
        {
          employeeId: id,
          leaveId,
          leaveDate,
          status,
        },
        Employee
      );
    } catch (error) {
      throw new Error("Error changing leave status: " + error.message);
    }
  },
};

const employeeResolvers = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
};

export default employeeResolvers;
