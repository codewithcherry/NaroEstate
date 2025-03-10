import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import connect from "@/lib/mongoDb/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const connectDB = async () => {
  try {
    await connect();
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Could not connect to the database");
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const { email, password } = await request.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { type: "error", message: "User not found" },
        { status: 404 }
      );
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { type: "error", message: "Invalid password, please try again" },
        { status: 401 }
      );
    }

    // Generate JWT tokens
    const payload = {
      username: user.username,
      id: user._id,
      email: user.email,
      imageUrl: user.imageUrl,
    };

    // Access Token (10 mins)
    const accessToken = jwt.sign(payload, process.env.JWTOKEN_SECRET, {
      expiresIn: "10m",
    });

    // Refresh Token (3 days)
    const refreshToken = jwt.sign(payload, process.env.JWTOKEN_SECRET, {
      expiresIn: "3d",
    });

    // Create response
    const response = NextResponse.json({
      type: "success",
      message: "Login successful",
      token:accessToken,
      user: {
        username: user.username,
        id: user._id,
        email: user.email,
        imageUrl: user.imageUrl,
        role: user.role,
      },
    });

    // Set cookies
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 600, // 10 mins in seconds
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3, // 3 days in seconds
    });

    return response; // Return modified response
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { type: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
