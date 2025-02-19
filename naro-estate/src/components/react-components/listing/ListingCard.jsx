import React from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Bed, Bath, Ruler } from "lucide-react";

const ListingCard = ({ listing }) => {
  return (
    <Card className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 max-w-sm w-full">
      <div className="relative group">
        <img
          src={listing.coverPhoto || "/placeholder.jpg"} // Fallback image
          alt={listing.title || "Property Image"}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => (e.target.src = "/placeholder.jpg")} // Handle broken image
        />
        <div className="absolute top-4 left-4 bg-muted text-primary opacity-90 text-xs font-semibold px-3 py-1 rounded-md uppercase">
          For {listing.listingType === "rent" ? "Rent" : "Sale"}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
        <h2 className="text-lg font-semibold truncate">{listing.title || "No Title"}</h2>
        <div className="flex items-center text-sm mt-1 text-gray-300">
          <MapPin className="w-4 h-4 mr-1" />
          <span>
            {listing.address?.doorNumber ? `${listing.address.doorNumber}, ` : ""}
            {listing.address?.city || "Unknown Location"}
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-3 text-sm text-gray-300">
          <div className="flex space-x-3">
            <div className="flex items-center">
              <Bed className="w-5 h-5 mr-1" />
              <span>{listing.propertyDetails?.beds || "-"}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-5 h-5 mr-1" />
              <span>{listing.propertyDetails?.baths || "-"}</span>
            </div>
            <div className="flex items-center">
              <Ruler className="w-5 h-5 mr-1" />
              <span>{listing.propertyDetails?.floorArea ? `${listing.propertyDetails.floorArea} sqft` : "N/A"}</span>
            </div>
          </div>
          <div className="text-lg font-bold whitespace-nowrap mt-2 md:mt-0">
            {listing.listingType === "rent" ? (
              <div>
                $
                <span className="text-white font-medium">{listing.rentPrice || "N/A"}</span>
                <span className="text-gray-400 text-sm ml-1">/month</span>
              </div>
            ) : (
              <div>
                $
                <span className="text-white font-medium">{listing.salePrice || "N/A"}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ListingCard;
