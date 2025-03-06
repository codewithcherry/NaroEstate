import Listing from "@/lib/models/listing.model";
import connect from "@/lib/mongoDb/database";
import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";

export const POST = async (request) => {
  try {
    await connect();

    const requestBody = await request.json();
    const {
      propertyDetails,
      addressInfo,
      propertyInfo,
      coverPhoto,
      propertyMedia,
      amenities,
    } = requestBody;

    const userId = request.headers.get("userId");
    if (!userId) {
      return NextResponse.json(
        {
          type: "error",
          message: "User ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const newListing = new Listing({
      title: propertyInfo.title,
      description: propertyInfo.description,
      propertyType: propertyInfo.propertyType,
      propertyStatus: propertyInfo.propertyStatus,
      listingType: propertyInfo.listingType,
      salePrice: propertyInfo.salePrice,
      rentPrice: propertyInfo.rentPrice,
      stayPrice: propertyInfo.stayPrice,
      address: addressInfo,
      propertyDetails: propertyDetails,
      amenities: amenities,
      coverPhoto: coverPhoto,
      propertyMedia: propertyMedia,
      createdBy: userId,
      reviews: [],
      rating: 0,
    });

    const savedListing = await newListing.save();

    // Update the user document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { properties: 1 }, // Increment properties count
      },
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return NextResponse.json(
        {
          type: "error",
          message: "User not found or update failed.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      type: "success",
      message: "Listing created successfully.",
      listingId: savedListing._id,
    });
  } catch (error) {
    console.log("Error:", error); // Log error for debugging

    return NextResponse.json(
      {
        type: "error",
        message: "Internal server error! Please try again later.",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
