// MongoDB connection and config file
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  try {
    // Attempt to connect to MongoDB
    const connection = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connection successful
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    // Log the error message
    console.error(`Error connecting to MongoDB: ${error.message}`);
    
    // Exit the process with a failure code if connection fails
    process.exit(1);
  }
};

export default connect;
