import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Booking from "@/lib/models/booking.model";
import PendingBooking from "@/lib/models/pendingBooking.model";
import Listing from "@/lib/models/listing.model"; // Import the Listing model
import { v4 as uuidv4 } from "uuid";

// Helper function to generate an array of dates between checkIn and checkOut
const generateDateRange = (checkIn, checkOut) => {
  const dates = [];
  let currentDate = new Date(checkIn);

  while (currentDate <= new Date(checkOut)) {
    dates.push(new Date(currentDate)); // Add the current date to the array
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return dates;
};

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { listingId, checkIn, checkOut, stayPricePerDay, totalPrice, totalDays, guests } = reqBody;
    const userId = request.headers.get("userId");

    if (!listingId || !checkIn || !checkOut || !userId) {
      return NextResponse.json(
        { type: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connect();

    // Check for existing bookings that overlap with the selected dates
    const existingBooking = await Booking.findOne({
      listingId,
      $or: [
        { checkIn: { $lte: new Date(checkOut), $gte: new Date(checkIn) } },
        { checkOut: { $gte: new Date(checkIn), $lte: new Date(checkOut) } },
      ],
    });

    if (existingBooking) {
      return NextResponse.json(
        { type: "error", message: "Selected dates are already booked" },
        { status: 400 }
      );
    }

    // Generate a unique token and set expiration time
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Create the pending booking
    await PendingBooking.create({
      userId,
      listingId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      token,
      expiresAt,
      stayPricePerDay,
      totalPrice,
      totalDays,
      guests,
    });

    // Generate the array of dates between checkIn and checkOut
    const dateRange = generateDateRange(checkIn, checkOut);

    // Update the Listing model to add the new dates to pendingBookings
    await Listing.findByIdAndUpdate(
      listingId,
      { $push: { pendingBookings: { $each: dateRange } } }, // Add the date range to pendingBookings
      { new: true }
    );

    return NextResponse.json(
      {
        type: "success",
        message: "Your booking is reserved! Redirecting to payments...",
        token,
        expiresAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reserving listing:", error);
    return NextResponse.json(
      { type: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};