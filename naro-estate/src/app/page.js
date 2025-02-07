'use client';
import BannerCarousel from "@/components/react-components/home/BannerCarousel";
import CityCards from "@/components/react-components/home/CityCards";

export default function Home() {
  return (
    <div className="mx-auto bg-muted">
      
      <BannerCarousel />
      <CityCards />
    </div>
  );
}
