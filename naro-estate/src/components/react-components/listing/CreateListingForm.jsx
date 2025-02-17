import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const CreateListingForm = () => {
  const [propertyInfo, setPropertyInfo] = useState({
    title: "",
    description: "",
    propertyType: "",
    propertyStatus: "",
    listingType: "",
    salePrice: "",
    rentPrice: "",
  });

  const isFormCompleted = () => {
    const { title, description, propertyType, propertyStatus, listingType, rentPrice, salePrice } = propertyInfo;
    if (!title || !description || !propertyType || !propertyStatus || !listingType) {
      return false;
    }
    if (listingType === "rent" && !rentPrice) return false;
    if (listingType === "sale" && !salePrice) return false;
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyInfo({
      ...propertyInfo,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6 p-8 max-w-4xl mx-auto">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex justify-between items-center text-lg font-semibold text-slate-900 py-3 px-4 bg-white border-b-2 border-slate-200 rounded-md hover:bg-slate-50 hover:no-underline transition-all">
            Property General Information
            <span
              className={`ml-2 text-xs font-medium py-1 px-3 rounded-full ${
                isFormCompleted() ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {isFormCompleted() ? "Completed" : "Incomplete"}
            </span>
          </AccordionTrigger>
          <AccordionContent className="bg-white p-6 space-y-6 shadow-md rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                <Input
                  name="title"
                  value={propertyInfo.title}
                  placeholder="Enter the property name"
                  onChange={handleInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <Input
                  name="description"
                  value={propertyInfo.description}
                  placeholder="Enter a description of the property"
                  onChange={handleInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                />
              </div>

              {/* Property Type */}
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-slate-700">Property Type</label>
                <select
                  name="propertyType"
                  value={propertyInfo.propertyType}
                  onChange={handleInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                >
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Town House</option>
                  <option value="modern_villa">Modern Villa</option>
                  <option value="single_family">Single Family</option>
                  <option value="office">Office</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              {/* Property Status */}
              <div>
                <label htmlFor="propertyStatus" className="block text-sm font-medium text-slate-700">Property Status</label>
                <select
                  name="propertyStatus"
                  value={propertyInfo.propertyStatus}
                  onChange={handleInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                >
                  <option value="">Select Property Status</option>
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                  <option value="under_repair">Under Repair</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              {/* Listing Type */}
              <div>
                <label htmlFor="listingType" className="block text-sm font-medium text-slate-700">Listing Type</label>
                <select
                  name="listingType"
                  value={propertyInfo.listingType}
                  onChange={handleInputChange}
                  className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                >
                  <option value="">Select Listing Type</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                  <option value="lease">Lease</option>
                  <option value="all">All</option>
                </select>
              </div>

              {/* Conditionally render Rent Price or Sale Price based on the listingType */}
              {propertyInfo.listingType === "rent" || propertyInfo.listingType === "all" ? (
                <div>
                  <label htmlFor="rentPrice" className="block text-sm font-medium text-slate-700">Rent Price</label>
                  <Input
                    name="rentPrice"
                    value={propertyInfo.rentPrice}
                    placeholder="Enter the rent price"
                    onChange={handleInputChange}
                    className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                  />
                </div>
              ) : null}

              {propertyInfo.listingType === "sale" || propertyInfo.listingType === "all" ? (
                <div>
                  <label htmlFor="salePrice" className="block text-sm font-medium text-slate-700">Sale Price</label>
                  <Input
                    name="salePrice"
                    value={propertyInfo.salePrice}
                    placeholder="Enter the sale price"
                    onChange={handleInputChange}
                    className="mt-2 p-3 w-full border rounded-lg border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-slate-500 transition-all"
                  />
                </div>
              ) : null}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CreateListingForm;
