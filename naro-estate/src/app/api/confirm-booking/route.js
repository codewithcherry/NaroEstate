import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import PendingBooking from "@/lib/models/pendingBooking.model";
import { v4 as uuidv4 } from "uuid";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    await connect();

    const pendingBooking = await PendingBooking.findOne({ token });

    if (!pendingBooking) {
      return NextResponse.json(
        {
          type: "error",
          message: "Invalid or expired token.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      type: "success",
      message: "Booking pending confirmation.",
      websocketUrl: `ws://localhost:4000?token=${token}`,
    });
  } catch (error) {
    console.error("Error confirming booking:", error);
    return NextResponse.json(
      {
        type: "error",
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
