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
      roles
      permissions
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

export const LOGIN_HR = gql`
  mutation LoginHR($input: loginInput!) {
    loginHR(input: $input) {
      id
      fullname
      email
      lastLoginAt
      roles
      permissions
    }
  }
`;
export const APPLY_LEAVE = gql`
  mutation ApplyLeave($id: ID!, $date: String!, $reason: String!) {
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