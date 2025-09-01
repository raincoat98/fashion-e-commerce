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
  const { products: storeProducts, setSelectedCategory } = useProductStore();

  // 카테고리 설정
  React.useEffect(() => {
    setSelectedCategory(categorySlug);
  }, [categorySlug, setSelectedCategory]);

  // 카테고리 매핑 (영어 -> 한글)
  const categoryMapping: { [key: string]: string } = {
    top: "상의",
    bottom: "하의",
    outer: "아우터",
    dress: "드레스",
    shoes: "신발",
    bag: "가방",
    accessory: "액세서리",
    underwear: "언더웨어",
  };

  // 실제 상품 데이터 사용 (props로 받은 데이터는 fallback)
  const displayProducts = storeProducts.length > 0 ? storeProducts : products;

  // 상품 데이터를 ProductGrid에 맞는 형태로 변환
  const formattedProducts = displayProducts.map((product) => ({
    ...product,
    images: product.images || ["/images/placeholder.jpg"],
    // 실제 상품 데이터의 카테고리를 유지 (영어)
    inStock: true,
  }));

  // 특별 카테고리 필터 설정
  const getSpecialFilter = () => {
    switch (categorySlug) {
      case "new":
        return { isNew: true };
      case "best":
        return { isBest: true };
      case "sale":
        return { onSale: true };
      default:
        return {};
    }
  };

  return (
    <ProductGrid
      products={formattedProducts}
      showSearchBar={true}
      defaultViewMode="grid"
      defaultCategory={
        categoryMapping[categorySlug] ||
        (categorySlug === "new" ||
        categorySlug === "best" ||
        categorySlug === "sale"
          ? undefined
          : categoryName)
      }
      specialFilter={getSpecialFilter()}
    />
  );
}
