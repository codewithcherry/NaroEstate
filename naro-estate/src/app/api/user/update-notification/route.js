import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Notification from "@/lib/models/notification.model";

export const PATCH = async (request) => {
  try {
    // Connect to the database
    await connect();

    // Parse the request body
    const requestBody = await request.json();
    const { NotificationId, updatedNotification } = requestBody;

    // Extract userId from headers
    const userId = request.headers.get("userId");

    // Validate userId
    if (!userId) {
      return NextResponse.json(
        {
          type: "error",
          message: "UserId not found",
        },
        {
          status: 401, // Unauthorized
        }
      );
    }

    // Validate NotificationId and updatedNotification
    if (!NotificationId || !updatedNotification) {
      return NextResponse.json(
        {
          type: "error",
          message: "NotificationId and updatedNotification are required",
        },
        {
          status: 400, // Bad Request
        }
      );
    }

    // Find the notification by ID
    const notification = await Notification.findById(NotificationId);

    // Check if the notification exists
    if (!notification) {
      return NextResponse.json(
        {
          type: "error",
          message: "Notification not found",
        },
        {
          status: 404, // Not Found
        }
      );
    }

    // Check if the notification belongs to the user
    if (notification.recipient.toString() !== userId) {
      return NextResponse.json(
        {
          type: "error",
          message: "You are not authorized to update this notification",
        },
        {
          status: 403, // Forbidden
        }
      );
    }

    // Update the notification with the new data
    const updatedNotificationDoc = await Notification.findByIdAndUpdate(
      NotificationId,
      updatedNotification,
      { new: true } // Return the updated document
    );

    // Return the updated notification
    return NextResponse.json(
      {
        type: "success",
        message: "Notification updated successfully",
        data: updatedNotificationDoc,
      },
      {
        status: 200, // OK
      }
    );
  } catch (error) {
    console.error("Error updating notification:", error);
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