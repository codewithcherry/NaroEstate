import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaWind, FaUtensils, FaBath, FaTv, FaLeaf, FaShieldAlt, FaWheelchair, FaDog, FaDumbbell,
  FaThermometerHalf, FaWifi, FaParking, FaTint, FaTv as FaTv2, FaBook, FaGamepad, FaMusic,
  FaHome, FaTree, FaSwimmingPool, FaCamera, FaLock, FaSmoking, FaSmokingBan, FaArrowUp,
  FaMountain, FaBone, FaSpa, FaFireAlt, FaBaby, FaBed, FaUtensils as FaBowlIcon
} from "react-icons/fa"; // Using Font Awesome icons from React Icons

export default function AmenitiesComponent({ amenities = {} }) {
  const [open, setOpen] = useState(false);

  const categoryIcons = {
    basic: <FaWind size={20} />,
    kitchen: <FaUtensils size={20} />,
    bathroom: <FaBath size={20} />,
    entertainment: <FaTv size={20} />,
    outdoor: <FaLeaf size={20} />,
    security: <FaShieldAlt size={20} />,
    accessibility: <FaWheelchair size={20} />,
    pet: <FaDog size={20} />,
    additional: <FaDumbbell size={20} />
  };

  const amenityIcons = {
    airConditioning: <FaThermometerHalf size={20} />,
    heating: <FaThermometerHalf size={20} />,
    wifi: <FaWifi size={20} />,
    parking: <FaParking size={20} />,
    hotWater: <FaTint size={20} />,
    fullyEquippedKitchen: <FaUtensils size={20} />,
    microwave: <FaHome size={20} />,
    refrigerator: <FaHome size={20} />,
    dishwasher: <FaHome size={20} />,
    coffeeMaker: <FaHome size={20} />,
    oven: <FaHome size={20} />,
    toaster: <FaHome size={20} />,
    stove: <FaHome size={20} />,
    cookingUtensils: <FaUtensils size={20} />,
    bathtub: <FaBath size={20} />,
    shower: <FaBath size={20} />,
    toiletries: <FaBath size={20} />,
    hairDryer: <FaBath size={20} />,
    towels: <FaBath size={20} />,
    washingMachine: <FaBath size={20} />,
    cableTV: <FaTv2 size={20} />,
    streamingServices: <FaTv2 size={20} />,
    booksAndMagazines: <FaBook size={20} />,
    boardGames: <FaGamepad size={20} />,
    musicSystem: <FaMusic size={20} />,
    balconyPatio: <FaHome size={20} />,
    privateGarden: <FaTree size={20} />,
    bbqGrill: <FaHome size={20} />, // Placeholder for BBQ Grill
    outdoorDiningArea: <FaHome size={20} />, // Placeholder for Outdoor Dining
    swimmingPool: <FaSwimmingPool size={20} />,
    hotTub: <FaSwimmingPool size={20} />, // Placeholder for Hot Tub
    securityCameras: <FaCamera size={20} />,
    gatedProperty: <FaLock size={20} />,
    alarmSystem: <FaSmoking size={20} />, // Placeholder for Alarm System
    safe: <FaLock size={20} />, // Placeholder for Safe
    smokeDetectors: <FaSmokingBan size={20} />,
    carbonMonoxideDetectors: <FaSmokingBan size={20} />,
    elevator: <FaArrowUp size={20} />,
    wheelchairAccessible: <FaWheelchair size={20} />,
    rampAccess: <FaMountain size={20} />, // Placeholder for Ramp Access
    petFriendly: <FaBone size={20} />,
    petBowls: <FaBowlIcon size={20} />, // Using Utensils as a placeholder for Pet Bowls
    fencedYard: <FaHome size={20} />, // Replaced FaFence with FaHome as a placeholder
    gym: <FaDumbbell size={20} />,
    spa: <FaSpa size={20} />,
    fireplace: <FaFireAlt size={20} />,
    washerDryer: <FaHome size={20} />, // Placeholder for Washer/Dryer
    highChairs: <FaBaby size={20} />,
    crib: <FaBed size={20} />
  };

  return (
    <Card className="mx-auto p-6 rounded-xl shadow-lg mt-6">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold">What this place offers</h2>

        {/* Basic Amenities */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          {Object.entries(amenities?.basic || {}).map(([amenity, available]) => (
            <div key={amenity} className="flex items-center space-x-2">
              {amenityIcons[amenity]}
              <p className={available ? "" : "line-through"}>
                {amenity.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
          ))}
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
                    {Object.entries(items || {}).map(([amenity, available]) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        {amenityIcons[amenity]}
                        <p className={available ? "" : "line-through"}>
                          {amenity.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                      </div>
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