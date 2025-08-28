"use client";

import React, { useEffect, useRef } from "react";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useToast } from "@/hooks/use-toast";
import { useProductStore } from "@/stores/useProductStore";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { products } = useProductStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 섹션 헤더 애니메이션
      gsap.fromTo(
        headerRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 상품 카드들 애니메이션
      if (productsRef.current?.children) {
        gsap.fromTo(
          productsRef.current.children,
          {
            y: 80,
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

      // CTA 버튼 애니메이션
      gsap.fromTo(
        ctaRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 스토어에서 베스트 상품 4개 가져오기
  const featuredProducts = products
    .filter((product) => product.isBest || product.isNew || product.isSale)
    .slice(0, 4)
    .map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      image: product.images[0] || "/images/placeholder.jpg",
      hoverImage:
        product.images[1] || product.images[0] || "/images/placeholder.jpg",
      badge: product.isNew
        ? "NEW"
        : product.isSale
        ? "SALE"
        : product.isBest
        ? "BEST"
        : "",
      rating: product.rating,
      reviewCount: product.reviewCount,
      sizes: product.sizes,
    }));

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>TRENDING NOW</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="block">이번 주</span>
            <span className="lumina-text-gradient">베스트 셀러</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            LUMINA 고객들이 가장 사랑하는 스타일들을 만나보세요.
            <br />
            <span className="text-yellow-600 font-medium">빛나는 당신</span>을
            위한 특별한 컬렉션
          </p>
        </div>

        {/* Products Grid */}
        <div
          ref={productsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="text-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              더 많은 스타일을 발견하세요
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              LUMINA의 전체 컬렉션에서 당신만의 특별한 스타일을 찾아보세요.
              새로운 경험과 함께 더욱 빛나는 당신을 만나보실 수 있습니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories/new">
                <Button
                  size="lg"
                  className="lumina-gradient hover:opacity-90 text-white px-8 py-4 text-lg font-semibold lumina-shadow-lg transition-all duration-300 group"
                >
                  전체 컬렉션 보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/categories/sale">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold transition-all duration-300"
                >
                  세일 상품 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
