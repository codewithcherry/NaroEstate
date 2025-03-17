import { NextResponse } from 'next/server';
import connect from '@/lib/mongoDb/database';
import Booking from '@/lib/models/booking.model';
import Listing from '@/lib/models/listing.model';

export const GET = async (request) => {
  try {
    // Connect to the database
    await connect();

    // Extract the bookingId from query parameters
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    // Extract userId from request headers
    const userId = request.headers.get('userId');

    // Validate bookingId
    if (!bookingId) {
      return NextResponse.json(
        {
          type: 'error',
          message: 'Booking ID is required!',
        },
        {
          status: 400,
        }
      );
    }

    // Validate userId
    if (!userId) {
      return NextResponse.json(
        {
          type: 'error',
          message: 'User ID is required in headers!',
        },
        {
          status: 400,
        }
      );
    }

    // Fetch the booking details from the database
    const booking = await Booking.findById(bookingId).populate({
        path: "listingId",
        select: "title coverPhoto address listingType stayPrice propertyDetails ",
      });

    // Check if booking exists
    if (!booking) {
      return NextResponse.json(
        {
          type: 'error',
          message: 'Booking not found!',
        },
        {
          status: 404,
        }
      );
    }

    // Check if the userId matches the booking's userId
    if (userId.toString() !== booking.userId.toString()) {
      return NextResponse.json(
        {
          type: 'error',
          message: 'Unauthorized access to booking details!',
        },
        {
          status: 403, // 403 Forbidden status
        }
      );
    }

    // Return the booking details if everything is valid
    return NextResponse.json({
      type: 'success',
      message: 'Booking details fetched successfully!',
      booking,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        type: 'error',
        message: 'Internal Server Error!',
      },
      {
        status: 500,
      }
    );
  }
};