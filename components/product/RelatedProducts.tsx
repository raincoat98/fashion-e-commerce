"use client";

import React, { useEffect, useRef } from "react";
import ProductCard from "@/components/product/ProductCard";
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 섹션 제목 애니메이션
      gsap.fromTo(
        titleRef.current,
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

      // 관련 상품들 애니메이션
      if (productsRef.current?.children) {
        gsap.fromTo(
          productsRef.current.children,
          {
            y: 60,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.15,
            scrollTrigger: {
              trigger: productsRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
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
      id: 101,
      name: "슬림핏 데님 자켓",
      price: 59000,
      originalPrice: 89000,
      image:
        "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
      hoverImage:
        "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "34% OFF",
      rating: 4.6,
      reviewCount: 89,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 102,
      name: "와이드 슬랙스",
      price: 39000,
      originalPrice: 65000,
      image:
        "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=400",
      hoverImage:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "40% OFF",
      rating: 4.8,
      reviewCount: 156,
      sizes: ["S", "M", "L"],
    },
    {
      id: 103,
      name: "크롭 니트 가디건",
      price: 45000,
      originalPrice: 75000,
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      hoverImage:
        "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "40% OFF",
      rating: 4.7,
      reviewCount: 203,
      sizes: ["S", "M", "L"],
    },
    {
      id: 104,
      name: "하이웨스트 스커트",
      price: 29000,
      originalPrice: 49000,
      image:
        "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
      hoverImage:
        "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "41% OFF",
      rating: 4.5,
      reviewCount: 112,
      sizes: ["S", "M", "L"],
    },
  ].filter((product) => product.id !== currentProductId);

  return (
    <section ref={sectionRef}>
      <h2 ref={titleRef} className="text-2xl font-bold text-gray-900 mb-8">
        함께 보면 좋은 상품
      </h2>

      <div
        ref={productsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {relatedProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
