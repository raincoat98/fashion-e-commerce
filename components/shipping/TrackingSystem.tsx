"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Truck,
  Package,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";

interface TrackingInfo {
  trackingNumber: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  estimatedDelivery: string;
  currentLocation: string;
  history: {
    date: string;
    time: string;
    status: string;
    location: string;
    description: string;
  }[];
  orderInfo: {
    orderNumber: string;
    orderDate: string;
    items: string[];
    totalAmount: number;
  };
}

const mockTrackingData: TrackingInfo = {
  trackingNumber: "HJ1234567890",
  status: "shipped",
  estimatedDelivery: "2024-01-25",
  currentLocation: "서울 강남구",
  history: [
    {
      date: "2024-01-20",
      time: "14:30",
      status: "배송 완료",
      location: "서울 강남구",
      description: "고객님께 배송이 완료되었습니다.",
    },
    {
      date: "2024-01-20",
      time: "09:15",
      status: "배송 중",
      location: "서울 강남구",
      description: "배송원이 상품을 픽업했습니다.",
    },
    {
      date: "2024-01-19",
      time: "16:45",
      status: "배송 준비 완료",
      location: "경기도 성남시",
      description: "배송 준비가 완료되었습니다.",
    },
    {
      date: "2024-01-19",
      time: "10:20",
      status: "주문 처리 중",
      location: "경기도 성남시",
      description: "주문이 확인되어 처리 중입니다.",
    },
  ],
  orderInfo: {
    orderNumber: "ORD-2024-001",
    orderDate: "2024-01-15",
    items: ["LUMINA 시그니처 티셔츠", "프리미엄 데님 팬츠"],
    totalAmount: 89000,
  },
};

export default function TrackingSystem() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "배송 대기";
      case "processing":
        return "처리 중";
      case "shipped":
        return "배송 중";
      case "delivered":
        return "배송 완료";
      case "cancelled":
        return "취소됨";
      default:
        return status;
    }
  };

  const handleSearch = async () => {
    if (!trackingNumber.trim()) {
      setError("송장번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    // 실제 API 호출 대신 모의 데이터 사용
    setTimeout(() => {
      if (trackingNumber === "HJ1234567890") {
        setTrackingInfo(mockTrackingData);
      } else {
        setError("송장번호를 찾을 수 없습니다. 다시 확인해주세요.");
        setTrackingInfo(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      {/* 배송조회 검색 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="w-5 h-5" />
            <span>배송조회</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="tracking-number">송장번호</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="tracking-number"
                  placeholder="송장번호를 입력하세요"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 배송 정보 표시 */}
      {trackingInfo && (
        <div className="space-y-6">
          {/* 배송 상태 요약 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>배송 정보</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      송장번호
                    </Label>
                    <p className="text-lg font-semibold">
                      {trackingInfo.trackingNumber}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      배송 상태
                    </Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusColor(trackingInfo.status)}>
                        {getStatusLabel(trackingInfo.status)}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      예상 배송일
                    </Label>
                    <p className="text-gray-900">
                      {trackingInfo.estimatedDelivery}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      현재 위치
                    </Label>
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-900">
                        {trackingInfo.currentLocation}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      주문번호
                    </Label>
                    <p className="text-gray-900">
                      {trackingInfo.orderInfo.orderNumber}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      주문일
                    </Label>
                    <p className="text-gray-900">
                      {trackingInfo.orderInfo.orderDate}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 주문 상품 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>주문 상품</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {trackingInfo.orderInfo.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-900">{item}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-4">
                  <p className="text-sm text-gray-600">총 결제금액</p>
                  <p className="text-lg font-bold">
                    {trackingInfo.orderInfo.totalAmount.toLocaleString()}원
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 배송 이력 */}
          <Card>
            <CardHeader>
              <CardTitle>배송 이력</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingInfo.history.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      {index < trackingInfo.history.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">
                          {item.status}
                        </h4>
                        <div className="text-sm text-gray-500">
                          {item.date} {item.time}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.location}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
