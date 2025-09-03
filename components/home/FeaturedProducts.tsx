"use client";

import React from "react";
import DraggableProductList from "./DraggableProductList";
import { useProducts } from "@/hooks/useProducts";
import LoadingWrapper from "@/components/ui/LoadingWrapper";

export default function FeaturedProducts() {
  const { getPopularProducts, loading, error } = useProducts();

  return (
    <LoadingWrapper
      loading={loading}
      error={error}
      type="container"
      text="베스트 상품을 불러오는 중..."
      className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <DraggableProductList
        title="베스트 셀러"
        subtitle="LUMINA 고객들이 가장 사랑하는 스타일들을 만나보세요"
        products={getPopularProducts(12)}
        viewAllLink="/categories/best"
        className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      />
    </LoadingWrapper>
  );
}
