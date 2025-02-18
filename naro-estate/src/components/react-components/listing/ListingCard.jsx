import React from 'react'
import { Card } from "@/components/ui/card";
import { MapPin, Bed, Bath, Ruler } from "lucide-react";

const ListingCard = () => {
  return (
    <Card className="relative rounded-xl overflow-hidden shadow-lg max-w-sm w-full">
      <div className="relative">
        <img
          src="https://res.cloudinary.com/demlcxzrb/image/upload/v1739873044/naro-estate/property-media/ramcharan_1739873043283.jpeg.jpg" // Replace with actual image path
          alt="Property"
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-md uppercase">
          For Rent
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
        <h2 className="text-lg font-semibold">North Dillard Street</h2>
        <div className="flex items-center text-sm mt-1 text-gray-300">
          <MapPin className="w-4 h-4 mr-1" />
          <span>4330 Bell Shoals Rd</span>
        </div>
        <div className='flex justify-between'>
        <div className="flex justify-between items-center text-sm mt-3 text-gray-300 space-x-2">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" /> <span>4</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" /> <span>2</span>
          </div>
          <div className="flex items-center">
            <Ruler className="w-4 h-4 mr-1" /> <span>400</span>
          </div>
        </div>
        <div className="mt-3 text-lg font-bold flex items-center">
          <span className="text-white">$250</span>
          <span className="text-gray-400 text-sm ml-1">/month</span>
        </div>
        </div>
      </div>
    </Card>
  );
};

export default ListingCard;
