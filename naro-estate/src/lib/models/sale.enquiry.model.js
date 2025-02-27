import mongoose from "mongoose";

const SaleEnquirySchema = new mongoose.Schema(
  {
    /** 🔹 User & Listing Details */
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

    /** 📞 Initial Contact & Availability */
    userAvailableDate: {
      type: Date,
      required: true,
    },
    userAvailableTime: {
      type: String,
      required: true,
    },
    preferredContactMethod: {
      type: String,
      enum: ["Phone", "Email", "Video Call"],
      default: "Phone",
    },
    notes: {
      type: String,
      default: "",
    },

    /** 📊 Deal Status Tracking */
    dealStatus: {
      type: String,
      enum: [
        "Enquiry Received",
        "Agent Contacted",
        "Meeting Scheduled",
        "Meeting Completed",
        "Property Visit Scheduled",
        "Property Visit Completed",
        "Offer Made",
        "Negotiation in Progress",
        "Offer Accepted",
        "Offer Rejected",
        "Final Documents Submitted",
        "Deal Closed",
        "Deal Cancelled"
      ],
      default: "Enquiry Received",
    },

    /** 🎯 Meeting & Follow-up */
    meetingScheduled: {
      type: Boolean,
      default: false,
    },
    meetingDate: {
      type: Date,
      default: null,
    },
    meetingTime: {
      type: String,
      default: null,
    },
    meetingLink: {
      type: String,
      default: "",
    },
    agentRemarks: {
      type: String,
      default: "",
    },
    meetingSummary: {
      type: String,
      default: "",
    },

    /** 🏡 Property Visit Details */
    visitScheduled: {
      type: Boolean,
      default: false,
    },
    visitDate: {
      type: Date,
      default: null,
    },
    visitTime: {
      type: String,
      default: null,
    },
    visitStatus: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: null,
    },
    visitOutcome: {
      type: String,
      enum: ["Interested", "Needs Time", "Not Interested", "Offer Made"],
      default: "Needs Time",
    },

    /** 💰 Offer & Negotiation */
    offerMade: {
      type: Boolean,
      default: false,
    },
    offerAmount: {
      type: Number,
      default: null,
    },
    offerStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Counter Offer"],
      default: "Pending",
    },
    counterOfferAmount: {
      type: Number,
      default: null,
    },

    /** 📝 Documentation & Closing */
    documentsSubmitted: {
      type: Boolean,
      default: false,
    },
    agreementSigned: {
      type: Boolean,
      default: false,
    },
    closingDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SaleEnquiry || mongoose.model("SaleEnquiry", SaleEnquirySchema);
