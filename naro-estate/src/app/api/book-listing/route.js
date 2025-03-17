import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Listing from "@/lib/models/listing.model";
import PendingBooking from "@/lib/models/pendingBooking.model";
import Booking from "@/lib/models/booking.model";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
import createNotification from "@/lib/services/notification";

/**
 * Helper function to generate an array of dates between checkIn and checkOut.
 * @param {string} checkIn - The check-in date in ISO string format.
 * @param {string} checkOut - The check-out date in ISO string format.
 * @returns {string[]} - An array of ISO date strings representing the date range.
 */
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

/**
 * Helper function to generate an array of dates between checkIn and checkOut.
 * @param {string} checkIn - The check-in date in ISO string format.
 * @param {string} checkOut - The check-out date in ISO string format.
 * @returns {Date[]} - An array of Date objects representing the date range.
 */
const generateDateRange = (checkIn, checkOut) => {
  const dates = [];
  let currentDate = new Date(checkIn);

  while (currentDate <= new Date(checkOut)) {
    dates.push(new Date(currentDate)); // Add the current date to the array
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return dates;
};

/**
 * Helper function to clear bookings and update the listing.
 * @param {Object} listing - The listing document to update.
 * @param {string} token - The booking token to identify the user in the queue.
 * @param {string[]} datesToClear - An array of ISO date strings to remove from pendingBookings.
 * @returns {Object} - The updated listing document.
 * @throws {Error} - If the update fails.
 */
const clearBookings = async (listing, token, datesToClear) => {
  try {
    console.log("Before update:");
    console.log("Pending Bookings:", listing.pendingBookings);
    console.log("Queue:", listing.queue);
    console.log("Dates to Clear:", datesToClear);

    // Convert both pendingBookings and datesToClear to ISO strings for proper comparison
    const pendingBookingsISO = listing.pendingBookings.map((date) =>
      date.toISOString()
    );
    const datesToClearISO = datesToClear.map((date) => date.toISOString());

    // Remove the dates from the listing's pendingBookings array
    listing.pendingBookings = pendingBookingsISO.filter(
      (date) => !datesToClearISO.includes(date)
    );

    // Convert filtered pendingBookings back to Date objects
    listing.pendingBookings = listing.pendingBookings.map(
      (date) => new Date(date)
    );

    // Remove the user from the queue if their token matches
    listing.queue = listing.queue.filter(
      (queueItem) => queueItem.token !== token
    );

    console.log("After update:");
    console.log("Pending Bookings:", listing.pendingBookings);
    console.log("Queue:", listing.queue);

    // Save the updated listing
    await listing.save();

    return listing;
  } catch (error) {
    console.error("Error in clearBookings:", error);
    throw new Error("Failed to clear bookings and update listing.");
  }
};

// helper function to create and send the notification

const sendNotification = async (id, title, type, message) => {
  return await createNotification({
    title: title,
    message: message,
    type: type,
    sender: {
      name: "Team NaroEstate",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    recipient: id, // Replace with actual user ID
  });
};

/**
 * POST route to handle booking creation.
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - The response object with the result of the operation.
 */
export const POST = async (request) => {
  const session = await mongoose.startSession(); // Start a MongoDB session
  session.startTransaction(); // Start a transaction

  try {
    const requestBody = await request.json();

    const { listingId, bookingData } = requestBody;

    const userId = request.headers.get("userId");

    const {
      checkIn,
      checkOut,
      token,
      totalDays,
      stayPricePerDay,
      totalPrice,
      guests,
    } = bookingData;

    // Validate required fields
    if (!userId || !listingId || !bookingData || !token) {
      await session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session
      return NextResponse.json(
        {
          type: "error",
          message: "listingId/userId/booking data is missing! try again",
        },
        {
          status: 404, // Hardcoded status code
        }
      );
    }

    // Validate checkIn and checkOut dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      await session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session
      return NextResponse.json(
        {
          type: "error",
          message: "Invalid checkIn or checkOut date format.",
        },
        {
          status: 400, // Hardcoded status code
        }
      );
    }

    if (checkInDate >= checkOutDate) {
      await session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session
      return NextResponse.json(
        {
          type: "error",
          message: "checkIn date must be before checkOut date.",
        },
        {
          status: 400, // Hardcoded status code
        }
      );
    }

    await connect();

    // Fetch the listing document
    const listing = await Listing.findById(listingId).session(session); // Use the session

    if (!listing) {
      await session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session
      return NextResponse.json(
        { type: "error", message: "Listing not found" },
        { status: 404 } // Hardcoded status code
      );
    }

    const newBooking = new Booking({
      userId,
      listingId,
      checkIn, // Use checkIn directly
      checkOut, // Use checkOut directly
      token,
      stayPricePerDay,
      totalPrice,
      totalDays,
      guests,payment: {
        status: "SUCCESS",
        paymentType: "prepaid",
        transactionId: "TXN123456789",
      }
    });

    // Save the new booking using the session
    const bookingDetails = await newBooking.save({ session });

    // update the user myBookingHistory
    const updatedUserBookingHistory = await User.findByIdAndUpdate(
      userId,
      { $push: { myBookingHistory: bookingDetails._id } },
      { new: true, session } // Use the session
    ).catch((error) => {
      console.error("Error updating user booking History:", error);
      throw new Error("Failed to update listing.");
    });

    if (!updatedUserBookingHistory) {
      await session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session
      return NextResponse.json(
        {
          type: "error",
          message: "Failed to update user myBookingHistory.",
        },
        {
          status: 500, // Hardcoded status code
        }
      );
    }

    const GuestMessage = `Hello ${updatedUserBookingHistory.username},  

                          Your booking for  **${listing.title}** is confirmed.  

                          📌 **Booking ID:** ${bookingDetails._id}  

                          For more details, please check your  booking history in your profile.  

                          Thank you for being a valued coustmer!  

                          **Best regards,**  
                          Team NaroEstate`;

await sendNotification(userId,'Booking confirmed!','message',GuestMessage);


    // update the host booking history
    // Fetch the listing document to get the host ID
    const hostListing = await Listing.findById(listingId).session(session); // Use the session

    // Check if the listing exists
    if (!hostListing) {
      await session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session
      return NextResponse.json(
        {
          type: "error",
          message: "Listing not found.",
        },
        {
          status: 404, // Hardcoded status code
        }
      );
    }

    const hostId = hostListing.createdBy;

    // Validate hostId (ensure it's a valid ObjectId)
    if (!mongoose.Types.ObjectId.isValid(hostId)) {
      await session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session
      return NextResponse.json(
        {
          type: "error",
          message: "Invalid host ID.",
        },
        {
          status: 400, // Hardcoded status code
        }
      );
    }

    // Update the host's myGuestBookingHistory and increment bookings/guests in a single operation
    const updatedHost = await User.findByIdAndUpdate(
      hostId,
      {
        $push: { myGuestBookingHistory: bookingDetails._id }, // Add booking to guest history
        $inc: {
          bookings: 1, // Increment bookings by 1
          guests: guests, // Increment guests by the number of guests from the request
        },
      },
      { new: true, session } // Use the same session for consistency
    ).catch(async (error) => {
      console.error("Error updating host:", error);
      await session.abortTransaction(); // Explicitly abort the transaction
      session.endSession(); // End the session
      throw new Error("Failed to update host.");
    });

    // Check if the host update was successful
    if (!updatedHost) {
      await session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session
      return NextResponse.json(
        {
          type: "error",
          message: "Failed to update host.",
        },
        {
          status: 500, // Hardcoded status code
        }
      );
    }

    const hostMessage = `Hello ${updatedHost.username},  

                                  You have received a new booking for **${listing.title}**.  

                                  📌 **Booking ID:** ${bookingDetails._id}  

                                  For more details, please check your guest booking history in your profile.  

                                  Thank you for being a valued host!  

                                  **Best regards,**  
                                  Team NaroEstate`;

    await sendNotification(hostId, "You have New Booking", "payment", hostMessage);

    // Generate the array of dates between checkIn and checkOut
    const dateRange = generateDateRange(checkIn, checkOut);

    // Update the Listing model to add the new dates to bookingsConfirmed
    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      { $push: { bookingsConfirmed: { $each: dateRange } } },
      { new: true, session } // Use the session
    ).catch((error) => {
      console.error("Error updating listing:", error);
      throw new Error("Failed to update listing.");
    });

    if (!updatedListing) {
      await session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session
      return NextResponse.json(
        {
          type: "error",
          message: "Failed to update listing.",
        },
        {
          status: 500, // Hardcoded status code
        }
      );
    }

    // Find and delete the pending booking using the token
    const pendingBook = await PendingBooking.findOneAndDelete({
      token,
    }).session(session); // Use the session

    if (!pendingBook) {
      await session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session
      return NextResponse.json(
        {
          type: "error",
          message: "Invalid or expired booking token!",
        },
        {
          status: 404, // Hardcoded status code
        }
      );
    }

    // Clear pendingBookings, clear token, clear queue
    await clearBookings(listing, token, dateRange);

    // Commit the transaction if everything succeeds
    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      {
        type: "success",
        message: "Successfully completed and booked the listing",
        bookingDetails: bookingDetails,
      },
      {
        status: 200, // Hardcoded status code
      }
    );
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();

    // Log the specific error details
    console.error("Error in POST route:", error);

    return NextResponse.json(
      {
        type: "error",
        message: "Internal Server Error",
        error: error.message, // Include the specific error message
      },
      {
        status: 500, // Hardcoded status code
      }
    );
  }
};
