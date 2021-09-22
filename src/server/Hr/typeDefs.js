import { gql } from "apollo-server-core";

const hrTypeDef = gql`
  type Hr {
    id: ID!
    fullname: String!
    email: String!
    lastLoginAt: String!
    role: String!
    permissions: [String!]!
  }

  input createHrInput {
    fullname: String!
    email: String!
    password: String!
  }

  extend type Query {
    # getAllEmployees: [Employee!]
    # getEmployeeLeaves(id: ID!): [Leave!]
    getAllHrs: [Hr!]
  }

  extend type Mutation {
    registerHR(input: createHrInput!): loginOutputType!
    loginHR(input: loginInput!): loginOutputType!
    removeHr(id: ID!): Boolean!
  }
`;

export default hrTypeDef;
