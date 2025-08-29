import { useState, useEffect, useCallback } from "react";
import {
  useProductStore,
  Product as StoreProduct,
} from "@/stores/useProductStore";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useProductStore에서 상품 데이터 가져오기
  const storeProducts = useProductStore((state) => state.products);

  // 상품 데이터 로드
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

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
      await new Promise((resolve) => setTimeout(resolve, 100)); // 시간 단축

      setProducts(convertedProducts);
      setError(null);
    } catch (err) {
      setError("상품을 불러오는데 실패했습니다.");
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  }, [storeProducts]);

  // 초기 로딩 및 storeProducts 변경 시 상품 목록 업데이트
  useEffect(() => {
    // 무한 렌더링 방지를 위해 storeProducts만 의존성으로 사용
    if (storeProducts.length > 0 && products.length === 0) {
      console.log("초기 상품 데이터 로드 시작");
      loadProducts();
    }
  }, [storeProducts, products.length, loadProducts]);

  // 카테고리별 상품 필터링
  const getProductsByCategory = (category: string) => {
    const categoryProducts = products.filter(
      (product) => product.category === category
    );
    console.log(`${category} 카테고리 필터링 결과:`, categoryProducts);
    return categoryProducts;
  };

  // 신상품 필터링
  const getNewProducts = () => {
    const newProducts = products.filter((product) => product.isNew);
    console.log("신상품 필터링 결과:", newProducts);
    return newProducts;
  };

  // 할인 상품 필터링
  const getSaleProducts = () => {
    const saleProducts = products.filter((product) => product.isSale);
    console.log("할인 상품 필터링 결과:", saleProducts);
    return saleProducts;
  };

  // 인기 상품 필터링 (평점 기준)
  const getPopularProducts = (limit: number = 8) => {
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
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.description?.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    products,
    loading,
    error,
    getProductsByCategory,
    getNewProducts,
    getSaleProducts,
    getPopularProducts,
    searchProducts,
    reloadProducts: loadProducts,
  };
}
