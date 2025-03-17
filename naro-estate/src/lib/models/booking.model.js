import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookingSchema = new Schema(
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
        totalDays: { type: Number, required: true }, // Total number of days for the stay
        stayPricePerDay: { type: Number, required: true }, // Price per day for the stay
        totalPrice: { type: Number, required: true }, // Total price for the stay
        guests: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        payment: {
          status: {
            type: String,
            enum: ["SUCCESS", "FAIL"], // Restrict to only these values
            required: true,
          },
          paymentType: {
            type: String,
            enum: ["prepaid"], // Restrict to only "prepaid"
            required: true,
            default: "prepaid",
          },
          transactionId: {
            type: String,
            required: true,
            unique: true, // Ensure transaction ID is unique
          },
          transactionTime: {
            type: Date,
            required: true,
            default: Date.now, // Auto-set to current time if not provided
          },
        },
      },
     
      { timestamps: true }
);

// Check if the model is already defined in Mongoose's internal registry
const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
