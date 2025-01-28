'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

// A simple loading component for Suspense boundary
const Loading = () => (
  <div>Loading...</div>
);

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [query, setQuery] = useState({
    verifyToken: '',
    userId: ''
  });

  const router = useRouter();

  // Client-side effect to ensure the component is rendered on the client
  useEffect(() => {
    const { token, userId } = router.query;
    setQuery({
      verifyToken: token,
      userId: userId
    });
    setIsClient(true);
  }, [router.query]);

  // Function to handle verification when the button is clicked
  const handleVerify = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Extract query parameters from state
      const { verifyToken, userId } = query;

      if (!verifyToken || !userId) {
        throw new Error('Invalid query parameters. Verification cannot proceed.');
      }

      // Perform the POST request using axios
      const response = await axios.post('/api/user/verify-email', {
        verifyToken,
        userId,
      });

      setMessage('Verification successful! You can now log in to your account.');
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return null; // Or some loading spinner
  }

  // Only render the component after it’s mounted on the client
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="p-6 bg-card text-card-foreground rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Account</h1>
        <p className="mb-6">Click the button below to verify your account.</p>

        {!message ? (
          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded hover:bg-accent hover:text-accent-foreground disabled:bg-muted disabled:text-muted-foreground"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        ) : (
          <>
            <p className={`mt-4 text-sm ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
            {message.includes('successful') && (
              <Link
                className="mt-4 inline-block px-4 py-2 bg-primary text-primary-foreground font-semibold rounded hover:bg-accent hover:text-accent-foreground"
                href="/login"
              >
                Log In to Your Account
              </Link>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Page;
