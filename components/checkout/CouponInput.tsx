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
  subtotal: number;
  onCouponApplied: (coupon: Coupon, discountAmount: number) => void;
  onCouponRemoved: () => void;
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
  subtotal,
  onCouponApplied,
  onCouponRemoved,
}: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 쿠폰 검증 및 적용
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setError("쿠폰 코드를 입력해주세요.");
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
      setError("유효하지 않은 쿠폰 코드입니다.");
      setIsLoading(false);
      return;
    }

    if (subtotal < coupon.minOrderAmount) {
      setError(
        `최소 주문 금액 ${coupon.minOrderAmount.toLocaleString()}원 이상 구매 시 사용 가능합니다.`
      );
      setIsLoading(false);
      return;
    }

    // 할인 금액 계산
    let discountAmount = 0;
    switch (coupon.type) {
      case "percentage":
        discountAmount = Math.floor(subtotal * (coupon.value / 100));
        if (coupon.maxDiscountAmount) {
          discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);
        }
        break;
      case "fixed":
        discountAmount = coupon.value;
        break;
      case "free_shipping":
        discountAmount = 3000; // 기본 배송비
        break;
    }

    setAppliedCoupon(coupon);
    onCouponApplied(coupon, discountAmount);
    setCouponCode("");
    setIsLoading(false);
  };

  // 쿠폰 제거
  const removeCoupon = () => {
    setAppliedCoupon(null);
    onCouponRemoved();
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
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gift className="w-5 h-5 text-yellow-600" />
          <span>쿠폰 적용</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!appliedCoupon ? (
          <div className="space-y-4">
            <div className="flex space-x-2">
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
                className="lumina-gradient text-white"
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
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                사용 가능한 쿠폰
              </p>
              <div className="space-y-2">
                {availableCoupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        {getDiscountIcon(coupon.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">
                            {coupon.name}
                          </span>
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                            {getDiscountDisplay(coupon)}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">
                          {coupon.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          최소 주문 {coupon.minOrderAmount.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setCouponCode(coupon.code);
                        applyCoupon();
                      }}
                      className="text-xs"
                    >
                      적용
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 적용된 쿠폰 표시 */}
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{appliedCoupon.name}</span>
                    <Badge className="bg-green-100 text-green-800">
                      {getDiscountDisplay(appliedCoupon)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {appliedCoupon.description}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={removeCoupon}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
