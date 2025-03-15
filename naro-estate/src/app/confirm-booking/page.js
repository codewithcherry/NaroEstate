'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/compat/router";
import { useSearchParams } from "next/navigation";
import axios from "axios";

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
        setBookingDetails(data.data); // Set the booking details in state
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
    <div>
      <h1>Confirm Booking Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p>{message}</p>}

      {bookingDetails && (
        <div>
          <h2>Booking Details</h2>
          <p><strong>Check-In:</strong> {new Date(bookingDetails.checkIn).toLocaleDateString()}</p>
          <p><strong>Check-Out:</strong> {new Date(bookingDetails.checkOut).toLocaleDateString()}</p>
          <p><strong>Total Price:</strong> ${bookingDetails.totalPrice}</p>
          <p><strong>Guests:</strong> {bookingDetails.guests}</p>

          <h3>Listing Details</h3>
          <p><strong>Title:</strong> {bookingDetails.listingId.title}</p>
          <p><strong>Type:</strong> {bookingDetails.listingId.listingType}</p>
          <p><strong>Price per Night:</strong> ${bookingDetails.listingId.stayPrice}</p>
          <img
            src={bookingDetails.listingId.coverPhoto}
            alt={bookingDetails.listingId.title}
            style={{ width: "100%", maxWidth: "300px", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

// Wrap the component in a Suspense boundary
const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ConfirmBookingPage />
  </Suspense>
);

export default Page;