import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import Listing from "@/lib/models/listing.model";
import User from "@/lib/models/user.model";

export const GET = async (request, { params }) => {
    try {
        await connect();

        const listingId = params.listingId;

        if (!listingId) {
            return NextResponse.json(
                {
                    type: "error",
                    message: "Listing ID is required!",
                },
                { status: 400 }
            );
        }

        const listingData = await Listing.findById(listingId).populate("createdBy", "-password");

        if (!listingData) {
            return NextResponse.json(
                {
                    type: "error",
                    message: "Listing not found!",
                },
                { status: 404 }
            );
        }

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
