"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProductStore } from "@/stores/useProductStore";
import ProductGrid from "@/components/product/ProductGrid";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { products, setSearchTerm } = useProductStore();

  // 검색어가 URL에서 변경되면 스토어 업데이트
  useEffect(() => {
    if (query) {
      setSearchTerm(query);
    }
  }, [query, setSearchTerm]);

  // 상품 데이터를 ProductGrid에 맞는 형태로 변환
  const formattedProducts = products.map((product) => ({
    ...product,
    images: product.images || ["/images/placeholder.jpg"],
    inStock: true,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {query ? `"${query}" 검색 결과` : "상품 검색"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {query
              ? `검색어 "${query}"에 대한 결과입니다`
              : "원하는 상품을 검색해보세요"}
          </p>
        </div>

        <ProductGrid
          products={formattedProducts}
          showSearchBar={true}
          defaultViewMode="grid"
        />
      </main>

      <Footer />
    </div>
  );
}
