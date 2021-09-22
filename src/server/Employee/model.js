import { EmployeeRole, rolePermissions } from "@/configs/roleConfigs";
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullname: { type: String, required: [true, "Fullname is required!!"] },
    email: {
      type: String,
      required: [true, "Email is required!!"],
      unique: [true, "Already registered user!!"],
    },
    password: {
      type: String,
      required: [true, "password is required field"],
    },
    phone: String,
    address: String,
    avatar: String,
    salary: Number,
    designation: String,
    lastLoginAt: String,
    totalLeaves: { type: Number, default: 12 },
    availableLeaves: Number,
    leaves: [
      {
        date: {
          type: String,
        },
        status: {
          type: String,
          default: "PENDING",
        },
      },
    ],
    role: {
      type: String,
      default: "EMPLOYEE",
    },
    permissions: [{ type: String }],
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  if (this.isNew) {
    this.role = EmployeeRole;
    this.permissions = rolePermissions[EmployeeRole];
    this.availableLeaves = this.totalLeaves;
  }
  next();
});

const Employee =
  mongoose.models["employee"] || mongoose.model("employee", schema);
export default Employee;
