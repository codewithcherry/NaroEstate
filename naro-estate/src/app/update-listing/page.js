'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/compat/router';
import { useSearchParams } from 'next/navigation';
import EditListingForm from '@/components/react-components/listing/EditListingForm';
import { Loader2, PencilIcon } from 'lucide-react';

const Page = () => {
  const [listingLoading, setListingLoading] = useState(false);
  const [listing, setListing] = useState({});
  const [error, setError] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

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
      console.log('Fetched data:', data);
      setListing(data);
    } catch (error) {
      console.error('API error:', error);
      setError(
        new Error(
          error?.response?.data?.message ||
            'Could not fetch the listing! Try again later.'
        )
      );
    } finally {
      setListingLoading(false);
    }
  };

  useEffect(() => {
    const listingId = searchParams.get('listingId');
    if (listingId) {
      fetchListing(listingId);
    } else {
      console.warn('Missing listingId in URL!');
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="text-red-500 p-4">
        <p>{error.message}</p>
        <button onClick={() => router.back()} className="text-blue-500 underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
        <div className='flex justify-center items-center mt-4 gap-2'>
        <PencilIcon className='w-6 h-6 text-primary'/>
        <h1 className='text-2xl font-medium text-primary  '>Edit Listing</h1>
        </div>
      {listingLoading ? (
        <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
      ) : (
        <EditListingForm listing={listing} />
      )}
    </div>
  );
};

export default Page;
