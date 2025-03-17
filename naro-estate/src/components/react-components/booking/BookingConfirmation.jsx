"use client";

import { Calendar, Clock, Users, MapPin, Home, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn UI Button component
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Assuming shadcn UI Card components
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const BookingConfirmation = ({ bookingData }) => {
  const [timeLeft, setTimeLeft] = useState(null); // Track time left
  const [isExpired, setIsExpired] = useState(false); // Track if the timer has expired

  const [isPaymentLoading,setIsPaymentLoading]=useState(false)

  const { toast } = useToast();

  const router = useRouter();

  const handleClearBooking = async (token, listingId, bookingData) => {
    try {
      const response = await axios.post(
        "/api/clear-booking",
        {
          token,
          listingId,
          bookingData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast({
        title: response.data.type,
        description: response.data.message,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error?.response.data?.type || "error",
        description:
          error?.response.data?.message ||
          "Something went wrong clearing booking",
      });
    }
  };

  const handleProceedPayment=async () => {
    try {
      setIsPaymentLoading(true);

      const body={
        listingId:bookingData.data.listingId._id,
        bookingData:bookingData.data
      }

      const response=await axios.post('/api/book-listing',body,
        {
          headers:{
            "Content-Type":'application/json'
          }
        }
      )

      console.log(response.data);

      toast({
        title:response.data.type,
        description:response.data.message
      })

      router.push(`/payment?id=${response.data.bookingDetails._id}`);
      
    } catch (error) {
      console.log(error)
    }
    finally{
      setIsPaymentLoading(false)
    }
  }

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
      <div className="flex justify-center h-[80vh] items-center p-4">
        <Loader2 className="text-center text-gray-500 w-6 h-6 animate-spin"/>
      </div>
    );
  }

  const { type, message, pay, data } = bookingData;


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
              <div>
              <h1 className="text-3xl text-primary ">
                  {data.listingId.title}
                </h1>
              </div>

              {/* Property Image */}
              <div className="relative h-64 rounded-lg overflow-hidden">
                
                <img
                  src={data.listingId.coverPhoto}
                  alt={data.listingId.title}
                  className="w-full h-full object-cover"
                />
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
                    <span>
                      {data.listingId.propertyDetails.floorArea} sq. ft.
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          )}

          {/* Display queue position if pay is false */}
          {!pay && data?.position && (
            <CardContent>
              <p className="text-gray-600">
                You are in position <strong>{data.position}</strong> in the
                queue.
              </p>
            </CardContent>
          )}

          {/* Proceed to Payment button */}
          <CardFooter className="flex justify-end">
            {pay &&
              !isExpired && ( // Only show the button if pay is true and timer is not expired
                <div className="space-x-2">
                  <Button
                    onClick={async () => {
                      await handleClearBooking(
                        data.token,
                        data.listingId._id,
                        bookingData
                      );
                      router.push(`/listings/${data.listingId._id}`);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                  onClick={()=>{
                    handleProceedPayment()
                  }}
                  className="bg-blue-600 hover:bg-blue-700">
                    {isPaymentLoading?<Loader2 className="w-4 h-4 text-gray-500 animate-spin"/>:"Proceed to Payment"}
                  </Button>
                </div>
              )}

            {/* Cancel and Try Again buttons when timer expires */}
            {pay && isExpired && (
              <div className="flex gap-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={async () => {
                    await handleClearBooking(
                      data.token,
                      data.listingId._id,
                      bookingData
                    );
                    router.push(`/listings/${data.listingId._id}`);
                  }}
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }

}
  

export default BookingConfirmation;
