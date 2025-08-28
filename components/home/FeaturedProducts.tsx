"use client";

import React from "react";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function FeaturedProducts() {
  // Mock data - replace with actual API call
  const products = [
    {
      id: 1,
      name: "LUMINA 시그니처 티셔츠",
      price: 89000,
      originalPrice: 129000,
      image:
        "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "BEST",
      rating: 4.9,
      reviewCount: 127,
      sizes: ["S", "M", "L"],
    },
    {
      id: 2,
      name: "프리미엄 데님 팬츠",
      price: 129000,
      originalPrice: 189000,
      image:
        "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/852860/pexels-photo-852860.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "NEW",
      rating: 4.8,
      reviewCount: 89,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 3,
      name: "엘레간트 원피스",
      price: 159000,
      originalPrice: 229000,
      image:
        "https://images.pexels.com/photos/852860/pexels-photo-852860.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "HOT",
      rating: 4.9,
      reviewCount: 203,
      sizes: ["S", "M", "L"],
    },
    {
      id: 4,
      name: "크롭 니트 가디건",
      price: 99000,
      originalPrice: 149000,
      image:
        "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "LIMITED",
      rating: 4.7,
      reviewCount: 156,
      sizes: ["S", "M", "L"],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>TRENDING NOW</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="block">이번 주</span>
            <span className="lumina-text-gradient">베스트 셀러</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            LUMINA 고객들이 가장 사랑하는 스타일들을 만나보세요.
            <br />
            <span className="text-yellow-600 font-medium">빛나는 당신</span>을
            위한 특별한 컬렉션
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="group">
              <ProductCard product={product} />

              {/* Quick Buy Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Link href={`/products/${product.id}`}>
                    <Button
                      size="lg"
                      className="lumina-gradient hover:opacity-90 text-white px-6 py-3 font-semibold lumina-shadow"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      바로 구매
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              더 많은 스타일을 발견하세요
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              LUMINA의 전체 컬렉션에서 당신만의 특별한 스타일을 찾아보세요.
              새로운 경험과 함께 더욱 빛나는 당신을 만나보실 수 있습니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories/new">
                <Button
                  size="lg"
                  className="lumina-gradient hover:opacity-90 text-white px-8 py-4 text-lg font-semibold lumina-shadow-lg transition-all duration-300 group"
                >
                  전체 컬렉션 보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/categories/sale">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold transition-all duration-300"
                >
                  세일 상품 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
