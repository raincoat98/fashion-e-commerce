"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Gift,
  Percent,
  DollarSign,
  Truck,
  CheckCircle,
  X,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Coupon {
  code: string;
  name: string;
  description: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  isActive: boolean;
}

interface CouponInputProps {
  onCouponApplied: (coupon: Coupon | null) => void;
  appliedCoupon: Coupon | null;
}

// Mock 쿠폰 데이터
const availableCoupons: Coupon[] = [
  {
    code: "WELCOME20",
    name: "신규 고객 20% 할인",
    description: "첫 구매 고객을 위한 특별 할인",
    type: "percentage",
    value: 20,
    minOrderAmount: 50000,
    maxDiscountAmount: 50000,
    isActive: true,
  },
  {
    code: "SPRING5000",
    name: "봄 시즌 5,000원 할인",
    description: "봄 시즌 컬렉션 구매 시 사용 가능",
    type: "fixed",
    value: 5000,
    minOrderAmount: 30000,
    isActive: true,
  },
  {
    code: "FREESHIP",
    name: "무료 배송 쿠폰",
    description: "5만원 이상 구매 시 무료 배송",
    type: "free_shipping",
    value: 0,
    minOrderAmount: 50000,
    isActive: true,
  },
];

export default function CouponInput({
  onCouponApplied,
  appliedCoupon,
}: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // 쿠폰 검증 및 적용
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      toast({
        title: "쿠폰 코드 필요",
        description: "쿠폰 코드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError("");

    // Mock API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const coupon = availableCoupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase() && c.isActive
    );

    if (!coupon) {
      toast({
        title: "유효하지 않은 쿠폰",
        description:
          "입력하신 쿠폰 코드가 유효하지 않습니다. 다시 확인해주세요.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    onCouponApplied(coupon);
    setCouponCode("");
    setIsLoading(false);

    toast({
      title: "쿠폰 적용 완료",
      description: `${coupon.name}이(가) 성공적으로 적용되었습니다.`,
    });
  };

  // 쿠폰 제거
  const removeCoupon = () => {
    onCouponApplied(null);
    toast({
      title: "쿠폰 제거 완료",
      description: "적용된 쿠폰이 제거되었습니다.",
    });
  };

  // 할인 값 표시
  const getDiscountDisplay = (coupon: Coupon) => {
    switch (coupon.type) {
      case "percentage":
        return `${coupon.value}%`;
      case "fixed":
        return `${coupon.value.toLocaleString()}원`;
      case "free_shipping":
        return "무료 배송";
      default:
        return coupon.value;
    }
  };

  // 할인 타입 아이콘
  const getDiscountIcon = (type: string) => {
    switch (type) {
      case "percentage":
        return <Percent className="w-4 h-4" />;
      case "fixed":
        return <DollarSign className="w-4 h-4" />;
      case "free_shipping":
        return <Truck className="w-4 h-4" />;
      default:
        return <Gift className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Gift className="w-5 h-5 text-yellow-600" />
          <span>쿠폰 적용</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!appliedCoupon ? (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <Input
                placeholder="쿠폰 코드를 입력하세요"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && applyCoupon()}
                className="flex-1"
              />
              <Button
                onClick={applyCoupon}
                disabled={isLoading}
                className="lumina-gradient text-white w-full md:w-auto"
              >
                {isLoading ? "적용 중..." : "적용"}
              </Button>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {/* 사용 가능한 쿠폰 목록 */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                사용 가능한 쿠폰
              </p>
              <div className="space-y-3">
                {availableCoupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          {getDiscountIcon(coupon.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col space-y-2">
                            <div className="flex flex-col space-y-1">
                              <span className="font-medium text-base text-gray-900 dark:text-gray-100">
                                {coupon.name}
                              </span>
                              <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm w-fit">
                                {getDiscountDisplay(coupon)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {coupon.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              최소 주문 {coupon.minOrderAmount.toLocaleString()}
                              원
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          setCouponCode(coupon.code);
                          setIsLoading(true);
                          setError("");

                          // Mock API 호출 시뮬레이션
                          await new Promise((resolve) =>
                            setTimeout(resolve, 500)
                          );

                          onCouponApplied(coupon);
                          setCouponCode("");
                          setIsLoading(false);

                          toast({
                            title: "쿠폰 적용 완료",
                            description: `${coupon.name}이(가) 성공적으로 적용되었습니다.`,
                          });
                        }}
                        disabled={isLoading}
                        className="w-full text-sm py-2.5"
                      >
                        {isLoading ? "적용 중..." : "적용하기"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 적용된 쿠폰 표시 */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium text-base text-gray-900 dark:text-gray-100">
                          {appliedCoupon.name}
                        </span>
                        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm w-fit">
                          {getDiscountDisplay(appliedCoupon)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {appliedCoupon.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={removeCoupon}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 w-full text-sm py-2.5"
                >
                  <X className="w-4 h-4 mr-2" />
                  쿠폰 제거
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
