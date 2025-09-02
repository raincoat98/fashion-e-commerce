"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

// 모바일 감지 훅
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

interface TopBanner {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
  textColor: string;
  linkUrl: string;
  order: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  bannerType: "custom" | "lumina-gradient";
  isFullWidth?: boolean;
  links?: Array<{
    text: string;
    url: string;
  }>;
}

export default function TopBanner() {
  const [topBanners, setTopBanners] = useState<TopBanner[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isMobile = useIsMobile();

  const loadBanners = useCallback(() => {
    // localStorage에서 저장된 배너 데이터를 가져옴
    const savedBanners = localStorage.getItem("topBanners");
    let banners: TopBanner[] = [];

    if (savedBanners) {
      try {
        banners = JSON.parse(savedBanners);
        console.log("Loaded banners from localStorage:", banners);

        // 기존 데이터에 누락된 필드 추가
        banners = banners.map((banner) => ({
          ...banner,
          isFullWidth: banner.isFullWidth || false,
          links: banner.links || [],
        }));
      } catch (error) {
        console.error("Failed to parse saved banners:", error);
      }
    }

    // 저장된 데이터가 없으면 기본 데이터 사용
    if (banners.length === 0) {
      banners = [
        {
          id: "1",
          title: "신규 회원 10% 할인",
          content: "신규 회원가입 시 모든 상품 10% 할인!",
          backgroundColor: "#ff6b6b",
          textColor: "#ffffff",
          linkUrl: "/signup",
          order: 1,
          isActive: true,
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          bannerType: "custom" as "custom" | "lumina-gradient",
          isFullWidth: false,
          links: [],
        },
      ];
    }

    // 활성화된 배너만 필터링
    const activeBanners = banners.filter((banner) => banner.isActive);
    setTopBanners(activeBanners);
    setIsVisible(activeBanners.length > 0);
  }, []);

  useEffect(() => {
    loadBanners();
  }, [loadBanners]);

  useEffect(() => {
    // CSS 변수로 TopBanner 높이 설정
    const setTopBannerHeight = () => {
      if (isAdminPage || isMobile) {
        // 관리자 페이지나 모바일에서는 높이를 0으로 설정
        document.documentElement.style.setProperty(
          "--top-banner-height",
          "0px"
        );
        return;
      }

      const bannerElement = document.querySelector('[data-topbanner="true"]');
      if (bannerElement) {
        const height = bannerElement.getBoundingClientRect().height;
        document.documentElement.style.setProperty(
          "--top-banner-height",
          `${height}px`
        );
      }
    };

    // 초기 설정
    setTopBannerHeight();

    // 리사이즈 시 재설정
    window.addEventListener("resize", setTopBannerHeight);

    return () => {
      window.removeEventListener("resize", setTopBannerHeight);
    };
  }, [topBanners, currentBannerIndex, isAdminPage, isMobile]);

  // 배너 상태가 변경될 때마다 body padding 업데이트
  useEffect(() => {
    if (isAdminPage || isMobile) {
      // 관리자 페이지나 모바일에서는 body padding 제거
      document.body.style.paddingTop = "0px";
      return;
    }

    const updateBodyPadding = () => {
      const bannerElement = document.querySelector('[data-topbanner="true"]');
      if (bannerElement) {
        const height = bannerElement.getBoundingClientRect().height;
        document.body.style.paddingTop = `${height}px`;
      }
    };

    updateBodyPadding();
    window.addEventListener("resize", updateBodyPadding);

    return () => {
      window.removeEventListener("resize", updateBodyPadding);
      document.body.style.paddingTop = "0px";
    };
  }, [topBanners, currentBannerIndex, isAdminPage, isMobile]);

  // 관리자 페이지에서는 TopBanner를 표시하지 않음
  if (isAdminPage) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    // 닫힌 탑배너를 localStorage에 저장
    localStorage.setItem("topBannerClosed", "true");

    // 배너가 닫힐 때 헤더 위치와 body padding 조정
    setTimeout(() => {
      const header = document.querySelector(
        '[data-header="true"]'
      ) as HTMLElement;
      if (header) {
        header.style.top = "0";
        const headerHeight = header.clientHeight || 0;
        document.body.style.paddingTop = `${headerHeight}px`;
      }
    }, 0);
  };

  const handleNext = () => {
    if (topBanners.length > 1) {
      setCurrentBannerIndex((prev) => (prev + 1) % topBanners.length);
    }
  };

  const handlePrev = () => {
    if (topBanners.length > 1) {
      setCurrentBannerIndex((prev) =>
        prev === 0 ? topBanners.length - 1 : prev - 1
      );
    }
  };

  // 관리자 페이지나 모바일에서는 탑배너를 표시하지 않음
  if (isAdminPage || isMobile || !isVisible || topBanners.length === 0) {
    return null;
  }

  const currentBanner = topBanners[currentBannerIndex];

  return (
    <div
      data-topbanner="true"
      className={`fixed top-0 left-0 right-0 w-full py-3 px-4 text-center text-sm font-medium transition-all duration-300 z-30 ${
        currentBanner.bannerType === "lumina-gradient" ? "lumina-gradient" : ""
      } ${currentBanner.isFullWidth ? "w-full" : ""}`}
      style={{
        backgroundColor:
          currentBanner.bannerType === "custom"
            ? currentBanner.backgroundColor
            : undefined,
        color: currentBanner.textColor,
      }}
    >
      <div
        className={`mx-auto flex items-center justify-between ${
          currentBanner.isFullWidth ? "w-full" : "max-w-7xl"
        }`}
      >
        <div className="flex items-center space-x-4">
          {topBanners.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="이전 배너"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="flex space-x-1">
                {topBanners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBannerIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentBannerIndex ? "bg-white" : "bg-white/40"
                    }`}
                    aria-label={`배너 ${index + 1}로 이동`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="다음 배너"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        <div className="flex-1 text-center">
          <div className="flex items-center justify-center space-x-4">
            <div>
              <span className="font-semibold">{currentBanner.title}</span>
              {currentBanner.content && (
                <span className="ml-2 opacity-90 hidden sm:inline">
                  - {currentBanner.content}
                </span>
              )}
            </div>

            {/* 여러 링크 지원 */}
            {currentBanner.links && currentBanner.links.length > 0 ? (
              <div className="flex items-center space-x-2 text-xs">
                {currentBanner.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    className="hover:underline transition-colors px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            ) : currentBanner.linkUrl ? (
              <Link
                href={currentBanner.linkUrl}
                className="text-xs hover:underline transition-colors px-2 py-1 rounded bg-white/10 hover:bg-white/20"
              >
                자세히 보기
              </Link>
            ) : null}
          </div>
        </div>

        <button
          onClick={handleClose}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="배너 닫기"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
