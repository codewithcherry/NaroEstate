import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import User from "@/lib/models/user.model";
import bcrypt from "bcrypt";

export const POST = async (request) => {
    try {
        await connect();

        const reqBody = await request.json();
        const { resetToken, userId, password } = reqBody;

        // Validate password length
        if (!password || password.length < 6) {
            return NextResponse.json(
                {
                    type: "error",
                    message: "Password must be at least 6 characters long",
                },
                { status: 400 }
            );
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                {
                    type: "error",
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        // Check if tokens match
        if (user.resetToken !== resetToken) {
            return NextResponse.json(
                {
                    type: "error",
                    message: "Invalid or expired reset token",
                },
                { status: 401 }
            );
        }

        // Validate and check if the token has expired
        const now = new Date();
        const resetTokenExpiry = new Date(user.resetTokenExpiry);

        if (!resetTokenExpiry || isNaN(resetTokenExpiry.getTime())) {
            return NextResponse.json(
                {
                    type: "error",
                    message: "Invalid reset token expiry",
                },
                { status: 400 }
            );
        }

        if (now > resetTokenExpiry) {
            return NextResponse.json(
                {
                    type: "error",
                    message: "Reset token has expired",
                },
                { status: 401 }
            );
        }

        // Clear reset token fields
         user.resetToken=undefined;
         user.resetTokenExpiry=undefined;

        // Hash the password
        const saltRounds = 10;
        user.password = await bcrypt.hash(password, saltRounds);

        await user.save();

        return NextResponse.json(
            {
                type: "success",
                message: "Password changed successfully!",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error resetting password:", error);
        return NextResponse.json(
            {
                type: "error",
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
};
