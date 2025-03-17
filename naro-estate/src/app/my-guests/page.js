'use client';

import BookingTable from '@/components/react-components/booking/BookingTable';
import ListingsPagination from '@/components/react-components/listing/ListingsPagination';
import axios from 'axios';
import { useRouter } from "next/compat/router";
import { useSearchParams } from "next/navigation";
import { CalendarDays, Loader2 } from 'lucide-react';
import React, { Suspense, useEffect, useState } from 'react';
import GuestsTable from '@/components/react-components/booking/GuestsTable';

const MyGuestsPage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [bookingsHistory, setBookingsHistory] = useState([]);
  const [pagination,setPagination]=useState({})

  const searchParams = useSearchParams(); // Get search params
 const router = useRouter(); // Get router instance

  const fetchGuestHistory = async () => {
    try {
      setIsFetching(true);
      const query = new URLSearchParams(searchParams.toString())
      const response = await axios.get(`/api/user/my-guests${query.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setBookingsHistory(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined'){
        fetchGuestHistory();
    }
  }, [searchParams, setPagination]);

  return (
    <div className='h-[80vh] mx-auto'>
        <div className='flex items-center justify-center gap-2 m-4 '>
            <CalendarDays className='text-primary w-6 h-6 '/>
            <h1 className='text-xl font-medium'>MY LISTINGS GUESTS</h1>
        </div>
      {isFetching ? (
        <div className="container w-full mx-auto">
          <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
        </div>
      ) : (
          <>
          <GuestsTable data={bookingsHistory} />
          <ListingsPagination totalPages={pagination.totalPages} currentPage={pagination.currentPage} hasPrevPage={pagination.hasPrevPage} hasNextPage={pagination.hasNextPage}/>
          </>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="container w-full mx-auto"> <Loader2 className="w-6 h-6 text-gray-500 animate-spin" /></div>}>
      <MyGuestsPage />
    </Suspense>
  );
};

export default Page;