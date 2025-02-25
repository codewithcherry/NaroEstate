"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const CreateListingForm = () => {

 // state to tract post button enable
  const [isPostEnable,setIsPostEnable]=useState(false);

  // State for property info
  const [propertyInfo, setPropertyInfo] = useState({
    title: "",
    description: "",
    propertyType: "",
    propertyStatus: "",
    listingType: "",
    salePrice: 0,
    rentPrice: 0,
    stayPrice: '',
  });

  // State for address info
  const [addressInfo, setAddressInfo] = useState({
    doorNumber: "",
    streetOrLocality: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // State for property details
  const [propertyDetails, setPropertyDetails] = useState({
    baths: 0,
    beds: 0,
    kitchen: "",
    furnishType: "",
    parking: "",
    floorArea: 0,
  });

  const [amenities, setAmenities] = useState({
    basic: {
      airConditioning: false,
      heating: false,
      wifi: false,
      parking: false,
      hotWater: false,
    },
    kitchen: {
      fullyEquippedKitchen: false,
      microwave: false,
      refrigerator: false,
      dishwasher: false,
      coffeeMaker: false,
      oven: false,
      toaster: false,
      stove: false,
      cookingUtensils: false,
    },
    bathroom: {
      bathtub: false,
      shower: false,
      toiletries: false,
      hairDryer: false,
      towels: false,
      washingMachine: false,
    },
    entertainment: {
      cableTV: false,
      streamingServices: false,
      booksAndMagazines: false,
      boardGames: false,
      musicSystem: false,
    },
    outdoor: {
      balconyPatio: false,
      privateGarden: false,
      bbqGrill: false,
      outdoorDiningArea: false,
      swimmingPool: false,
      hotTub: false,
    },
    security: {
      securityCameras: false,
      gatedProperty: false,
      alarmSystem: false,
      safe: false,
      smokeDetectors: false,
      carbonMonoxideDetectors: false,
    },
    accessibility: {
      elevator: false,
      wheelchairAccessible: false,
      rampAccess: false,
    },
    pet: {
      petFriendly: false,
      petBowls: false,
      fencedYard: false,
    },
    additional: {
      gym: false,
      spa: false,
      fireplace: false,
      washerDryer: false,
      highChairs: false,
      crib: false,
    },
  });

  // State for cover photo
  const [coverPhoto, setCoverPhoto] = useState(null);

  // State for property media images
  const [propertyMedia, setPropertyMedia] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { toast } = useToast();

  const token = localStorage.getItem("authToken");

  const router=useRouter();

  // function to reset all the states to intial value

  const resetForm=()=>{
    setPropertyInfo({
      title: "",
      description: "",
      propertyType: "",
      propertyStatus: "",
      listingType: "",
      salePrice: 0,
      rentPrice: 0,
    });
    setPropertyDetails({
      baths: 0,
      beds: 0,
      kitchen: "",
      furnishType: "",
      parking: "",
      floorArea: 0,
    });
    setAddressInfo({
      doorNumber: "",
      streetOrLocality: "",
      city: "",
      state: "",
      zipCode: "",
    });
    setAmenities({
      basic: {
        airConditioning: false,
        heating: false,
        wifi: false,
        parking: false,
        hotWater: false,
      },
      kitchen: {
        fullyEquippedKitchen: false,
        microwave: false,
        refrigerator: false,
        dishwasher: false,
        coffeeMaker: false,
        oven: false,
        toaster: false,
        stove: false,
        cookingUtensils: false,
      },
      bathroom: {
        bathtub: false,
        shower: false,
        toiletries: false,
        hairDryer: false,
        towels: false,
        washingMachine: false,
      },
      entertainment: {
        cableTV: false,
        streamingServices: false,
        booksAndMagazines: false,
        boardGames: false,
        musicSystem: false,
      },
      outdoor: {
        balconyPatio: false,
        privateGarden: false,
        bbqGrill: false,
        outdoorDiningArea: false,
        swimmingPool: false,
        hotTub: false,
      },
      security: {
        securityCameras: false,
        gatedProperty: false,
        alarmSystem: false,
        safe: false,
        smokeDetectors: false,
        carbonMonoxideDetectors: false,
      },
      accessibility: {
        elevator: false,
        wheelchairAccessible: false,
        rampAccess: false,
      },
      pet: {
        petFriendly: false,
        petBowls: false,
        fencedYard: false,
      },
      additional: {
        gym: false,
        spa: false,
        fireplace: false,
        washerDryer: false,
        highChairs: false,
        crib: false,
      },
    });
    setCoverPhoto(null);
    setPropertyMedia([]);
  }

  // Function to upload media image (mock API call)
  const uploadMediaImage = async (file) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Example API call (replace with your actual API endpoint)
      const response = await axios.post(
        "/api/upload/property-media",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      toast({
        title: data.type,
        description: data.message,
      });
      return data.imageUrl;
    } catch (error) {
      console.error(error);
      toast({
        title: error?.response?.data.type,
        description: error?.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Handler for uploading media images
  const handleMediaImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = await uploadMediaImage(file);
      if (imageUrl) {
        setPropertyMedia([...propertyMedia, imageUrl]); // Add uploaded image URL to the array
      }
    }
  };

  // Handler to delete image from media array
  const handleMediaImageDelete = (imageUrl) => {
    setPropertyMedia(propertyMedia.filter((url) => url !== imageUrl)); // Remove image from the array
  };

  // Function to check if cover photo is uploaded
  const isCoverPhotoUploaded = () => {
    return coverPhoto !== null;
  };

  // Handler for uploading cover photo
  const handleCoverPhotoUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const imageUrl = await uploadMediaImage(file);
      if (imageUrl) {
        setCoverPhoto(imageUrl); // Temporarily showing the uploaded image
      }
    }
  };

  // Handler for deleting cover photo
  const handleCoverPhotoDelete = () => {
    setCoverPhoto(null); // Clear the cover photo
  };

  // Handle amenities change
  const handleAmenitiesChange = (category, amenity) => {
    setAmenities({
      ...amenities,
      [category]: {
        ...amenities[category],
        [amenity]: !amenities[category][amenity],
      },
    });
  };

  // Check if the property form is completed
  const isPropertyFormCompleted = () => {
    const {
      title,
      description,
      propertyType,
      propertyStatus,
      listingType,
      rentPrice,
      salePrice,
      stayPrice
    } = propertyInfo;
    if (
      !title ||
      !description ||
      !propertyType ||
      !propertyStatus ||
      !listingType
    ) {
      return false;
    }
    if (listingType === "rent" && !rentPrice) return false;
    if (listingType === "sale" && !salePrice) return false;
    if (listingType === "stay" && !stayPrice) return false;
    return true;
  };

  // Check if the address form is completed
  const isAddressFormCompleted = () => {
    const { doorNumber, streetOrLocality, city, state, zipCode } = addressInfo;
    return doorNumber && streetOrLocality && city && state && zipCode;
  };

  // Check if the property details form is completed
  const isPropertyDetailsFormCompleted = () => {
    const { baths, beds, kitchen, furnishType, parking, floorArea } =
      propertyDetails;
    return baths && beds && kitchen && furnishType && parking && floorArea;
  };

  // Handle change for property info
  const handlePropertyInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyInfo({
      ...propertyInfo,
      [name]: value,
    });
  };

  // Handle change for address info
  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo({
      ...addressInfo,
      [name]: value,
    });
  };

  // Handle change for property details
  const handlePropertyDetailsInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({
      ...propertyDetails,
      [name]: value,
    });
  };

  const handleDiscard = () => {
    resetForm();
  };

  const [createLoading,setCreateLoading]=useState(false)

  const createNewListing = async () => {
   
   try {
    setCreateLoading(true)
    const response=await axios.post('/api/user/create-listing',{
      propertyDetails,
      addressInfo,
      propertyInfo,
      coverPhoto,
      propertyMedia,
      amenities
    },{
      headers:{
        'Authorization':`Bearer ${token}`,
        "Content-Type":'application/json'
      }
    })
    const data=response.data;
    toast({
      title:data.type,
      description:data.message,
    })
    resetForm()
    router.push(`/listings/${data.listingId}`);
   } catch (error) {
    console.log(error)
    toast({
      title:'error',
      description:error?.response.data?.message
    })
   }
   finally{
    setCreateLoading(false)
   }
  };

  useEffect(()=>{
    if(isAddressFormCompleted && isCoverPhotoUploaded && isPropertyDetailsFormCompleted && isPropertyFormCompleted && (propertyMedia.length > 0)){
      setIsPostEnable(true)
    }
  },[isAddressFormCompleted,isCoverPhotoUploaded,isPropertyDetailsFormCompleted,isPropertyFormCompleted,propertyMedia])

  return (
    <div className="space-y-6 p-8 max-w-4xl mx-auto">
      <Accordion
        type="single"
        defaultValue="item-1"
        className="space-y-4"
        collapsible
      >
        {/* General Property Information Accordion */}
        <AccordionItem value="item-1">
          <AccordionTrigger className="w-full flex justify-between items-center text-lg font-semibold text-slate-900 py-3 px-4 bg-white border-b-2 border-slate-200 rounded-md hover:bg-slate-50 hover:no-underline transition-all">
            <h2 className="flex-1 text-left">Property General Information</h2>
            <h3
              className={`ml-2 text-xs text-center font-medium py-1 px-3 rounded-full mx-2 ${
                isPropertyFormCompleted()
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {isPropertyFormCompleted() ? "Completed" : "Incomplete"}
            </h3>
          </AccordionTrigger>
          <AccordionContent className="bg-white p-6 space-y-6 shadow-md rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-slate-700"
                >
                  Title
                </label>
                <Input
                  name="title"
                  value={propertyInfo.title}
                  placeholder="Enter the property name"
                  onChange={handlePropertyInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-slate-700"
                >
                  Description
                </label>
                <Input
                  name="description"
                  value={propertyInfo.description}
                  placeholder="Enter a description of the property"
                  onChange={handlePropertyInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>

              {/* Property Type */}
              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-sm font-medium text-slate-700"
                >
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={propertyInfo.propertyType}
                  onChange={handlePropertyInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                >
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Town House</option>
                  <option value="modern_villa">Modern Villa</option>
                  <option value="single_family">Single Family</option>
                  <option value="office">Office</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              {/* Property Status */}
              <div>
                <label
                  htmlFor="propertyStatus"
                  className="block text-sm font-medium text-slate-700"
                >
                  Property Status
                </label>
                <select
                  name="propertyStatus"
                  value={propertyInfo.propertyStatus}
                  onChange={handlePropertyInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                >
                  <option value="">Select Property Status</option>
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                  <option value="under_repair">Under Repair</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              {/* Listing Type */}
              <div>
                <label
                  htmlFor="listingType"
                  className="block text-sm font-medium text-slate-700"
                >
                  Listing Type
                </label>
                <select
                  name="listingType"
                  value={propertyInfo.listingType}
                  onChange={handlePropertyInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                >
                  <option value="">Select Listing Type</option>
                  <option value="stay">Stay</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                  <option value="lease">Lease</option>
                  <option value="all">All</option>
                </select>
              </div>

              {/* Conditionally render Rent Price or Sale Price based on the listingType */}
              {propertyInfo.listingType === "rent" ||
              propertyInfo.listingType === "all" ? (
                <div>
                  <label
                    htmlFor="rentPrice"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Rent Price
                  </label>
                  <Input
                    name="rentPrice"
                    type="number"
                    value={propertyInfo.rentPrice}
                    placeholder="Enter the rent price"
                    onChange={handlePropertyInputChange}
                    className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                  />
                </div>
              ) : null}

              {propertyInfo.listingType === "sale" ||
              propertyInfo.listingType === "all" ? (
                <div>
                  <label
                    htmlFor="salePrice"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Sale Price
                  </label>
                  <Input
                    name="salePrice"
                    type="number"
                    value={propertyInfo.salePrice}
                    placeholder="Enter the sale price"
                    onChange={handlePropertyInputChange}
                    className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                  />
                </div>
              ) : null}

               {/* Conditionally render Rent Price or Sale Price based on the listingType */}
               {propertyInfo.listingType === "stay" ||
              propertyInfo.listingType === "all" ? (
                <div>
                  <label
                    htmlFor="stayPrice"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Rent Price
                  </label>
                  <Input
                    name="stayPrice"
                    type="number"
                    value={propertyInfo.stayPrice}
                    placeholder="Enter the stay price per night"
                    onChange={handlePropertyInputChange}
                    className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                  />
                </div>
              ) : null}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Address Information Accordion */}
        <AccordionItem value="item-2">
        <AccordionTrigger className="w-full flex justify-between items-center text-lg font-semibold text-slate-900 py-3 px-4 bg-white border-b-2 border-slate-200 rounded-md hover:bg-slate-50 hover:no-underline transition-all">
  <span className="flex-1 text-left">Address Information</span>
  <span
    className={`mx-2 text-xs font-medium py-1 px-3 rounded-full ${
      isAddressFormCompleted() ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`}
  >
    {isAddressFormCompleted() ? "Completed" : "Incomplete"}
  </span>
</AccordionTrigger>

          <AccordionContent className="bg-white p-6 space-y-6 shadow-md rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Door Number */}
              <div>
                <label
                  htmlFor="doorNumber"
                  className="block text-sm font-medium text-slate-700"
                >
                  Door Number
                </label>
                <Input
                  name="doorNumber"
                  value={addressInfo.doorNumber}
                  placeholder="Enter door number"
                  onChange={handleAddressInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>

              {/* Street or Locality */}
              <div>
                <label
                  htmlFor="streetOrLocality"
                  className="block text-sm font-medium text-slate-700"
                >
                  Street/Locality
                </label>
                <Input
                  name="streetOrLocality"
                  value={addressInfo.streetOrLocality}
                  placeholder="Enter street or locality"
                  onChange={handleAddressInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-slate-700"
                >
                  City
                </label>
                <Input
                  name="city"
                  value={addressInfo.city}
                  placeholder="Enter city"
                  onChange={handleAddressInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-slate-700"
                >
                  State
                </label>
                <Input
                  name="state"
                  value={addressInfo.state}
                  placeholder="Enter state"
                  onChange={handleAddressInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>

              {/* Zip Code */}
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-slate-700"
                >
                  Zip Code
                </label>
                <Input
                  name="zipCode"
                  value={addressInfo.zipCode}
                  placeholder="Enter zip code"
                  onChange={handleAddressInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Property Details Accordion */}
        <AccordionItem value="item-3">
        <AccordionTrigger className="w-full flex justify-between items-center text-lg font-semibold text-slate-900 py-3 px-4 bg-white border-b-2 border-slate-200 rounded-md hover:bg-slate-50 hover:no-underline transition-all">
  <span className="flex-1 text-left">Property Details</span>
  <span
    className={`mx-2 text-xs font-medium py-1 px-3 rounded-full ${
      isPropertyDetailsFormCompleted() ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`}
  >
    {isPropertyDetailsFormCompleted() ? "Completed" : "Incomplete"}
  </span>
</AccordionTrigger>

          <AccordionContent className="bg-white p-6 space-y-6 shadow-md rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Baths */}
              <div>
                <label
                  htmlFor="baths"
                  className="block text-sm font-medium text-slate-700"
                >
                  Number of Baths
                </label>
                <Input
                  name="baths"
                  type="number"
                  value={propertyDetails.baths}
                  placeholder="Enter the number of baths"
                  onChange={handlePropertyDetailsInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>

              {/* Beds */}
              <div>
                <label
                  htmlFor="beds"
                  className="block text-sm font-medium text-slate-700"
                >
                  Number of Beds
                </label>
                <Input
                  name="beds"
                  type="number"
                  value={propertyDetails.beds}
                  placeholder="Enter the number of beds"
                  onChange={handlePropertyDetailsInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>

              {/* Kitchen */}
              <div>
                <label
                  htmlFor="kitchen"
                  className="block text-sm font-medium text-slate-700"
                >
                  Kitchen
                </label>
                <Input
                  name="kitchen"
                  value={propertyDetails.kitchen}
                  placeholder="Enter kitchen details"
                  onChange={handlePropertyDetailsInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>

              {/* Furnish Type */}
              <div>
                <label
                  htmlFor="furnishType"
                  className="block text-sm font-medium text-slate-700"
                >
                  Furnish Type
                </label>
                <select
                  name="furnishType"
                  value={propertyDetails.furnishType}
                  onChange={handlePropertyDetailsInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                >
                  <option value="">Select Furnish Type</option>
                  <option value="furnished">Furnished</option>
                  <option value="semi-furnished">Semi-Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </select>
              </div>

              {/* Parking */}
              <div>
                <label
                  htmlFor="parking"
                  className="block text-sm font-medium text-slate-700"
                >
                  Parking
                </label>
                <select
                  name="parking"
                  value={propertyDetails.parking}
                  onChange={handlePropertyDetailsInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                >
                  <option value="">Select Parking Availability</option>
                  <option value="available">Available</option>
                  <option value="not-available">Not Available</option>
                </select>
              </div>

              {/* Floor Area */}
              <div>
                <label
                  htmlFor="floorArea"
                  className="block text-sm font-medium text-slate-700"
                >
                  Floor Area (sqft)
                </label>
                <Input
                  name="floorArea"
                  type="number"
                  value={propertyDetails.floorArea}
                  placeholder="Enter floor area in square feet"
                  onChange={handlePropertyDetailsInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Property Amenities Accordion */}
        <AccordionItem value="item-4">
          <AccordionTrigger className="flex justify-between items-center text-lg font-semibold text-slate-900 py-3 px-4 bg-white border-b-2 border-slate-200 rounded-md hover:bg-slate-50 hover:no-underline transition-all">
            Property Amenities
          </AccordionTrigger>
          <AccordionContent className="bg-white p-6 space-y-6 shadow-md rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Amenities */}
              <div>
                <h3 className="font-medium text-slate-700">Basic Amenities</h3>
                <div className="space-y-2">
                  {[
                    "airConditioning",
                    "heating",
                    "wifi",
                    "parking",
                    "hotWater",
                  ].map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={amenities.basic[amenity]}
                        onChange={() => handleAmenitiesChange("basic", amenity)}
                      />
                      <span>{amenity.replace(/([A-Z])/g, " $1")}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Kitchen Amenities */}
              <div>
                <h3 className="font-medium text-slate-700">
                  Kitchen Amenities
                </h3>
                <div className="space-y-2">
                  {[
                    "fullyEquippedKitchen",
                    "microwave",
                    "refrigerator",
                    "dishwasher",
                    "coffeeMaker",
                    "oven",
                    "toaster",
                    "stove",
                    "cookingUtensils",
                  ].map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={amenities.kitchen[amenity]}
                        onChange={() =>
                          handleAmenitiesChange("kitchen", amenity)
                        }
                      />
                      <span>{amenity.replace(/([A-Z])/g, " $1")}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bathroom Amenities */}
              <div>
                <h3 className="font-medium text-slate-700">
                  Bathroom Amenities
                </h3>
                <div className="space-y-2">
                  {[
                    "bathtub",
                    "shower",
                    "toiletries",
                    "hairDryer",
                    "towels",
                    "washingMachine",
                  ].map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={amenities.bathroom[amenity]}
                        onChange={() =>
                          handleAmenitiesChange("bathroom", amenity)
                        }
                      />
                      <span>{amenity.replace(/([A-Z])/g, " $1")}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Entertainment */}
              <div>
                <h3 className="font-medium text-slate-700">Entertainment</h3>
                <div className="space-y-2">
                  {[
                    "cableTV",
                    "streamingServices",
                    "booksAndMagazines",
                    "boardGames",
                    "musicSystem",
                  ].map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={amenities.entertainment[amenity]}
                        onChange={() =>
                          handleAmenitiesChange("entertainment", amenity)
                        }
                      />
                      <span>{amenity.replace(/([A-Z])/g, " $1")}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Outdoor Amenities */}
              <div>
                <h3 className="font-medium text-slate-700">
                  Outdoor Amenities
                </h3>
                <div className="space-y-2">
                  {[
                    "balconyPatio",
                    "privateGarden",
                    "bbqGrill",
                    "outdoorDiningArea",
                    "swimmingPool",
                    "hotTub",
                  ].map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={amenities.outdoor[amenity]}
                        onChange={() =>
                          handleAmenitiesChange("outdoor", amenity)
                        }
                      />
                      <span>{amenity.replace(/([A-Z])/g, " $1")}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Property Media Accordion */}
        <AccordionItem value="item-5">
        <AccordionTrigger className="w-full flex justify-between items-center text-lg font-semibold text-slate-900 py-3 px-4 bg-white border-b-2 border-slate-200 rounded-md hover:bg-slate-50 hover:no-underline transition-all">
  <span className="flex-1 text-left">Property Cover Photo</span>
  <span
    className={`mx-2 text-xs font-medium py-1 px-3 rounded-full ${
      isCoverPhotoUploaded() ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`}
  >
    {isCoverPhotoUploaded() ? "Completed" : "Incomplete"}
  </span>
</AccordionTrigger>

          <AccordionContent className="bg-white p-6 space-y-6 shadow-md rounded-lg">
            <div className="relative">
              {/* Input for cover photo upload */}
              <label className="block text-sm font-medium text-slate-700">
                Upload Cover Photo
              </label>
              {/* Cover Photo Clickable Area */}
              <div
                onClick={() =>
                  document.getElementById("cover-photo-input").click()
                }
                className={`mt-2  ${
                  coverPhoto
                    ? "cursor-pointer"
                    : "cursor-pointer border-2 border-dashed border-slate-300"
                }`}
              >
                {/* Show cover photo if uploaded */}
                {coverPhoto ? (
                  <div className="relative">
                    <img
                      src={coverPhoto}
                      alt="cover-photo"
                      className="object-cover h-52 w-full rounded-lg"
                    />
                    {/* Delete button appears on hover */}
                    <button
                      onClick={handleCoverPhotoDelete}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-70 hover:opacity-100"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <p className="text-center text-slate-400 h-52">
                    Click to upload a cover photo
                  </p>
                )}
              </div>
              {/* Hidden file input for cover photo */}
              <input
                type="file"
                id="cover-photo-input"
                accept="image/*"
                onChange={handleCoverPhotoUpload}
                className="hidden"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Property Media Accordion for Multiple Image Upload */}
        <AccordionItem value="item-6">
        <AccordionTrigger className="w-full flex justify-between items-center text-lg font-semibold text-slate-900 py-3 px-4 bg-white border-b-2 border-slate-200 rounded-md hover:bg-slate-50 hover:no-underline transition-all">
  <span className="flex-1 text-left">Property Media (Multiple Images)</span>
  <span
    className={`mx-2 text-xs font-medium py-1 px-3 rounded-full ${
      propertyMedia.length > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`}
  >
    {propertyMedia.length > 0 ? "Completed" : "Incomplete"}
  </span>
</AccordionTrigger>

          <AccordionContent className="bg-white p-6 space-y-6 shadow-md rounded-lg">
            {/* Input for uploading media */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Upload Property Media
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMediaImageUpload}
                className="mt-2 py-2 px-4 border rounded-lg bg-slate-50"
                disabled={isUploading} // Disable during upload
              />
            </div>

            {/* Display uploaded media images with delete buttons */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {propertyMedia.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
                    alt={`property-media-${index}`}
                    className="object-cover w-full h-40 rounded-lg"
                  />
                  {/* Delete button */}
                  <button
                    onClick={() => handleMediaImageDelete(imageUrl)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-70 hover:opacity-100"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            {isUploading && (
              <p className="mt-4 text-sm text-slate-600">Uploading...</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex justify-end gap-4 mt-6">
        <Button
          type="button"
          className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-all"
          onClick={handleDiscard}
        >
          Discard
        </Button>
        <Button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
          onClick={createNewListing}
          disabled={!isPostEnable}
        >
          {
            createLoading?<Loader2 className="h-4 w-4 text-slate-300 animate-spin" />:"Post Listing"
          }
        </Button>
      </div>
    </div>
  ); 
};

export default CreateListingForm;
