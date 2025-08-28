import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-6">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center space-x-2 mb-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
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
          <div className="order-2 lg:order-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-8 w-3/4 mb-2" />
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
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-4 w-48" />
            </div>

            {/* Variant Selection */}
            <div className="space-y-6">
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
              <div className="flex space-x-3">
                <Skeleton className="flex-1 h-12" />
                <Skeleton className="h-12 w-12" />
                <Skeleton className="h-12 w-12" />
              </div>
              <Skeleton className="w-full h-12" />
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-6 w-6 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto mb-1" />
                  <Skeleton className="h-3 w-20 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Tabs Skeleton */}
        <div className="mt-16">
          <div className="flex space-x-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24" />
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-16">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
