import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  firstname: {
    type: String,
    trim: true,
    maxlength: 50
  },
  lastname: {
    type: String,
    trim: true,
    maxlength: 50
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  city: {
    type: String,
    trim: true,
    maxlength: 100
  },
  country: {
    type: String,
    trim: true,
    maxlength: 100
  },
  role: {
    type: String,
    enum: ["user", "admin", "super-admin", "moderator"],
    default: "user"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    index: true
  },
  phone: {
    type: String,  // Changed to String to handle country codes and leading zeros
    trim: true,
    match: [/^\+?\d{7,15}$/, "Invalid phone number"]
  },
  languages: [
    {
      type: String,
      trim: true
    }
  ],
  password: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    trim: true,
    default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    match: [/^https?:\/\/.+/, "Invalid URL format"]
  },
  properties: {
    type: Number,
    default: 0,
    min: 0
  },
  bookings: {
    type: Number,
    default: 0,
    min: 0
  },
  guests: {
    type: Number,
    default: 0,
    min: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifyToken: {
    type: String
  },
  verifyTokenExpiry: {
    type: Date
  },
  resetToken: {
    type: String
  },
  resetTokenExpiry: {
    type: Date
  }
}, { timestamps: true });

// Check if the model is already defined in Mongoose's internal registry
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
 