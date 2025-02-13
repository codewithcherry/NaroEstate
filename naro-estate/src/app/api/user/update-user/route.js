import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import connect from "@/lib/mongoDb/database";

export const PUT = async (request) => {
  try {
    // Access headers from the request to get the userId
    const userId = request.headers.get("userId");
    console.log("User ID from headers:", userId);

    // Validate userId
    if (!userId) {
      return NextResponse.json(
        {
          type: "error",
          message: "User ID is required in the headers.",
        },
        { status: 400 }
      );
    }

    // Parse the request body
    const requestBody = await request.json();
    const { firstname, lastname, email, phone, languages, bio, city, country } = requestBody;

    // Ensure the database connection is established
    await connect();

    // Fetch the user from the database
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return NextResponse.json(
        {
          type: "error",
          message: "User not found. Try again later.",
        },
        { status: 404 }
      );
    }

    // Update the user fields
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.languages = languages || user.languages;
    user.bio = bio || user.bio;
    user.city = city || user.city;
    user.country = country || user.country;

    // Save the updated user to the database
    await user.save();

    // Return a success response with the updated user data
    return NextResponse.json(
      {
        type: "success",
        message: "Profile updated successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      {
        type: "error",
        message: "An error occurred while updating the profile. Please try again later.",
      },
      { status: 500 }
    );
  }
};
