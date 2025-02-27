import mongoose from "mongoose";
import { Schema } from "mongoose";

const enquirySchema = new Schema(
  {
    // User & Listing Info
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    
    // Basic User Details
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }, // Added email for notifications
    preferredContactTime: { type: String, enum: ["Morning", "Afternoon", "Evening"] }, // When user prefers a call
    moveInDate: { type: Date, required: true },
    message: { type: String }, // Optional message from user

    // Status Tracking
    status: { 
      type: String, 
      enum: [
        "Pending",
        "Under Review",
        "Agent Assigned",
        "Contacted",
        "Follow-up Scheduled",
        "Visit Scheduled",
        "Completed",
        "Waitlisted",
        "Rejected"
      ], 
      default: "Pending" 
    },

    // Meeting & Agent Info
    meetingLink: { 
      type: String, 
      validate: {
        validator: function(v) {
          return /^https:\/\/meet\.google\.com\/[a-zA-Z0-9-]+$/.test(v);
        },
        message: "Invalid Google Meet link format"
      }
    },
    agent: { type: Schema.Types.ObjectId, ref: "Agent" }, // Assign agent
    meetingNotes: { type: String }, // Agent's notes after the meeting
    userInterest: { 
      type: String, 
      enum: ["Yes", "No", "Maybe"], 
      default: "Maybe" 
    },

    // Property Visit Management
    propertyVisitScheduled: { type: Date }, // If user is interested, visit date/time
    visitLocation: { type: String }, // Exact property address for visit
    visitRescheduleRequests: [{ // Tracks rescheduling requests
      requestedDate: { type: Date },
      reason: { type: String }
    }],

    // Follow-ups & Next Steps
    nextSteps: { 
      type: String, 
      enum: ["Schedule Visit", "Follow-up Later", "Not Interested"], 
      default: "Follow-up Later" 
    },
    followUpDate: { type: Date }, // Date for the next follow-up
    completionReason: { type: String }, // If marked "Completed," record reason

    // User Feedback & Rating
    userFeedback: { type: String }, // User's feedback on meeting/visit
    userRating: { type: Number, min: 1, max: 5 }, // User rates their experience (1-5 stars)

    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
