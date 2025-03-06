import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Listing from "@/lib/models/listing.model";
import User from "@/lib/models/user.model";

export const GET = async (request, { params }) => {
    try {
        await connect();

        // Access the dynamic route parameter directly
        const { listingId } = await params;

        // Validate listingId
        if (!listingId) {
            return NextResponse.json(
                {
                    type: "error",
                    message: "Listing ID is required!",
                },
                { status: 400 }
            );
        }

        // Fetch the listing and populate the createdBy field (excluding the password)
        const listingData = await Listing.findById(listingId).populate("createdBy", "-password");

        // Handle case where listing is not found
        if (!listingData) {
            return NextResponse.json(
                {
                    type: "error",
                    message: "Listing not found!",
                },
                { status: 404 }
            );
        }

        // Return the listing data
        return NextResponse.json(listingData, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                type: "error",
                message: "Internal server error! Try again later.",
            },
            { status: 500 }
        );
    }
};