import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import PendingBooking from "@/lib/models/pendingBooking.model";

export const GET = async (request) => {
  try {
    // Extract the token from the query parameters
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        {
          type: "error",
          message: "Token is required",
        },
        {
          status: 400, // Bad Request
        }
      );
    }

    await connect();

    // Find the pending booking document using the token and populate the listingId field
    const pendingBooking = await PendingBooking.findOne({ token }).populate({
      path: "listingId", // Field to populate
      select: "title coverPhoto address listingType stayPrice propertyDetails", // Fields to include from the Listing model
    });

    if (!pendingBooking) {
      return NextResponse.json(
        {
          type: "error",
          message: "Token not found",
        },
        {
          status: 404, // Not Found
        }
      );
    }

    // Return the pending booking document with populated listing data as a JSON response
    return NextResponse.json(
      {
        type: "success",
        message: "Pending booking found",
        data: pendingBooking,
      },
      {
        status: 200, // OK
      }
    );
  } catch (error) {
    console.error("Error confirming payment:", error);
    return NextResponse.json(
      {
        type: "error",
        message: "Internal Server Error",
      },
      {
        status: 500, // Internal Server Error
      }
    );
  }
};