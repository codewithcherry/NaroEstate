'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const ListingMedia = ({ coverPhoto, propertyMedia = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative container mx-auto flex flex-col md:flex-row gap-4 items-center md:items-start justify-center p-4">
      {/* Left Section: Cover Image */}
      <div className="w-full md:w-2/3 rounded-lg overflow-hidden shadow-xl relative h-[320px]">
        <motion.img
          src={coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* View All Photos Button - Mobile Only */}
        <Dialog open={open} onOpenChange={setOpen} modal={true}>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="md:hidden absolute bottom-4 right-4 flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 shadow-lg px-4 py-2 rounded-full transition-all"
            >
              <Eye size={20} />
              View All Photos
            </Button>
          </DialogTrigger>

          {/* Dialog Content - Fullscreen Modal */}
          <DialogContent className="items-center max-w-4xl bg-opacity-90 justify-center p-6 bg-slate-50 backdrop-blur-lg">
            <DialogTitle>Property Media</DialogTitle>
            <DialogDescription>Use navigation buttons to move the images</DialogDescription>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl p-6"
            >
              {/* Image Carousel */}
              <Carousel className="w-full">
                <CarouselContent>
                  {propertyMedia.length > 0 ? (
                    propertyMedia.map((imgUrl, index) => (
                      <CarouselItem key={index} className="flex justify-center">
                        <img
                          src={imgUrl}
                          alt={`media-${index}`}
                          className="w-full max-h-[550px] object-cover rounded-lg shadow-md"
                        />
                      </CarouselItem>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No images available</p>
                  )}
                </CarouselContent>
                <CarouselPrevious className="bg-[#334155] hover:bg-[#475569] text-white transition rounded-full p-3 shadow-md" />
                <CarouselNext className="bg-[#334155] hover:bg-[#475569] text-white transition rounded-full p-3 shadow-md" />
              </Carousel>
            </motion.div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Right Section: Grid of First 4 Images */}
      <div className="relative md:grid grid-cols-2 gap-2 p-1 hidden md:w-1/3 h-[320px]">
        {propertyMedia.slice(0, 4).map((imgUrl, index) => (
          <motion.div
            key={index}
            className="w-full h-full aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setOpen(true)}
          >
            <img
              src={imgUrl}
              alt={`media-${index}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        ))}

        {/* View All Photos Button - Desktop Only */}
        <Dialog open={open} onOpenChange={setOpen} modal={true}>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="hidden md:flex absolute bottom-4 right-4 items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 shadow-lg px-4 py-2 rounded-full transition-all"
            >
              <Eye size={20} />
              View All Photos
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  );
};

export default ListingMedia;