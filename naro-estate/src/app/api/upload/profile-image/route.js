import { NextResponse } from "next/server";
import connect from "@/lib/mongoDb/database";
import User from "@/lib/models/user.model";
import { uploadImage } from "../cloudinary";

export const POST = async (request) => {
  const formData = await request.formData();
  const file = formData.get("file");
  const userId = request.headers.get("userId");

  try {
    await connect();

    const user = await User.findById(userId); // Make sure this uses findById
    if (!user) {
      return NextResponse.json(
        { type: "error", message: "User not found! Upload failed." },
        { status: 404 }
      );
    }

    const uploadedImageUrl = await uploadImage(file, "profile-pictures");

    user.imageUrl = uploadedImageUrl; // Update user's profile image
    await user.save();

    return NextResponse.json(
      { type: "success", message: "Image uploaded successfully!", imageUrl: uploadedImageUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { type: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
};
