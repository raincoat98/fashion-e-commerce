"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  order: number;
  isActive: boolean;
}

interface BannerSliderProps {
  banners: Banner[];
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}

export default function BannerSlider({
  banners,
  autoPlayInterval = 4000,
  showArrows = true,
  showDots = true,
  className,
}: BannerSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // 활성화된 배너만 필터링
  const activeBanners = banners.filter((banner) => banner.isActive);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
  }, [activeBanners.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + activeBanners.length) % activeBanners.length
    );
  }, [activeBanners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // 자동 재생
  useEffect(() => {
    if (!isAutoPlaying || activeBanners.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, nextSlide, activeBanners.length]);

  // 마우스 호버 시 자동 재생 일시정지
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // 이미지 에러 핸들러
  const handleImageError = (bannerId: string) => {
    setImageErrors((prev) => new Set(prev).add(bannerId));
  };

  if (!activeBanners.length) {
    return (
      <div
        className={cn(
          "w-full h-96 bg-gray-100 flex items-center justify-center",
          className
        )}
      >
        <p className="text-gray-500">등록된 배너가 없습니다.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full h-96 md:h-[500px] overflow-hidden",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 배너 슬라이드 */}
      <div className="relative w-full h-full">
        {activeBanners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-in-out",
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            )}
          >
            {/* 배경 이미지 */}
            <div className="absolute inset-0">
              {!imageErrors.has(banner.id) &&
              banner.imageUrl &&
              banner.imageUrl.trim() !== "" ? (
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(banner.id)}
                  priority={index === 0}
                />
              ) : (
                /* 에러 시 플레이스홀더 */
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg">배너 이미지 없음</p>
                  </div>
                </div>
              )}
              {/* 그라데이션 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
            </div>

            {/* 배너 콘텐츠 */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-2xl text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight word-break-keep">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed word-break-keep">
                    {banner.description}
                  </p>
                  <Link href={banner.linkUrl}>
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold transition-all duration-300 group"
                    >
                      자세히 보기
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 좌우 화살표 네비게이션 */}
      {showArrows && activeBanners.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 rounded-full w-12 h-12 transition-all duration-300 z-20"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 rounded-full w-12 h-12 transition-all duration-300 z-20"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* 하단 점 네비게이션 */}
      {showDots && activeBanners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {activeBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              )}
              aria-label={`배너 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}

      {/* 슬라이드 인디케이터 */}
      <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm z-20">
        {currentSlide + 1} / {activeBanners.length}
      </div>

      {/* 자동 재생 상태 표시 */}
      <div className="absolute top-4 left-4 z-20">
        <div
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            isAutoPlaying ? "bg-green-400" : "bg-yellow-400"
          )}
          title={isAutoPlaying ? "자동 재생 중" : "일시정지"}
        />
      </div>
    </div>
  );
}
