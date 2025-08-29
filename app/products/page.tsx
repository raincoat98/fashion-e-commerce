"use client";

import React from "react";
import { useProductStore } from "@/stores/useProductStore";
import ProductGrid from "@/components/product/ProductGrid";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ProductsPage() {
  const { products } = useProductStore();

  // 상품 데이터를 ProductGrid에 맞는 형태로 변환
  const formattedProducts = products.map((product) => ({
    ...product,
    images: product.images || ["/images/placeholder.jpg"],
    inStock: true,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            전체 상품
          </h1>
          <p className="text-gray-600">
            다양한 카테고리의 상품을 한 번에 만나보세요
          </p>
        </div>

        <ProductGrid
          products={formattedProducts}
          showSearchBar={true}
          defaultViewMode="grid"
          itemsPerPage={24}
        />
      </main>

      <Footer />
    </div>
  );
}
