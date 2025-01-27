import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import User from "@/lib/models/user.model";
import sendMail from "@/lib/services/mailer";
import { EMAIL_TYPES } from "@/lib/constants";

const connectToDatabase = async () => {
  try {
    await connect(); // Ensure MongoDB is connected
  } catch (error) {
    throw new Error("Database connection failed.");
  }
};

export const POST = async (req) => {
  try {
    // Parse the request body
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Validate the request body
    if (!email || !password) {
      return NextResponse.json(
        { type: "error", message: "Email and password are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { type: "error", message: "Invalid email format." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { type: "error", message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Ensure the database is connected
    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { type: "error", message: "A user with this email already exists." },
        { status: 409 } // Conflict
      );
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const verifyToken = crypto.randomBytes(32).toString("hex"); // 64-character token
    const verifyTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiration

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      verifyToken,
      verifyTokenExpiry,
    });

    const savedUser = await newUser.save();

    // Extract the username from email
    const username = savedUser.email.split("@")[0];

    // Send welcome email with verification link
    try {
      const mailResponse = await sendMail(
        savedUser.email,
        "Welcome to Our App!", // Subject
        EMAIL_TYPES.WELCOME_USER, // Email template type
        {
          username,
          verificationLink: `${process.env.DOMAIN_URL}/verify-email?token=${savedUser.verifyToken}&userId=${savedUser._id}`,
        }
      );
    } catch (mailError) {
      console.error("Error sending email:", mailError);
      return NextResponse.json(
        {
          type: "error",
          message: "Error sending the verification email. Please try again later.",
          error: mailError, // Return only the error message
        },
        { status: 500 } // Internal Server Error
      );
    }

    // Return success response
    return NextResponse.json(
      {
        type: "success",
        message: "User created successfully. Please verify your account through the link sent in mail.",
        user: { id: savedUser._id, email: savedUser.email }, // Return limited user details
      },
      { status: 201 } // Created
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        type: "error",
        message: "Internal server error. Please try again later.",
        error: error.message, // Return only the error message
      },
      { status: 500 } // Internal Server Error
    );
  }
};
