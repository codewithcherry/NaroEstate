'use client';
import BannerCarousel from "@/components/react-components/home/BannerCarousel";
import CityCards from "@/components/react-components/home/CityCards";
import WhyWorkWithUs from "@/components/react-components/home/WhyWorkWithUs";

export default function Home() {
  return (
    <div className="mx-auto bg-muted">
      
      <BannerCarousel />
      <CityCards />
      <WhyWorkWithUs />
    </div>
  );
}
