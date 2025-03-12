"use client";

import { Suspense, useState, useEffect } from "react";
import axios from "axios";
import ListingCard from "@/components/react-components/listing/ListingCard";
import { Loader2 } from "lucide-react";
import ListingFilter from "@/components/react-components/listing/ListingFilter";
import { useRouter } from "next/compat/router";
import { useSearchParams } from "next/navigation";
import ListingsPagination from "@/components/react-components/listing/ListingsPagination";

const ListingGrid = ({ pagination, setPagination }) => {
  const [listings, setListings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams(); // Get search params
  const router = useRouter(); // Get router instance

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true); // Reset loading state immediately
      try {
        console.log(searchParams.toString());
        const query = new URLSearchParams(searchParams.toString());
        const response = await axios.get(`/api/listings?${query.toString()}`);
        setListings(response.data.listings);
        setPagination(response.data.pagination); // Update pagination state
      } catch (err) {
        setError(new Error("Failed to fetch listings"));
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams, setPagination]); // Include setPagination in dependencies

  if (error) throw error; // Trigger error page

  if (loading) {
    return (
      <div className="container h-[60vh] mx-auto">
        <div className="flex justify-center items-center h-80">
          <Loader2 className="animate-spin h-12 w-12 text-black" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto md:h-[70vh]  mt-10 px-4">
      <div className="grid grid-cols-2  md:grid-cols-3  gap-4">
        {listings && listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing._id} className="flex justify-center">
              <ListingCard listing={listing} className="w-full" />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center  text-gray-600">
            No listings available
          </p>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  const [pagination, setPagination] = useState({}); // Moved pagination state here

  return (
    <div className="container mx-auto  mt-4">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
          </div>
        }
      >
        <ListingFilter />
        <ListingGrid pagination={pagination} setPagination={setPagination} />
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