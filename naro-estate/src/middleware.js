import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWTOKEN_SECRET;
if (!SECRET_KEY) throw new Error("JWTOKEN_SECRET is not defined.");

// Convert secret to Uint8Array (required by `jose`)
const SECRET_KEY_BYTES = new TextEncoder().encode(SECRET_KEY);

// Define route patterns
const publicRoutes = /^\/(login|register)$/;
const privateRoutes = /^\/(account|create-listing|update-listing|profile|settings)$/;

export const middleware = async (request) => {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;
  const isPublicRoute = publicRoutes.test(pathname);
  const isPrivateRoute = privateRoutes.test(pathname);

  console.log(`[${new Date().toISOString()}] Path: ${pathname}, Token: ${token ? "Present" : "Missing"}`);

  // ✅ Skip static assets & internal Next.js paths
  if (pathname.startsWith("/_next/") || pathname.match(/\.(js|css|map|ico|png|jpg|svg)$/)) {
    return NextResponse.next();
  }

  // ✅ If user is authenticated and tries to access login/register, redirect to home page (Prevent Infinite Loop)
  if (isPublicRoute && token) {
    try {
      await jwtVerify(token, SECRET_KEY_BYTES); // Verify token
      console.log("User already authenticated. Redirecting to /.");
      return NextResponse.redirect(new URL("/", request.url));
    } catch (err) {
      console.error("Invalid token detected. Allowing access to login/register.");
    }
  }

  // ✅ Require authentication for private routes
  if (isPrivateRoute) {
    if (!token) {
      console.warn("No token found. Redirecting to /login.");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(token, SECRET_KEY_BYTES);
      console.log("Token verified:", payload);

      // ✅ Attach user info to request headers for API usage
      const response = NextResponse.next();
      response.headers.set("X-User-ID", payload.id);
      response.headers.set("X-User-Email", payload.email);
      return response;
    } catch (err) {
      console.error("Invalid token:", err.message);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
};

// ✅ Efficient route matcher
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
