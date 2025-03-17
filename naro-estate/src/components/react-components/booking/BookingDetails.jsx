import { CheckCircle, XCircle, MapPin, Calendar, Users, Home, Car, Ruler, Sofa } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'; // Assuming shadcn UI components are imported
import { Badge } from '@/components/ui/badge'; // Assuming shadcn UI components are imported
import Image from 'next/image';

const BookingDetails = ({ data }) => {
  const {
    _id,
    payment,
    listingId,
    checkIn,
    checkOut,
    totalDays,
    stayPricePerDay,
    totalPrice,
    guests,
    createdAt,
  } = data;

  const isPaymentSuccess = payment.status === 'SUCCESS';

  return (
    <Card className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-xl border border-gray-100">
      <CardHeader className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 shadow-sm">
          {isPaymentSuccess ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500" />
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {isPaymentSuccess ? 'Payment Successful' : 'Payment Failed'}
        </h2>
        <Badge
          variant={isPaymentSuccess ? 'success' : 'destructive'}
          className="text-xs shadow-sm"
        >
          {payment.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 mt-4">
        {/* Property Details Overlay */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-md">
          <Image
            src={listingId.coverPhoto}
            alt={listingId.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end">
            <h3 className="text-lg font-semibold text-white">{listingId.title}</h3>
            <p className="text-sm text-gray-200 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {listingId.address.doorNumber}, {listingId.address.streetOrLocality}, {listingId.address.city}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="outline" className="text-xs bg-white bg-opacity-10 text-white">
                <Users className="w-3 h-3 mr-1" />
                {guests} Guests
              </Badge>
              <Badge variant="outline" className="text-xs bg-white bg-opacity-10 text-white">
                <Sofa className="w-3 h-3 mr-1" />
                {listingId.propertyDetails.furnishType}
              </Badge>
              <Badge variant="outline" className="text-xs bg-white bg-opacity-10 text-white">
                <Car className="w-3 h-3 mr-1" />
                {listingId.propertyDetails.parking}
              </Badge>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Check-In</p>
              <p className="font-medium text-gray-800">
                {new Date(checkIn).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Check-Out</p>
              <p className="font-medium text-gray-800">
                {new Date(checkOut).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Total Days</p>
              <p className="font-medium text-gray-800">{totalDays}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="font-medium text-gray-800">${totalPrice}</p>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Transaction ID</p>
          <p className="font-medium text-gray-800">{payment.transactionId}</p>
          <p className="text-sm text-gray-500">
            Transaction Time: {new Date(payment.transactionTime).toLocaleString()}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Booking ID</p>
          <p className="font-medium text-gray-800">{_id}</p>
          <p>
          Booking created on {new Date(createdAt).toLocaleDateString()} at{' '}
          {new Date(createdAt).toLocaleTimeString()}
        </p>
        </div>
        </div>
      </CardContent>

      <CardFooter className="mt-4 text-center text-sm text-gray-500">
        <p>
          Reachout to care@naroestate.com for any enquiry
        </p>
      </CardFooter>
    </Card>
  );
};

export default BookingDetails;