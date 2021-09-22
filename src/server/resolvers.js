import { EmployeeRole, HrRole } from "@/configs/roleConfigs";
import { mergeResolvers } from "@graphql-tools/merge";

import employeeResolvers from "./Employee/resolver";
import hrResolvers from "./Hr/resolver";

const initialResolvers = {
  MeResult: {
    __resolveType(obj, _context, _info) {
      if (obj.role === EmployeeRole) {
        return "Employee";
      } else if (obj.role === HrRole) {
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
    async me(_parent, _args, { Employee, Hr, authUser }, _info) {
      if (authUser.role === EmployeeRole) {
        return await Employee.findById(authUser.uid).exec();
      } else if (authUser.role === HrRole) {
        return await Hr.findById(authUser.uid).exec();
      } else {
        return new Error("Not logged in?? please login to access your account");
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
