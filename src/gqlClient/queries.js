import { gql } from "@apollo/client";

export const GET_EMPLOYEE_ME = gql`
  query Me {
    me {
      # on Hr
      ... on Hr {
        id
        fullname
        email
        lastLoginAt
      }

      # on Employee
      ... on Employee {
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
  }
`;

export const LOGOUT = gql`
  query Logout {
    logout
  }
`;

export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
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
