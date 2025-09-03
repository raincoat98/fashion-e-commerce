"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 메인 타이틀 애니메이션
      gsap.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // 서브타이틀 애니메이션
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.6,
        }
      );

      // 버튼들 애니메이션
      if (buttonsRef.current?.children) {
        gsap.fromTo(
          buttonsRef.current.children,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.9,
            stagger: 0.2,
          }
        );
      }

      // 신뢰 지표 애니메이션
      if (trustRef.current?.children) {
        gsap.fromTo(
          trustRef.current.children,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 1.2,
            stagger: 0.1,
          }
        );
      }

      // 플로팅 요소들 애니메이션
      if (floatingElementsRef.current?.children) {
        gsap.fromTo(
          floatingElementsRef.current.children,
          {
            y: -50,
            opacity: 0,
            rotation: -10,
          },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.5,
            stagger: 0.3,
          }
        );

        // 지속적인 플로팅 애니메이션
        gsap.to(floatingElementsRef.current.children[0], {
          y: -20,
          rotation: 5,
          duration: 3,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2,
        });

        gsap.to(floatingElementsRef.current.children[1], {
          y: 15,
          rotation: -3,
          duration: 4,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2.5,
        });

        gsap.to(floatingElementsRef.current.children[2], {
          y: -10,
          rotation: 2,
          duration: 3.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: 3,
        });
      }

      // 브랜드 배지 애니메이션
      gsap.fromTo(
        ".brand-badge",
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.1,
        }
      );

      // 스크롤 인디케이터 애니메이션
      gsap.fromTo(
        ".scroll-indicator",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 1.5,
        }
      );

      // 지속적인 스크롤 인디케이터 애니메이션
      gsap.to(".scroll-indicator", {
        y: -10,
        duration: 1.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.5,
      });

      // 배경 이미지 패럴랙스 효과
      gsap.to(".hero-bg", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="LUMINA Collection"
          className="hero-bg w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 dark:from-gray-950/90 dark:via-gray-900/80 dark:to-gray-950/90"></div>
      </div>

      {/* Floating Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10">
          <Sparkles className="text-yellow-400/60 w-8 h-8" />
        </div>
        <div className="absolute top-40 right-20">
          <Star className="text-yellow-400/40 w-6 h-6" />
        </div>
        <div className="absolute bottom-40 left-20">
          <Sparkles className="text-yellow-400/50 w-4 h-4" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Brand Badge */}
        <div className="brand-badge inline-flex items-center space-x-2 bg-white/10 dark:bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20 dark:border-white/30">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span className="text-sm font-medium">NEW COLLECTION 2025</span>
        </div>

        {/* Main Headline */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="block">빛나는 오늘,</span>
          <span className="block lumina-text-gradient bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
            LUMINA
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-200 dark:text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          당신의 개성과 아름다움을 빛나게 하는
          <br />
          <span className="text-yellow-300 dark:text-yellow-400 font-medium">
            프리미엄 스타일
          </span>
          을 만나보세요
        </p>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link href="/categories/new">
            <Button
              size="lg"
              className="lumina-gradient hover:opacity-90 text-white px-8 py-4 text-lg font-semibold lumina-shadow-lg transition-all duration-300 group"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/categories/best">
            <Button
              variant="outline"
              size="lg"
              className="border-white/50 dark:border-white/60 text-white hover:bg-white/20 dark:hover:bg-white/30 hover:border-white/70 dark:hover:border-white/80 px-8 py-4 text-lg font-semibold transition-all duration-300 bg-black/20 dark:bg-black/40"
            >
              베스트 셀러
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div
          ref={trustRef}
          className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-300 dark:text-gray-200"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>무료 배송</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span>7일 교환 보장</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span>프리미엄 품질</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/30 dark:border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 dark:bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
