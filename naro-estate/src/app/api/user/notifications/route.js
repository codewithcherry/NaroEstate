import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Notification from "@/lib/models/notification.model";
import User from "@/lib/models/user.model";

export const GET = async (request) => {
  try {
    await connect();

    // Extract userId from headers
    const userId = request.headers.get("userId");

    // Check if userId is provided
    if (!userId) {
      return NextResponse.json(
        {
          type: "error",
          message: "UserId not found!!",
        },
        {
          status: 401, // Unauthorized
        }
      );
    }

    // Fetch notifications for the recipient
    const notifications = await Notification.find({ recipient: userId })
      .sort({ timestamp: -1 }) // Sort by most recent first
      .exec();

    // Return the notifications
    return NextResponse.json(
      {
        type: "success",
        message: "Notifications fetched successfully",
        data: notifications,
      },
      {
        status: 200, // OK
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        type: "error",
        message: "Internal Server Error!!",
      },
      {
        status: 500, // Internal Server Error
      }
    );
  }
};