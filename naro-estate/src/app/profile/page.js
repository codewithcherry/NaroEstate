'use client';

import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ProfileHeader from '@/components/react-components/user/profile/ProfileHeader';
import ChangePassword from '@/components/react-components/user/profile/ChangePassword';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, loading } = useAuth();

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
    if (loading) return;

    const token = localStorage.getItem('authToken');
    if (!isLoggedIn) {
      toast({
        title: 'Error',
        description: 'Please login to your account to view the profile.',
      });
      router.push('/login');
    } else if (token) {
      getProfileData(token);
    } else {
      setProfileLoading(false);
    }
  }, [isLoggedIn, loading, router, toast]);

  if (loading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
        </div>
      }
    >
      <div className="my-10">
        <ProfileHeader user={profileData} />
        <ChangePassword />
      </div>
    </Suspense>
  );
};

export default Page;
