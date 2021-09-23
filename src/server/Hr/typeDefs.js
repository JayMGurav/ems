import { gql } from "apollo-server-core";

const hrTypeDef = gql`
  type Hr {
    id: ID!
    fullname: String!
    email: String!
    lastLoginAt: String!
    roles: [String!]
    permissions: [String!]!
  }

  input createHrInput {
    fullname: String!
    email: String!
    password: String!
  }

  extend type Query {
    getAllHrs: [Hr!]
  }

  extend type Mutation {
    registerHR(input: createHrInput!): Hr!
    loginHR(input: loginInput!): Hr!
    removeHr(id: ID!): Boolean!
  }
`;

export default hrTypeDef;
