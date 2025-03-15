import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import PendingBooking from "@/lib/models/pendingBooking.model";
import Listing from "@/lib/models/listing.model";

export const GET = async (request) => {
  try {
    // Extract the token from the query parameters
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { type: "error", message: "Token is required" },
        { status: 400 }
      );
    }

    await connect();

    // Find the pending booking document using the token and populate the listingId field
    const pendingBooking = await PendingBooking.findOne({ token }).populate({
      path: "listingId",
      select: "title coverPhoto address listingType stayPrice propertyDetails bookingsConfirmed pendingBookings queue",
    });

    if (!pendingBooking) {
      return NextResponse.json(
        { type: "error", message: "Token not found" },
        { status: 404 }
      );
    }

    const { listingId, checkIn, checkOut } = pendingBooking;

    // Fetch the listing document
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return NextResponse.json(
        { type: "error", message: "Listing not found" },
        { status: 404 }
      );
    }

    // Check for overlapping dates in bookingsConfirmed
    const userDates = getDateRange(checkIn, checkOut);
    const isConfirmedOverlap = userDates.some(date => (listing.bookingsConfirmed || []).includes(date));

    if (isConfirmedOverlap) {
      return NextResponse.json(
        { type: "error", message: "Selected dates are unavailable (confirmed bookings)" ,pay:false},
        { status: 400 }
      );
    }

    // Check for overlapping dates in pendingBookings
    const isPendingOverlap = userDates.some(date => (listing.pendingBookings || []).includes(date));

    if (!isPendingOverlap) {
      // No overlap with pendingBookings, allow user to proceed to payment
      return NextResponse.json(
        { type: "success", message: "You can proceed to payment",pay:true ,data: pendingBooking },
        { status: 200 }
      );
    }

    // Overlap with pendingBookings, add user to the queue if not already in it
    const userInQueue = listing.queue.find(entry => entry.token === token);
    if (!userInQueue) {
      listing.queue.push({ userId: pendingBooking.userId, token, timestamp: new Date() });
      await listing.save();
    }

    // Check user's position in the queue
    const userPosition = listing.queue.findIndex(entry => entry.token === token);

    if (userPosition === 0) {
      return NextResponse.json(
        { type: "success", message: "You can proceed to payment",pay:true, data: pendingBooking },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { type: "success", message: `You are in position ${userPosition + 1} in the queue`,pay:false, data: { position: userPosition + 1 } },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in GET API:", error);
    return NextResponse.json(
      { type: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// Helper function to generate an array of dates between checkIn and checkOut
const getDateRange = (checkIn, checkOut) => {
  const dates = [];
  let currentDate = new Date(checkIn);
  const endDate = new Date(checkOut);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate).toISOString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};