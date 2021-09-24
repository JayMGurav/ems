<!-- TODO Next-->

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
