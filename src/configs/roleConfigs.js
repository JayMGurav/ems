export const EmployeeRole = "EMPLOYEE";
export const HrRole = "HR";

export const rolePermissions = {
  [EmployeeRole]: ["READ:ME", "UPDATE:ME"],
  [HrRole]: [
    "READ:ME",
    "UPDATE:ME",

    "CREATE:EMPLOYEE",
    "READ:EMPLOYEE",
    "UPDATE:EMPLOYEE",
    "DELETE:EMPLOYEE",
  ],
};
