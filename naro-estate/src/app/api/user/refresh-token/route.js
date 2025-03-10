import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWTOKEN_SECRET;

export const GET = async (request) => {
  try {
    const oldRefreshToken = request.cookies.get("refreshToken")?.value;

    if (!oldRefreshToken) {
      return NextResponse.json(
        { type: "error", message: "Refresh token not found!" },
        { status: 401 }
      );
    }

    const payload = jwt.verify(oldRefreshToken, jwt_secret);

    // Generate new access token (10 mins)
    const newAccessToken = jwt.sign(
      {
        username: payload.username,
        id: payload.id,
        email: payload.email,
        imageUrl: payload.imageUrl,
      },
      jwt_secret,
      { expiresIn: "10m" }
    );

    // Generate new refresh token (3 days)
    const newRefreshToken = jwt.sign(
      { id: payload.id, email: payload.email },
      jwt_secret,
      { expiresIn: "3d" }
    );

    const response = NextResponse.json({
      type: "success",
      message: "Token refreshed successfully",
    });

    // Set new access token cookie
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 600, // 10 mins in seconds
    });

    // Set new refresh token cookie
    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60, // 3 days in seconds
    });

    return response;
  } catch (error) {
    console.error("Error in refresh token route:", error);
    return NextResponse.json(
      { type: "error", message: "Invalid or expired refresh token!" },
      { status: 401 }
    );
  }
};
