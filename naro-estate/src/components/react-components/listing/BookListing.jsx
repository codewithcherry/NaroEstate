import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";



const BookListing = ({listing}) => {
  const bookedDates = [
    new Date("2025-03-10"),
    new Date("2025-03-11"),
    new Date("2025-03-15"),
  ];

  const [nightlyRate ,setnightlyRate]= useState(listing.stayPrice);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [isReserveLoading,setIsReserveLoading]=useState(false);

  const router=useRouter();
  const {toast}=useToast();

  const token=localStorage.getItem('authToken');

  const isDateUnavailable = (date) =>
    bookedDates.some(
      (bookedDate) => date.toDateString() === bookedDate.toDateString()
    );

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const timeDiff = checkOut - checkIn;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const totalPrice = calculateNights() * nightlyRate;

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates.");
      return;
    }
    if (isDateUnavailable(checkIn) || isDateUnavailable(checkOut)) {
      setError("Selected dates include unavailable dates. Please choose different dates.");
      return;
    }
    setError("");
    ReserveListing();
  };

  const ReserveListing=async()=>{
    try {

      setIsReserveLoading(true);

      const response=await axios.post('/api/reserve',
        {
          listingId:listing._id,
          checkIn:checkIn,
          checkOut:checkOut,
          stayPricePerDay:listing.stayPrice,
          totalPrice,
          totalDays:calculateNights(),
          guests,
        },
        {
          headers:{
            'Authorization':`Bearer ${token}`,
            "Content-Type":'application/json'
          }
        }
      )

      const data=response.data;
      console.log(data);
      toast({
        title:data?.type || 'success',
        description:data?.message || 'Reserved Successfully will be redirected to payments page'
      })
      router.push(`/confirm-booking?token=${data.token}`)
      setCheckIn(null)
      setCheckOut(null)
    } catch (error) {
      console.log(error);
      toast({
        title:error?.response.data?.type || 'error',
        description:error?.response.data?.message || "couldnt reserve the listing!!",
        variant:'destructive'
      })
      setError(error.response.data?.message || 'Something went wrong')
    }
    finally{
      setIsReserveLoading(false);
    }
  }

  return (
    <Card className="max-w-md mx-auto p-6 border  rounded-lg shadow-lg">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">${nightlyRate.toLocaleString()}<span className="text-gray-500 text-sm">/night</span></h2>
        <div className="grid grid-cols-2 gap-2 mb-4 border p-3 rounded-lg bg-gray-50 shadow-md">
          <div>
            <label className="block mb-1 text-gray-700 text-sm">Check-in</label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              excludeDates={bookedDates}
              minDate={new Date()}
              className="w-full p-2 border rounded-lg"
              placeholderText="Select date"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 text-sm">Check-out</label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              excludeDates={bookedDates}
              minDate={checkIn || new Date()}
              className="w-full p-2 border rounded-lg"
              placeholderText="Select date"
            />
          </div>
        </div>
        <div className="mb-4  rounded-lg">
          <label className="block mb-1 text-gray-700 text-sm">Guests</label>
          <Select onValueChange={setGuests} defaultValue={guests.toString()}>
            <SelectTrigger className="w-full border p-2 rounded-lg bg-gray-50">
              <SelectValue placeholder="Select guests" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5,6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} guest{num > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <Button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2" onClick={handleBooking}>
          {
            isReserveLoading?<Loader2 className="w-4 h-4 text-white animate-spin"/>:"Reserve"
          }
        </Button>
        <p className="text-center text-gray-500 text-sm mt-2">You won't be charged yet</p>
        <hr className="my-4" />
        <div className="flex justify-between text-sm text-gray-700">
          <p>₹{nightlyRate.toLocaleString()} x {calculateNights()} nights</p>
          <p>₹{totalPrice.toLocaleString()}</p>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <p>Total before taxes</p>
          <p>₹{totalPrice.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookListing;
