"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

export default function CategorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // 카테고리 카드들 애니메이션
      if (gridRef.current?.children) {
        gsap.fromTo(
          gridRef.current.children,
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
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
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

  const categories = [
    {
      id: "new",
      name: "NEW ARRIVAL",
      description: "새로운 시즌의 첫 번째 선택",
      image:
        "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: "24",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "outer",
      name: "OUTER",
      description: "완벽한 아우터로 스타일 완성",
      image:
        "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: "18",
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "top",
      name: "TOP",
      description: "기본부터 특별한 순간까지",
      image:
        "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: "32",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "bottom",
      name: "BOTTOM",
      description: "완벽한 실루엣을 위한 선택",
      image:
        "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: "28",
      color: "from-purple-500 to-violet-500",
    },
    {
      id: "dress",
      name: "DRESS",
      description: "특별한 날을 위한 완벽한 원피스",
      image:
        "https://images.pexels.com/photos/852860/pexels-photo-852860.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: "15",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "accessory",
      name: "ACCESSORY",
      description: "마지막 터치를 위한 액세서리",
      image:
        "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: "42",
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>DISCOVER YOUR STYLE</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="block">당신만의</span>
            <span className="lumina-text-gradient">스타일을 찾아보세요</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            LUMINA의 다양한 카테고리에서
            <br />
            <span className="text-yellow-600 font-medium">빛나는 당신</span>을
            위한 완벽한 스타일을 만나보세요
          </p>
        </div>

        {/* Categories Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <div className="group relative overflow-hidden rounded-2xl bg-white lumina-shadow-lg hover:lumina-shadow-xl transition-all duration-500 cursor-pointer">
                {/* Background Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`}
                  ></div>

                  {/* Category Badge */}
                  <div
                    className={`absolute top-4 left-4 bg-gradient-to-r ${category.color} text-white px-3 py-1 rounded-full text-xs font-bold`}
                  >
                    {category.count} ITEMS
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">바로가기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              오늘 뭐 입을지 고민이신가요?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              LUMINA의 스타일 가이드와 함께
              <br />
              당신만의 특별한 룩을 완성해보세요
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/style-guide">
                <Button
                  size="lg"
                  className="lumina-gradient hover:opacity-90 text-white px-8 py-4 text-lg font-semibold lumina-shadow-lg transition-all duration-300 group"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  스타일 가이드 보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/lookbook">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold transition-all duration-300"
                >
                  룩북 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
