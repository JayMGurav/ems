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
    roles: [String!]
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

  extend type Query {
    getAllEmployees: [Employee!]
    # getEmployeeLeaves(id: ID!): Employee
  }

  extend type Mutation {
    registerEmployee(input: createEmployeeInput!): Employee
    removeEmployee(id: ID!): Boolean!
    loginEmployee(input: loginInput!): Employee
    applyLeave(date: String!, id: ID!, reason: String!): Employee
  }
`;

export default employeeTypeDef;
