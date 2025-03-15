'use client';

import { Calendar, Clock, Users, MapPin, Home, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming shadcn UI Button component
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'; // Assuming shadcn UI Card components
import { useEffect, useState } from 'react';

const BookingConfirmation = ({ bookingData }) => {
  const [timeLeft, setTimeLeft] = useState(null); // Track time left
  const [isExpired, setIsExpired] = useState(false); // Track if the timer has expired

  // Timer logic
  useEffect(() => {
    if (!bookingData?.data?.expiresAt) return; // Early return if expiresAt is not available

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiresAt = new Date(bookingData.data.expiresAt).getTime();
      const difference = expiresAt - now;

      if (difference > 0) {
        const minutes = Math.floor((difference / (1000 * 60)) % 60); // Calculate minutes
        const seconds = Math.floor((difference / 1000) % 60); // Calculate seconds
        setTimeLeft({ minutes, seconds });
        setIsExpired(false); // Timer is still active
      } else {
        setTimeLeft({ minutes: 0, seconds: 0 });
        setIsExpired(true); // Timer has expired
      }
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, [bookingData?.data?.expiresAt]); // Dependency on expiresAt

  // Early return if bookingData is not available
  if (!bookingData) {
    return (
      <div className="container mx-auto p-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Fetching booking details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { type, message, pay, data } = bookingData;

  // Handle error responses
  if (type === "error") {
    return (
      <div className="container mx-auto p-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle success responses
  if (type === "success") {
    return (
      <div className="container mx-auto p-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {pay ? "Confirm Your Booking" : "Booking Status"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {message}
            </CardDescription>
          </CardHeader>

          {/* Display booking details if pay is true */}
          {pay && data && (
            <CardContent className="grid gap-6">
              {/* Timer */}
              {timeLeft && (
                <div className="bg-yellow-100 p-4 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                  {isExpired ? (
                    <span className="text-red-600 font-medium">
                      Timeout for payment. Please try again.
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-medium">
                      Time left to complete payment:{" "}
                      {timeLeft.minutes.toString().padStart(2, "0")}:
                      {timeLeft.seconds.toString().padStart(2, "0")}
                    </span>
                  )}
                </div>
              )}

              {/* Property Image */}
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img src={data.listingId.coverPhoto} alt={data.listingId.title} className="w-full h-full object-cover" />
              </div>

              {/* Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Check-in & Check-out */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">Check-in:</span>
                    <span>{new Date(data.checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">Check-out:</span>
                    <span>{new Date(data.checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">Total Days:</span>
                    <span>{data.totalDays}</span>
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">Guests:</span>
                    <span>{data.guests}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Home className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">Price per Day:</span>
                    <span>${data.stayPricePerDay}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">Total Price:</span>
                    <span>${data.totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Address:</span>
                <span>{`${data.listingId.address.streetOrLocality}, ${data.listingId.address.city}, ${data.listingId.address.state}, ${data.listingId.address.zipCode}`}</span>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Beds:</span>
                    <span>{data.listingId.propertyDetails.beds}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Baths:</span>
                    <span>{data.listingId.propertyDetails.baths}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Kitchen:</span>
                    <span>{data.listingId.propertyDetails.kitchen}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Furnish Type:</span>
                    <span>{data.listingId.propertyDetails.furnishType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Parking:</span>
                    <span>{data.listingId.propertyDetails.parking}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Floor Area:</span>
                    <span>{data.listingId.propertyDetails.floorArea} sq. ft.</span>
                  </div>
                </div>
              </div>
            </CardContent>
          )}

          {/* Display queue position if pay is false */}
          {!pay && data?.position && (
            <CardContent>
              <p className="text-gray-600">
                You are in position <strong>{data.position}</strong> in the queue.
              </p>
            </CardContent>
          )}

          {/* Proceed to Payment button */}
          <CardFooter className="flex justify-end">
            {pay && !isExpired && ( // Only show the button if pay is true and timer is not expired
              <Button className="bg-blue-600 hover:bg-blue-700">
                Proceed to Payment
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Fallback for unexpected responses
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Unexpected Response</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Please try again later.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingConfirmation;