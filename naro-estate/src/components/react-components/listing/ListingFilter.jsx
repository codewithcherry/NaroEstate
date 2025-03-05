import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Filter,
  Home,
  DollarSign,
  Key,
  Briefcase,
  Building2,
} from "lucide-react";

const ListingFilter = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    all: false,
    sale: false,
    rent: false,
    stay: false,
    lease: false,
    townHouse: false,
    modernVilla: false,
    apartment: false,
    singleFamily: false,
    office: false,
    commercial: false,
    petFriendly: false,
    petCare: false,
    beds: 1,
    baths: 1,
    priceRange: [0, 5000],
    city: "",
    state: "",
  });

  const handleFilterChange = (filter) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const clearFilters = () =>
    setFilters({
      all: false,
      sale: false,
      rent: false,
      stay: false,
      lease: false,
      townHouse: false,
      modernVilla: false,
      apartment: false,
      singleFamily: false,
      office: false,
      commercial: false,
      petFriendly: false,
      petCare: false,
      beds: 1,
      baths: 1,
      priceRange: [0, 5000],
      city: "",
      state: "",
    });

  const applyFilters = () => {
    setIsDialogOpen(false);
    console.log("Applied filters:", filters);
  };

  const icons = {
    All: <Home className="w-5 h-5" />,
    Sale: <DollarSign className="w-5 h-5" />,
    Rent: <Key className="w-5 h-5" />,
    Stay: <Briefcase className="w-5 h-5" />,
    Lease: <Building2 className="w-5 h-5" />,
  };

  return (
    <div>
      <div className="hidden md:flex justify-center space-x-4 mb-4">
        {["All", "Sale", "Rent", "Stay", "Lease"].map((type) => (
          <Button key={type} variant="ghost">
            {icons[type]} {type}
          </Button>
        ))}
        <Button variant="ghost" onClick={() => setIsDialogOpen(true)}>
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center px-4 py-2 z-50 border-t">
        {["All", "Sale", "Rent", "Stay", "Lease", "Filter"].map(
          (type, index) => (
            <Button
              key={type}
              variant="ghost"
              onClick={
                type === "Filter" ? () => setIsDialogOpen(true) : undefined
              }
              className="flex flex-col items-center text-xs text-gray-700 hover:text-black space-y-1"
            >
              {type === "Filter" ? <Filter className="w-5 h-5" /> : icons[type]}
              <span>{type}</span>
            </Button>
          )
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Filter Listings</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <h3 className="font-semibold">Listing Type</h3>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
              {["All", "Sale", "Rent", "Stay", "Lease"].map((type) => (
                <label key={type} className="flex items-center">
                  <Checkbox
                    checked={filters[type.toLowerCase()]}
                    onCheckedChange={() =>
                      handleFilterChange(type.toLowerCase())
                    }
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>
            <h3 className="font-semibold">Property Type</h3>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
              {[
                "Town House",
                "Modern Villa",
                "Apartment",
                "Single Family",
                "Office",
                "Commercial",
              ].map((type) => (
                <label key={type} className="flex items-center">
                  <Checkbox
                    checked={filters[type.toLowerCase().replace(/ /g, "")]}
                    onCheckedChange={() =>
                      handleFilterChange(type.toLowerCase().replace(/ /g, ""))
                    }
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>
            <h3 className="font-semibold">Price Range</h3>
            <Slider
              min={0}
              max={5000}
              defaultValue={[0, 5000]}
              onValueChange={(value) =>
                setFilters({ ...filters, priceRange: value })
              }
            />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
              <div>
                <h3 className="font-semibold">Number of Beds</h3>
                <Input
                  placeholder="Beds"
                  value={filters.beds}
                  onChange={(e) =>
                    setFilters({ ...filters, beds: e.target.value })
                  }
                />
                <h3 className="font-semibold">Number of Baths</h3>
                <Input
                  placeholder="Baths"
                  value={filters.baths}
                  onChange={(e) =>
                    setFilters({ ...filters, baths: e.target.value })
                  }
                />
              </div>
              <div>
                <h3 className="font-semibold">City </h3>
                <Input
                  placeholder="City"
                  value={filters.city}
                  onChange={(e) =>
                    setFilters({ ...filters, city: e.target.value })
                  }
                />
                <h3 className="font-semibold">State </h3>
                <Input
                  placeholder="State"
                  value={filters.state}
                  onChange={(e) =>
                    setFilters({ ...filters, state: e.target.value })
                  }
                />
              </div>
            </div>
            <h3 className="font-semibold">Amenities</h3>
            {["Pet-Friendly", "Pet Care"].map((amenity) => (
              <label key={amenity} className="flex items-center">
                <Checkbox
                  checked={filters[amenity.toLowerCase().replace(/ /g, "")]}
                  onCheckedChange={() =>
                    handleFilterChange(amenity.toLowerCase().replace(/ /g, ""))
                  }
                />
                <span className="ml-2">{amenity}</span>
              </label>
            ))}
          </div>
          <DialogFooter className="flex justify-between sticky bottom-0 bg-white py-2 px-4 rounded-md">
  <div className="flex-1 flex justify-start">
    <Button 
      variant="outline" 
      onClick={clearFilters} 
      className="w-full max-w-[120px]"
    >
      Clear All
    </Button>
  </div>
  <div className="flex-1 flex justify-end">
    <Button 
      onClick={applyFilters} 
      className="w-full max-w-[120px]"
    >
      Apply Filters
    </Button>
  </div>
</DialogFooter>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListingFilter;
