'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/compat/router";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import BookingConfirmation from "@/components/react-components/booking/BookingConfirmation";

const ConfirmBookingPage = () => {
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch booking details using the token
  const fetchBookingDetails = async (token) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`/api/confirm-booking?token=${token}`);
      const data = response.data;
        console.log(data)
      if (data.type === "success") {
        setBookingDetails(data); // Set the booking details in state
      } else {
        setMessage(data.message || "Failed to fetch booking details.");
        setError(data.message);
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setError(error.response?.data?.message || "Something went wrong.");
      setMessage("Failed to fetch booking details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setToken(token);
      fetchBookingDetails(token); // Fetch booking details when token is available
    } else {
      setMessage("Invalid token.");
    }
  }, [router, searchParams]);

  return (
    <BookingConfirmation bookingData={bookingDetails}/>
  );
};

// Wrap the component in a Suspense boundary
const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ConfirmBookingPage />
  </Suspense>
);

export default Page;