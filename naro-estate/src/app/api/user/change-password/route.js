import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import connect from "@/lib/mongoDb/database";
import bcrypt from 'bcrypt';

const connectDB = async () => {
  try {
    await connect();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Error connecting to database');
  }
};

export const POST = async (request) => {
  const requestBody = await request.json();
  const { oldPassword, newPassword } = requestBody;
  const userId = request.headers.get("userId");

  if (!oldPassword || !newPassword) {
    return NextResponse.json(
      {
        type: 'error',
        message: 'Both old and new passwords are required!',
      },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          type: 'error',
          message: 'User not found! Please try again later.',
        },
        { status: 404 }
      );
    }

    const isPasswordVerified = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordVerified) {
      return NextResponse.json(
        {
          type: 'error',
          message: "Old password does not match!",
        },
        { status: 401 }
      );
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedNewPassword;

    await user.save();  // Await the save operation

    return NextResponse.json(
      {
        type: 'success',
        message: 'Password changed successfully!',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json(
      {
        type: 'error',
        message: 'Internal server error! Please try again later.',
      },
      { status: 500 }
    );
  }
};
