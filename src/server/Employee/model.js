import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullname: { type: String, required: [true, "Fullname is required!!"] },
    email: {
      type: String,
      required: [true, "Email is required!!"],
      unique: [true, "Already registered user!!"],
    },
    phone: String,
    address: String,
    avatar: String,
    salary: Number,
    designation: String,
    lastLoginAt: String,
  },
  { timestamps: true }
);

const Employee =
  mongoose.models["employee"] || mongoose.model("employee", schema);
export default Employee;
