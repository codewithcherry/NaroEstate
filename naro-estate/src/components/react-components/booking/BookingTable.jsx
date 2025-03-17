'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Shadcn UI Table components

// Utility function to format date as dd-mm-yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const BookingTable = ({ data }) => {
  const router = useRouter(); // Initialize the router

  // Handle click event for Booking ID
  const handleBookingIdClick = (id) => {
    try {
      router.push(`/payment?id=${id}`);
    } catch (error) {
      console.error('Failed to navigate:', error);
    }
  };

  // Handle click event for Listing Title
  const handleListingTitleClick = (listingId) => {
    try {
      router.push(`/listings/${listingId}`);
    } catch (error) {
      console.error('Failed to navigate:', error);
    }
  };

  // If data is empty, show a message
  if (!data || data.length === 0) {
    return (
      <div className="max-w-[90%] mx-auto text-center py-6 text-gray-700">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-w-[90%] mx-auto rounded-lg border border-gray-200 shadow-md mb-4">
      <Table className="min-w-full">
        <TableCaption className="text-md text-gray-700">
          Recent bookings listed here
        </TableCaption>
        <TableHeader className="bg-white">
          <TableRow>
            <TableHead className="w-[50px] font-bold text-gray-700">#</TableHead>
            <TableHead className="w-[100px] font-bold text-gray-700">ID</TableHead>
            <TableHead className="font-bold text-gray-700">Listing</TableHead>
            <TableHead className="font-bold text-gray-700">Check-in</TableHead>
            <TableHead className="font-bold text-gray-700">Check-out</TableHead>
            <TableHead className="font-bold text-gray-700">Total Days</TableHead>
            <TableHead className="font-bold text-gray-700">Amount</TableHead>
            <TableHead className="font-bold text-gray-700">Payment Status</TableHead>
            <TableHead className="font-bold text-gray-700">Booking Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item._id} className="hover:bg-gray-50 transition-colors">
              <TableCell className="font-medium text-gray-800">{index + 1}</TableCell>
              <TableCell
                className="font-medium text-gray-800 cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => handleBookingIdClick(item._id)}
                role="button"
                tabIndex={0}
                aria-label={`View payment details for booking ${item._id}`}
              >
                {item._id}
              </TableCell>
              <TableCell
                className="text-gray-700 cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => handleListingTitleClick(item.listingId._id)}
                role="button"
                tabIndex={0}
                aria-label={`View details for listing ${item.listingId.title}`}
              >
                {item.listingId.title}
              </TableCell>
              <TableCell className="text-gray-700">{formatDate(item.checkIn)}</TableCell>
              <TableCell className="text-gray-700">{formatDate(item.checkOut)}</TableCell>
              <TableCell className="text-gray-700">{item.totalDays}</TableCell>
              <TableCell className="text-gray-700">${item.totalPrice}</TableCell>
              <TableCell className="text-gray-700">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    item.payment.status === 'SUCCESS'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.payment.status}
                </span>
              </TableCell>
              <TableCell className="text-gray-700">{formatDate(item.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;