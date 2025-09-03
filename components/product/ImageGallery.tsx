"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({
  images,
  productName,
}: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
        <img
          src={images[currentImage]}
          alt={`${productName} ${currentImage + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            </button>
          </>
        )}

        {/* Expand Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Expand className="h-4 w-4 text-gray-900 dark:text-gray-100" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 dark:bg-gray-900/80 text-white dark:text-gray-100 text-sm px-2 py-1 rounded">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
              currentImage === index
                ? "border-gray-900 dark:border-gray-100"
                : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <img
              src={image}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0 bg-black dark:bg-gray-900">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 dark:bg-gray-800/30 hover:bg-white/30 dark:hover:bg-gray-700/40 text-white dark:text-gray-100 rounded-full p-2"
            >
              <X className="h-6 w-6" />
            </button>

            <img
              src={images[currentImage]}
              alt={`${productName} ${currentImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 dark:bg-gray-800/30 hover:bg-white/30 dark:hover:bg-gray-700/40 text-white dark:text-gray-100 rounded-full p-3"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 dark:bg-gray-800/30 hover:bg-white/30 dark:hover:bg-gray-700/40 text-white dark:text-gray-100 rounded-full p-3"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Thumbnail Navigation in Modal */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentImage === index
                      ? "bg-white dark:bg-gray-100"
                      : "bg-white/50 dark:bg-gray-400/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
