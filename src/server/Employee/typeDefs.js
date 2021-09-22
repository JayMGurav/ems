import { gql } from "apollo-server-core";

const employeeTypeDef = gql`
  type Employee {
    id: ID!
    fullname: String!
    email: String!
    phone: String
    address: String
    avatar: String
    salary: Float
    designation: String!
    lastLoginAt: String!
  }

  extend type Mutation {
    registerEmployee: String!
    loginEmployee: String!
  }
`;

export default employeeTypeDef;
