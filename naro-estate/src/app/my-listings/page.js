'use client';
import MyListingCard from '@/components/react-components/user/myListing/MyListingCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { Loader2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [myListings, setMyListings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [token, setToken] = useState(null);  // State for auth token

  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, loading } = useAuth();

  // Set token from localStorage on the client side only
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
      const data = response.data;
      setMyListings(data.listings);
      toast({
        title: data.type,
        description: data.message,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error?.response?.data?.type || 'error',
        description:
          error?.response?.data?.message || "Couldn't fetch the listings, try again",
        variant: 'destructive',
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleCreateNewListing = () => {
    router.push('/create-listing');
  };

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      toast({
        title: 'error',
        description: 'Login to your account to access My-Listings page',
        variant: 'destructive',
      });
      router.push('/login');
    } else if (token) {  // Fetch listings only if token is available
      fetchMyListings();
    }
  }, [isLoggedIn, loading, token]);  // Add token as a dependency

  return (
    <div className='container mx-auto w-full h-screen bg-background'>
      <Button onClick={handleCreateNewListing}>
        <Plus /> New Listing
      </Button>
      {isFetching ? (
        <Loader2 className='w-5 h-5 animate-spin text-gray-500' />
      ) : (
        <div>
          {myListings.length > 0 ? (
            myListings.map((listing, index) => (
              <MyListingCard listing={listing} key={index} />
            ))
          ) : (
            <p>No listings to show!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
