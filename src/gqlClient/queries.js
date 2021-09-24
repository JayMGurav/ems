import { gql } from "@apollo/client";

export const GET_EMPLOYEE_ME = gql`
  query employeeMe {
    me {
      ... on Employee {
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
  }
`;

export const GET_HR_ME = gql`
  query HrMe {
    me {
      ... on Hr {
        id
        fullname
        email
        lastLoginAt
        roles
        permissions
      }
    }
  }
`;

export const LOGOUT = gql`
  query Logout {
    logout
  }
`;
