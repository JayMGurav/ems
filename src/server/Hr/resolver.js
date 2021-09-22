import { createJWT } from "@/utils/jwt";
import bcrypt from "bcryptjs";

const QueryResolvers = {
  async getAllHrs(_parent, _args, { Hr }) {
    return await Hr.find({}).exec();
  },
  // async getAllEmployees(_parent, _args, { Employee }) {
  //   return await Employee.find({}).exec();
  // },
  // async getEmployeeLeaves(_parent, { id }, { Employee }) {
  //   return await Employee.findById(id, { leaves: 1 }).exec();
  // },
};

const MutationResolvers = {
  async registerHR(_parent, { input }, { Hr }) {
    try {
      const existingHr = await Hr.findOne({
        email: input.email,
      }).exec();

      if (Boolean(existingHr)) {
        return new Error(`Employee with ${input.email} already exist!!`);
      }

      const { password, ...userData } = input;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const time_now = new Date();
      const newHr = await Hr.create({
        ...userData,
        password: passwordHash,
        lastLoginAt: time_now,
      });
      if (newHr) {
        const jwtToken = createJWT(newHr, time_now);
        return { token: jwtToken };
      } else {
        return null;
      }
    } catch (error) {
      return new Error("Error registering HR: " + error.message);
    }
  },
  async loginHR(_parent, { input }, { Hr }) {
    try {
      const { email, password } = input;
      const hr = await Hr.findOne({ email }).exec();
      if (!hr) {
        return new Error("No such HR found, please register");
      }
      const valid = await bcrypt.compare(password, hr.password);
      if (!valid) {
        throw new Error("Invalid password!");
      } else {
        const time_now = new Date().toString();
        const jwtToken = createJWT(hr, time_now);
        return { token: jwtToken };
      }
    } catch (error) {
      return new Error("Error logging in HR: " + error.message);
    }
  },

  async removeHr(_parent, { id }, { Hr }) {
    try {
      const deletedHr = await Hr.findByIdAndRemove(id).exec();
      return Boolean(deletedHr);
    } catch (error) {
      return new Error("Error deleting HR: " + error.message);
    }
  },
};

const hrResolvers = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
};

export default hrResolvers;
