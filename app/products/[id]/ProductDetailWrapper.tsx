"use client";

import React from "react";
import { useProductStore } from "@/stores/useProductStore";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";

interface ProductDetailWrapperProps {
  productId: string;
}

export default function ProductDetailWrapper({
  productId,
}: ProductDetailWrapperProps) {
  const { getProductById } = useProductStore();
  const storeProduct = getProductById(productId);

  // 상품을 찾을 수 없는 경우
  if (!storeProduct) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          상품을 찾을 수 없습니다
        </h1>
        <p className="text-gray-600 mb-8">
          요청하신 상품이 존재하지 않거나 삭제되었습니다.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          홈으로 돌아가기
        </a>
      </div>
    );
  }

  // Store Product를 상세 페이지에서 사용할 형식으로 변환
  const product = {
    id: parseInt(storeProduct.id),
    name: storeProduct.name,
    brand: "LUMINA",
    price: storeProduct.price,
    originalPrice: storeProduct.originalPrice || storeProduct.price,
    description: storeProduct.description,
    images: storeProduct.images,
    rating: storeProduct.rating,
    reviewCount: storeProduct.reviewCount,
    sizes: storeProduct.sizes.map((size) => {
      // 선택된 색상에 따른 사이즈별 재고 확인
      const sizeStock = storeProduct.sizeStocks?.[size] || 0;
      const isAvailable = sizeStock > 0;

      return {
        name: size,
        available: isAvailable,
        stock: sizeStock,
      };
    }),
    colors: storeProduct.colors.map((color) => {
      // 색상별 사용 가능 여부 확인
      const colorAvailable = storeProduct.colorSizeAvailability?.[color]
        ? Object.values(storeProduct.colorSizeAvailability[color]).some(
            (available) => available
          )
        : true;

      return {
        name: color,
        hex: getColorHex(color),
        available: colorAvailable,
      };
    }),
    materials: "코튼 100%",
    care: "찬물 단독 세탁, 자연 건조",
    modelInfo: "모델 착용 사이즈: M / 키 168cm",
    measurements: {
      S: { chest: 44, shoulder: 40, length: 60, sleeve: 18 },
      M: { chest: 47, shoulder: 42, length: 62, sleeve: 19 },
      L: { chest: 50, shoulder: 44, length: 64, sleeve: 20 },
      XL: { chest: 53, shoulder: 46, length: 66, sleeve: 21 },
    },
    features: [
      "고품질 소재 사용",
      "편안한 착용감",
      "세련된 디자인",
      "다양한 스타일링 가능",
    ],
    badge: storeProduct.isNew ? "NEW" : storeProduct.isSale ? "SALE" : "",
    reviews: [
      {
        id: 1,
        userId: "user1",
        userName: "김**",
        rating: 5,
        title: "정말 만족스러운 구매였어요!",
        content:
          "사이즈도 딱 맞고 소재도 부드러워서 정말 좋습니다. 일상복으로 입기 완벽해요.",
        size: "M",
        color: storeProduct.colors[0] || "기본",
        helpful: 12,
        date: "2024-01-15",
        verified: true,
        comments: [
          {
            id: 1,
            userId: "user3",
            userName: "박**",
            content: "저도 같은 생각이에요! 정말 편해요.",
            date: "2024-01-16",
            helpful: 3,
          },
          {
            id: 2,
            userId: "user4",
            userName: "최**",
            content: "사이즈 정보 감사합니다. M 사이즈로 주문할게요!",
            date: "2024-01-17",
            helpful: 1,
          },
        ],
      },
      {
        id: 2,
        userId: "user2",
        userName: "이**",
        rating: 4,
        title: "가격 대비 괜찮아요",
        content: "기본적으로 괜찮습니다. 품질도 좋고 디자인도 마음에 들어요.",
        size: "L",
        color: storeProduct.colors[1] || "기본",
        helpful: 8,
        date: "2024-01-10",
        verified: true,
        comments: [],
      },
    ],
    averageRating: storeProduct.rating,
    totalReviews: storeProduct.reviewCount,
    ratingDistribution: {
      5: Math.floor(storeProduct.reviewCount * 0.7),
      4: Math.floor(storeProduct.reviewCount * 0.2),
      3: Math.floor(storeProduct.reviewCount * 0.07),
      2: Math.floor(storeProduct.reviewCount * 0.02),
      1: Math.floor(storeProduct.reviewCount * 0.01),
    },
  };

  return (
    <>
      <ProductDetailClient product={product} />

      {/* Product Details Tabs */}
      <div className="mt-16">
        <ProductTabs
          description={product.description}
          materials={product.materials}
          care={product.care}
          modelInfo={product.modelInfo}
          measurements={product.measurements}
          reviews={product.reviews}
          averageRating={product.averageRating}
          totalReviews={product.totalReviews}
          ratingDistribution={product.ratingDistribution}
        />
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <RelatedProducts currentProductId={product.id} />
      </div>
    </>
  );
}

// 색상 이름을 hex 코드로 변환하는 헬퍼 함수
function getColorHex(colorName: string): string {
  const colorMap: { [key: string]: string } = {
    화이트: "#FFFFFF",
    블랙: "#000000",
    네이비: "#1E3A8A",
    블루: "#3B82F6",
    베이지: "#F5F5DC",
    그레이: "#9CA3AF",
    핑크: "#EC4899",
    레드: "#EF4444",
    옐로우: "#F59E0B",
    그린: "#10B981",
    아이보리: "#FFFBF0",
    라이트블루: "#BFDBFE",
    다크블루: "#1E40AF",
  };

  return colorMap[colorName] || "#9CA3AF";
}
