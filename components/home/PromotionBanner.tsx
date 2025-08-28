"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Gift,
  Percent,
  DollarSign,
  Truck,
  Copy,
  CheckCircle,
  X,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";

interface PromotionBannerProps {
  coupon?: {
    code: string;
    name: string;
    description: string;
    type: "percentage" | "fixed" | "free_shipping";
    value: number;
    minOrderAmount: number;
    endDate: string;
  };
  onClose?: () => void;
}

export default function PromotionBanner({
  coupon,
  onClose,
}: PromotionBannerProps) {
  const [isCopied, setIsCopied] = useState(false);

  // 기본 쿠폰 데이터 (쿠폰이 없을 때 표시)
  const defaultCoupon = {
    code: "WELCOME20",
    name: "신규 고객 20% 할인",
    description: "첫 구매 고객을 위한 특별 할인",
    type: "percentage" as const,
    value: 20,
    minOrderAmount: 50000,
    endDate: "2024-12-31",
  };

  const activeCoupon = coupon || defaultCoupon;

  // 쿠폰 코드 복사
  const copyCouponCode = async () => {
    try {
      // 클립보드 API 사용
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(activeCoupon.code);
      } else {
        // 폴백: 구식 브라우저 지원
        const textArea = document.createElement("textarea");
        textArea.value = activeCoupon.code;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("쿠폰 코드 복사 실패:", err);
      // 사용자에게 오류 알림
      alert("쿠폰 코드 복사에 실패했습니다. 수동으로 복사해주세요.");
    }
  };

  // 할인 값 표시
  const getDiscountDisplay = () => {
    switch (activeCoupon.type) {
      case "percentage":
        return `${activeCoupon.value}%`;
      case "fixed":
        return `${activeCoupon.value.toLocaleString()}원`;
      case "free_shipping":
        return "무료 배송";
      default:
        return activeCoupon.value;
    }
  };

  // 할인 타입 아이콘
  const getDiscountIcon = () => {
    switch (activeCoupon.type) {
      case "percentage":
        return <Percent className="w-5 h-5" />;
      case "fixed":
        return <DollarSign className="w-5 h-5" />;
      case "free_shipping":
        return <Truck className="w-5 h-5" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };

  // 배경 그라데이션 클래스
  const getBackgroundClass = () => {
    switch (activeCoupon.type) {
      case "percentage":
        return "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500";
      case "fixed":
        return "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500";
      case "free_shipping":
        return "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500";
      default:
        return "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500";
    }
  };

  return (
    <div className="relative overflow-hidden">
      <Card className={`${getBackgroundClass()} text-white border-0 shadow-lg`}>
        <CardContent className="p-6">
          {/* 닫기 버튼 */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center justify-between">
            {/* 왼쪽: 쿠폰 정보 */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  {getDiscountIcon()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{activeCoupon.name}</h3>
                  <p className="text-white/80 text-sm">
                    {activeCoupon.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <Badge className="bg-white/20 text-white border-white/30">
                    최소 주문 {activeCoupon.minOrderAmount.toLocaleString()}원
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    ~{activeCoupon.endDate}
                  </Badge>
                </div>
              </div>
            </div>

            {/* 중앙: 할인 정보 */}
            <div className="text-center mx-8">
              <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">
                  {getDiscountDisplay()}
                </div>
                <p className="text-white/80 text-sm">할인</p>
              </div>
            </div>

            {/* 오른쪽: 쿠폰 코드 */}
            <div className="flex-1 text-right">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/80 mb-2">쿠폰 코드</p>
                  <div className="flex items-center justify-end space-x-2">
                    <div
                      className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-colors duration-200"
                      onClick={copyCouponCode}
                    >
                      <span className="font-mono font-bold text-lg tracking-wider select-all">
                        {activeCoupon.code}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyCouponCode}
                      className={`border-white/30 text-white bg-white/20 hover:bg-white/20 transition-all duration-200 ${
                        isCopied ? "bg-green-500/20 border-green-300" : ""
                      }`}
                      disabled={isCopied}
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {isCopied && (
                    <p className="text-xs text-green-300 mt-1 animate-pulse">
                      ✓ 복사되었습니다!
                    </p>
                  )}
                </div>

                <Button className="lumina-gradient hover:opacity-90 text-white px-6 py-3 font-semibold lumina-shadow-lg transition-all duration-300 group">
                  <Sparkles className="w-4 h-4 mr-2" />
                  쿠폰 사용하기
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
