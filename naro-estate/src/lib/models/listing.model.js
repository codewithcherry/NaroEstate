import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the listing schema
const listingSchema = new Schema({
  // Property Info
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: { type: String, required: true },
  propertyStatus: { type: String, required: true },
  listingType: { type: String, required: true },
  salePrice: { type: Number, default: 0 },
  rentPrice: { type: Number, default: 0 },
  stayPrice: { type: Number, default: 0 },

  // Address Info
  address: {
    doorNumber: { type: String, required: true },
    streetOrLocality: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },

  // Property Details
  propertyDetails: {
    baths: { type: Number, default: 0 },
    beds: { type: Number, default: 0 },
    kitchen: { type: String, required: true },
    furnishType: { type: String, required: true },
    parking: { type: String, required: true },
    floorArea: { type: Number, default: 0 },
  },

  // Amenities
  amenities: {
    basic: {
      airConditioning: { type: Boolean, default: false },
      heating: { type: Boolean, default: false },
      wifi: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
      hotWater: { type: Boolean, default: false },
    },
    kitchen: {
      fullyEquippedKitchen: { type: Boolean, default: false },
      microwave: { type: Boolean, default: false },
      refrigerator: { type: Boolean, default: false },
      dishwasher: { type: Boolean, default: false },
      coffeeMaker: { type: Boolean, default: false },
      oven: { type: Boolean, default: false },
      toaster: { type: Boolean, default: false },
      stove: { type: Boolean, default: false },
      cookingUtensils: { type: Boolean, default: false },
    },
    bathroom: {
      bathtub: { type: Boolean, default: false },
      shower: { type: Boolean, default: false },
      toiletries: { type: Boolean, default: false },
      hairDryer: { type: Boolean, default: false },
      towels: { type: Boolean, default: false },
      washingMachine: { type: Boolean, default: false },
    },
    entertainment: {
      cableTV: { type: Boolean, default: false },
      streamingServices: { type: Boolean, default: false },
      booksAndMagazines: { type: Boolean, default: false },
      boardGames: { type: Boolean, default: false },
      musicSystem: { type: Boolean, default: false },
    },
    outdoor: {
      balconyPatio: { type: Boolean, default: false },
      privateGarden: { type: Boolean, default: false },
      bbqGrill: { type: Boolean, default: false },
      outdoorDiningArea: { type: Boolean, default: false },
      swimmingPool: { type: Boolean, default: false },
      hotTub: { type: Boolean, default: false },
    },
    security: {
      securityCameras: { type: Boolean, default: false },
      gatedProperty: { type: Boolean, default: false },
      alarmSystem: { type: Boolean, default: false },
      safe: { type: Boolean, default: false },
      smokeDetectors: { type: Boolean, default: false },
      carbonMonoxideDetectors: { type: Boolean, default: false },
    },
    accessibility: {
      elevator: { type: Boolean, default: false },
      wheelchairAccessible: { type: Boolean, default: false },
      rampAccess: { type: Boolean, default: false },
    },
    pet: {
      petFriendly: { type: Boolean, default: false },
      petBowls: { type: Boolean, default: false },
      fencedYard: { type: Boolean, default: false },
    },
    additional: {
      gym: { type: Boolean, default: false },
      spa: { type: Boolean, default: false },
      fireplace: { type: Boolean, default: false },
      washerDryer: { type: Boolean, default: false },
      highChairs: { type: Boolean, default: false },
      crib: { type: Boolean, default: false },
    },
  },

  // Cover Photo
  coverPhoto: { type: String, default: "" },

  // Property Media (Array of URLs)
  propertyMedia: [{
    type: String, // Each entry will be a URL
    required: false,
  }],

  // Created by reference to User model
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },

  // Reviews (Array of review documents)
  reviews: [{
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true }, // Rating from 1 to 5
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }],

  // Rating (Average rating)
  rating: { type: Number, default: 0 },

  //booking related fields
  pendingBookings: [{ type: Date }], // Array of dates for pending bookings
  bookingsConfirmed: [{ type: Date }], // Array of dates for confirmed bookings
  bookingsCancelled: [{ type: Date }], // Array of dates for cancelled bookings

}, { timestamps: true });

// Check if the model is already defined in Mongoose's internal registry
const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default Listing;
