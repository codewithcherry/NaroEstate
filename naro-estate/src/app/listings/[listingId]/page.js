'use client';

import ViewListing from '@/components/react-components/listing/ViewListing';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const { listingId } = useParams();
  const [listingLoading, setListingLoading] = useState(false);
  const [listing, setListing] = useState({});
  const { toast } = useToast();

  const fetchListing = async (id) => {
    if (!id) return;
    try {
      setListingLoading(true);
      const response = await axios.get(`/api/get-listing?listingId=${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      console.log(data);
      setListing(data);
    } catch (error) {
      console.log(error);
      toast({
        title: error?.response?.data?.type,
        description: error?.response?.data?.message || 'Could not fetch the listing! Try again later.',
      });
    } finally {
      setListingLoading(false);
    }
  };

  useEffect(() => {
    if (listingId) fetchListing(listingId);
  }, [listingId]);

  return (
    <div>
      <h1>This is the listing ID page</h1>
      {listingLoading ? <p>Loading...</p> : <ViewListing listing={listing} />}
    </div>
  );
};

export default Page;
