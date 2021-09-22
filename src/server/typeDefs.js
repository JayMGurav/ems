import { mergeTypeDefs } from "@graphql-tools/merge";
import { gql } from "apollo-server-micro";

import employeeTypeDef from "./Employee/typeDefs";
import hrTypeDef from "./Hr/typeDefs";

const initialTypeDef = gql`
  enum LeaveStatus {
    PENDING
    APPROVED
    REJECTED
  }

  type Leave {
    date: String!
    status: LeaveStatus!
  }

  type loginOutputType {
    token: String
  }
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

const types = [initialTypeDef, employeeTypeDef, hrTypeDef];

export default mergeTypeDefs(types);
