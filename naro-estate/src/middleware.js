import { NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const jwt_secret = process.env.JWTOKEN_SECRET;

const publicPaths = [
  "/",
  "/api/listings",
  "/api/user/register",
  "/api/user/login",
  "/api/user/forgot-password",
  "/api/user/reset-password",
  "/api/user/about",
  "/contact-us",
  "/api/user/signout",
];
const privatePaths = [
  "/api/user/profile",
  "/api/user/settings",
  "/api/user/my-listings",
  "/api/user/update-user",
  "/api/user/change-password",
  "/api/upload/profile-image",
  "/api/upload/property-media",
  "/api/user/create-listing",
  "/api/rent-enquiry",
  "/api/sale-enquiry",
  "/api/reserve",
  "/api/clear-booking",
  '/api/book-listing',
  "/api/user/mylistings",
  "/api/user/update-listing",
  "/api/user/notifications",
  "/api/user/update-notification",
  "/api/user/delete-notification"
];

const isPublicPath = (pathname) => publicPaths.includes(pathname);
const isPrivatePath = (pathname) => privatePaths.includes(pathname);
const isStaticPath = (pathname) => pathname.startsWith("/_next/static/");

export const middleware = async (request) => {
  const { pathname } = request.nextUrl;

  // Skip static file paths
  if (isStaticPath(pathname)) {
    return NextResponse.next();
  }

  // Allow public paths
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Handle private paths
  if (isPrivatePath(pathname)) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // Step 1: Validate Access Token
    if (accessToken) {
      try {
        const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(jwt_secret));
        const response = NextResponse.next();
        response.headers.set("userId", payload.id);
        response.headers.set("user", JSON.stringify(payload));
        return response; // Valid access token
      } catch (error) {
        console.log("Access token expired or invalid, trying refresh token...");
      }
    }

    // Step 2: Refresh Tokens Using Refresh Token
    if (refreshToken) {
      try {
        // Verify the refresh token
        const { payload } = await jwtVerify(refreshToken, new TextEncoder().encode(jwt_secret));

        // Generate new access token (10 mins)
        const newAccessToken = await new SignJWT({
          username: payload.username,
          id: payload.id,
          email: payload.email,
          imageUrl: payload.imageUrl,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("10m")
          .sign(new TextEncoder().encode(jwt_secret));

        // Generate new refresh token (3 days)
        const newRefreshToken = await new SignJWT({
          id: payload.id,
          email: payload.email,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("3d")
          .sign(new TextEncoder().encode(jwt_secret));

        // Create a response and set new cookies
        const response = NextResponse.next();
        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "strict",
          maxAge: 600, // 10 mins in seconds
        });
        response.cookies.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "strict",
          maxAge: 3 * 24 * 60 * 60, // 3 days in seconds
        });

        // Validate the new access token
        const { payload: newPayload } = await jwtVerify(newAccessToken, new TextEncoder().encode(jwt_secret));
        response.headers.set("userId", newPayload.id);
        response.headers.set("user", JSON.stringify(newPayload));
        return response;
      } catch (error) {
        console.error("Error refreshing token:", error);
        return NextResponse.redirect(new URL("/api/user/signout", request.nextUrl.origin));
      }
    }

    // Step 3: Redirect to signout if no valid tokens are found
    return NextResponse.redirect(new URL("/api/user/signout", request.nextUrl.origin));
  }

  return NextResponse.next();
};