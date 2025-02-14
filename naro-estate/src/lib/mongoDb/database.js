const MONGO_URI = process.env.MONGO_URI;
import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connection.readyState > 0) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const connection = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000,         // Close socket after 45 seconds of inactivity
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    if (error.name === "MongoNetworkError") {
      console.error("Network error: Could not connect to MongoDB. Please check your network.");
    } else {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    }
    throw error;
  }
};

export default connect;
