'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { MoreVertical, Edit, Trash, Bed, Bath, Ruler, Sofa, Wifi, Car, Droplets } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import PropTypes from 'prop-types'; // For type checking in JavaScript

const MyListingCard = ({ listing }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleEdit = () => {
    router.push(`/edit-listing/${listing._id.$oid}`);
  };

  const handleCardClick=(id)=>{
    router.push(`/listings/${id}`)
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/user/mylistings/${listing._id.$oid}`);
      toast({
        title: response.data.type,
        description: response.data.message,
      });
      // Refresh the page or update the state to reflect the deletion
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete the listing. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div 
      onClick={()=>{handleCardClick(listing._id)}}
    className='relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:cursor-pointer'>
      {/* Cover Photo */}
      <div className='w-full h-48 overflow-hidden'>
        <img
          src={listing.coverPhoto || '/placeholder-image.jpg'}
          alt={listing.title}
          className='w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105'
        />
      </div>

      {/* Content Section */}
      <div className='p-4'>
        {/* Title and Description */}
        <h3 className='text-xl font-semibold text-gray-800 mb-2'>{listing.title}</h3>
        <p className='text-sm text-gray-600 mb-4'>{listing.description.slice(0,50)}...</p>

        {/* Property Type and Listing Type */}
        <div className='flex items-center gap-2 mb-4'>
          <span className='text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded'>
            {listing.propertyType}
          </span>
          <span className='text-sm bg-green-100 text-green-800 px-2 py-1 rounded'>
            {listing.listingType === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>

        {/* Price */}
        <div className='text-lg font-bold text-gray-900 mb-4'>
          {listing.listingType === 'sale'
            ? `$${listing.salePrice.toLocaleString()}`
            : `$${listing.rentPrice.toLocaleString()}/mo`}
        </div>

        {/* Address */}
        <div className='text-sm text-gray-500 mb-4'>
          {listing.address.doorNumber}, {listing.address.streetOrLocality}, {listing.address.city}, {listing.address.state} {listing.address.zipCode}
        </div>

        {/* Property Details */}
        <div className='flex items-center gap-4 mb-4'>
          <div className='flex items-center gap-1 text-sm text-gray-600'>
            <Bed className='w-4 h-4' /> {listing.propertyDetails.beds} Beds
          </div>
          <div className='flex items-center gap-1 text-sm text-gray-600'>
            <Bath className='w-4 h-4' /> {listing.propertyDetails.baths} Baths
          </div>
          <div className='flex items-center gap-1 text-sm text-gray-600'>
            <Ruler className='w-4 h-4' /> {listing.propertyDetails.floorArea} sqft
          </div>
          <div className='flex items-center gap-1 text-sm text-gray-600'>
            <Sofa className='w-4 h-4' /> {listing.propertyDetails.furnishType}
          </div>
        </div>

        {/* Key Amenities */}
        <div className='flex items-center gap-4 mb-4'>
          {listing.amenities.basic.wifi && (
            <div className='flex items-center gap-1 text-sm text-gray-600'>
              <Wifi className='w-4 h-4' /> WiFi
            </div>
          )}
          {listing.amenities.basic.parking && (
            <div className='flex items-center gap-1 text-sm text-gray-600'>
              <Car className='w-4 h-4' /> Parking
            </div>
          )}
          {listing.amenities.outdoor.swimmingPool && (
            <div className='flex items-center gap-1 text-sm text-gray-600'>
              <Droplets className='w-4 h-4' /> Pool
            </div>
          )}
        </div>
      </div>

      {/* 3-Dot Dropdown Menu */}
      <div className='absolute top-2 right-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm' className='p-1 rounded-full bg-white hover:bg-gray-100'>
              <MoreVertical className='w-6 h-6 text-gray-600' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-40'>
            <DropdownMenuItem onClick={handleEdit} className='cursor-pointer'>
              <Edit className='w-4 h-4 mr-2' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className='cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50'
            >
              <Trash className='w-4 h-4 mr-2' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

// PropTypes for type checking
MyListingCard.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.shape({ $oid: PropTypes.string.isRequired }).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    propertyType: PropTypes.string.isRequired,
    listingType: PropTypes.string.isRequired,
    salePrice: PropTypes.number.isRequired,
    rentPrice: PropTypes.number.isRequired,
    address: PropTypes.shape({
      doorNumber: PropTypes.string.isRequired,
      streetOrLocality: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
    }).isRequired,
    propertyDetails: PropTypes.shape({
      beds: PropTypes.number.isRequired,
      baths: PropTypes.number.isRequired,
      floorArea: PropTypes.number.isRequired,
      furnishType: PropTypes.string.isRequired,
    }).isRequired,
    amenities: PropTypes.shape({
      basic: PropTypes.shape({
        wifi: PropTypes.bool.isRequired,
        parking: PropTypes.bool.isRequired,
      }).isRequired,
      outdoor: PropTypes.shape({
        swimmingPool: PropTypes.bool.isRequired,
      }).isRequired,
    }).isRequired,
    coverPhoto: PropTypes.string.isRequired,
  }).isRequired,
};

export default MyListingCard;