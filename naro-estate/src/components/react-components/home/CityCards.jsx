import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const cities = [
  { name: "New York", properties: 8, imageUrl: "https://i.pinimg.com/736x/27/aa/fe/27aafef03254c36e0f2d3d51a5b2035b.jpg" },
  { name: "Chicago", properties: 2, imageUrl: "https://i.pinimg.com/736x/93/a4/4d/93a44da71ce73b2b290a800cd2a8b72f.jpg" },
  { name: "Los Angeles", properties: 1, imageUrl: "https://as1.ftcdn.net/jpg/05/59/94/36/1000_F_559943680_DnMYLjyZhcDMjzptMHTNPo27cCuyivfY.jpg" },
  { name: "Miami", properties: 2, imageUrl: "https://i.pinimg.com/474x/fd/8c/68/fd8c680128a5f8dd017110d578c6ceeb.jpg" },
  { name: "Florida", properties: 3, imageUrl: "https://i.pinimg.com/564x/6d/97/f1/6d97f10a3a282f5c93001b2928d765d4.jpg" },
];

const CityCards = () => {
  return (
    <div className="container mx-auto py-10 w-full">
      <h2 className="text-3xl font-bold text-center text-foreground">Find Properties in These Cities</h2>
      <p className="text-center text-muted-foreground mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      {/* Desktop and Tablet View */}
      <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
        {cities.map((city) => (
          <Card key={city.name} className="bg-card text-card-foreground rounded-[var(--radius)] overflow-hidden shadow-md border">
            <div className="relative">
              <img src={city.imageUrl} alt={city.name} className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-black/30"></div>
              <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{city.name}</h3>
                <p className="text-sm">{city.properties} Properties</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden mt-8">
        <div className="grid grid-cols-2 gap-4">
          {/* First City (Full Width) */}
          <Card className="col-span-2 bg-card text-card-foreground rounded-[var(--radius)] overflow-hidden shadow-md border">
            <div className="relative">
              <img src={cities[0].imageUrl} alt={cities[0].name} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black/30"></div>
              <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{cities[0].name}</h3>
                <p className="text-sm">{cities[0].properties} Properties</p>
              </CardContent>
            </div>
          </Card>

          {/* 2x2 Grid for Remaining Cities */}
          {cities.slice(1).map((city) => (
            <Card key={city.name} className="bg-card text-card-foreground rounded-[var(--radius)] overflow-hidden shadow-md border">
              <div className="relative">
                <img src={city.imageUrl} alt={city.name} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
                <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-sm font-semibold">{city.name}</h3>
                  <p className="text-xs">{city.properties} Properties</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityCards;
