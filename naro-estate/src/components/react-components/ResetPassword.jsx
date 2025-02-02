'use client';

import { useRouter } from 'next/compat/router';
import { useSearchParams } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);

  const router=useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    if (token && userId) {
      setResetToken(token);
      setUserId(userId);
    } else {
      setMessage('Invalid token or userId.');
    }
  }, [router,searchParams]);

  const handleReset = async () => {
    setLoading(true);
    setMessage('');

    if (!resetToken || !userId) {
      setMessage('Verification token or userId is missing.');
      setLoading(false);
      return;
    }

    if (!password || !confirmPassword) {
      setMessage('Please enter both password fields.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('/api/user/reset-password', {
        resetToken,
        userId,
        password,
      });

      setMessage('Password reset successfully. You can now log in.');
      setIsResetSuccessful(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Reset Your Password</h1>
        <p className="text-center text-gray-600 mb-6">Enter your new password below</p>

        {message && (
          <p
            className={`text-center mb-6 ${
              message.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        {!isResetSuccessful ? (
          <>
            <Input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-4"
            />

            <Button
              className="w-full bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark focus:outline-none"
              onClick={handleReset}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create New Password'}
            </Button>
          </>
        ) : (
            <div className='flex  justify-center items-center'>
                
                <Link href="/login" className='mx-auto bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark focus:outline-none'>Login</Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
