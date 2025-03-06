"use client";

import { Suspense, useState, useEffect } from "react";
import axios from "axios";
import ListingCard from "@/components/react-components/listing/ListingCard";
import { Loader2 } from "lucide-react";
import ListingFilter from "@/components/react-components/listing/ListingFilter";
import { useRouter } from 'next/compat/router';
import { useSearchParams } from 'next/navigation';
import ListingsPagination from "@/components/react-components/listing/ListingsPagination";

const ListingGrid = ({ setPagination }) => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams(); // Get search params

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Fetch listings based on query parameters
        const query = new URLSearchParams(searchParams.toString());
        const response = await axios.get(`/api/listings?${query.toString()}`);
        setListings(response.data.listings);
        setPagination(response.data.pagination); // Update pagination in the parent component
      } catch (err) {
        setError(new Error("Failed to fetch listings"));
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams]); // Re-fetch listings when searchParams change

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );

  if (error) throw error; // This will trigger the `error.js` page in Next.js

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-6 justify-items-center">
        {listings && listings.length > 0 ? (
          listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No listings available
          </p>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    hasPrevPage: false,
    hasNextPage: false,
  });

  return (
    <div className="container mx-auto py-6">
      {/* ListingFilter does not need to be inside Suspense */}
      <ListingFilter />

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
          </div>
        }
      >
        <ListingGrid setPagination={setPagination} />
        <div className="my-4">
        <ListingsPagination
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          hasPrevPage={pagination.hasPrevPage}
          hasNextPage={pagination.hasNextPage}
        />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;