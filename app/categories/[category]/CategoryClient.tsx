"use client";

import React from "react";
import ProductGrid from "@/components/product/ProductGrid";
import { useProductStore } from "@/stores/useProductStore";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand?: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors?: string[];
  tags?: string[];
  isNew?: boolean;
  isSale?: boolean;
  isBest?: boolean;
  inStock?: boolean;
  description?: string;
}

interface CategoryClientProps {
  products: Product[];
  categoryName: string;
  categorySlug: string;
}

export default function CategoryClient({
  products,
  categoryName,
  categorySlug,
}: CategoryClientProps) {
  // 스토어에서 실제 상품 데이터 가져오기
  const { products: storeProducts, setSelectedCategory } = useProductStore();

  // 카테고리 설정
  React.useEffect(() => {
    setSelectedCategory(categorySlug);
  }, [categorySlug, setSelectedCategory]);

  // 실제 상품 데이터 사용 (props로 받은 데이터는 fallback)
  const displayProducts = storeProducts.length > 0 ? storeProducts : products;

  // 상품 데이터를 ProductGrid에 맞는 형태로 변환
  const formattedProducts = displayProducts.map((product) => ({
    ...product,
    images: product.images || ["/images/placeholder.jpg"],
    category: categoryName,
    inStock: true,
  }));

  return (
    <ProductGrid
      products={formattedProducts}
      showSearchBar={true}
      defaultViewMode="grid"
    />
  );
}
