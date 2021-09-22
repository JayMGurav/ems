import { mergeResolvers } from "@graphql-tools/merge";

import employeeResolvers from "./Employee/resolver";
import hrResolvers from "./Hr/resolver";

const initialResolvers = {
  Query: {
    _: () => {
      return "Query";
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
