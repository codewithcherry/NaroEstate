import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";

import connect from "@/lib/mongoDb/database";

export const GET = async (request) => {
    try {
        // Access headers from the request
        const userId = request.headers.get("userId");
        // console.log(userId);

        await connect();

        // Validate userId
        if (!userId) {
            return NextResponse.json(
                {
                    type: "error",
                    message: "User ID is required in the headers.",
                },
                {
                    status: 400,
                }
            );
        }

        // Fetch user from the database
        const user = await User.findById(userId).select("-password"); // Exclude password field

        if (!user) {
            return NextResponse.json(
                {
                    type: "error",
                    message: "User not found. Try again later.",
                },
                {
                    status: 404,
                }
            );
        }

        // Return user data excluding password
        return NextResponse.json(
            {
                type: "success",
                message: "User retrieved successfully.",
                user,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            {
                type: "error",
                message: "Something went wrong! Internal Server Error.",
            },
            {
                status: 500,
            }
        );
    }
};
