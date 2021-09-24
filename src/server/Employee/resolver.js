import { EmployeeRole, HrRole } from "@/configs/roleConfigs";
import { setAuthTokenCookie } from "@/utils/authCookies";
import { createJWT } from "@/utils/jwt";
import bcrypt from "bcryptjs";

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
          return await Employee.find({}).exec();
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
  async registerEmployee(_parent, { input }, { Employee, authUser, res }) {
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

      const existingEmp = await Employee.findOne({
        email: input.email,
      }).exec();

      if (Boolean(existingEmp)) {
        return new Error(`Employee with ${input.email} already exist!!`);
      }

      const { password, ...userData } = input;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const time_now = new Date();
      const newEmp = await Employee.create({
        ...userData,
        password: passwordHash,
        lastLoginAt: time_now,
      });
      return newEmp;
    } catch (error) {
      throw new Error("registering Employee error: " + error.message);
    }
  },

  // login mutation
  async loginEmployee(_parent, { input }, { Employee, res }) {
    try {
      const { email, password } = input;
      const employee = await Employee.findOne({ email }).exec();
      if (!employee) {
        return new Error("No such employee found");
      }
      const valid = await bcrypt.compare(password, employee.password);
      if (!valid) {
        throw new Error("Invalid password!");
      } else {
        const time_now = new Date().toString();
        employee.lastLoginAt = time_now;
        await employee.save();
        const jwtToken = createJWT(employee, time_now);
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
  async applyLeave(_parent, { id, date, reason }, { Employee, authUser }) {
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

      const employee = await Employee.findById(id).exec();
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
        const updatedLeave = await Employee.findByIdAndUpdate(
          id,
          {
            $push: { leaves: { date, reason } },
            $inc: { availableLeaves: -1 },
          },
          { new: true }
        );
        return updatedLeave;
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
      const deletedEmp = await Employee.findByIdAndRemove(id).exec();
      return Boolean(deletedEmp);
    } catch (error) {
      throw new Error("Error deleting Employee: " + error.message);
    }
  },

  async changeLeaveStatus(
    _parent,
    { id, date, leaveId, status },
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

      return await Employee.findOneAndUpdate(
        { id, "leaves._id": leaveId, "leaves.date": date },
        {
          $set: {
            "leaves.$.status": status,
          },
        },
        { new: true }
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
