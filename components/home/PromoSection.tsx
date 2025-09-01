"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, Star, Users, Zap } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

export default function PromoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 콘텐츠 애니메이션
      gsap.fromTo(
        contentRef.current,
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
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

      // 이미지 애니메이션
      gsap.fromTo(
        imageRef.current,
        {
          x: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
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

      // 기능들 애니메이션
      if (featuresRef.current?.children) {
        gsap.fromTo(
          featuresRef.current.children,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 버튼들 애니메이션
      if (buttonsRef.current?.children) {
        gsap.fromTo(
          buttonsRef.current.children,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: buttonsRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-yellow-400/30 rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-yellow-400/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-yellow-400/25 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="text-white space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
                <Gift className="w-4 h-4" />
                <span>SPECIAL OFFER</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                <span className="block">첫 구매</span>
                <span className="block text-yellow-400">20% 할인</span>
                <span className="block text-xl sm:text-2xl md:text-3xl text-gray-300 mt-2 sm:mt-4">
                  + 무료 배송
                </span>
              </h2>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                LUMINA와 함께하는 특별한 첫 경험을 선물해드립니다.
                <br className="hidden sm:block" />
                <span className="text-yellow-300 font-medium">빛나는 당신</span>
                을 위한 프리미엄 스타일을 특별한 가격으로 만나보세요.
              </p>
            </div>

            {/* Features */}
            <div
              ref={featuresRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">
                    당일 발송
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    오후 2시까지 주문시
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">
                    프리미엄 품질
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    최고급 소재 사용
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">
                    전용 스타일링
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    개인 맞춤 코디
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">
                    특별 혜택
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    VIP 멤버십 제공
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link href="/categories/new" className="flex-1 sm:flex-none">
                <Button
                  size="lg"
                  className="w-full sm:w-auto lumina-gradient hover:opacity-90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold lumina-shadow-lg transition-all duration-300 group"
                >
                  바로 구매하기
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>10,000+ 고객 만족</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>4.9/5 평점</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>무료 교환 보장</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div ref={imageRef} className="relative mt-8 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden lumina-shadow-lg">
              <img
                src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="LUMINA Special Offer"
                className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-yellow-500 text-black px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold animate-pulse">
                -20% OFF
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                  NEW COLLECTION
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm mb-2 sm:mb-4">
                  봄 시즌의 첫 번째 선택
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-300">
                    (127 reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
