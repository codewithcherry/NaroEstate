import mongoose from "mongoose";
import { Schema } from "mongoose";

const enquirySchema = new Schema({
  
}, { timestamps: true });

// Check if the model is already defined in Mongoose's internal registry
const User = mongoose.models.Enquiry || mongoose.model("Enquiry", userSchema);

export default Enquiry;
 