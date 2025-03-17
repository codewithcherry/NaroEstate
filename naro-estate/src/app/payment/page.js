'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/compat/router";
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import BookingDetails from '@/components/react-components/booking/BookingDetails';

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch booking details using the token
  const fetchBooking = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user/get-booking', {
        params: { bookingId: id },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      setBookingData(response.data.booking);
    } catch (error) {
      console.error('Error fetching booking details:', error);
      setError(error.response?.data?.message || 'Something went wrong.');
      setMessage('Failed to fetch booking details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bookingId = searchParams.get('id');

      if (bookingId) {
        setBookingId(bookingId);
        fetchBooking(bookingId); // Fetch booking details when token is available
      } else {
        setMessage('Invalid token.');
      }
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className='w-6 h-6 text-gray-500 animate-spin' />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}

        {message && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-md mb-6">
            <p>{message}</p>
          </div>
        )}

        {bookingData && (
          <BookingDetails data={bookingData}/>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  return <PaymentPage />;
};

export default Page;