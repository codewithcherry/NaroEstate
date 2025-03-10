import { NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";  // Import cookies to access and set tokens

const jwt_secret = process.env.JWTOKEN_SECRET;
const refresh_secret = process.env.REFRESH_TOKEN_SECRET;

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
  "/api/user/mylistings",
  "/api/user/update-listing",
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

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (isPrivatePath(pathname)) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // 🔄 Step 1: Validate Access Token
    if (accessToken) {
      try {
        const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(jwt_secret));
        const response = NextResponse.next();
        response.headers.set("userId", payload.id);
        response.headers.set("user", JSON.stringify(payload));
        return response;  // ✅ Valid access token
      } catch (error) {
        console.log("Access token expired or invalid, trying refresh token...");
      }
    }

    // 🔄 Step 2: Check Refresh Token if Access Token is Invalid
    if (refreshToken) {
      try {
        const { payload } = await jwtVerify(refreshToken, new TextEncoder().encode(refresh_secret));

        // 🔄 Generate a new access token (10 minutes)
        const newAccessToken = await new SignJWT({
          username: payload.username,
          id: payload.id,
          email: payload.email,
          imageUrl: payload.imageUrl,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("10m")
          .sign(new TextEncoder().encode(jwt_secret));

        // 🔄 Generate a new refresh token (3 days)
        const newRefreshToken = await new SignJWT({
          username: payload.username,
          id: payload.id,
          email: payload.email,
          imageUrl: payload.imageUrl,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("3d")
          .sign(new TextEncoder().encode(refresh_secret));

        // 🔄 Create a response with updated tokens as HTTP-only cookies
        const response = NextResponse.next();

        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "strict",
          maxAge: 600, // 10 minutes
        });

        response.cookies.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "strict",
          maxAge: 3 * 24 * 60 * 60, // 3 days
        });

        response.headers.set("userId", payload.id);
        response.headers.set("user", JSON.stringify(payload));
        return response;  // ✅ Valid refresh token
      } catch (error) {
        console.log("Refresh token expired or invalid.");
        return NextResponse.json(
          {
            type: "error",
            message: "Unauthorized request! Refresh token expired/invalid.",
          },
          { status: 401 }
        );
      }
    }

    // 🔄 If no valid token is found
    return NextResponse.json(
      {
        type: "error",
        message: "Unauthorized request! Token expired/does not exist!",
      },
      { status: 401 }
    );
  }

  return NextResponse.next();
};
