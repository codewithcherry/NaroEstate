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

const properties = [
  {
    id: 1,
    title: "Modern Office at Downtown",
    beds: 4,
    baths: 2,
    area: "1500 sqft",
    price: "$300/month",
    image:
      "https://img.freepik.com/free-photo/modern-office-space-interior_158595-5206.jpg",
  },
  {
    id: 2,
    title: "Spacious Office in Midtown",
    beds: 5,
    baths: 3,
    area: "1800 sqft",
    price: "$400/month",
    image:
      "https://img.freepik.com/free-photo/modern-office-interior-with-large-windows_158595-5197.jpg",
  },
  {
    id: 3,
    title: "Cozy Workspace in Uptown",
    beds: 3,
    baths: 1,
    area: "1200 sqft",
    price: "$250/month",
    image:
      "https://img.freepik.com/free-photo/modern-office-with-minimalist-furniture_158595-5181.jpg",
  },
];

const BannerCarousel = () => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[autoplayPlugin.current]}
      className="relative w-full mx-auto overflow-hidden bg-muted"
    >
      <CarouselContent className="flex">
        {properties.map((property) => (
          <CarouselItem key={property.id} className="flex-[0_0_100%] p-4">
            <div className="max-w-7xl mx-auto px-4">
              <Card className="relative bg-card border border-muted-foreground shadow-lg overflow-hidden">
                <div className="h-80 md:h-[28rem] bg-muted relative flex items-center justify-center">
                  <div className="absolute inset-0">
                    <div
                      className="h-full w-full bg-center bg-cover"
                      style={{ backgroundImage: `url('${property.image}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="relative z-10 text-center px-4">
                    <div className="text-sm text-white/80 font-medium font-roboto mb-2">
                      {property.beds} Beds • {property.baths} Baths •{" "}
                      {property.area}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground font-roboto drop-shadow-md">
                      {property.title}
                    </h1>
                    <div className="text-lg md:text-xl text-primary-foreground mt-4 font-medium font-roboto">
                      {property.price}
                    </div>
                    <button className="mt-6 px-6 py-2 bg-accent text-accent-foreground font-roboto rounded-lg hover:bg-accent/80 transition-all duration-200">
                      View Details →
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

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
