"use client";

import ViewListing from "@/components/react-components/listing/ViewListing";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { Loader2 } from "lucide-react";
import ListingMedia from "@/components/react-components/listing/ListingMedia";
import RoomListing from "@/components/react-components/listing/RoomListing";
import AmenitiesComponent from "@/components/react-components/listing/AmenitiesComponent";
import ListingDetails from "@/components/react-components/listing/ListingDetails";
import HostProfileCard from "@/components/react-components/listing/HostProfileCard";
import ReviewSection from "@/components/react-components/listing/ReviewSection";
import BookListing from "@/components/react-components/listing/BookListing";
import RentEnquiry from "@/components/react-components/listing/RentEnquiry";
import RequestAgentCall from "@/components/react-components/listing/RequestAgentCall";
import ShareDialog from "@/components/react-components/listing/ShareDialog";

const Page = () => {
  const { listingId } = useParams();
  const [listingLoading, setListingLoading] = useState(false);
  const [listing, setListing] = useState({});
  const [error, setError] = useState(null);

  const fetchListing = async (id) => {
    if (!id) return;
    try {
      setListingLoading(true);
      setError(null);
      const response = await axios.get(`/api/listings/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log(data);
      setListing(data);
    } catch (error) {
      console.log(error);
      setError(
        new Error(
          error?.response?.data?.message ||
            "Could not fetch the listing! Try again later."
        )
      );
    } finally {
      setListingLoading(false);
    }
  };

  useEffect(() => {
    if (listingId) fetchListing(listingId);
  }, [listingId]);

  if (error) {
    throw error;
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-svh ">
          <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        </div>
      }
    >
      {listingLoading ? (
        <div className="flex justify-center items-center h-svh ">
          <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="flex items-center justify-between px-6 mt-4 ">
          <h1 className="text-3xl font-bold">{listing.title}</h1>
          <ShareDialog />
          </div>
          {/* <ViewListing listing={listing} /> */}
          <ListingMedia
            coverPhoto={listing.coverPhoto}
            propertyMedia={listing.propertyMedia}
          />
          <div className="flex flex-col  gap-2 md:flex-row my-6 w-full">
            <RoomListing listing={listing} />
            {listing.listingType === "stay" ? (
              <BookListing listing={listing} />
            ) : listing.listingType === "rent" ? (
              <RentEnquiry propertyId={listing._id}/>
            ) : (
              <RequestAgentCall  listingId={listing._id}/>
            )}
          </div>

          <div className="flex flex-col gap-2 md:flex-row my-6 w-full">
            <ListingDetails listing={listing} />
            <AmenitiesComponent amenities={listing.amenities} />
          </div>
          <HostProfileCard host={listing.createdBy} />
          <ReviewSection />
        </div>
      )}
    </Suspense>
  );
};

export default Page;
