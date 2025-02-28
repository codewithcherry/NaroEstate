import mongoose from "mongoose";
import { Schema } from "mongoose";

const pendingBookingSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Check if the model is already defined in Mongoose's internal registry
const PendingBooking = mongoose.models.PendingBooking || mongoose.model("PendingBooking", pendingBookingSchema);

export default PendingBooking;
