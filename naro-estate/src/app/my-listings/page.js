'use client';
import MyListingCard from '@/components/react-components/user/myListing/MyListingCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { Loader2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';

const Page = () => {
  const [myListings, setMyListings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [token, setToken] = useState(null);

  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) setToken(storedToken);
  }, []);

  const fetchMyListings = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get('/api/user/mylistings', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setMyListings(response.data.listings);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch listings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      router.push('/login');
    } else if (token) {
      fetchMyListings();
    }
  }, [isLoggedIn, loading, token]);

  return (
    <div className='container mx-auto p-6 bg-background min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>My Listings</h1>
        <Button onClick={() => router.push('/create-listing')} className='flex items-center gap-2'>
          <Plus className='w-4 h-4 test-primary' /> New Listing
        </Button>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        {isFetching ? (
          <Loader2 className='w-8 h-8 animate-spin text-gray-500 mx-auto mt-10' />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {myListings.length > 0 ? (
              myListings.map((listing, index) => (
                <MyListingCard listing={listing} key={index} />
              ))
            ) : (
              <p className='text-gray-500 text-center col-span-full'>No listings to show!</p>
            )}
          </div>
        )}
      </Suspense>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className='bg-white p-4 rounded-lg shadow-md animate-pulse'>
        <div className='h-48 bg-gray-200 rounded-md'></div>
        <div className='mt-4 space-y-2'>
          <div className='h-4 bg-gray-200 rounded'></div>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
          <div className='h-4 bg-gray-200 rounded w-1/2'></div>
        </div>
      </div>
    ))}
  </div>
);

export default Page;