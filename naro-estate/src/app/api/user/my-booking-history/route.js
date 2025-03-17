import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import User from "@/lib/models/user.model";

export const GET = async (request) => {
    try {
        const userId = request.headers.get('userId');
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1; // Default to page 1 if not provided
        const perPage = 10; // Number of items per page

        if (!userId) {
            return NextResponse.json({
                type: "error",
                message: "User Id is missing!"
            }, {
                status: 404
            });
        }

        await connect(); // Ensure the database connection is established

        // Find the user and populate the bookingHistory field with actual booking documents
        const user = await User.findById(userId).populate({
            path: 'myBookingHistory',
            populate: {
                path: 'listingId',
                select: 'title' // Only include the 'title' field from the Listing model
            }
        });

        if (!user) {
            return NextResponse.json({
                type: "error",
                message: "User not found!"
            }, {
                status: 404
            });
        }

        // Extract the populated bookingHistory
        const bookingHistory = user.myBookingHistory;

        // Pagination logic
        const totalBookings = bookingHistory.length;
        const totalPages = Math.ceil(totalBookings / perPage);

        const pagination = {
            totalPages,
            currentPage: page,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
        };

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        const paginatedBookingHistory = bookingHistory.slice(startIndex, endIndex);

        return NextResponse.json({
            type: "success",
            message: "Successfully fetched the booking History",
            data:  paginatedBookingHistory,
            pagination
            
        }, {
            status: 200
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            type: 'error',
            message: "Internal Server Error"
        }, {
            status: 500
        });
    }
};