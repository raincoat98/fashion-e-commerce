"use client";

import React from "react";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeaturedProducts() {
  // Mock data - replace with actual API call
  const products = [
    {
      id: 1,
      name: "베이직 코튼 티셔츠",
      price: 29000,
      originalPrice: 49000,
      image:
        "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "40% OFF",
      rating: 4.8,
      reviewCount: 127,
      sizes: ["S", "M", "L"],
    },
    {
      id: 2,
      name: "와이드 데님 팬츠",
      price: 39000,
      originalPrice: 69000,
      image:
        "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/852860/pexels-photo-852860.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "43% OFF",
      rating: 4.6,
      reviewCount: 89,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 3,
      name: "플로럴 맥시 원피스",
      price: 49000,
      originalPrice: 89000,
      image:
        "https://images.pexels.com/photos/852860/pexels-photo-852860.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "45% OFF",
      rating: 4.9,
      reviewCount: 203,
      sizes: ["S", "M", "L"],
    },
    {
      id: 4,
      name: "크롭 니트 가디건",
      price: 34000,
      originalPrice: 59000,
      image:
        "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "42% OFF",
      rating: 4.7,
      reviewCount: 156,
      sizes: ["S", "M", "L"],
    },
    {
      id: 5,
      name: "하이웨스트 미니스커트",
      price: 25000,
      originalPrice: 45000,
      image:
        "https://images.pexels.com/photos/1805411/pexels-photo-1805411.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "44% OFF",
      rating: 4.5,
      reviewCount: 78,
      sizes: ["S", "M", "L"],
    },
    {
      id: 6,
      name: "오버핏 블레이저",
      price: 59000,
      originalPrice: 99000,
      image:
        "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/852860/pexels-photo-852860.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "40% OFF",
      rating: 4.8,
      reviewCount: 245,
      sizes: ["S", "M", "L", "XL"],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">베스트 상품</h2>
          <p className="text-gray-600">고객들이 가장 많이 선택한 인기 아이템</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/categories/best">
            <Button variant="outline" size="lg" className="px-8 py-3">
              더 많은 베스트 상품 보기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
