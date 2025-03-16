import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Listing from "@/lib/models/listing.model";
import PendingBooking from "@/lib/models/pendingBooking.model";

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

// Helper function to clear bookings
const clearBookings = async (listing, token, datesToClear) => {
    console.log(listing);
    console.log('datesToClear', datesToClear);

    // Convert pendingBookings dates to ISO strings for comparison
    const pendingBookingsISO = listing.pendingBookings.map(date => date.toISOString());

    // Remove the dates from the listing's pendingBookings array
    listing.pendingBookings = listing.pendingBookings.filter(
        date => !datesToClear.includes(date.toISOString())
    );

    // Add the dates to the listing's bookingsCancelled array
    listing.bookingsCancelled = [...listing.bookingsCancelled, ...datesToClear];

    // Remove the user from the queue if their token matches
    listing.queue = listing.queue.filter(
        queueItem => queueItem.token !== token
    );

    console.log("pendingBookings: ", listing.pendingBookings);
    console.log("bookingsCancelled: ", listing.bookingsCancelled);
    console.log("queue: ", listing.queue);

    // Save the updated listing
    await listing.save();

    return listing;
};

export const POST = async (request) => {
    try {
        const reqbody = await request.json();
        const { token, listingId, bookingData } = reqbody; // Extract token, listingId, and bookingData from the request body
        const userId = request.headers.get('userId');

        console.log(bookingData);

        await connect();

        // Validate userId
        if (!userId) {
            return NextResponse.json({
                type: 'error',
                message: 'User ID is missing!'
            }, {
                status: 400
            });
        }

        // Validate token
        if (!token) {
            return NextResponse.json({
                type: 'error',
                message: 'Booking token is missing!'
            }, {
                status: 404
            });
        }

        // Find and delete the pending booking using the token
        const pendingBook = await PendingBooking.findOneAndDelete({ token });

        if (!pendingBook) {
            return NextResponse.json({
                type: 'error',
                message: 'Invalid or expired booking token!'
            }, {
                status: 404
            });
        }

        // Generate an array of dates to clear from the listing's pendingBookings array
        const datesToClear = getDateRange(bookingData.data.checkIn, bookingData.data.checkOut);

        console.log(datesToClear);

        // Check if the listing exists
        const listing = await Listing.findById(listingId);

        if (!listing) {
            return NextResponse.json({
                type: 'error',
                message: 'Listing not found!'
            }, {
                status: 404
            });
        }

        // Use the clearBookings function to handle the updates
        const updatedListing = await clearBookings(listing, token, datesToClear);

        return NextResponse.json({
            type: 'success',
            message: 'Pending booking cleared, dates moved to bookingsCancelled, and user removed from queue!',
            data: updatedListing
        }, {
            status: 200
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            type: 'error',
            message: "Internal server error"
        }, {
            status: 500
        });
    }
};