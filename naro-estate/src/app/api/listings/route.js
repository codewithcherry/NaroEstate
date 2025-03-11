import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Listing from "@/lib/models/listing.model";

export const GET = async (request) => {
    try {
        await connect();

        const { searchParams } = new URL(request.url);
        const listingType = searchParams.get('listingType')?.split(',') || [];
        const propertyType = searchParams.get('propertyType')?.split(',') || [];
        const beds = searchParams.get('beds');
        const baths = searchParams.get('baths');
        const city = searchParams.get('city');
        const state = searchParams.get('state');
        const search = searchParams.get('search'); // Search term
        const page = parseInt(searchParams.get('page')) || 1;

        const listingsPerPage = 6;
        const skip = (page - 1) * listingsPerPage;

        // Build filters for MongoDB aggregation
        const filters = [];

        if (listingType.length > 0 && !listingType.includes('all')) {
            filters.push({ listingType: { $in: listingType } });
        }

        if (propertyType.length > 0) {
            filters.push({ propertyType: { $in: propertyType } });
        }

        if (beds) {
            filters.push({ "propertyDetails.beds": parseInt(beds, 10) });
        }

        if (baths) {
            filters.push({ "propertyDetails.baths": parseInt(baths, 10) });
        }

        if (city) {
            filters.push({ "address.city": city });
        }

        if (state) {
            filters.push({ "address.state": state });
        }

        // Define the aggregation pipeline
        const pipeline = [];

        // Add Atlas Search stage if search term exists
        if (search) {
            pipeline.push({
                $search: {
                    index: "default", // Change this to your search index name
                    text: {
                        query: search,
                        path: ["title", "description", "address.city", "address.state"],
                        fuzzy: {
                            maxEdits: 1, // Allow minor typos
                        }
                    }
                }
            });
        }

        // Apply filters
        if (filters.length > 0) {
            pipeline.push({ $match: { $and: filters } });
        }

        // Pagination
        pipeline.push(
            { $skip: skip },
            { $limit: listingsPerPage }
        );

        // Fetch total listings count
        const totalListings = await Listing.aggregate([
            ...(search ? [{ $search: pipeline[0].$search }] : []),
            ...(filters.length > 0 ? [{ $match: { $and: filters } }] : []),
            { $count: "total" }
        ]);

        const listings = await Listing.aggregate(pipeline);
        const totalCount = totalListings.length > 0 ? totalListings[0].total : 0;
        const totalPages = Math.ceil(totalCount / listingsPerPage);

        const pagination = {
            totalPages,
            currentPage: page,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
        };

        return NextResponse.json(
            {
                type: 'success',
                message: 'Successfully fetched the listings!',
                listings,
                pagination
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching listings:", error);
        return NextResponse.json(
            {
                type: 'error',
                message: 'Internal Server Error. Please try again later.',
                error: error.message
            },
            { status: 500 }
        );
    }
};
