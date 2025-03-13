import Listing from "@/lib/models/listing.model";
import connect from "@/lib/mongoDb/database";
import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import createNotification from "@/lib/services/notification";

export const PUT = async (request) => {
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
    const listingId = new URL(request.url).searchParams.get("listingId");

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

    if (!listingId) {
      return NextResponse.json(
        {
          type: "error",
          message: "Listing ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Find and update the listing
    const updatedListing = await Listing.findOneAndUpdate(
      { _id: listingId, createdBy: userId }, // Ensure the listing belongs to the user
      {
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
      },
      { new: true } // Return the updated document
    );

    if (!updatedListing) {
      return NextResponse.json(
        {
          type: "error",
          message: "Listing not found or you do not have permission to update it.",
        },
        {
          status: 404,
        }
      );
    }

    const message = `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px; text-align: center;">
    <h2 style="color: #4A90E2;">Hi User,</h2>
    <p style="color: #333; font-size: 16px;">You have successfully updated your listing on <strong>NaroEstate</strong>.</p>
    <p style="color: #333; font-size: 16px;">Click the button below to view the updates:</p>
    <a href="${process.env.DOMAIN_URL}/listings/${listingId}" 
       style="display: inline-block; background-color: #4A90E2; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
      View Listing
    </a>
    <p style="margin-top: 20px; color: #666; font-size: 14px;">Best Regards,<br>Team NaroEstate</p>
  </div>
`;


    await createNotification( {
      title: "Listing Updated",
      message: message,
      type: "account",
      sender: {
        name: "Team NaroEstate",
        avatar: "https://i.pravatar.cc/40?img=1",
      },
      recipient: userId, // Replace with actual user ID
    })

    return NextResponse.json({
      type: "success",
      message: "Listing updated successfully.",
      listingId: updatedListing._id,
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
