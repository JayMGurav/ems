import { gql } from "apollo-server-core";

const employeeTypeDef = gql`
  type Employee {
    id: ID!
    fullname: String!
    email: String!
    designation: String!
    phone: String
    address: String
    avatar: String
    salary: Float
    role: String!
    permissions: [String!]!
    availableLeaves: Int!
    totalLeaves: Int!
    leaves: [Leave!]
    lastLoginAt: String!
  }

  input createEmployeeInput {
    fullname: String!
    email: String!
    designation: String!
    password: String!
    salary: Float!
    phone: String
    address: String
    avatar: String
  }

  input loginEmployeeInput {
    email: String!
    password: String!
  }

  extend type Query {
    getAllEmployees: [Employee!]
    getEmployeeLeaves(id: ID!): [Leave!]
  }

  extend type Mutation {
    registerEmployee(input: createEmployeeInput!): loginOutputType!
    loginEmployee(input: loginEmployeeInput!): loginOutputType!
    applyLeave(date: String!, id: ID!): Leave
    removeEmployee(id: ID!): Boolean!
  }
`;

export default employeeTypeDef;
