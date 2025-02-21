import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, Utensils, Bath, Tv, Leaf, Shield, Accessibility, Dog, Dumbbell } from "lucide-react";

export default function AmenitiesComponent({ amenities }) {
  const [open, setOpen] = useState(false);

  const categoryIcons = {
    basic: <Wind size={20} />, 
    kitchen: <Utensils size={20} />, 
    bathroom: <Bath size={20} />, 
    entertainment: <Tv size={20} />, 
    outdoor: <Leaf size={20} />, 
    security: <Shield size={20} />, 
    accessibility: <Accessibility size={20} />, 
    pet: <Dog size={20} />, 
    additional: <Dumbbell size={20} />
  };

  return (
    <Card className=" mx-auto p-6  rounded-xl shadow-lg mt-6">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold">What this place offers</h2>
        
        {/* Basic Amenities */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <p>{amenities.basic.airConditioning ? "✔ Air Conditioning" : "✖ Air Conditioning"}</p>
          <p>{amenities.basic.heating ? "✔ Heating" : "✖ Heating"}</p>
          <p>{amenities.basic.wifi ? "✔ WiFi" : "✖ WiFi"}</p>
          <p>{amenities.basic.parking ? "✔ Parking" : "✖ Parking"}</p>
          <p>{amenities.basic.hotWater ? "✔ Hot Water" : "✖ Hot Water"}</p>
        </div>

        {/* Show More Button & Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4 w-full">Show all amenities</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto p-6 rounded-lg w-full max-w-lg">
            <DialogHeader>
              <DialogTitle>All Amenities</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {Object.entries(amenities).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-md font-semibold border-b pb-2 capitalize flex items-center space-x-2">
                    {categoryIcons[category]} <span>{category}</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {Object.entries(items).map(([amenity, available]) => (
                      <p key={amenity}>{available ? `✔ ${amenity.replace(/([A-Z])/g, ' $1').trim()}` : `✖ ${amenity.replace(/([A-Z])/g, ' $1').trim()}`}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
