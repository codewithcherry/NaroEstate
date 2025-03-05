import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Listing from "@/lib/models/listing.model";

export const GET = async (request) => {
    try {
        await connect();

        // Extract query parameters from the request URL
        const { searchParams } = new URL(request.url);
        const listingType = searchParams.get('listingType')?.split(',') || [];
        const propertyType = searchParams.get('propertyType')?.split(',') || [];
        const beds = searchParams.get('beds');
        const baths = searchParams.get('baths');
        const city = searchParams.get('city');
        const state = searchParams.get('state');

        // Build the MongoDB query based on the extracted parameters
        const query = {};

        // Handle listingType filter
        if (listingType.length > 0 && !listingType.includes('all')) {
            query.listingType = { $in: listingType };
        }

        // Handle propertyType filter
        if (propertyType.length > 0) {
            query.propertyType = { $in: propertyType };
        }

        // Handle beds filter
        if (beds) {
            query["propertyDetails.beds"] = parseInt(beds, 10); // Use dot notation for nested fields
        }

        // Handle baths filter
        if (baths) {
            query["propertyDetails.baths"] = parseInt(baths, 10); // Use dot notation for nested fields
        }

        // Handle city filter
        if (city) {
            query["address.city"] = city; // Use dot notation for nested fields
        }

        // Handle state filter
        if (state) {
            query["address.state"] = state; // Use dot notation for nested fields
        }

        // Log the constructed query for debugging
        console.log("Constructed Query:", JSON.stringify(query, null, 2));

        // Fetch listings based on the constructed query
        const listings = await Listing.find(query).limit(9);

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