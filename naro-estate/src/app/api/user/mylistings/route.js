import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Listing from "@/lib/models/listing.model";

export const GET = async (request) => {
  try {
    const userId = request.headers.get('userId');

    if (!userId) {
      return NextResponse.json(
        {
          type: 'error',
          message: "UserId is missing!"
        },
        {
          status: 404
        }
      );
    }

    await connect();

    const listings = await Listing.find({ createdBy: userId });

    if (listings.length === 0) {
      return NextResponse.json(
        {
          type: 'success',
          message: "No listings found!",
          listings: []
        },
        {
          status: 200
        }
      );
    }

    return NextResponse.json(
      {
        type: 'success',
        message: "Listings fetched successfully!",
        listings
      },
      {
        status: 200
      }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        type: 'error',
        message: "Internal server error! Try again later!"
      },
      {
        status: 500
      }
    );
  }
};
