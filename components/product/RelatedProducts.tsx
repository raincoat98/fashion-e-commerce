"use client";

import React, { useEffect, useRef, useMemo } from "react";
import DraggableProductList from "@/components/home/DraggableProductList";
import { useProductStore } from "@/stores/useProductStore";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

interface RelatedProductsProps {
  currentProductId: number;
}

export default function RelatedProducts({
  currentProductId,
}: RelatedProductsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { products, getProductById } = useProductStore();

  // 현재 상품 정보 가져오기
  const currentProduct = getProductById(currentProductId.toString());

  // 관련 상품 계산 (같은 카테고리, 비슷한 가격대, 베스트셀러 등)
  const relatedProducts = useMemo(() => {
    if (!currentProduct) return [];

    // 현재 상품과 같은 카테고리의 다른 상품들
    const sameCategoryProducts = products.filter(
      (product) =>
        product.id !== currentProductId.toString() &&
        product.category === currentProduct.category &&
        product.isActive
    );

    // 비슷한 가격대의 상품들 (현재 가격의 ±30% 범위)
    const similarPriceProducts = products.filter(
      (product) =>
        product.id !== currentProductId.toString() &&
        product.isActive &&
        product.price >= currentProduct.price * 0.7 &&
        product.price <= currentProduct.price * 1.3
    );

    // 베스트셀러 상품들
    const bestSellerProducts = products.filter(
      (product) =>
        product.id !== currentProductId.toString() &&
        product.isActive &&
        product.isBest
    );

    // 상품들을 우선순위에 따라 결합
    const allRelated = [
      ...sameCategoryProducts,
      ...similarPriceProducts,
      ...bestSellerProducts,
    ];

    // 중복 제거 및 최대 6개까지만 반환
    const uniqueProducts = allRelated
      .filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.id === product.id)
      )
      .slice(0, 6);

    // DraggableProductList에서 사용할 형식으로 변환
    return uniqueProducts.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      image: product.images[0],
      category: product.category,
      rating: product.rating,
      reviewCount: product.reviewCount,
      isNew: product.isNew,
      isSale: product.isSale,
      discount: product.originalPrice
        ? Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) *
              100
          )
        : 0,
    }));
  }, [products, currentProduct, currentProductId]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 섹션 애니메이션
      gsap.fromTo(
        sectionRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <DraggableProductList
        title="함께 보면 좋은 상품"
        subtitle="이 상품과 함께 구매하면 좋은 상품들을 만나보세요"
        products={relatedProducts}
        showViewAll={false}
        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 lg:p-8"
      />
    </section>
  );
}
