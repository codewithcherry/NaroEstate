import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import User from "@/lib/models/user.model";

const connectDB = async () => {
  try {
    await connect();
  } catch (error) {
    console.log({
      type: "error",
      message: "Unable to connect with database",
    });
  }
};

export const POST = async (request) => {
  try {
    // Establish database connection
    await connectDB();

    // Parse request body
    const requestBody = await request.json();
    const { userId, verifyToken } = requestBody;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          type: "error",
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Check if tokens match
    if (user.verifyToken !== verifyToken) {
      return NextResponse.json(
        {
          type: "error",
          message: "Token does not match",
        },
        { status: 401 }
      );
    }

    // Check if the token has expired
    const now = new Date();
    const verifyTokenExpiry = new Date(user.verifyTokenExpiry);

    if (now > verifyTokenExpiry) {
      return NextResponse.json(
        {
          type: "error",
          message: "Token has expired",
        },
        { status: 401 }
      );
    }

    user.isVerified=true;
    user.verifyToken=undefined;
    user.verifyTokenExpiry=undefined;

    await user.save();

    // Success: Token is valid and not expired
    return NextResponse.json(
      {
        type: "success",
        message: "Your email id has been successfully verified!!",
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle server errors
    return NextResponse.json(
      {
        type: "error",
        message: "Internal server error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
