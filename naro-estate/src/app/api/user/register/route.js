import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import connect from '@/lib/mongoDb/database';
import User from '@/lib/models/user.model';

// Ensure MongoDB is connected
connect();

export const POST = async (req) => {
  try {
    // Parse the request body
    const reqBody = await req.json();

    const { email, password } = reqBody;

    // Validate the request body
    if (!email || !password) {
      return NextResponse.json(
        { type: 'error', message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { type: 'error', message: 'Invalid email format.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { type: 'error', message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { type: 'error', message: 'A user with this email already exists.' },
        { status: 409 } // Conflict
      );
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Return success response
    return NextResponse.json(
      {
        type: 'success',
        message: 'User created successfully.',
        user: { id: savedUser._id, email: savedUser.email }, // Return limited user details
      },
      { status: 201 } // Created
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      {
        type: 'error',
        message: 'Internal server error. Please try again later.',
        error:error
      },
      { status: 500 } // Internal Server Error
    );
  }
};
