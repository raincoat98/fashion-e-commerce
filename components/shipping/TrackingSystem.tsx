"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  Search,
  AlertCircle,
} from "lucide-react";

interface TrackingStep {
  status: string;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
}

interface TrackingInfo {
  trackingNumber: string;
  status:
    | "preparing"
    | "shipped"
    | "in_transit"
    | "out_for_delivery"
    | "delivered";
  estimatedDelivery: string;
  carrier: string;
  currentLocation: string;
  steps: TrackingStep[];
}

const TrackingSystem: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 샘플 배송 추적 데이터
  const sampleTrackingData: Record<string, TrackingInfo> = {
    TK123456789KR: {
      trackingNumber: "TK123456789KR",
      status: "in_transit",
      estimatedDelivery: "2024-12-20",
      carrier: "CJ대한통운",
      currentLocation: "서울 송파구 물류센터",
      steps: [
        {
          status: "주문 접수",
          location: "온라인 쇼핑몰",
          timestamp: "2024-12-15 09:30",
          description: "주문이 접수되었습니다",
          completed: true,
        },
        {
          status: "상품 준비",
          location: "서울 강남구 창고",
          timestamp: "2024-12-15 14:20",
          description: "상품 포장이 완료되었습니다",
          completed: true,
        },
        {
          status: "배송 시작",
          location: "서울 강남구 물류센터",
          timestamp: "2024-12-16 08:15",
          description: "배송이 시작되었습니다",
          completed: true,
        },
        {
          status: "운송 중",
          location: "서울 송파구 물류센터",
          timestamp: "2024-12-17 13:45",
          description: "배송 지역으로 운송 중입니다",
          completed: true,
        },
        {
          status: "배송 예정",
          location: "최종 배송지",
          timestamp: "2024-12-20 예정",
          description: "곧 배송 완료 예정입니다",
          completed: false,
        },
      ],
    },
    TK987654321KR: {
      trackingNumber: "TK987654321KR",
      status: "delivered",
      estimatedDelivery: "2024-12-18",
      carrier: "로젠택배",
      currentLocation: "배송 완료",
      steps: [
        {
          status: "주문 접수",
          location: "온라인 쇼핑몰",
          timestamp: "2024-12-14 11:20",
          description: "주문이 접수되었습니다",
          completed: true,
        },
        {
          status: "상품 준비",
          location: "경기 성남시 창고",
          timestamp: "2024-12-14 16:30",
          description: "상품 포장이 완료되었습니다",
          completed: true,
        },
        {
          status: "배송 시작",
          location: "경기 성남시 물류센터",
          timestamp: "2024-12-15 09:00",
          description: "배송이 시작되었습니다",
          completed: true,
        },
        {
          status: "배송 완료",
          location: "서울 마포구 고객 주소지",
          timestamp: "2024-12-18 14:22",
          description: "배송이 완료되었습니다 (수령인: 김**)",
          completed: true,
        },
      ],
    },
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      preparing: { color: "bg-yellow-100 text-yellow-800", text: "준비중" },
      shipped: { color: "bg-blue-100 text-blue-800", text: "배송시작" },
      in_transit: { color: "bg-purple-100 text-purple-800", text: "운송중" },
      out_for_delivery: {
        color: "bg-orange-100 text-orange-800",
        text: "배송중",
      },
      delivered: { color: "bg-green-100 text-green-800", text: "배송완료" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.preparing;
    return <Badge className={`${config.color} border-0`}>{config.text}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing":
        return <Package className="w-5 h-5 text-yellow-600" />;
      case "shipped":
      case "in_transit":
        return <Truck className="w-5 h-5 text-blue-600" />;
      case "out_for_delivery":
        return <MapPin className="w-5 h-5 text-orange-600" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleTrackingSearch = async () => {
    if (!trackingNumber.trim()) {
      setError("송장번호를 입력해주세요");
      return;
    }

    setLoading(true);
    setError("");

    // 실제 API 호출 시뮬레이션
    setTimeout(() => {
      const foundTracking = sampleTrackingData[trackingNumber.trim()];
      if (foundTracking) {
        setTrackingInfo(foundTracking);
        setError("");
      } else {
        setTrackingInfo(null);
        setError(
          "해당 송장번호를 찾을 수 없습니다. 송장번호를 다시 확인해주세요."
        );
      }
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTrackingSearch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 송장번호 입력 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="송장번호를 입력하세요 (예: TK123456789KR)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg"
              />
            </div>
            <Button
              onClick={handleTrackingSearch}
              disabled={loading}
              className="px-8"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  검색중
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  조회
                </div>
              )}
            </Button>
          </div>

          {error && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* 샘플 송장번호 안내 */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              테스트용 송장번호
            </h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• TK123456789KR (운송중)</p>
              <p>• TK987654321KR (배송완료)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 배송 정보 */}
      {trackingInfo && (
        <div className="space-y-6">
          {/* 현재 상태 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getStatusIcon(trackingInfo.status)}
                배송 현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      송장번호
                    </label>
                    <p className="text-lg font-mono">
                      {trackingInfo.trackingNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      배송상태
                    </label>
                    <div className="mt-1">
                      {getStatusBadge(trackingInfo.status)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      택배회사
                    </label>
                    <p className="text-lg">{trackingInfo.carrier}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      현재 위치
                    </label>
                    <p className="text-lg">{trackingInfo.currentLocation}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      예상 배송일
                    </label>
                    <p className="text-lg">{trackingInfo.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 배송 추적 타임라인 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                배송 추적
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trackingInfo.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          step.completed
                            ? "bg-blue-600 border-blue-600"
                            : "bg-white border-gray-300"
                        }`}
                      />
                      {index < trackingInfo.steps.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            step.completed ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-3 mb-1">
                        <h4
                          className={`font-medium ${
                            step.completed ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {step.status}
                        </h4>
                        {step.completed && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {step.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.timestamp}
                        </span>
                      </div>
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
};

export default TrackingSystem;
