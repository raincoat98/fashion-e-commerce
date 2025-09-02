import { useEffect, useCallback } from "react";
import {
  useProductStore,
  Product as StoreProduct,
} from "@/stores/useProductStore";
import { useLoading } from "./useLoading";

export interface Product {
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
  description?: string;
}

// StoreProduct를 Product로 변환하는 함수
const convertStoreProductToProduct = (storeProduct: StoreProduct): Product => {
  const discount = storeProduct.originalPrice
    ? Math.round(
        ((storeProduct.originalPrice - storeProduct.price) /
          storeProduct.originalPrice) *
          100
      )
    : undefined;

  const convertedProduct = {
    id: storeProduct.id,
    name: storeProduct.name,
    price: storeProduct.price,
    originalPrice: storeProduct.originalPrice,
    image: storeProduct.images[0] || "", // 첫 번째 이미지를 메인 이미지로 사용
    category: storeProduct.category,
    rating: storeProduct.rating,
    reviewCount: storeProduct.reviewCount,
    isNew: storeProduct.isNew,
    isSale: storeProduct.isSale || !!storeProduct.originalPrice,
    discount,
    description: storeProduct.description,
  };

  // 이미지 URL 로그만 출력
  console.log(`상품 ${convertedProduct.id} 이미지:`, convertedProduct.image);
  return convertedProduct;
};

export function useProducts() {
  const {
    loading,
    error,
    data: products,
    execute,
    setData,
  } = useLoading({
    delay: 300,
    onError: (error) => console.error("Failed to load products:", error),
  });

  // useProductStore에서 상품 데이터 가져오기
  const storeProducts = useProductStore((state) => state.products);

  // 상품 데이터 로드 (필요시 사용)
  const loadProducts = useCallback(async () => {
    return await execute(async () => {
      console.log("useProducts - storeProducts:", storeProducts);

      // useProductStore의 활성화된 상품들만 필터링 후 Product 형식으로 변환
      const activeProducts = storeProducts.filter(
        (product) => product.isActive
      );
      const convertedProducts = activeProducts.map(
        convertStoreProductToProduct
      );

      console.log("useProducts - convertedProducts:", convertedProducts);

      // 로딩 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 100));

      return convertedProducts;
    });
  }, [storeProducts, execute]);

  // storeProducts가 변경될 때마다 products 업데이트
  useEffect(() => {
    if (storeProducts.length > 0) {
      const activeProducts = storeProducts.filter(
        (product) => product.isActive
      );
      const convertedProducts = activeProducts.map(
        convertStoreProductToProduct
      );
      setData(convertedProducts);
    } else {
      setData([]);
    }
  }, [storeProducts, setData]);

  // 카테고리별 상품 필터링
  const getProductsByCategory = (category: string) => {
    if (!products || !Array.isArray(products)) {
      return [];
    }

    // 한글 카테고리명을 영문 카테고리명으로 매핑
    const categoryMapping: { [key: string]: string } = {
      상의: "top",
      하의: "bottom",
      원피스: "dress",
      아우터: "outer",
    };

    const mappedCategory = categoryMapping[category] || category;

    const categoryProducts = products.filter(
      (product) => product.category === mappedCategory
    );
    console.log(
      `${category}(${mappedCategory}) 카테고리 필터링 결과:`,
      categoryProducts
    );
    return categoryProducts;
  };

  // 신상품 필터링
  const getNewProducts = () => {
    if (!products || !Array.isArray(products)) {
      return [];
    }
    const newProducts = products.filter((product) => product.isNew);
    console.log("신상품 필터링 결과:", newProducts);
    return newProducts;
  };

  // 할인 상품 필터링
  const getSaleProducts = () => {
    if (!products || !Array.isArray(products)) {
      return [];
    }
    const saleProducts = products.filter((product) => product.isSale);
    console.log("할인 상품 필터링 결과:", saleProducts);
    return saleProducts;
  };

  // 인기 상품 필터링 (평점 기준)
  const getPopularProducts = (limit: number = 8) => {
    if (!products || !Array.isArray(products)) {
      return [];
    }
    return products.sort((a, b) => b.rating - a.rating).slice(0, limit);
  };

  // 이미지 URL 검증
  const isValidImageUrl = (url: string): boolean => {
    if (!url || url.trim() === "") return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // 상품 검색
  const searchProducts = (query: string) => {
    if (!products || !Array.isArray(products)) {
      return [];
    }
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.description?.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    products: products || [],
    loading,
    error,
    getProductsByCategory,
    getNewProducts,
    getSaleProducts,
    getPopularProducts,
    searchProducts,
    reloadProducts: loadProducts,
    // 안전한 getter 함수들
    getProductsSafely: () => products || [],
    hasProducts: () => !!(products && products.length > 0),
  };
}
