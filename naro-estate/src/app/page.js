'use client';
import BannerCarousel from "@/components/react-components/home/BannerCarousel";
import CategoryCards from "@/components/react-components/home/CategoryCards";
import CityCards from "@/components/react-components/home/CityCards";
import TrustedCompanies from "@/components/react-components/home/TrustedCompanies";
import WhyWorkWithUs from "@/components/react-components/home/WhyWorkWithUs";

export default function Home() {
  return (
    <div className="mx-auto bg-muted">
      
      <BannerCarousel />
      <CityCards />
      <WhyWorkWithUs />
      <CategoryCards />
      <TrustedCompanies />
    </div>
  );
}
