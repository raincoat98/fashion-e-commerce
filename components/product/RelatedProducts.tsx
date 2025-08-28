"use client";

import React from "react";
import ProductCard from "@/components/product/ProductCard";

interface RelatedProductsProps {
  currentProductId: number;
}

export default function RelatedProducts({
  currentProductId,
}: RelatedProductsProps) {
  // Mock related products - replace with actual API call
  // In a real app, this would be based on:
  // - Same category products
  // - Frequently bought together
  // - User viewing history
  // - Similar price range
  const relatedProducts = [
    {
      id: 101,
      name: "슬림핏 데님 자켓",
      price: 59000,
      originalPrice: 89000,
      image:
        "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
      hoverImage:
        "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "34% OFF",
      rating: 4.6,
      reviewCount: 89,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 102,
      name: "와이드 슬랙스",
      price: 39000,
      originalPrice: 65000,
      image:
        "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=400",
      hoverImage:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "40% OFF",
      rating: 4.8,
      reviewCount: 156,
      sizes: ["S", "M", "L"],
    },
    {
      id: 103,
      name: "크롭 니트 가디건",
      price: 45000,
      originalPrice: 75000,
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      hoverImage:
        "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "40% OFF",
      rating: 4.7,
      reviewCount: 203,
      sizes: ["S", "M", "L"],
    },
    {
      id: 104,
      name: "하이웨스트 스커트",
      price: 29000,
      originalPrice: 49000,
      image:
        "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
      hoverImage:
        "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "41% OFF",
      rating: 4.5,
      reviewCount: 112,
      sizes: ["S", "M", "L"],
    },
  ].filter((product) => product.id !== currentProductId);

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        함께 보면 좋은 상품
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
