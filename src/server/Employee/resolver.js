import { createJWT } from "@/utils/jwt";
import bcrypt from "bcryptjs";

const QueryResolvers = {
  async getAllEmployees(_parent, _args, { Employee }) {
    return await Employee.find({}).exec(0);
  },
  async getEmployeeLeaves(_parent, { id }, { Employee }) {
    return await Employee.findById(id, { leaves: 1 }).exec();
  },
};

const MutationResolvers = {
  async registerEmployee(_parent, { input }, { Employee, req, res }) {
    try {
      const existingEmp = await Employee.findOne({
        email: input.email,
      }).exec();

      if (Boolean(existingEmp)) {
        return new Error(`Employee with ${input.email} already exist!!`);
      }

      const { password, ...userData } = input;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const time_now = new Date().toString();
      const newEmp = await Employee.create({
        ...userData,
        password: passwordHash,
        lastLoginAt: time_now,
      });
      if (newEmp) {
        const jwtToken = createJWT(newEmp, time_now);
        return { token: jwtToken };
      } else {
        return null;
      }
    } catch (error) {
      return new Error("registering Employee error: " + error.message);
    }
  },

  // login mutation
  async loginEmployee(_parent, { input }, { Employee, req, res }) {
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
        const jwtToken = createJWT(employee, time_now);
        return { token: jwtToken };
      }
    } catch (error) {
      return new Error("Error logging in Employee: " + error.message);
    }
  },

  // leave
  async applyLeave(_parent, { date, id }, { Employee }) {
    try {
      const updatedLeave = await Employee.findByIdAndUpdate(
        id,
        {
          $push: { leaves: { date } },
          $inc: { availableLeaves: -1 },
        },
        { new: true }
      );
      if (updatedLeave) {
        return {
          date,
          status: "PENDING",
        };
      } else {
        return null;
      }
    } catch (error) {
      return new Error("Error applying leave: " + error.message);
    }
  },

  // delete employee
  async removeEmployee(_parent, { id }, { Employee }) {
    try {
      const deletedEmp = await Employee.findByIdAndRemove(id).exec();
      return Boolean(deletedEmp);
    } catch (error) {
      return new Error("Error deleting Employee: " + error.message);
    }
  },
};

const employeeResolvers = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
};

export default employeeResolvers;
