"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { hidePopupForToday, isPopupHiddenToday } from "@/lib/cookies";

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

interface Popup {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  linkUrl: string;
  width: number;
  height: number;
  position:
    | "center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  displayType: "immediate" | "delay" | "scroll";
  delaySeconds: number;
  scrollPercentage: number;
  targetAudience: "all" | "new" | "returning" | "mobile" | "desktop";
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export default function Popup() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [visiblePopups, setVisiblePopups] = useState<Set<string>>(new Set());
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isMobile = useIsMobile();

  // 팝업 데이터를 로드하고 필터링하는 함수
  const loadAndFilterPopups = () => {
    // 개발 중에는 닫힌 상태를 리셋 (필요시 주석 해제)
    localStorage.removeItem("closedPopups");

    // localStorage에서 저장된 팝업 데이터를 가져옴
    const savedPopups = localStorage.getItem("popups");
    let popups: Popup[] = [];

    if (savedPopups) {
      try {
        popups = JSON.parse(savedPopups);
        console.log("Loaded popups from localStorage:", popups);
      } catch (error) {
        console.error("Failed to parse saved popups:", error);
      }
    }

    // 저장된 데이터가 없으면 기본 데이터 사용
    if (popups.length === 0) {
      popups = [
        {
          id: "1",
          title: "신규 회원 특별 혜택",
          content: "회원가입 시 10,000원 할인 쿠폰을 드립니다!",
          imageUrl: "/images/popup-welcome.jpg",
          linkUrl: "/signup",
          width: 400,
          height: 300,
          position: "center",
          displayType: "delay",
          delaySeconds: 3,
          scrollPercentage: 0,
          targetAudience: "new",
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          startTime: "09:00",
          endTime: "18:00",
          isActive: true,
        },
        {
          id: "2",
          title: "특가 상품 안내",
          content: "한정 수량 특가 상품을 확인해보세요!",
          imageUrl: "/images/popup-sale.jpg",
          linkUrl: "/sale",
          width: 500,
          height: 400,
          position: "top-right",
          displayType: "scroll",
          delaySeconds: 0,
          scrollPercentage: 50,
          targetAudience: "all",
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          startTime: "00:00",
          endTime: "23:59",
          isActive: true,
        },
      ];
    }

    // 활성화된 팝업만 필터링하고 조건 확인
    const activePopups = popups.filter((popup) => {
      // 활성화 상태 체크
      if (!popup.isActive) {
        console.log(`Popup ${popup.id} is inactive`);
        return false;
      }

      const now = new Date();
      const startDate = new Date(popup.startDate);
      const endDate = new Date(popup.endDate);

      // 날짜 범위 체크
      if (now < startDate) {
        console.log(
          `Popup ${popup.id} not started yet (starts: ${popup.startDate})`
        );
        return false;
      }

      if (now > endDate) {
        console.log(`Popup ${popup.id} expired (ended: ${popup.endDate})`);
        return false;
      }

      // 시간 범위 체크
      const currentTime = now.getHours() * 60 + now.getMinutes();
      const startTime =
        parseInt(popup.startTime.split(":")[0]) * 60 +
        parseInt(popup.startTime.split(":")[1]);
      const endTime =
        parseInt(popup.endTime.split(":")[0]) * 60 +
        parseInt(popup.endTime.split(":")[1]);

      if (currentTime < startTime) {
        console.log(
          `Popup ${popup.id} not in time range (starts at: ${popup.startTime})`
        );
        return false;
      }

      if (currentTime > endTime) {
        console.log(
          `Popup ${popup.id} not in time range (ends at: ${popup.endTime})`
        );
        return false;
      }

      // 대상 사용자 체크 (간단한 예시)
      const isNewUser = !localStorage.getItem("returningUser");
      if (popup.targetAudience === "new" && !isNewUser) {
        console.log(`Popup ${popup.id} is for new users only`);
        return false;
      }
      if (popup.targetAudience === "returning" && isNewUser) {
        console.log(`Popup ${popup.id} is for returning users only`);
        return false;
      }

      console.log(`Popup ${popup.id} is active and meets all conditions`);
      return true;
    });

    setPopups(activePopups);

    // 디버깅용 로그
    console.log("Popup Debug:", {
      activePopups: activePopups.length,
      isAdminPage,
      popups: activePopups,
      closedPopups: JSON.parse(localStorage.getItem("closedPopups") || "[]"),
    });
  };

  // localStorage 변경 감지를 위한 이벤트 리스너
  useEffect(() => {
    // 초기 로드
    loadAndFilterPopups();

    // storage 이벤트 리스너 등록
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "popups") {
        console.log("팝업 데이터가 변경되었습니다. 다시 로드합니다.");
        loadAndFilterPopups();
      }
    };

    // 같은 탭 내에서의 localStorage 변경 감지를 위한 커스텀 이벤트
    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key === "popups") {
        console.log(
          "같은 탭에서 팝업 데이터가 변경되었습니다. 다시 로드합니다."
        );
        loadAndFilterPopups();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(
      "localStorageChange",
      handleCustomStorageChange as EventListener
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "localStorageChange",
        handleCustomStorageChange as EventListener
      );
    };
  }, [isAdminPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollPercentage(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    popups.forEach((popup) => {
      if (visiblePopups.has(popup.id)) return;

      // 이미 닫힌 팝업은 다시 표시하지 않음
      const closedPopups = JSON.parse(
        localStorage.getItem("closedPopups") || "[]"
      );
      if (closedPopups.includes(popup.id)) {
        console.log(`Popup ${popup.id} is closed permanently`);
        return;
      }

      // 오늘은 그만보기 체크 (쿠키 기반)
      if (isPopupHiddenToday(popup.id)) {
        console.log(`Popup ${popup.id} is set to not show today`);
        return;
      }

      const showPopup = () => {
        console.log(
          `Showing popup ${popup.id} with displayType: ${popup.displayType}`
        );
        if (popup.displayType === "immediate") {
          setVisiblePopups((prev) => new Set(prev).add(popup.id));
        } else if (popup.displayType === "delay") {
          setTimeout(() => {
            setVisiblePopups((prev) => new Set(prev).add(popup.id));
          }, popup.delaySeconds * 1000);
        } else if (popup.displayType === "scroll") {
          if (scrollPercentage >= popup.scrollPercentage) {
            setVisiblePopups((prev) => new Set(prev).add(popup.id));
          }
        }
      };

      showPopup();
    });
  }, [popups, scrollPercentage, visiblePopups]);

  const handleClose = (popupId: string) => {
    setVisiblePopups((prev) => {
      const newSet = new Set(prev);
      newSet.delete(popupId);
      return newSet;
    });

    // 닫힌 팝업을 localStorage에 저장하여 다시 표시하지 않음
    const closedPopups = JSON.parse(
      localStorage.getItem("closedPopups") || "[]"
    );
    if (!closedPopups.includes(popupId)) {
      closedPopups.push(popupId);
      localStorage.setItem("closedPopups", JSON.stringify(closedPopups));
    }
  };

  const handleDontShowToday = (popupId: string) => {
    setVisiblePopups((prev) => {
      const newSet = new Set(prev);
      newSet.delete(popupId);
      return newSet;
    });

    // 쿠키로 오늘 하루 동안 숨김 설정
    hidePopupForToday(popupId);
  };

  const getPositionStyles = (position: string) => {
    switch (position) {
      case "center":
        return "fixed inset-0 flex items-center justify-center z-[250]";
      case "top-left":
        return "fixed top-4 left-4 z-[250]";
      case "top-right":
        return "fixed top-4 right-4 z-[250]";
      case "bottom-left":
        return "fixed bottom-4 left-4 z-[250]";
      case "bottom-right":
        return "fixed bottom-4 right-4 z-[250]";
      default:
        return "fixed inset-0 flex items-center justify-center z-[250]";
    }
  };

  // 관리자 페이지나 모바일에서는 팝업을 표시하지 않음
  if (isAdminPage || isMobile || popups.length === 0) return null;

  return (
    <>
      {popups.map((popup) => {
        if (!visiblePopups.has(popup.id)) return null;

        return (
          <div key={popup.id} className={getPositionStyles(popup.position)}>
            {/* 배경 오버레이 */}
            {popup.position === "center" && (
              <div
                className="fixed inset-0 bg-black/50 z-[250]"
                onClick={() => handleClose(popup.id)}
              />
            )}

            {/* 팝업 컨테이너 */}
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden relative z-[251]"
              style={{
                width: popup.width,
                height: popup.height,
              }}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => handleClose(popup.id)}
                className="absolute top-2 right-2 z-10 p-1 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="팝업 닫기"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>

              {/* 팝업 내용 */}
              <div className="h-full flex flex-col">
                {popup.imageUrl && (
                  <div className="relative h-1/2">
                    <img
                      src={popup.imageUrl}
                      alt={popup.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // 이미지 로드 실패 시 기본 이미지 표시
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}

                <div className="flex-1 p-4 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {popup.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {popup.content}
                  </p>

                  <div className="space-y-3">
                    {popup.linkUrl && (
                      <Link
                        href={popup.linkUrl}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors text-center w-full"
                        onClick={() => handleClose(popup.id)}
                      >
                        자세히 보기
                      </Link>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <button
                        onClick={() => handleDontShowToday(popup.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        오늘은 그만보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
