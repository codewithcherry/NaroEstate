'use client';

import ViewListing from '@/components/react-components/listing/ViewListing';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const { listingId } = useParams();
  const [listingLoading, setListingLoading] = useState(false);
  const [listing, setListing] = useState({});
  const [error, setError] = useState(null);

  const fetchListing = async (id) => {
    if (!id) return;
    try {
      setListingLoading(true);
      setError(null);
      const response = await axios.get(`/api/listings/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      console.log(data);
      setListing(data);
    } catch (error) {
      console.log(error);
      setError(new Error(error?.response?.data?.message || 'Could not fetch the listing! Try again later.'));
    } finally {
      setListingLoading(false);
    }
  };

  useEffect(() => {
    if (listingId) fetchListing(listingId);
  }, [listingId]);

  if (error) {
    throw error;
  }

  return (
    
      <Suspense fallback={<div className="flex justify-center items-center h-svh "><Loader2 className="animate-spin w-6 h-6 text-gray-500" /></div>}>
        {listingLoading ? (
          <div className="flex justify-center items-center h-svh ">
            <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
          </div>
        ) : (
          <div>
      <h1>This is the listing ID page</h1>
          <ViewListing listing={listing} />
          </div>
        )}
      </Suspense>
   
  );
};

export default Page;
