import { Card, CardContent } from "@/components/ui/card";
import { Bath, Bed, Home, Layout, Tag, DollarSign, Lock, Utensils, ParkingCircle, Ruler } from "lucide-react";

const ListingDetails = ({ listing }) => {
  return (
    <Card className="container mx-auto p-6  rounded-xl shadow-lg mt-6">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold">Property Details</h2>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          <p className="flex items-center gap-2"><Home size={20} /> {listing.propertyType}</p>
          <p className="flex items-center gap-2"><Tag size={20} /> {listing.propertyStatus}</p>
          <p className="flex items-center gap-2"><Lock size={20} /> {listing.listingType}</p>
          <p className="flex items-center gap-2"><Bed size={20} /> {listing.propertyDetails.beds} Beds</p>
          <p className="flex items-center gap-2"><Bath size={20} /> {listing.propertyDetails.baths} Baths</p>
          <p className="flex items-center gap-2"><Utensils size={20} /> {listing.propertyDetails.kitchen}</p>
          <p className="flex items-center gap-2"><Layout size={20} /> {listing.propertyDetails.furnishType}</p>
          <p className="flex items-center gap-2"><ParkingCircle size={20} /> {listing.propertyDetails.parking}</p>
          <p className="flex items-center gap-2"><Ruler size={20} /> {listing.propertyDetails.floorArea} sqft</p>
          {listing.listingType === "sale" && (
            <p className="flex items-center gap-2"><DollarSign size={20} /> ${listing.salePrice.toLocaleString()}</p>
          )}
          {listing.listingType === "rent" && (
            <p className="flex items-center gap-2"><DollarSign size={20} /> ${listing.rentPrice.toLocaleString()} / month</p>
          )}
        </div>
        
        <h3 className="text-lg font-semibold mt-4">{listing.title}</h3>
        <p className="text-gray-600">{listing.description}</p>
      </CardContent>
    </Card>
  );
};

export default ListingDetails;
