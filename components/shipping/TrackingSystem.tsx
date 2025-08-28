"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Truck,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
  Copy,
  RefreshCw,
  AlertCircle,
  FileText,
  Download,
} from "lucide-react";

interface TrackingInfo {
  trackingNumber: string;
  courier: string;
  courierName: string;
  courierLogo: string;
  courierPhone: string;
  courierTrackingUrl: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "returned";
  estimatedDelivery: string;
  actualDelivery?: string;
  shippingDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    size: string;
    color: string;
  }[];
  trackingHistory: {
    date: string;
    time: string;
    location: string;
    status: string;
    description: string;
  }[];
}

const couriers = [
  {
    id: "cj",
    name: "CJ대한통운",
    code: "CJ",
    logo: "https://via.placeholder.com/60x30/FF6B35/FFFFFF?text=CJ",
    phone: "1588-1255",
    trackingUrl: "https://www.doortodoor.co.kr/parcel/",
  },
  {
    id: "hanjin",
    name: "한진택배",
    code: "HJ",
    logo: "https://via.placeholder.com/60x30/FF6B35/FFFFFF?text=한진",
    phone: "1588-0011",
    trackingUrl:
      "https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillResult.do",
  },
  {
    id: "lotte",
    name: "롯데택배",
    code: "LT",
    logo: "https://via.placeholder.com/60x30/FF6B35/FFFFFF?text=롯데",
    phone: "1588-2121",
    trackingUrl:
      "https://www.lotteglogis.com/home/reservation/tracking/linkView",
  },
  {
    id: "logen",
    name: "로젠택배",
    code: "LG",
    logo: "https://via.placeholder.com/60x30/FF6B35/FFFFFF?text=로젠",
    phone: "1588-9988",
    trackingUrl: "https://www.ilogen.com/web/personal/trace/",
  },
  {
    id: "epost",
    name: "우체국택배",
    code: "EP",
    logo: "https://via.placeholder.com/60x30/FF6B35/FFFFFF?text=우체국",
    phone: "1588-1300",
    trackingUrl:
      "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm",
  },
];

const mockTrackingData: { [key: string]: TrackingInfo } = {
  HJ1234567890: {
    trackingNumber: "HJ1234567890",
    courier: "hanjin",
    courierName: "한진택배",
    courierLogo: "https://via.placeholder.com/60x30/FF6B35/FFFFFF?text=한진",
    courierPhone: "1588-0011",
    courierTrackingUrl:
      "https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillResult.do",
    status: "shipped",
    estimatedDelivery: "2024-01-18",
    shippingDate: "2024-01-16 10:00:00",
    customerName: "박지민",
    customerPhone: "010-9876-5432",
    customerEmail: "park@email.com",
    shippingAddress: "부산시 해운대구 해운대로 456, 789호",
    items: [
      {
        id: "3",
        name: "베이직 후드 집업",
        quantity: 1,
        size: "L",
        color: "그레이",
      },
    ],
    trackingHistory: [
      {
        date: "2024-01-16",
        time: "10:00",
        location: "서울 강남구",
        status: "발송",
        description: "상품이 발송되었습니다.",
      },
      {
        date: "2024-01-16",
        time: "14:30",
        location: "서울 강남구",
        status: "집화",
        description: "상품이 집화되었습니다.",
      },
      {
        date: "2024-01-16",
        time: "18:00",
        location: "서울 강남구",
        status: "배송출발",
        description: "배송이 시작되었습니다.",
      },
      {
        date: "2024-01-17",
        time: "09:00",
        location: "부산 해운대구",
        status: "배송중",
        description: "배송 중입니다.",
      },
    ],
  },
};

export default function TrackingSystem() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const statusConfig = {
    pending: {
      label: "배송 대기",
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
    },
    processing: {
      label: "처리 중",
      color: "bg-blue-100 text-blue-800",
      icon: Package,
    },
    shipped: {
      label: "배송 중",
      color: "bg-purple-100 text-purple-800",
      icon: Truck,
    },
    delivered: {
      label: "배송 완료",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
    returned: {
      label: "반송",
      color: "bg-red-100 text-red-800",
      icon: AlertCircle,
    },
  };

  const searchTracking = async () => {
    if (!trackingNumber.trim()) {
      setError("송장번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    // 실제 API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundTracking = mockTrackingData[trackingNumber];
    if (foundTracking) {
      setTrackingInfo(foundTracking);
    } else {
      setError("송장번호를 찾을 수 없습니다. 다시 확인해주세요.");
      setTrackingInfo(null);
    }

    setIsLoading(false);
  };

  const copyTrackingNumber = () => {
    if (trackingInfo) {
      navigator.clipboard.writeText(trackingInfo.trackingNumber);
    }
  };

  const openCourierTracking = () => {
    if (trackingInfo) {
      window.open(
        `${trackingInfo.courierTrackingUrl}?waybill=${trackingInfo.trackingNumber}`,
        "_blank"
      );
    }
  };

  const downloadTrackingReport = () => {
    if (!trackingInfo) return;

    const reportContent = `
LUMINA - 배송 추적 리포트
========================

송장번호: ${trackingInfo.trackingNumber}
택배사: ${trackingInfo.courierName}
고객명: ${trackingInfo.customerName}
연락처: ${trackingInfo.customerPhone}
배송지: ${trackingInfo.shippingAddress}

상품 내역:
${trackingInfo.items
  .map((item) => `${item.name} - ${item.size}/${item.color} x${item.quantity}`)
  .join("\n")}

배송 정보:
- 발송일: ${trackingInfo.shippingDate}
- 예상 배송일: ${trackingInfo.estimatedDelivery}
- 현재 상태: ${statusConfig[trackingInfo.status].label}

배송 이력:
${trackingInfo.trackingHistory
  .map(
    (history) =>
      `${history.date} ${history.time} - ${history.location} - ${history.status} - ${history.description}`
  )
  .join("\n")}

문의: ${trackingInfo.courierPhone}
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tracking-report-${trackingInfo.trackingNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 검색 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>배송 조회</span>
          </CardTitle>
          <CardDescription>
            송장번호를 입력하여 배송 상태를 확인하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="trackingNumber">송장번호</Label>
              <Input
                id="trackingNumber"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="송장번호를 입력하세요"
                onKeyPress={(e) => e.key === "Enter" && searchTracking()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={searchTracking} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    조회 중...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    조회
                  </>
                )}
              </Button>
            </div>
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </CardContent>
      </Card>

      {/* 배송 정보 */}
      {trackingInfo && (
        <div className="space-y-6">
          {/* 배송 상태 요약 */}
          <Card>
            <CardHeader>
              <CardTitle>배송 상태</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={trackingInfo.courierLogo}
                    alt={trackingInfo.courierName}
                    className="h-8"
                  />
                  <div>
                    <h3 className="font-medium">{trackingInfo.courierName}</h3>
                    <p className="text-sm text-gray-600">
                      송장번호: {trackingInfo.trackingNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={statusConfig[trackingInfo.status].color}>
                    {statusConfig[trackingInfo.status].label}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyTrackingNumber}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    복사
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={openCourierTracking}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    상세보기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 배송 정보 상세 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 고객 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>배송 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      {trackingInfo.shippingAddress}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      예상 배송: {trackingInfo.estimatedDelivery}
                    </span>
                  </div>
                  {trackingInfo.actualDelivery && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        배송 완료: {trackingInfo.actualDelivery}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{trackingInfo.courierPhone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 상품 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>상품 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trackingInfo.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.size} / {item.color} / {item.quantity}개
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 배송 이력 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>배송 이력</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={downloadTrackingReport}
                >
                  <Download className="w-4 h-4 mr-2" />
                  리포트 다운로드
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingInfo.trackingHistory.map((history, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      {index < trackingInfo.trackingHistory.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{history.status}</p>
                          <p className="text-sm text-gray-600">
                            {history.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{history.date}</p>
                          <p className="text-sm text-gray-600">
                            {history.time}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {history.location}
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
