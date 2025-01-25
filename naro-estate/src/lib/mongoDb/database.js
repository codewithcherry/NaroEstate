const MONGO_URI=process.env.MONGO_URI;
import mongoose from "mongoose";

let isConnected = false;

const connect = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const connection = await mongoose.connect(MONGO_URI);

    isConnected = connection.connection.readyState === 1;
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    throw error; // Let the caller handle the error
  }
};

export default connect;
