import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    console.log("Entering the POST request of the signout");

    // Create a response object
    const response = NextResponse.json(
      { type: "success", message: "Signed out successfully" },
      { status: 200 }
    );

    // Clear accessToken cookie
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0), // Expire immediately
    });

    // Clear refreshToken cookie
    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0), // Expire immediately
    });

    return response;  // Send response with cleared cookies
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json(
      { type: "error", message: "Failed to sign out", error: error },
      { status: 500 }
    );
  }
};
