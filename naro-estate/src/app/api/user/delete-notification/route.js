import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Notification from "@/lib/models/notification.model";
import User from "@/lib/models/user.model";

export const DELETE = async (request) => {
    try {
        // Connect to the database
        await connect();

        // Parse the request body
        const requestBody = await request.json();
        const { notificationId } = requestBody;

        // Get the user ID from the request headers
        const userId = request.headers.get('userId');

        // Check if userId is provided
        if (!userId) {
            return NextResponse.json(
                {
                    type: "error",
                    message: 'User Id is not found!'
                },
                {
                    status: 404
                }
            );
        }

        // Check if notificationId is provided
        if (!notificationId) {
            return NextResponse.json(
                {
                    type: "error",
                    message: 'Notification Id is not found!'
                },
                {
                    status: 404
                }
            );
        }

        // Find the notification
        const notification = await Notification.findById(notificationId);

        // If the notification was not found
        if (!notification) {
            return NextResponse.json(
                {
                    type: "error",
                    message: 'Notification not found!'
                },
                {
                    status: 404
                }
            );
        }

        // Check if the notification's recipient matches the userId
        if (notification.recipient.toString() !== userId) {
            return NextResponse.json(
                {
                    type: "error",
                    message: 'You are not authorized to delete this notification!'
                },
                {
                    status: 403 // Forbidden
                }
            );
        }

        // Delete the notification
        await Notification.findByIdAndDelete(notificationId);

        // // Remove the notification ID from the user's notifications array
        // await User.findByIdAndUpdate(userId, {
        //     $pull: { notifications: notificationId }
        // });

        // Return a success response
        return NextResponse.json(
            {
                type: "success",
                message: 'Notification deleted successfully!'
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                type: "error",
                message: "Internal Server Error!"
            },
            {
                status: 500
            }
        );
    }
};