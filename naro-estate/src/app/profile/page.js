'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ProfileHeader from '@/components/react-components/user/profile/ProfileHeader';

const Page = () => {
  const [profileData, setProfileData] = useState({});
  const [profileLoading, setProfileLoading] = useState(true); // Loading state for fetching profile data

  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, loading } = useAuth(); // Use loading state from AuthContext

  const getProfileData = async (token) => {
    try {
      const response = await axios.get('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setProfileData(response.data?.user);
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch profile data. Please try again.',
      });
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return; // Wait for AuthContext to finish checking auth status

    const token = localStorage.getItem('authToken');
    if (!isLoggedIn) {
      toast({
        title: 'Error',
        description: 'Please login to your account to view the profile.',
      });
      router.push('/login');
    } else if (token) {
      getProfileData(token); // Fetch profile data if the user is authenticated and token exists
    } else {
      setProfileLoading(false); // No token found, stop loading
    }
  }, [isLoggedIn, loading, router, toast]);

  return (
    <div>
      <h1>Profile Page</h1>
      {loading || profileLoading ? (
        <p>Loading...</p>
      ) : (
        <div> 
          <ProfileHeader />

        </div>
      )}
    </div>
  );
};

export default Page;
