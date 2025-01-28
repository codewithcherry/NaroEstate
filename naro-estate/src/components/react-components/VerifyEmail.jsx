'use client';

import { useRouter } from 'next/compat/router';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [verifyToken, setVerifyToken] = useState('');
  const [userId, setUserId] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    if (token && userId) {
      setVerifyToken(token);
      setUserId(userId);
    } else {
      setMessage('Invalid token or userId.');
    }
  }, [router,searchParams]);

  const handleVerify = async () => {
    setLoading(true);
    setMessage('');

    try {
      if (!verifyToken || !userId) {
        throw new Error('Verification token or userId is missing.');
      }

      const response = await axios.post('/api/user/verify-email', {
        verifyToken,
        userId,
      });

      if (response.status === 200) {
        setMessage('Verification successful! You can now log in to your account.');
      } else {
        setMessage('Verification failed. Please try again.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Verify Your Account</h1>
        <p className="text-center text-gray-600 mb-6">
          Verify your account by clicking the button below.
        </p>

        {message && (
          <p
            className={`text-center mb-6 ${
              message.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        {
            message?<div className='flex justify-center'> <Link className='mx-auto bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark focus:outline-none' href={'/login'}>Login to your account.</Link></div> :<div className="text-center">
            {!loading ? (
              <button
                className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark focus:outline-none"
                onClick={handleVerify}
              >
                Verify
              </button>
            ) : (
              <span className="text-gray-600">Verifying...</span>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default VerifyEmail;
