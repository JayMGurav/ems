# Role Based Authorization

This project is an example of role based authorization with each role having specific permission to access,read,write and delete data. This information of role and permission is available to the request context by a JWT token set as an httpOnly cookie during authentication. with this the cookie is not accessible to client side javascript, Read more below about the token, role, permission specifics.

## TODO

- [x] GraphQL Schema for Employees and Hr
- [x] Setup DB
- [x] Add resolvers
- [x] add auth token to httpOnly cookie
- [-] setup authorization strategy

  - [x] Business logic level authorization
  - [] (optional)Middleware level authorization -to complete later on
  - [] (optional)Schema level authorization using custom directives -to complete later on

- [x] develop frontend UI's

  - [x] SignUp/Login UI's for both HR, Employee
  - [x] Dashboards UI's for both HR, Employee
  - [x] Employee: apply for leave
  - [x] HR: View employee details,leaves and their statuses
  - [x] HR: Feature to add new Employee

- [] write documentation
- [] Unit test functionalities
- [] API Integration test

## Authentication

**Login Credentials**

```
email: registered email
password: respective password
```

**JWT Auth token payload**

```json
{
  "data": {
    "authUser": {
      "roles": ["HR"],
      "email": "jayhr@gmail.com",
      "uid": "614befab0e773d524142e5c3",
      "permissions": [
        "READ:ME",
        "UPDATE:ME",
        "CREATE:EMPLOYEE",
        "READ:EMPLOYEE",
        "UPDATE:EMPLOYEE",
        "DELETE:EMPLOYEE"
      ]
    }
  },
  "aud": "614befab0e773d524142e5c3",
  "sub": "614befab0e773d524142e5c3",
  "iat": 132564654,
  "exp": 456654987
}
```

Once the user is logged in with appropriate credentials the generated **jwt token** is then set as **httpOnly** cookie to the response header so that all subsequent request from that particular client has this cookie token in its headers

## Authorization Roles

### HR

Represents the role of the "Hr", available responsibilities are

```
<!-- Hr permissions -->
[
    "READ:ME",
    "UPDATE:ME",
    "CREATE:EMPLOYEE",
    "READ:EMPLOYEE",
    "UPDATE:EMPLOYEE",
    "DELETE:EMPLOYEE",
]
```

Hr can read, update their personal data and they can also create, read, update, delete employees

### EMPLOYEE

Represents the role of the "Employee", available responsibilities are

```
<!-- Employee permissions -->
["READ:ME", "UPDATE:ME"]
```

Employees can read their data and update it.

## Features to add for future

- Employee delete, update (UI)
- Hr delete, update (UI)
- Feature to add Avatar images (UI)
- Optimal Cache control
- Create Schema, middleware level role specific per field/type authorizations
- Optimal Error handling Strategy
