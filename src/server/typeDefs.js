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

  union MeResult = Employee | Hr

  type Leave {
    _id: ID!
    date: String!
    reason: String!
    status: LeaveStatus!
  }

  # type loginOutputType {
  #   token: String
  # }

  input loginInput {
    email: String!
    password: String!
  }

  type Query {
    _: String
    me: MeResult
    logout: Boolean
  }
  type Mutation {
    _: String
  }
`;

const types = [initialTypeDef, employeeTypeDef, hrTypeDef];

export default mergeTypeDefs(types);
