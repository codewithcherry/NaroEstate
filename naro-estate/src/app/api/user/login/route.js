import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import connect from "@/lib/mongoDb/database";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

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
      return NextResponse.json({ type: "error", message: "User not found" }, { status: 404 });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { type: "error", message: "Invalid password, please try again" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const payload = {
      username: user.username,
      id: user._id,
      email: user.email,
      imageUrl: user.imageUrl,
    };

    const token = jwt.sign(payload, process.env.JWTOKEN_SECRET, { expiresIn: "1h" });

    // Create response
    const response = NextResponse.json({
      type: "success",
      message: "Login successful",
      token:token,
      user:{
        username: user.username,
        id: user._id,
        email: user.email,
        imageUrl: user.imageUrl,
        role:user.role
      }
    });

    // ✅ Correct way to set the cookie in NextResponse
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 3600, // 1 hour in seconds
    });

    return response; // ✅ Ensure modified response is returned
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { type: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
