import { EmployeeRole, HrRole } from "@/configs/roleConfigs";
import { removeAuthTokenCookie } from "@/utils/authCookies";
import { mergeResolvers } from "@graphql-tools/merge";

import employeeResolvers from "./Employee/resolver";
import hrResolvers from "./Hr/resolver";

const initialResolvers = {
  MeResult: {
    /**
     * Resolves Me Result
     * @Roles ["EMPLOYEE", "HR"]
     * @Permission None
     */
    __resolveType(obj, _context, _info) {
      if (obj.roles.includes(EmployeeRole)) {
        return "Employee";
      } else if (obj.roles.includes(HrRole)) {
        return "Hr";
      } else {
        return null;
      }
    },
  },

  Query: {
    _: () => {
      return "Query";
    },

    /**
     * @returns Gets personal data based on auth token
     * @Roles ["EMPLOYEE", "HR"]
     * @Permission "READ:ME"
     */
    async me(_parent, _args, { Employee, Hr, authUser }, _info) {
      if (authUser?.roles?.includes(EmployeeRole)) {
        if (authUser.permissions.includes("READ:ME")) {
          return await Employee.findById(authUser.uid).exec();
        } else {
          return new Error("Not Authorized to read your data!");
        }
      } else if (authUser?.roles?.includes(HrRole)) {
        if (authUser.permissions.includes("READ:ME")) {
          return await Hr.findById(authUser.uid).exec();
        } else {
          return new Error("Not Authorized to read your data!");
        }
      } else {
        return new Error("Not logged in?? please login to access your account");
      }
    },

    /**
     * remove auth token cookie if present on the req header
     * Roles: NONE
     * Permission: NONE
     */
    async logout(_parent, _args, { res }, _info) {
      try {
        removeAuthTokenCookie(res);
        res.setHeader("Clear-Site-Data", "*");
        return true;
      } catch (error) {
        return new Error("Error logging out: " + error.message);
      }
    },
  },
  Mutation: {
    _: () => {
      return "Mutation";
    },
  },
};

const resolvers = [initialResolvers, employeeResolvers, hrResolvers];
const mergedResolvers = mergeResolvers(resolvers);

export default mergedResolvers;
