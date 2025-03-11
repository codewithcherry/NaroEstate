import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Import useRouter

const categories = [
  { name: "Town House", title:'townhouse', properties: 8, imageUrl: "https://media.istockphoto.com/id/904434370/photo/a-row-of-new-real-estate-townhouses-or-condominiums.jpg?s=612x612&w=0&k=20&c=hbHUW95Qk4BJfsXpun80ootC1ThuYSZ9qdY39fETt3M=" },
  { name: "Modern Villa", title:'modern_villa', properties: 2, imageUrl: "https://i.pinimg.com/236x/31/77/cc/3177cce8ab7ab38489474041cce18da5.jpg" },
  { name: "Apartment",  title:'apartment',properties: 1, imageUrl: "https://thumbs.dreamstime.com/b/new-high-skyscraper-red-brick-satellite-plates-12021637.jpg" },
  { name: "Single Family", title:'single_family', properties: 2, imageUrl: "https://media.istockphoto.com/id/171386121/photo/upscale-house.jpg?s=612x612&w=0&k=20&c=z5sqtwBXPI2KRAgPvIhbqjZAGF_02HP1jecS-SK6IkA=" },
  { name: "Office", title:'office', properties: 3, imageUrl: "https://media.istockphoto.com/id/995604146/photo/large-group-of-computer-programmers-working-in-the-office.jpg?s=612x612&w=0&k=20&c=UZUVEASeFamoDqVJ5OB3oR0WtJ6WdLJW84tYlsQjpCY=" },
];

const CategoryCards = () => {
  const router = useRouter(); // Initialize the router

  // Function to handle card click
  const handleCardClick = (categoryName) => {
    router.push(`/listings?propertyType=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="container mx-auto py-10 w-full">
      <h2 className="text-3xl font-bold text-center text-foreground">Featured Categories</h2>
      <p className="text-center text-muted-foreground mt-2">Find your space based on wide variaties and categories.</p>

      {/* Desktop and Tablet View */}
      <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => handleCardClick(category.title)} // Add click handler
              className="cursor-pointer" // Add pointer cursor
            >
              <Card className="bg-card text-card-foreground rounded-[var(--radius)] overflow-hidden shadow-md border">
                <div className="relative">
                  <img src={category.imageUrl} alt={category.name} className="w-full h-56 object-cover" />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="text-sm">{category.properties} Properties</p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden mt-8">
        <div className="grid grid-cols-2 gap-4">
          {/* First category (Full Width) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => handleCardClick(categories[0].title)} // Add click handler
              className="cursor-pointer" // Add pointer cursor
            >
              <Card className="col-span-2 bg-card text-card-foreground rounded-[var(--radius)] overflow-hidden shadow-md border">
                <div className="relative">
                  <img src={categories[0].imageUrl} alt={categories[0].name} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{categories[0].name}</h3>
                    <p className="text-sm">{categories[0].properties} Properties</p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* 2x2 Grid for Remaining Categories */}
          {categories.slice(1).map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => handleCardClick(category.title)} // Add click handler
                className="cursor-pointer" // Add pointer cursor
              >
                <Card className="bg-card text-card-foreground rounded-[var(--radius)] overflow-hidden shadow-md border">
                  <div className="relative">
                    <img src={category.imageUrl} alt={category.name} className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-sm font-semibold">{category.name}</h3>
                      <p className="text-xs">{category.properties} Properties</p>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCards;