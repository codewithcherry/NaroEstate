import { NextResponse } from "next/server";
import crypto from "crypto"; // Import crypto
import connect from "@/lib/mongoDb/database";
import User from "@/lib/models/user.model";
import sendMail from "@/lib/services/mailer";
import { EMAIL_TYPES } from "@/lib/constants";

const connectDb = async () => {
  try {
    await connect();
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Could not connect to the database");
  }
};

export const POST = async (request) => {
  try {
    await connectDb();

    // Parse the request body
    const reqBody = await request.json();
    const { email } = reqBody;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { type: "error", message: "Invalid email format." },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { type: "error", message: "User not found with this email." },
        { status: 404 }
      );
    }

    // Generate reset token and expiry
    const resetToken = crypto.randomBytes(32).toString("hex"); // 64-character token
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiration

    // Update the user with reset token
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    const savedUser = await user.save();

    // Extract username from email
    const username = savedUser.email.split("@")[0];

    // Send password reset email
    try {
      await sendMail(
        savedUser.email,
        "Reset Your Password", // Subject
        EMAIL_TYPES.PASSWORD_RESET, // Email template type
        {
          username,
          resetLink: `${process.env.DOMAIN_URL}/reset-password?token=${resetToken}&userId=${savedUser._id}`,
        }
      );
    } catch (mailError) {
      console.error("Error sending email:", mailError);
      return NextResponse.json(
        {
          type: "error",
          message: "Error sending the reset email. Please try again later.",
          error: mailError, // Return only the error message
        },
        { status: 500 } // Internal Server Error
      );
    }

    // Return success response
    return NextResponse.json(
      {
        type: "success",
        message:
          "Please check your email to reset your password using the link provided.",
        user: { id: savedUser._id, email: savedUser.email }, // Return limited user details
      },
      { status: 201 } // Reset link sent successfully
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { type: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
