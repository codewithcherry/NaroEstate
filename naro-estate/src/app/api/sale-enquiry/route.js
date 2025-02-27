import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import Listing from "@/lib/models/listing.model";
import saleEnquiryModel from "@/lib/models/sale.enquiry.model";
import connect from "@/lib/mongoDb/database";

// Handle POST request for agent call request
export const POST = async (request) => {
  try {
    await connect(); // Ensure database connection

    // Parse request body
    const reqBody = await request.json();
    const {
      listingId,
      userAvailableDate,
      userAvailableTime,
      preferredContactMethod,
      notes,
      dealStatus,
    } = reqBody;

    // Get user ID from request headers
    const userId = request.headers.get("userId");

    // Validate required fields
    if (!userId || !listingId || !userAvailableDate || !userAvailableTime) {
      return NextResponse.json(
        {
          type: "error",
          message: "Missing required fields: userId, listingId, userAvailableDate, or userAvailableTime.",
        },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        {
          type: "error",
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return NextResponse.json(
        {
          type: "error",
          message: "Listing not found.",
        },
        { status: 404 }
      );
    }

    // Create new sale enquiry
    const newEnquiry = new saleEnquiryModel({
      userId,
      listingId,
      userAvailableDate,
      userAvailableTime,
      preferredContactMethod: preferredContactMethod || "Phone",
      notes,
      dealStatus: dealStatus || "Enquiry Received",
    });

    // Save enquiry to database
    await newEnquiry.save();

    return NextResponse.json(
      {
        type: "success",
        message: "Your enquiry has been submitted successfully. An agent will contact you soon.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting sale enquiry:", error);
    return NextResponse.json(
      {
        type: "error",
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
};
