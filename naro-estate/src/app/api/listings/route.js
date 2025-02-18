import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Listing from "@/lib/models/listing.model";

export const GET = async () => {
    try {
        await connect();

        const listings = await Listing.find().limit(9);

        return NextResponse.json(
            {
                type: 'success',
                message: 'Successfully fetched the listings!',
                listings
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching listings:", error);
        return NextResponse.json(
            {
                type: 'error',
                message: 'Internal Server Error. Please try again later.',
                error: error.message // Avoid exposing sensitive error details
            },
            { status: 500 }
        );
    }
};
