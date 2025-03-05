"use client";

import { useState, useCallback } from "react";
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
import { useRouter, useSearchParams } from "next/navigation"; // Correct imports for App Router

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
    priceRange: [0, 5000], // Default price range
    city: "",
    state: "",
  });

  const router = useRouter(); // Get router instance
  const searchParams = useSearchParams(); // Get search params

  // Handle filter changes
  const handleFilterChange = useCallback((filter, checked) => {
    setFilters((prev) => ({ ...prev, [filter]: checked }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
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
    setIsDialogOpen(false);

    // Clear query parameters from the URL
    router.push("/listings");
  }, [router]);

  // Apply filters and update URL query parameters
  const applyFilters = useCallback(() => {
    setIsDialogOpen(false);

    // Construct query parameters
    const queryParams = new URLSearchParams();

    // Add listing type filters as a comma-separated list
    const selectedListingTypes = [];
    if (filters.all) selectedListingTypes.push("all");
    if (filters.sale) selectedListingTypes.push("sale");
    if (filters.rent) selectedListingTypes.push("rent");
    if (filters.stay) selectedListingTypes.push("stay");
    if (filters.lease) selectedListingTypes.push("lease");

    if (selectedListingTypes.length > 0) {
      queryParams.append("listingType", selectedListingTypes.join(","));
    }

    // Add property type filters as a comma-separated list
    const selectedPropertyTypes = [];
    if (filters.townHouse) selectedPropertyTypes.push("townHouse");
    if (filters.modernVilla) selectedPropertyTypes.push("modernVilla");
    if (filters.apartment) selectedPropertyTypes.push("apartment");
    if (filters.singleFamily) selectedPropertyTypes.push("singleFamily");
    if (filters.office) selectedPropertyTypes.push("office");
    if (filters.commercial) selectedPropertyTypes.push("commercial");

    if (selectedPropertyTypes.length > 0) {
      queryParams.append("propertyType", selectedPropertyTypes.join(","));
    }

    // Add amenities filters as a comma-separated list
    const selectedAmenities = [];
    if (filters.petFriendly) selectedAmenities.push("petFriendly");
    if (filters.petCare) selectedAmenities.push("petCare");

    if (selectedAmenities.length > 0) {
      queryParams.append("amenities", selectedAmenities.join(","));
    }

    // Add numeric filters
    if (filters.beds > 0) queryParams.append("beds", filters.beds);
    if (filters.baths > 0) queryParams.append("baths", filters.baths);
    if (filters.priceRange[0])
      queryParams.append("minPrice", filters.priceRange[0]);
    if (filters.priceRange[1])
      queryParams.append("maxPrice", filters.priceRange[1]);

    // Add location filters
    if (filters.city) queryParams.append("city", filters.city);
    if (filters.state) queryParams.append("state", filters.state);

    // Update the URL with query parameters
    router.push(`/listings?${queryParams.toString()}`);
  }, [filters, router]);

  // Icons for filter types
  const icons = {
    All: <Home className="w-5 h-5" />,
    Sale: <DollarSign className="w-5 h-5" />,
    Rent: <Key className="w-5 h-5" />,
    Stay: <Briefcase className="w-5 h-5" />,
    Lease: <Building2 className="w-5 h-5" />,
  };

  // Reusable checkbox renderer
  const renderCheckboxes = (items, category) => (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
      {items.map((item) => {
        const filterKey = item.toLowerCase().replace(/ /g, "");
        return (
          <label key={item} className="flex items-center">
            <Checkbox
              checked={filters[filterKey]}
              onCheckedChange={(checked) =>
                handleFilterChange(filterKey, checked)
              }
              aria-label={item}
            />
            <span className="ml-2">{item}</span>
          </label>
        );
      })}
    </div>
  );

  return (
    <div>
      {/* Desktop Filter Buttons */}
      <div className="hidden md:flex justify-center space-x-4 mb-4">
        {["All", "Sale", "Rent", "Stay", "Lease"].map((type) => (
          <Button key={type} variant="ghost" aria-label={`Filter by ${type}`}>
            {icons[type]} {type}
          </Button>
        ))}
        <Button
          variant="ghost"
          onClick={() => setIsDialogOpen(true)}
          aria-label="Open filters"
        >
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Filter Buttons */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center px-4 py-2 z-50 border-t">
        {["All", "Sale", "Rent", "Stay", "Lease", "Filter"].map((type) => (
          <Button
            key={type}
            variant="ghost"
            onClick={
              type === "Filter" ? () => setIsDialogOpen(true) : undefined
            }
            className="flex flex-col items-center text-xs text-gray-700 hover:text-black space-y-1"
            aria-label={
              type === "Filter" ? "Open filters" : `Filter by ${type}`
            }
          >
            {type === "Filter" ? <Filter className="w-5 h-5" /> : icons[type]}
            <span>{type}</span>
          </Button>
        ))}
      </div>

      {/* Filter Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Filter Listings</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {/* Listing Type */}
            <h3 className="font-semibold">Listing Type</h3>
            {renderCheckboxes(
              ["All", "Sale", "Rent", "Stay", "Lease"],
              "Listing Type"
            )}

            {/* Property Type */}
            <h3 className="font-semibold">Property Type</h3>
            {renderCheckboxes(
              [
                'townHouse',
                'modernVilla',
                'apartment',
                'singleFamily',
                'office',
                'commercial',
              ],
              "Property Type"
            )}

            {/* Price Range */}
            <h3 className="font-semibold">Price Range</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                ${filters.priceRange[0]}
              </span>
              <Slider
                min={0}
                max={5000}
                value={filters.priceRange}
                onValueChange={(value) => {
                  if (Array.isArray(value) && value.length === 2) {
                    setFilters((prev) => ({ ...prev, priceRange: value }));
                  }
                }}
                aria-label="Price range slider"
              />
              <span className="text-sm text-gray-600">
                ${filters.priceRange[1]}
              </span>
            </div>

            {/* Beds, Baths, City, State */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <h3 className="font-semibold">Number of Beds</h3>
                <Input
                  placeholder="Beds"
                  type="number"
                  min="1"
                  value={filters.beds}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      beds: parseInt(e.target.value) || 1,
                    })
                  }
                  aria-label="Number of beds"
                />
              </div>
              <div>
                <h3 className="font-semibold">Number of Baths</h3>
                <Input
                  placeholder="Baths"
                  type="number"
                  min="1"
                  value={filters.baths}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      baths: parseInt(e.target.value) || 1,
                    })
                  }
                  aria-label="Number of baths"
                />
              </div>
              <div>
                <h3 className="font-semibold">City</h3>
                <Input
                  placeholder="City"
                  value={filters.city}
                  onChange={(e) =>
                    setFilters({ ...filters, city: e.target.value })
                  }
                  aria-label="City"
                />
              </div>
              <div>
                <h3 className="font-semibold">State</h3>
                <Input
                  placeholder="State"
                  value={filters.state}
                  onChange={(e) =>
                    setFilters({ ...filters, state: e.target.value })
                  }
                  aria-label="State"
                />
              </div>
            </div>

            {/* Amenities */}
            <h3 className="font-semibold">Amenities</h3>
            {renderCheckboxes(["Pet-Friendly", "Pet Care"], "Amenities")}
          </div>

          {/* Dialog Footer */}
          <DialogFooter className="flex w-full justify-between items-center sticky bottom-0 bg-white shadow-md py-2 px-4 rounded-md">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full max-w-[120px]"
              aria-label="Clear all filters"
            >
              Clear All
            </Button>
            <Button
              onClick={applyFilters}
              className="w-full max-w-[120px] ml-auto"
              aria-label="Apply filters"
            >
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListingFilter;
