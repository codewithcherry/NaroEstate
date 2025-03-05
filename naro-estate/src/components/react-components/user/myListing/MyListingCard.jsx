import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Ruler } from 'lucide-react';

const MyListingCard = ({ listing }) => {
  return (
    <Card className="rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={listing.image || '/default-image.jpg'}
          alt={listing.title}
          className="w-full h-52 object-cover"
        />
        <Badge className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
          FOR {listing.listingType?.toUpperCase() || 'STAY'}
        </Badge>
      </div>
      <CardContent className="p-4 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {listing.title || 'Entire villa in Colva'}
        </h2>
        <p className="text-sm text-gray-500 flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {listing.location || '766734, Irupuram'}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            {listing.bedrooms || 3}
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {listing.bathrooms || 4}
          </div>
          <div className="flex items-center">
            <Ruler className="w-4 h-4 mr-1" />
            {listing.size || '2900 sqft'}
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-semibold text-gray-800">
            {listing.price ? `$${listing.price}` : 'N/A'}
          </span>
          <span className="text-sm text-gray-500"> /night</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyListingCard;
