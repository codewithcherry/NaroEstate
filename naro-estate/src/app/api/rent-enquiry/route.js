import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import User from "@/lib/models/user.model";
import Listing from "@/lib/models/listing.model";
import Enquiry from "@/lib/models/enquiry.model";

export const POST = async (request) => {
  try {
    await connect();

    const reqBody = await request.json();
    const { listingId, name, email, phone, moveInDate, message } = reqBody;

    // Retrieve userId from request headers
    const userId = request.headers.get("userId");

    if (!userId) {
      return NextResponse.json(
        { type: "error", message: "User not authenticated!" },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!listingId || !name || !email || !phone || !moveInDate) {
      return NextResponse.json(
        { type: "error", message: "All required fields must be filled!" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { type: "error", message: "User not found!" },
        { status: 404 }
      );
    }

    // Check if the listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return NextResponse.json(
        { type: "error", message: "Listing not found!" },
        { status: 404 }
      );
    }

    // Create a new enquiry
    const newEnquiry = new Enquiry({
      user: userId,
      listing: listingId,
      name,
      email,
      phone,
      moveInDate,
      message,
      status: "Pending", // Default status
    });

    // Save the enquiry to the database
    await newEnquiry.save();

    return NextResponse.json(
      {
        type: "success",
        message: "Enquiry submitted successfully. The agent will contact you soon!",
        enquiry: newEnquiry,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error in submitting enquiry:", error);
    return NextResponse.json(
      {
        type: "error",
        message: "Internal Server Error. Please try again later!",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
