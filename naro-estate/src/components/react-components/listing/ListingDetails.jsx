import { Card, CardContent } from "@/components/ui/card";
import { Bath, Bed, Home, Layout, Tag, DollarSign, Lock, Utensils, ParkingCircle, Ruler, Loader2 } from "lucide-react";

const ListingDetails = ({ listing }) => {
  if (!listing) return <Loader2 className="w-8 h-8 animate-spin text-gray-500 "/>; // Handle undefined listing

  return (
    <Card className="container mx-auto p-6 rounded-xl shadow-lg mt-6">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold">Property Details</h2>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <p className="flex items-center gap-2"><Home size={20} /> {listing.propertyType ?? "N/A"}</p>
          <p className="flex items-center gap-2"><Tag size={20} /> {listing.propertyStatus ?? "N/A"}</p>
          <p className="flex items-center gap-2"><Lock size={20} /> {listing.listingType ?? "N/A"}</p>
          <p className="flex items-center gap-2"><Bed size={20} /> {listing.propertyDetails?.beds ?? 0} Beds</p>
          <p className="flex items-center gap-2"><Bath size={20} /> {listing.propertyDetails?.baths ?? 0} Baths</p>
          <p className="flex items-center gap-2"><Utensils size={20} /> {listing.propertyDetails?.kitchen ?? "N/A"}</p>
          <p className="flex items-center gap-2"><Layout size={20} /> {listing.propertyDetails?.furnishType ?? "N/A"}</p>
          <p className="flex items-center gap-2"><ParkingCircle size={20} /> {listing.propertyDetails?.parking ?? "N/A"}</p>
          <p className="flex items-center gap-2"><Ruler size={20} /> {listing.propertyDetails?.floorArea ?? "N/A"} sqft</p>

          {listing.listingType === "sale" && (
            <p className="flex items-center gap-2"><DollarSign size={20} /> ${listing.salePrice?.toLocaleString() ?? "N/A"}</p>
          )}
          {listing.listingType === "rent" && (
            <p className="flex items-center gap-2"><DollarSign size={20} /> ${listing.rentPrice?.toLocaleString() ?? "N/A"} / month</p>
          )}
        </div>

        <h3 className="text-lg font-semibold mt-4">{listing.title ?? "No Title"}</h3>
        <p className="text-gray-600">{listing.description ?? "No description available."}</p>
      </CardContent>
    </Card>
  );
};

export default ListingDetails;
