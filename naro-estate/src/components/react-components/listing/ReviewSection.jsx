import { useState } from "react";
import { Star, SprayCan, CheckCircle, Key, MessageCircle, Map, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    id: 1,
    name: "Pramod",
    yearsOnPlatform: "8 years on Airbnb",
    date: "June 2024",
    rating: 4,
    text: "Great place for family. Highly recommended.",
    image: "https://via.placeholder.com/50" // Replace with actual image
  },
  {
    id: 2,
    name: "Pramod",
    yearsOnPlatform: "8 years on Airbnb",
    date: "June 2024",
    rating: 4,
    text: "Great place for family. Highly recommended.",
    image: "https://via.placeholder.com/50" // Replace with actual image
  },
  {
    id: 3,
    name: "Pramod",
    yearsOnPlatform: "8 years on Airbnb",
    date: "June 2024",
    rating: 4,
    text: "Great place for family. Highly recommended.",
    image: "https://via.placeholder.com/50" // Replace with actual image
  },
  {
    id: 4,
    name: "Pramod",
    yearsOnPlatform: "8 years on Airbnb",
    date: "June 2024",
    rating: 4,
    text: "Great place for family. Highly recommended.",
    image: "https://via.placeholder.com/50" // Replace with actual image
  },
  {
    id: 5,
    name: "Pramod",
    yearsOnPlatform: "8 years on Airbnb",
    date: "June 2024",
    rating: 4,
    text: "Great place for family. Highly recommended.",
    image: "https://via.placeholder.com/50" // Replace with actual image
  },
  {
    id: 6,
    name: "Pramod",
    yearsOnPlatform: "8 years on Airbnb",
    date: "June 2024",
    rating: 4,
    text: "Great place for family. Highly recommended.",
    image: "https://via.placeholder.com/50" // Replace with actual image
  },
  {
    id: 7,
    name: "Pramod",
    yearsOnPlatform: "8 years on Airbnb",
    date: "June 2024",
    rating: 4,
    text: "Great place for family. Highly recommended.",
    image: "https://via.placeholder.com/50" // Replace with actual image
  },
  {
    id: 8,
    name: "Pramod",
    yearsOnPlatform: "8 years on Airbnb",
    date: "June 2024",
    rating: 4,
    text: "Great place for family. Highly recommended.",
    image: "https://via.placeholder.com/50" // Replace with actual image
  },
  {
    id: 9,
    name: "Pramod",
    yearsOnPlatform: "8 years on Airbnb",
    date: "June 2024",
    rating: 4,
    text: "Great place for family. Highly recommended.",
    image: "https://via.placeholder.com/50" // Replace with actual image
  },
  {
    id: 10,
    name: "Pramod",
    yearsOnPlatform: "8 years on Airbnb",
    date: "June 2024",
    rating: 4,
    text: "Great place for family. Highly recommended.",
    image: "https://via.placeholder.com/50" // Replace with actual image
  },
  {
    id: 11,
    name: "Pramod",
    yearsOnPlatform: "8 years on Airbnb",
    date: "June 2024",
    rating: 4,
    text: "Great place for family. Highly recommended.",
    image: "https://via.placeholder.com/50" // Replace with actual image
  },
  {
    id: 12,
    name: "Pramod",
    yearsOnPlatform: "8 years on Airbnb",
    date: "June 2024",
    rating: 4,
    text: "Great place for family. Highly recommended.",
    image: "https://via.placeholder.com/50" // Replace with actual image
  },
  

  // Add more reviews here
];

const ReviewSection = () => {
    const [visibleReviews, setVisibleReviews] = useState(6);
    const showMoreReviews = () => setVisibleReviews((prev) => prev + 6);
  

  return (
    <Card className="w-full container mx-auto p-6 text-center bg-white shadow-md rounded-2xl text-primary">
      <CardContent>
        <div className="flex flex-col items-center text-primary">
          <h1 className="text-5xl font-bold text-amber-300">4.85/5 Rating</h1>
          <h2 className="text-lg font-semibold mt-2">Guest favourite</h2>
          <p className="text-gray-500 text-sm">This home is a guest favourite based on ratings, reviews and reliability</p>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        <div className="flex md:flex-row flex-col justify-around">
          <div className="text-left">
            <h3 className="text-md font-semibold">Overall rating</h3>
            <div className="space-y-1 mt-2">
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm">{rating}</span>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className={`bg-blue-500 h-2 rounded-full`} style={{ width: `${rating * 20}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center gap-4 mt-6">
            <div className="flex flex-col items-center shadow-xl bg-slate-50 border p-2 rounded-lg">
              <SprayCan size={24} className="text-yellow-300" />
              <p className="font-bold text-lg">4.8</p>
              <p className="text-gray-500 text-sm">Cleanliness</p>
            </div>
            <div className="flex flex-col items-center shadow-xl bg-slate-50 border p-2 rounded-lg">
              <CheckCircle size={24} className="text-green-300" />
              <p className="font-bold text-lg">4.7</p>
              <p className="text-gray-500 text-sm">Accuracy</p>
            </div>
            <div className="flex flex-col items-center shadow-xl bg-slate-50 border p-2 rounded-lg">
              <Key size={24} className="text-indigo-400" />
              <p className="font-bold text-lg">4.9</p>
              <p className="text-gray-500 text-sm">Check-in</p>
            </div>
            <div className="flex flex-col items-center shadow-xl bg-slate-50 border p-2 rounded-lg">
              <MessageCircle size={24} className="text-teal-300" />
              <p className="font-bold text-lg">4.9</p>
              <p className="text-gray-500 text-sm">Communication</p>
            </div>
            <div className="flex flex-col items-center shadow-xl bg-slate-50 border p-2 rounded-lg">
              <Map size={24} className="text-blue-300" />
              <p className="font-bold text-lg">4.8</p>
              <p className="text-gray-500 text-sm">Location</p>
            </div>
            <div className="flex flex-col items-center shadow-xl bg-slate-50 border p-2 rounded-lg">
              <Tag size={24} className="text-red-300" />
              <p className="font-bold text-lg">4.8</p>
              <p className="text-gray-500 text-sm">Value</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 my-4"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {reviews.slice(0, visibleReviews).map((review) => (
            <Card key={review.id} className="p-4 bg-slate-50 gap-4 border rounded-lg shadow-lg text-left">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={review.image} alt={review.name} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p className="text-gray-500 text-sm">{review.date}</p>
                </div>
              </div>
              <div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <span>{review.rating} </span>
              <Star  size={16} className="text-yellow-400" />
              <span>Rating</span>
              </div>
              <p className="mt-2 text-gray-700">{review.text} </p>
              </div>
            </Card>
          ))}
        </div>
        
        {visibleReviews < reviews.length && (
          <div className="mt-4 flex justify-center">
            <Button onClick={showMoreReviews} variant="outline">See More</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
