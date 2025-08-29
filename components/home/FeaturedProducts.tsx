"use client";

import React from "react";
import DraggableProductList from "./DraggableProductList";
import { useProducts } from "@/hooks/useProducts";

export default function FeaturedProducts() {
  const { getPopularProducts, loading } = useProducts();

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-gray-500">상품 로딩 중...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <DraggableProductList
      title="베스트 셀러"
      subtitle="LUMINA 고객들이 가장 사랑하는 스타일들을 만나보세요"
      products={getPopularProducts(12)}
      viewAllLink="/categories/best"
      className="bg-gradient-to-b from-white to-gray-50"
    />
  );
}
