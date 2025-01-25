import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin", "super-admin", "moderator"],
    default: "user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenExpiry: {
    type: Date,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiry: {
    type: Date,
  },
}, { timestamps: true });

// Check if the model is already defined in Mongoose's internal registry
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
