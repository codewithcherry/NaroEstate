'use client';

import ListingCard from '@/components/react-components/listing/ListingCard';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [listings, setListings] = useState(null); // Using `null` to distinguish between no data & loading
  const [isFetching, setIsFetching] = useState(false);
  const { toast } = useToast();

  const fetchListings = async () => {
    try {
      setIsFetching(true);

      const response = await axios.get('/api/listings', {
        headers: {
          "Content-Type": "application/json"
        }
      });

      setListings(response.data.listings);
      console.log(response.data.listings)
    } catch (error) {
      console.error("Error fetching listings:", error);
      
      toast({
        title: error?.response?.data?.type || "Error",
        description: error?.response?.data?.message || "Something went wrong. Please try again."
      });
    } finally {
      setIsFetching(false);
    }
  };


  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div>
      <h1>This is the listing page</h1>
      
      {/* Button to manually fetch listings */}
      <button onClick={fetchListings} disabled={isFetching}>
        {isFetching ? "Loading..." : "Fetch Listings"}
      </button>

      {/* Display Listings */}
      {listings ? (
        <div className='grid grid-cols-3'>
          {listings.map((listing) => (
            <ListingCard  key={listing._id}/>
          ))}
        </div>
      ) : (
        !isFetching && <p>No listings available</p>
      )}
    </div>
  );
};

export default Page;
