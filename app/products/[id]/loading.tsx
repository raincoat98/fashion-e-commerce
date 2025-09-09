import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-4 lg:py-6 px-4 lg:px-0">
        {/* Breadcrumb Skeleton */}
        <div className="hidden sm:flex items-center space-x-2 mb-4 lg:mb-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Product Images Skeleton */}
          <div className="order-1 lg:order-1">
            <Skeleton className="aspect-square rounded-2xl mb-4" />
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="order-2 lg:order-2 space-y-4 lg:space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-6 lg:h-8 w-3/4 mb-2" />
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-4" />
                  ))}
                </div>
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3 flex-wrap">
                <Skeleton className="h-7 lg:h-8 w-24" />
                <Skeleton className="h-5 lg:h-6 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-4 w-48" />
            </div>

            {/* Variant Selection */}
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-3">
                <Skeleton className="h-5 w-32" />
                <div className="flex space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-12" />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-32" />
                <div className="flex space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-16 rounded-full" />
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex space-x-2 lg:space-x-3">
                <Skeleton className="flex-1 h-12" />
                <Skeleton className="h-12 w-12" />
                <Skeleton className="h-12 w-12" />
              </div>
              <Skeleton className="w-full h-12" />
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4 py-4 lg:py-6 border-t border-gray-200">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-5 w-5 lg:h-6 lg:w-6 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto mb-1" />
                  <Skeleton className="h-3 w-20 mx-auto hidden sm:block" />
                </div>
              ))}
            </div>

            {/* Brand Story */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 lg:p-6 rounded-2xl space-y-3 lg:space-y-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-6 h-6 lg:w-8 lg:h-8 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>

            {/* Product Features */}
            <div className="space-y-3 lg:space-y-4">
              <Skeleton className="h-5 w-24" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <Skeleton className="h-3 w-3 mt-1 flex-shrink-0" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs Skeleton */}
        <div className="mt-12 lg:mt-16">
          <div className="flex space-x-2 lg:space-x-4 mb-6 lg:mb-8 overflow-x-auto">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-20 lg:w-24 flex-shrink-0" />
            ))}
          </div>
          <Skeleton className="h-48 lg:h-64 w-full" />
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-12 lg:mt-16">
          <Skeleton className="h-6 lg:h-8 w-36 lg:w-48 mb-6 lg:mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Actions Skeleton */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-40 shadow-lg">
        <div className="flex space-x-2">
          <Skeleton className="flex-1 h-12" />
          <Skeleton className="flex-1 h-12" />
        </div>
      </div>
    </div>
  );
}
