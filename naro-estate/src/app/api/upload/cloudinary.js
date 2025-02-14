import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file, folderName) => {
  const timestamp = Date.now(); // Current time in milliseconds
  const originalFileName = file.name.split(".")[0]; // Extract file name without extension
  const fileExtension = `.${file.name.split(".").pop()}`; // Extract file extension
  const customFileName = `${originalFileName}_${timestamp}${fileExtension}`; // Combine name + timestamp + extension

  try {
    const buffer = await file.arrayBuffer(); // Convert the file to an array buffer
    const base64 = Buffer.from(buffer).toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`; // Create a base64-encoded string

    const result = await cloudinary.v2.uploader.upload(dataUrl, {
      folder: `naro-estate/${folderName}`,
      resource_type: "image",
      public_id: customFileName, // Use the custom file name
      overwrite: false,
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Image upload failed");
  }
};
