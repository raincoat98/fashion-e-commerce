"use client";

import React, { useState, useEffect } from "react";
import DraggableProductList from "./DraggableProductList";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    // 로컬 스토리지에서 최근 본 상품 가져오기
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) {
      try {
        const products = JSON.parse(stored);
        setRecentProducts(products.slice(0, 8)); // 최대 8개 표시
      } catch (error) {
        console.error("Failed to parse recently viewed products:", error);
      }
    }
  }, []);

  if (recentProducts.length === 0) {
    return null; // 최근 본 상품이 없으면 섹션을 숨김
  }

  return (
    <DraggableProductList
      title="최근 본 상품"
      subtitle="방금 전에 살펴보신 상품들을 다시 확인해보세요"
      products={recentProducts}
      viewAllLink="/recently-viewed"
      showViewAll={false}
    />
  );
}
