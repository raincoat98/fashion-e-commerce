"use client";

import React, { useEffect, useRef } from "react";
import DraggableProductList from "@/components/home/DraggableProductList";
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

  // Mock related products - replace with actual API call
  // In a real app, this would be based on:
  // - Same category products
  // - Frequently bought together
  // - User viewing history
  // - Similar price range
  const relatedProducts = [
    {
      id: "101",
      name: "슬림핏 데님 자켓",
      price: 59000,
      originalPrice: 89000,
      image:
        "https://images.pexels.com/photos/4482959/pexels-photo-4482959.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "아우터",
      rating: 4.6,
      reviewCount: 89,
      isNew: false,
      isSale: true,
      discount: 34,
    },
    {
      id: "102",
      name: "와이드 슬랙스",
      price: 39000,
      originalPrice: 65000,
      image:
        "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "하의",
      rating: 4.8,
      reviewCount: 156,
      isNew: false,
      isSale: true,
      discount: 40,
    },
    {
      id: "103",
      name: "크롭 니트 가디건",
      price: 45000,
      originalPrice: 75000,
      image:
        "https://images.pexels.com/photos/6983021/pexels-photo-6983021.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "상의",
      rating: 4.7,
      reviewCount: 203,
      isNew: false,
      isSale: true,
      discount: 40,
    },
    {
      id: "104",
      name: "하이웨스트 스커트",
      price: 29000,
      originalPrice: 49000,
      image:
        "https://images.pexels.com/photos/25841774/pexels-photo-25841774.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "하의",
      rating: 4.5,
      reviewCount: 112,
      isNew: false,
      isSale: true,
      discount: 41,
    },
    {
      id: "105",
      name: "베이직 티셔츠",
      price: 25000,
      originalPrice: 35000,
      image:
        "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "상의",
      rating: 4.4,
      reviewCount: 78,
      isNew: true,
      isSale: false,
      discount: 29,
    },
    {
      id: "106",
      name: "데님 쇼츠",
      price: 35000,
      originalPrice: 55000,
      image:
        "https://images.pexels.com/photos/1594639/pexels-photo-1594639.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "하의",
      rating: 4.3,
      reviewCount: 95,
      isNew: false,
      isSale: true,
      discount: 36,
    },
  ].filter((product) => product.id !== currentProductId.toString());

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
