import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

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
  "/api/user/mylistings",
  "/api/user/update-listing"
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

  console.log("current pathname:", pathname);

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (isPrivatePath(pathname)) {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    // console.log('Authorization Token:', token);

    if (!token) {
      return NextResponse.json(
        {
          type: "error",
          message: "Unauthorized request! Token expired/does not exist!",
        },
        { status: 401 }
      );
    }

    try {
      // Use `jose` for token verification in the Edge runtime
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(jwt_secret)
      );

      const response = NextResponse.next();
      response.headers.set("userId", payload.id);
      response.headers.set("user", JSON.stringify(payload)); // Example: Add user info in response header
      return response;
    } catch (error) {
      // console.error('Token verification failed:', error);
      return NextResponse.json(
        {
          type: "error",
          message: "Unauthorized request! Token expired/does not exist!",
        },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
};
