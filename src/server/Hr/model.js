import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: [true, "Username is required!!"],
    //   unique: [true, "Username should be unique!!"],
    // },
    fullname: { type: String, required: [true, "Fullname is required!!"] },
    email: {
      type: String,
      required: [true, "Email is required!!"],
      unique: [true, "Already registered user!!"],
    },
    lastLoginAt: String,
  },
  { timestamps: true }
);

const Hr = mongoose.models["hr"] || mongoose.model("hr", schema);
export default Hr;
