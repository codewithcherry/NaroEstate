import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Booking from "@/lib/models/booking.model";
import PendingBooking from "@/lib/models/pendingBooking.model";
import { v4 as uuidv4 } from "uuid";

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { listingId, checkIn, checkOut,stayPricePerDay,totalPrice,totalDays, guests} = reqBody;
    const userId = request.headers.get("userId");

    if (!listingId || !checkIn || !checkOut || !userId) {
      return NextResponse.json(
        { type: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connect();

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

    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

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
      guests
    });

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
