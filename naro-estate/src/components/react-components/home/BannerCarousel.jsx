"use client";

import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa"; // Icons for beds, baths, and floor area
import { WifiHigh, ParkingCircle, AirVent, Waves } from "lucide-react"; // Icons for basic amenities
import { useRouter } from "next/navigation";

const properties = [
  {
    _id: "67b461ab8cf707b7bd6eb0ce",
    title: "Mystic Cove",
    description: "Mystic Cove - Luxury Lakefront Living, Available for rent/lease, with great neighborhood and lake view.",
    propertyType: "apartment",
    propertyStatus: "under_repair",
    listingType: "rent",
    salePrice: 0,
    rentPrice: 249,
    address: {
      doorNumber: "302",
      streetOrLocality: "Honey Meadow Hills",
      city: "Tampa",
      state: "Florida",
      zipCode: "837234",
    },
    propertyDetails: {
      baths: 2,
      beds: 2,
      kitchen: "Open Kitchen",
      furnishType: "furnished",
      parking: "available",
      floorArea: 2450,
    },
    amenities: {
      basic: {
        airConditioning: true,
        heating: true,
        wifi: true,
        parking: true,
        hotWater: false,
      },
      kitchen: {
        fullyEquippedKitchen: true,
        microwave: true,
        refrigerator: true,
        dishwasher: true,
        coffeeMaker: true,
        oven: true,
        toaster: true,
        stove: true,
        cookingUtensils: false,
      },
      bathroom: {
        bathtub: true,
        shower: true,
        toiletries: true,
        hairDryer: false,
        towels: false,
        washingMachine: true,
      },
      entertainment: {
        cableTV: true,
        streamingServices: false,
        booksAndMagazines: true,
        boardGames: true,
        musicSystem: false,
      },
      outdoor: {
        balconyPatio: true,
        privateGarden: false,
        bbqGrill: false,
        outdoorDiningArea: false,
        swimmingPool: true,
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
    },
    coverPhoto:
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1739874675/naro-estate/property-media/cover%20photo_1739874675228.webp.webp",
    propertyMedia: [
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1739874688/naro-estate/property-media/room1_1739874688000.webp.webp",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1739874693/naro-estate/property-media/room2_1739874693736.webp.webp",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1739874700/naro-estate/property-media/room3_1739874700633.webp.webp",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1739874706/naro-estate/property-media/room4_1739874706825.webp.webp",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1739874715/naro-estate/property-media/room5_1739874715017.webp.webp",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1739874723/naro-estate/property-media/room6_1739874722987.webp.webp",
    ],
    createdBy: "67ac5bbe87085daf1f738708",
    reviews: [],
    rating: 0,
    createdAt: "2025-02-18T10:32:11.625Z",
    updatedAt: "2025-03-07T12:02:26.591Z",
    __v: 0,
    stayPrice: 0,
  },
  {
    _id: "67b5a3ea3d6d338039130395",
    title: "Single Family Home in Los Angeles",
    description:
      "Settle into historic Hollywood in our brand new house with owned entrance private room-studio with queen size bed and privet bathroom. Very quiet and relaxing area, like 5 star hotel. Close to Hollywood Walk of Fame, Hollywood Sign, Sunset Blvd, West Hollywood, Hollywood Bowl (just 0,4 miles), Beverly Hills, The Grove, The Americana at Brand, Paramount Studios, Universal studio, Paladium, Downtown Los Angeles,Emerson College, Pantages Theatre, Highland,Hollywood lake park,Jimmy Kimmel show live The space You will have maximum privacy. Owned entrance, private Bedroom, private bathroom, private refrigerator, microwave backyard, pool, NO HOT TUB, patio, kettle and iron in the room. Absolutely quiet neighborhood. I have one more private room and bathroom with owned entry in the same property Guest access One bathroom, refrigerator, microwave , kettle and an iron. All private. Pool on the backyard and patio, NO HOT TUB.Comes with FREE Wi-Fi.",
    propertyType: "single_family",
    propertyStatus: "available",
    listingType: "rent",
    salePrice: 3242355,
    rentPrice: 2100,
    address: {
      doorNumber: "345451",
      streetOrLocality: "Hollywood",
      city: "Los Angeles",
      state: "California",
      zipCode: "324343",
    },
    propertyDetails: {
      baths: 2,
      beds: 2,
      kitchen: "Modern Kitchen",
      furnishType: "furnished",
      parking: "available",
      floorArea: 2100,
    },
    amenities: {
      basic: {
        airConditioning: true,
        heating: true,
        wifi: true,
        parking: true,
        hotWater: true,
      },
      kitchen: {
        fullyEquippedKitchen: true,
        microwave: true,
        refrigerator: true,
        dishwasher: true,
        coffeeMaker: true,
        oven: true,
        toaster: true,
        stove: true,
        cookingUtensils: false,
      },
      bathroom: {
        bathtub: true,
        shower: true,
        toiletries: true,
        hairDryer: false,
        towels: false,
        washingMachine: true,
      },
      entertainment: {
        cableTV: true,
        streamingServices: false,
        booksAndMagazines: true,
        boardGames: true,
        musicSystem: true,
      },
      outdoor: {
        balconyPatio: true,
        privateGarden: true,
        bbqGrill: true,
        outdoorDiningArea: true,
        swimmingPool: true,
        hotTub: false,
      },
      security: {
        securityCameras: true,
        gatedProperty: true,
        alarmSystem: true,
        safe: true,
        smokeDetectors: true,
        carbonMonoxideDetectors: false,
      },
      accessibility: {
        elevator: false,
        wheelchairAccessible: false,
        rampAccess: true,
      },
      pet: {
        petFriendly: true,
        petBowls: false,
        fencedYard: true,
      },
      additional: {
        gym: true,
        spa: false,
        fireplace: true,
        washerDryer: true,
        highChairs: false,
        crib: false,
      },
    },
    coverPhoto:
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1741362070/naro-estate/property-media/Single%20Cover_1741362070690.avif.avif",
    propertyMedia: [
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1741362086/naro-estate/property-media/single1_1741362086775.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1741362093/naro-estate/property-media/single2_1741362093782.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1741362102/naro-estate/property-media/single3_1741362102455.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1741362110/naro-estate/property-media/single4_1741362110910.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1741362122/naro-estate/property-media/single5_1741362122162.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1741362131/naro-estate/property-media/single6_1741362131306.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1741362137/naro-estate/property-media/single7_1741362137738.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1741362145/naro-estate/property-media/single8_1741362144974.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1741362155/naro-estate/property-media/single9_1741362154950.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1741362177/naro-estate/property-media/Single%20Cover_1741362177723.avif.avif",
    ],
    createdBy: "67adcf5486c2660ce575df8e",
    reviews: [],
    rating: 0,
    createdAt: "2025-02-19T09:27:06.504Z",
    updatedAt: "2025-03-07T15:43:00.355Z",
    __v: 0,
    stayPrice: 0,
  },
  {
    _id: "67bed8d89c1cabccc4de854a",
    title: "Hornbill House by Ataaz's farms",
    description:
      "Hornbill House by Ataaz's farms A wildlife themed luxury farmhouse tucked in a 1.5 acre fruit orchard in Rajanukunte, Bangalore. The farmhouse is perfect for get-togethers, bachelor's, intimate weddings and more. We have 4 themed rooms with attached ensuite bathrooms, one Dormitory/game room, indoor plunge pool and much more..",
    propertyType: "townhouse",
    propertyStatus: "available",
    listingType: "stay",
    salePrice: 0,
    rentPrice: 0,
    stayPrice: 147,
    address: {
      doorNumber: "43675",
      streetOrLocality: "Benglauru urban sector",
      city: "Bengalore",
      state: "Karnataka",
      zipCode: "536523",
    },
    propertyDetails: {
      baths: 3,
      beds: 3,
      kitchen: "Open Kitchen",
      furnishType: "furnished",
      parking: "available",
      floorArea: 3200,
    },
    amenities: {
      basic: {
        airConditioning: true,
        heating: true,
        wifi: true,
        parking: true,
        hotWater: true,
      },
      kitchen: {
        fullyEquippedKitchen: false,
        microwave: false,
        refrigerator: true,
        dishwasher: false,
        coffeeMaker: false,
        oven: true,
        toaster: false,
        stove: true,
        cookingUtensils: false,
      },
      bathroom: {
        bathtub: false,
        shower: true,
        toiletries: true,
        hairDryer: false,
        towels: true,
        washingMachine: false,
      },
      entertainment: {
        cableTV: true,
        streamingServices: false,
        booksAndMagazines: true,
        boardGames: true,
        musicSystem: true,
      },
      outdoor: {
        balconyPatio: true,
        privateGarden: true,
        bbqGrill: false,
        outdoorDiningArea: true,
        swimmingPool: true,
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
    },
    coverPhoto:
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1740560524/naro-estate/property-media/urbanvilla%20cover_1740560522583.avif.avif",
    propertyMedia: [
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1740560533/naro-estate/property-media/urban1_1740560531492.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1740560538/naro-estate/property-media/urban2_1740560538578.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1740560543/naro-estate/property-media/urban3_1740560543158.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1740560548/naro-estate/property-media/urban4_1740560548089.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1740560566/naro-estate/property-media/urban5_1740560564498.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1740560571/naro-estate/property-media/urban6_1740560570781.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1740560576/naro-estate/property-media/urban7_1740560576284.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1740560581/naro-estate/property-media/urban8_1740560580886.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1740560585/naro-estate/property-media/urban9_1740560585074.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1740560590/naro-estate/property-media/urban10_1740560589880.avif.avif",
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1740560596/naro-estate/property-media/urbanvilla%20cover_1740560595959.avif.avif",
    ],
    createdBy: "67adcf5486c2660ce575df8e",
    reviews: [],
    rating: 0,
    createdAt: "2025-02-26T09:03:20.328Z",
    updatedAt: "2025-02-26T09:03:20.328Z",
    __v: 0,
  }
];

const BannerCarousel = () => {

  const router=useRouter();
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  // Helper function to determine price display
  const getPriceDisplay = (property) => {
    switch (property.listingType) {
      case "sale":
        return `$${property.salePrice}`;
      case "rent":
        return `$${property.rentPrice}/month`;
      case "lease":
        return `$${property.salePrice}`;
      case "stay":
        return `$${property.stayPrice}/night`;
      default:
        return `$${property.salePrice}`;
    }
  };

  const handleViewDetails=(id)=>{
      router.push(`/listings/${id}`);
  }

  return (
    <Carousel
      plugins={[autoplayPlugin.current]}
      className="relative w-full mx-auto overflow-hidden bg-muted"
    >
      <CarouselContent className="flex">
        {properties.map((property) => (
          <CarouselItem key={property._id} className="flex-[0_0_100%] p-4">
            <div className="max-w-7xl mx-auto px-4">
              <Card className="relative bg-card border border-muted-foreground shadow-lg overflow-hidden h-[28rem] rounded-2xl">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${property.coverPhoto}')` }}
                ></div>

                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

                {/* Content on Left Side */}
                <div className="relative z-10 h-full flex items-center p-8">
                  <div className="w-full md:w-1/2 space-y-4">
                    {/* Listing Type and Property Type */}
                    <div className="text-sm text-white/80 font-medium">
                      {property.listingType.toUpperCase()} •{" "}
                      {property.propertyType.toUpperCase()}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      {property.title}
                    </h1>

                    {/* Description (Up to 100 characters) */}
                    <p className="text-white/80 text-sm">
                      {property.description.length > 100
                        ? `${property.description.substring(0, 100)}...`
                        : property.description}
                    </p>

                    {/* Beds, Baths, and Floor Area */}
                    <div className="flex items-center space-x-4 text-white/80">
                      <div className="flex items-center space-x-2">
                        <FaBed className="text-lg" />
                        <span>{property.propertyDetails.beds} Beds</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaBath className="text-lg" />
                        <span>{property.propertyDetails.baths} Baths</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaRulerCombined className="text-lg" />
                        <span>{property.propertyDetails.floorArea} sqft</span>
                      </div>
                    </div>

                    {/* Conditional Price Display */}
                    <div className="text-xl text-white font-semibold">
                      {getPriceDisplay(property)}
                    </div>

                    {/* Location */}
                    <div className="text-sm text-white/80 font-medium">
                      {property.address.streetOrLocality}, {property.address.city}
                    </div>

                    {/* Basic Amenities */}
                    <div className="flex items-center space-x-4 text-white/80">
                      {property.amenities.basic.airConditioning && (
                        <div className="flex items-center space-x-2">
                          <AirVent className="text-lg" />
                          <span>AC</span>
                        </div>
                      )}
                      {property.amenities.basic.wifi && (
                        <div className="flex items-center space-x-2">
                          <WifiHigh className="text-lg" />
                          <span>WiFi</span>
                        </div>
                      )}
                      {property.amenities.basic.parking && (
                        <div className="flex items-center space-x-2">
                          <ParkingCircle className="text-lg" />
                          <span>Parking</span>
                        </div>
                      )}
                      {property.amenities.basic.hotWater && (
                        <div className="flex items-center space-x-2">
                          <Waves className="text-lg" />
                          <span>Hot Water</span>
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <button
                    onClick={()=>handleViewDetails(property._id)}
                    className="mt-4 px-6 py-2 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/80 transition-all duration-200">
                      View Details →
                    </button>
                  </div>
                </div>

                {/* Status on Top Right */}
                <div className="absolute top-4 right-4 z-20 bg-card/90 px-4 py-2 rounded-full text-sm text-primary font-medium shadow-md">
                  {property.propertyStatus.replace("_", " ").toUpperCase()}
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Arrows */}
      <CarouselPrevious
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-secondary text-secondary-foreground p-3 rounded-full shadow-md hover:bg-secondary/80 transition-colors"
        aria-label="Previous Slide"
      />
      <CarouselNext
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondary text-secondary-foreground p-3 rounded-full shadow-md hover:bg-secondary/80 transition-colors"
        aria-label="Next Slide"
      />
    </Carousel>
  );
};

export default BannerCarousel;