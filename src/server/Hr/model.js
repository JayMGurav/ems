import { EmployeeRole, HrRole, rolePermissions } from "@/configs/roleConfigs";
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
    roles: {
      type: [String],
      default: [HrRole],
    },
    permissions: [{ type: String }],
    lastLoginAt: String,
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  if (this.isNew) {
    this.role = HrRole;
    this.permissions = rolePermissions[HrRole];
  }
  next();
});

const Hr = mongoose.models["hr"] || mongoose.model("hr", schema);
export default Hr;
