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

    const user = await User.findById(userId);

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
          message:
            "Listing not found or you do not have permission to update it.",
        },
        {
          status: 404,
        }
      );
    }

    const message = `Hey ${user.username} , Your listing ${updatedListing.title} is updates successfully. Please visit your my listings page and check the updates.
                                      
                      Thanks and Regards,
                      Team NaroEstate`;

    await createNotification({
      title: `${updatedListing.title} Listing Updated`,
      message: message,
      type: "account",
      sender: {
        name: "Team NaroEstate",
        avatar: "https://i.pravatar.cc/40?img=1",
      },
      recipient: userId, // Replace with actual user ID
    });

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
