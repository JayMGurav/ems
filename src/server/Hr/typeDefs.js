import { gql } from "apollo-server-core";

const hrTypeDef = gql`
  type Hr {
    id: ID!
    fullname: String!
    email: String!
    lastLoginAt: String!
  }

  extend type Mutation {
    registerHR: String!
    loginHR: String!
  }
`;

export default hrTypeDef;
