import { Star, Trophy, Home, Calendar, Heart, Map, Pin, LocateIcon, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function RoomListing({listing}) {
  const [open, setOpen] = useState(false);

  function getYearsFromToday(createdAt) {
    const createdDate = new Date(createdAt);
    const today = new Date();
    
    let yearsDiff = today.getFullYear() - createdDate.getFullYear();

    // Adjust if today's date is before the anniversary of createdAt
    if (
        today.getMonth() < createdDate.getMonth() ||
        (today.getMonth() === createdDate.getMonth() && today.getDate() < createdDate.getDate())
    ) {
        yearsDiff--;
    }

    return yearsDiff < 1 ? "Less than a " : yearsDiff;
}




  return (
    <Card className="container mx-auto p-6  rounded-xl shadow-lg">
      <CardContent className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-semibold">{listing.title}</h1>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-blue-500" />
            <p className="text-gray-600">{listing.address.doorNumber}, {listing.address.city}, {listing.address.state}</p>
          </div>
        </div>

        {/* Badge & Rating */}
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Heart className="text-yellow-500" size={20} />
            <p className="text-sm font-medium">One of the most loved homes on Airbnb, according to guests</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold flex items-center">
              {listing.rating} <Star className="text-yellow-500 ml-1" size={16} />
            </p>
            <p className="text-sm text-gray-500">{listing.reviews.length} Reviews</p>
          </div>
        </div>

        {/* Host Section */}
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={listing.createdBy.imageUrl} alt="Host" />
          </Avatar>
          <div>
            <p className="font-medium">{listing.createdBy.firstname}</p>
            <p className="text-sm text-gray-500">Superhost · {getYearsFromToday(listing.createdBy.createdAt)} years hosting</p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-500" size={20} />
            <p className="text-sm">Top 10% of homes - Highly ranked based on ratings, reviews, and reliability.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Home className="text-gray-700" size={20} />
            <p className="text-sm">{listing.propertyType} in a {listing.listingType} unit - plus access to shared spaces.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="text-gray-700" size={20} />
            <p className="text-sm">Free cancellation 1 day before check-in - Get a full refund if you change your mind.</p>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold">About this place</h2>
          <p className="text-gray-700 text-sm mt-1">
            {listing.description}
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="text-blue-600">Show more</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About this place</DialogTitle>
              </DialogHeader>
              <p className="text-gray-700 text-sm mt-1">
                As your host, I will make sure you feel very welcome here! There is plenty of shared space in my apartment - kitchen, large bathroom, large living room, and a terrace.
              </p>
              <h3 className="text-md font-semibold mt-2">The space</h3>
              <p className="text-gray-700 text-sm">
                A lovely private room with a comfortable bed. The apartment is modern and very clean, as noted by previous guest reviews.
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
