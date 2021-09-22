import { mergeTypeDefs } from "@graphql-tools/merge";
import { gql } from "apollo-server-micro";

import employeeTypeDef from "./Employee/typeDefs";
import hrTypeDef from "./Hr/typeDefs";

const initialTypeDef = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

const types = [initialTypeDef, employeeTypeDef, hrTypeDef];

export default mergeTypeDefs(types);
