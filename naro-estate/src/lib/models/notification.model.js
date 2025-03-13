import mongoose from "mongoose";
import { Schema } from "mongoose";
import User from "./user.model";

const notificationSchema = new Schema(
    {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        message: {
          type: String,
          required: true,
          trim: true,
        },
        timestamp: {
          type: Date,
          default: Date.now, // Automatically set to the current date/time
        },
        isRead: {
          type: Boolean,
          default: false, // Notifications are unread by default
        },
        isStarred: {
          type: Boolean,
          default: false, // Notifications are not starred by default
        },
        type: {
          type: String,
          required: true,
          enum: ["message", "alert", "mention"], // Only allow specific types
        },
        sender: {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          avatar: {
            type: String,
            default: "https://i.pravatar.cc/40", // Default avatar URL
          },
          userId: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the sender's user ID
            ref: "User", // Assuming you have a User model
            required: true,
          },
        },
        recipient: {
          type: mongoose.Schema.Types.ObjectId, // Reference to the recipient's user ID
          ref: "User", // Assuming you have a User model
          required: true,
        },
      },
      {
        timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
      }
);

const Enquiry = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default Enquiry;
