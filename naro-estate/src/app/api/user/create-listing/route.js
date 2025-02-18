import Listing from "@/lib/models/listing.model";
import connect from "@/lib/mongoDb/database";
import { NextResponse } from "next/server";

// Named export for POST method
export const POST = async (request) => {
  try {
    // Connect to the database
    await connect();

    // Parse the request body
    const requestBody = await request.json();

    const {propertyDetails,
        addressInfo,
        propertyInfo,
        coverPhoto,
        propertyMedia,
        amenities}=requestBody;

    // Retrieve the userId from the request headers
    const userId = request.headers.get("userId");

    if (!userId) {
      return NextResponse.json({
        type: "error",
        message: "User ID is required.",
      }, {
        status: 400,
      });
    }

   

    // Create a new listing object
    const newListing = new Listing({
        title: propertyInfo.title,
        description:  propertyInfo.description,
        propertyType: propertyInfo.propertyType,
        propertyStatus: propertyInfo.propertyStatus,
        listingType:  propertyInfo.listingType,
        salePrice:  propertyInfo.salePrice,
        rentPrice:  propertyInfo.rentPrice,
        address:addressInfo,
        propertyDetails:propertyDetails,
        amenities:amenities,
        coverPhoto:coverPhoto,
        propertyMedia:propertyMedia,
        createdBy:userId,
        reviews:[],
        rating:0

    });

    // Save the listing to the database
    const savedListing = await newListing.save();

    // Respond with a success message
    return NextResponse.json({
      type: "success",
      message: "Listing created successfully.",
      listingId: savedListing._id,
    });

  } catch (error) {
    console.log(error); // Log error for debugging

    return NextResponse.json(
      {
        type: 'error',
        message: 'Internal server error! Please try again later.',
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
