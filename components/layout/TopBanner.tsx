"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

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
          startDate: "2023-01-01",
          endDate: "2024-12-31",
          bannerType: "custom",
        },
        {
          id: "2",
          title: "무료 배송 이벤트",
          content: "5만원 이상 구매 시 무료 배송!",
          backgroundColor: "#4ecdc4",
          textColor: "#ffffff",
          linkUrl: "/products",
          order: 2,
          isActive: true,
          startDate: "2023-01-01",
          endDate: "2024-12-31",
          bannerType: "custom",
        },
        {
          id: "3",
          title: "✨ NEW ARRIVAL: 봄 시즌 컬렉션 출시!",
          content: "첫 구매 20% 할인",
          backgroundColor: "",
          textColor: "#ffffff",
          linkUrl: "/products",
          order: 3,
          isActive: true,
          startDate: "2023-01-01",
          endDate: "2024-12-31",
          bannerType: "lumina-gradient",
          isFullWidth: true,
          links: [
            { text: "신상품 보기", url: "/products" },
            { text: "할인 상품", url: "/sale" },
            { text: "회원가입", url: "/signup" },
          ],
        },
        {
          id: "4",
          title: "🎉 특별 이벤트",
          content: "한정 수량 특가 상품",
          backgroundColor: "#ff6b6b",
          textColor: "#ffffff",
          linkUrl: "/sale",
          order: 4,
          isActive: false,
          startDate: "2023-01-01",
          endDate: "2024-12-31",
          bannerType: "custom",
          isFullWidth: false,
          links: [
            { text: "이벤트 상품", url: "/sale" },
            { text: "쿠폰 받기", url: "/coupons" },
          ],
        },
      ];
    }

    // 활성화된 배너만 필터링하고 날짜 조건 확인
    const activeBanners = banners.filter((banner) => {
      console.log(`Checking banner ${banner.id}:`, {
        title: banner.title,
        isActive: banner.isActive,
        startDate: banner.startDate,
        endDate: banner.endDate,
      });

      // 활성화 상태 체크
      if (!banner.isActive) {
        console.log(`Banner ${banner.id} is inactive`);
        return false;
      }

      const now = new Date();
      const startDate = new Date(banner.startDate);
      const endDate = new Date(banner.endDate);

      // 날짜 범위 체크
      if (now < startDate) {
        console.log(
          `Banner ${banner.id} not started yet (starts: ${banner.startDate})`
        );
        return false;
      }

      if (now > endDate) {
        console.log(`Banner ${banner.id} expired (ended: ${banner.endDate})`);
        return false;
      }

      console.log(`Banner ${banner.id} is active and in date range`);
      return true;
    });

    setTopBanners(activeBanners);

    // 닫힌 배너가 아닌 경우에만 표시
    const isBannerClosed = localStorage.getItem("topBannerClosed") === "true";
    const shouldShow = activeBanners.length > 0 && !isBannerClosed;
    setIsVisible(shouldShow);

    // 개발 중에는 닫힌 상태를 리셋 (필요시 주석 해제)
    localStorage.removeItem("topBannerClosed");

    // 디버깅용 로그
    console.log("TopBanner Debug:", {
      activeBanners: activeBanners.length,
      isBannerClosed,
      shouldShow,
      isAdminPage,
      banners: activeBanners,
    });
  }, [isAdminPage]);

  useEffect(() => {
    loadBanners();
  }, [loadBanners]);

  // 배너 상태가 변경될 때마다 body padding 업데이트
  useEffect(() => {
    // 배너가 표시될 때 body에 padding 추가
    const updateBodyPadding = () => {
      // setTimeout을 사용하여 DOM이 업데이트된 후 높이를 계산
      setTimeout(() => {
        const bannerHeight =
          document.querySelector('[data-topbanner="true"]')?.clientHeight || 0;
        const header = document.querySelector(
          '[data-header="true"]'
        ) as HTMLElement;

        if (header) {
          header.style.top = isVisible ? `${bannerHeight}px` : "0";
        }
        // 헤더 높이를 고려하여 body padding 계산
        const headerHeight = header?.clientHeight || 0;
        const totalTopSpace = isVisible
          ? bannerHeight + headerHeight
          : headerHeight;
        document.body.style.paddingTop = `${totalTopSpace}px`;
        console.log("Updating positions:", { bannerHeight, isVisible });
      }, 0);
    };

    // 초기 padding 설정
    updateBodyPadding();

    // resize 이벤트에서 padding 업데이트
    window.addEventListener("resize", updateBodyPadding);

    // localStorage 변경 이벤트 리스너 추가
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "topBanners") {
        console.log("TopBanner data changed, reloading...");
        loadBanners();
      }
    };

    // 커스텀 이벤트 리스너 추가 (같은 탭에서의 변경사항을 위해)
    const handleBannerUpdate = () => {
      console.log("TopBanner update event received, reloading...");
      loadBanners();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("topBannerUpdate", handleBannerUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("topBannerUpdate", handleBannerUpdate);
      window.removeEventListener("resize", updateBodyPadding);
      // 헤더 높이만큼만 padding 유지
      const header = document.querySelector(
        '[data-header="true"]'
      ) as HTMLElement;
      if (header) {
        header.style.top = "0";
        const headerHeight = header.clientHeight || 0;
        document.body.style.paddingTop = `${headerHeight}px`;
      } else {
        document.body.style.paddingTop = "0";
      }
    };
  }, [isVisible, loadBanners]);

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

  // 관리자 페이지에서는 탑배너를 표시하지 않음
  if (isAdminPage || !isVisible || topBanners.length === 0) {
    return null;
  }

  const currentBanner = topBanners[currentBannerIndex];

  return (
    <div
      data-topbanner="true"
      className={`fixed top-0 left-0 right-0 z-[100] w-full py-3 px-4 text-center text-sm font-medium transition-all duration-300 ${
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
