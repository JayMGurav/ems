import { gql } from "@apollo/client";

export const LOGIN_EMPLOYEE = gql`
  mutation LoginEmployee($input: loginInput!) {
    loginEmployee(input: $input) {
      id
      fullname
      email
      designation
      phone
      address
      avatar
      salary
      availableLeaves
      totalLeaves
      lastLoginAt
      leaves {
        _id
        date
        status
        reason
      }
    }
  }
`;

export const REGISTER_EMPLOYEE = gql`
  mutation RegisterEmployee($input: createEmployeeInput!) {
    registerEmployee(input: $input) {
      id
      fullname
      email
      designation
      phone
      address
      avatar
      salary
      availableLeaves
      totalLeaves
      leaves {
        _id
        date
        reason
        status
      }
    }
  }
`;

export const APPLY_LEAVE = gql`
  mutation ApplyLeave($date: String!, $reason: String!) {
    applyLeave(id: $id, date: $date, reason: $reason) {
      id
      availableLeaves
      leaves {
        _id
        date
        status
        reason
      }
    }
  }
`;

export const LOGIN_HR = gql`
  mutation LoginHR($input: loginInput!) {
    loginHR(input: $input) {
      id
      fullname
      email
      lastLoginAt
    }
  }
`;

export const REGISTER_HR = gql`
  mutation RegisterHR($input: createHrInput!) {
    registerHR(input: $input) {
      id
      fullname
      email
      lastLoginAt
    }
  }
`;

export const CHANGE_LEAVE_STATUS = gql`
  mutation ChangeLeaveStatus(
    $id: ID!
    $date: String!
    $leaveId: ID!
    $status: LeaveStatus!
  ) {
    changeLeaveStatus(
      id: $id
      date: $date
      leaveId: $leaveId
      status: $status
    ) {
      id
      leaves {
        _id
        date
        status
      }
    }
  }
`;
