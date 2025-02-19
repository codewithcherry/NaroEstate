"use client";

import { Suspense, useState, useEffect } from "react";
import axios from "axios";
import ListingCard from "@/components/react-components/listing/ListingCard";
import { Loader2 } from "lucide-react";

const ListingGrid = () => {
  const [listings, setListings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("/api/listings");
        setListings(response.data.listings);
      } catch (err) {
        setError(new Error("Failed to fetch listings"));
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );

  if (error) throw error; // This will trigger the `error.js` page in Next.js

  return (
    <div className="container mx-auto ">
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 justify-items-center">
        {listings && listings.length > 0 ? (
          listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No listings available</p>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="container mx-auto px-4 h-screen">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
          </div>
        }
      >
        <ListingGrid />
      </Suspense>
    </div>
  );
};

export default Page;
