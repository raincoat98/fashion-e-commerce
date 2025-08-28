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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Printer,
  Search,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  ExternalLink,
  Copy,
  RefreshCw,
  Eye,
  Package2,
  BarChart3,
  Settings,
} from "lucide-react";

interface ShippingOrder {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  shippingMemo?: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    size: string;
    color: string;
  }[];
  status: "pending" | "processing" | "shipped" | "delivered" | "returned";
  courier: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  shippingDate?: string;
  shippingLabel?: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  specialInstructions?: string;
  insuranceAmount?: number;
  shippingCost: number;
  createdAt: string;
  updatedAt: string;
}

interface Courier {
  id: string;
  name: string;
  code: string;
  logo: string;
  trackingUrl: string;
  phone: string;
  deliveryTime: string;
  baseRate: number;
  weightLimit: number;
  available: boolean;
}

const couriers: Courier[] = [
  {
    id: "cj",
    name: "CJ대한통운",
    code: "CJ",
    logo: "https://via.placeholder.com/60x30/FF6B35/FFFFFF?text=CJ",
    trackingUrl: "https://www.doortodoor.co.kr/parcel/",
    phone: "1588-1255",
    deliveryTime: "1-2일",
    baseRate: 3000,
    weightLimit: 30,
    available: true,
  },
  {
    id: "hanjin",
    name: "한진택배",
    code: "HJ",
    logo: "https://via.placeholder.com/60x30/FF6B35/FFFFFF?text=한진",
    trackingUrl:
      "https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillResult.do",
    phone: "1588-0011",
    deliveryTime: "1-2일",
    baseRate: 3000,
    weightLimit: 30,
    available: true,
  },
  {
    id: "lotte",
    name: "롯데택배",
    code: "LT",
    logo: "https://via.placeholder.com/60x30/FF6B35/FFFFFF?text=롯데",
    trackingUrl:
      "https://www.lotteglogis.com/home/reservation/tracking/linkView",
    phone: "1588-2121",
    deliveryTime: "1-2일",
    baseRate: 3000,
    weightLimit: 30,
    available: true,
  },
  {
    id: "logen",
    name: "로젠택배",
    code: "LG",
    logo: "https://via.placeholder.com/60x30/FF6B35/FFFFFF?text=로젠",
    trackingUrl: "https://www.ilogen.com/web/personal/trace/",
    phone: "1588-9988",
    deliveryTime: "1-2일",
    baseRate: 2800,
    weightLimit: 30,
    available: true,
  },
  {
    id: "epost",
    name: "우체국택배",
    code: "EP",
    logo: "https://via.placeholder.com/60x30/FF6B35/FFFFFF?text=우체국",
    trackingUrl:
      "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm",
    phone: "1588-1300",
    deliveryTime: "1-3일",
    baseRate: 2500,
    weightLimit: 30,
    available: true,
  },
  {
    id: "daesin",
    name: "대신택배",
    code: "DS",
    logo: "https://via.placeholder.com/60x30/FF6B35/FFFFFF?text=대신",
    trackingUrl: "https://www.daesinlogistics.co.kr/",
    phone: "1588-1144",
    deliveryTime: "1-2일",
    baseRate: 2800,
    weightLimit: 30,
    available: true,
  },
];

const mockShippingOrders: ShippingOrder[] = [
  {
    id: "SHIP-2024-001",
    orderId: "ORD-2024-001",
    customerName: "김미영",
    customerPhone: "010-1234-5678",
    customerEmail: "kim@email.com",
    shippingAddress: "서울시 강남구 테헤란로 123, 456호",
    shippingMemo: "문 앞에 놓아주세요",
    items: [
      {
        id: "1",
        name: "LUMINA 시그니처 티셔츠",
        quantity: 2,
        size: "M",
        color: "화이트",
      },
      {
        id: "2",
        name: "프리미엄 데님 팬츠",
        quantity: 1,
        size: "L",
        color: "블루",
      },
    ],
    status: "processing",
    courier: "cj",
    weight: 1.2,
    dimensions: {
      length: 30,
      width: 20,
      height: 10,
    },
    specialInstructions: "깨지기 쉬운 상품",
    insuranceAmount: 50000,
    shippingCost: 3000,
    createdAt: "2024-01-15 14:30:00",
    updatedAt: "2024-01-15 16:00:00",
  },
  {
    id: "SHIP-2024-002",
    orderId: "ORD-2024-002",
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
    status: "shipped",
    courier: "hanjin",
    trackingNumber: "HJ1234567890",
    estimatedDelivery: "2024-01-18",
    shippingDate: "2024-01-16 10:00:00",
    weight: 0.8,
    dimensions: {
      length: 25,
      width: 15,
      height: 8,
    },
    shippingCost: 3000,
    createdAt: "2024-01-15 15:00:00",
    updatedAt: "2024-01-16 10:00:00",
  },
];

export default function ShippingManager() {
  const [orders, setOrders] = useState<ShippingOrder[]>(mockShippingOrders);
  const [selectedOrder, setSelectedOrder] = useState<ShippingOrder | null>(
    null
  );
  const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false);
  const [isLabelDialogOpen, setIsLabelDialogOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState<string>("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [insuranceAmount, setInsuranceAmount] = useState<number>(0);

  // 배송 상태별 통계
  const getStatusStats = () => {
    const stats = {
      pending: orders.filter((order) => order.status === "pending").length,
      processing: orders.filter((order) => order.status === "processing")
        .length,
      shipped: orders.filter((order) => order.status === "shipped").length,
      delivered: orders.filter((order) => order.status === "delivered").length,
      returned: orders.filter((order) => order.status === "returned").length,
    };
    return stats;
  };

  const statusStats = getStatusStats();

  // 송장 발급
  const issueTrackingNumber = (orderId: string) => {
    if (!selectedCourier || !trackingNumber) {
      alert("택배사와 송장번호를 입력해주세요.");
      return;
    }

    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          const courier = couriers.find((c) => c.id === selectedCourier);
          return {
            ...order,
            status: "shipped",
            courier: selectedCourier,
            trackingNumber,
            shippingDate: new Date()
              .toISOString()
              .replace("T", " ")
              .substring(0, 19),
            estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
            specialInstructions,
            insuranceAmount: insuranceAmount > 0 ? insuranceAmount : undefined,
            updatedAt: new Date()
              .toISOString()
              .replace("T", " ")
              .substring(0, 19),
          };
        }
        return order;
      })
    );

    setIsShippingDialogOpen(false);
    setSelectedCourier("");
    setTrackingNumber("");
    setSpecialInstructions("");
    setInsuranceAmount(0);
  };

  // 배송 추적
  const trackPackage = (trackingNumber: string, courierCode: string) => {
    const courier = couriers.find((c) => c.code === courierCode);
    if (courier) {
      window.open(`${courier.trackingUrl}?waybill=${trackingNumber}`, "_blank");
    }
  };

  // 출고 라벨 생성
  const generateShippingLabel = (order: ShippingOrder) => {
    const courier = couriers.find((c) => c.id === order.courier);
    const labelContent = `
LUMINA - 출고 라벨
================

주문번호: ${order.orderId}
배송번호: ${order.id}
고객명: ${order.customerName}
연락처: ${order.customerPhone}
배송지: ${order.shippingAddress}
${order.shippingMemo ? `배송메모: ${order.shippingMemo}` : ""}

상품 내역:
${order.items
  .map((item) => `${item.name} - ${item.size}/${item.color} x${item.quantity}`)
  .join("\n")}

택배사: ${courier?.name}
송장번호: ${order.trackingNumber || "미발급"}
무게: ${order.weight}kg
크기: ${order.dimensions.length}x${order.dimensions.width}x${
      order.dimensions.height
    }cm
${order.specialInstructions ? `특별지시: ${order.specialInstructions}` : ""}
${
  order.insuranceAmount
    ? `보험금액: ${order.insuranceAmount.toLocaleString()}원`
    : ""
}

발급일시: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([labelContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shipping-label-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 송장번호 복사
  const copyTrackingNumber = (trackingNumber: string) => {
    navigator.clipboard.writeText(trackingNumber);
  };

  return (
    <div className="space-y-6">
      {/* 배송 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">배송 대기</p>
                <p className="text-xl font-bold text-gray-900">
                  {statusStats.pending}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-yellow-100 text-yellow-800">
                <Clock className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">처리 중</p>
                <p className="text-xl font-bold text-gray-900">
                  {statusStats.processing}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-blue-800">
                <Package className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">배송 중</p>
                <p className="text-xl font-bold text-gray-900">
                  {statusStats.shipped}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-100 text-purple-800">
                <Truck className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">배송 완료</p>
                <p className="text-xl font-bold text-gray-900">
                  {statusStats.delivered}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">반송</p>
                <p className="text-xl font-bold text-gray-900">
                  {statusStats.returned}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 text-red-800">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 배송 주문 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>배송 관리</CardTitle>
          <CardDescription>
            송장 발급, 배송 추적, 출고 라벨 인쇄를 관리하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => {
              const courier = couriers.find((c) => c.id === order.courier);
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
              const StatusIcon = statusConfig[order.status].icon;

              return (
                <Card
                  key={order.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* 주문 헤더 */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-medium text-gray-900">
                            {order.id}
                          </h3>
                          <Badge className={statusConfig[order.status].color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[order.status].label}
                          </Badge>
                          {courier && (
                            <div className="flex items-center space-x-2">
                              <img
                                src={courier.logo}
                                alt={courier.name}
                                className="h-6"
                              />
                              <span className="text-sm text-gray-600">
                                {courier.name}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.createdAt}
                        </div>
                      </div>

                      {/* 고객 정보 */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {order.customerName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.customerPhone}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.customerEmail}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            배송지
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.shippingAddress}
                          </p>
                          {order.shippingMemo && (
                            <p className="text-sm text-gray-500">
                              메모: {order.shippingMemo}
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            배송 정보
                          </p>
                          <p className="text-sm text-gray-600">
                            무게: {order.weight}kg
                          </p>
                          <p className="text-sm text-gray-600">
                            크기: {order.dimensions.length}x
                            {order.dimensions.width}x{order.dimensions.height}cm
                          </p>
                          <p className="text-sm text-gray-600">
                            배송비: {order.shippingCost.toLocaleString()}원
                          </p>
                        </div>
                      </div>

                      {/* 상품 정보 */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          상품 내역
                        </h4>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">
                                  {item.size} / {item.color} / {item.quantity}개
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 송장 정보 */}
                      {order.trackingNumber && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                송장번호
                              </p>
                              <p className="text-lg font-mono text-blue-600">
                                {order.trackingNumber}
                              </p>
                              {order.estimatedDelivery && (
                                <p className="text-sm text-gray-600">
                                  예상 배송: {order.estimatedDelivery}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  copyTrackingNumber(order.trackingNumber!)
                                }
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                복사
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  trackPackage(
                                    order.trackingNumber!,
                                    courier?.code || ""
                                  )
                                }
                              >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                추적
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 액션 버튼 */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-2">
                          {!order.trackingNumber && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsShippingDialogOpen(true);
                              }}
                            >
                              <Package className="w-4 h-4 mr-1" />
                              송장 발급
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => generateShippingLabel(order)}
                          >
                            <Printer className="w-4 h-4 mr-1" />
                            출고 라벨
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsTrackingDialogOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            상세 보기
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            배송서
                          </Button>
                          {order.trackingNumber && (
                            <Button size="sm" variant="outline">
                              <FileText className="w-4 h-4 mr-1" />
                              송장서
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 송장 발급 다이얼로그 */}
      <Dialog
        open={isShippingDialogOpen}
        onOpenChange={setIsShippingDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>송장 발급</DialogTitle>
            <DialogDescription>
              택배사와 송장번호를 입력하여 배송을 시작하세요
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              {/* 주문 정보 */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">주문 정보</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <span className="font-medium">주문번호:</span>{" "}
                      {selectedOrder.orderId}
                    </p>
                    <p>
                      <span className="font-medium">고객명:</span>{" "}
                      {selectedOrder.customerName}
                    </p>
                    <p>
                      <span className="font-medium">연락처:</span>{" "}
                      {selectedOrder.customerPhone}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">배송지:</span>{" "}
                      {selectedOrder.shippingAddress}
                    </p>
                    <p>
                      <span className="font-medium">무게:</span>{" "}
                      {selectedOrder.weight}kg
                    </p>
                    <p>
                      <span className="font-medium">크기:</span>{" "}
                      {selectedOrder.dimensions.length}x
                      {selectedOrder.dimensions.width}x
                      {selectedOrder.dimensions.height}cm
                    </p>
                  </div>
                </div>
              </div>

              {/* 택배사 선택 */}
              <div>
                <Label htmlFor="courier">택배사 선택</Label>
                <Select
                  value={selectedCourier}
                  onValueChange={setSelectedCourier}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="택배사를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {couriers
                      .filter((c) => c.available)
                      .map((courier) => (
                        <SelectItem key={courier.id} value={courier.id}>
                          <div className="flex items-center space-x-2">
                            <img
                              src={courier.logo}
                              alt={courier.name}
                              className="h-4"
                            />
                            <span>{courier.name}</span>
                            <span className="text-xs text-gray-500">
                              ({courier.deliveryTime})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 송장번호 입력 */}
              <div>
                <Label htmlFor="trackingNumber">송장번호</Label>
                <Input
                  id="trackingNumber"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="송장번호를 입력하세요"
                />
              </div>

              {/* 특별 지시사항 */}
              <div>
                <Label htmlFor="specialInstructions">특별 지시사항</Label>
                <Textarea
                  id="specialInstructions"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="특별한 배송 요청사항이 있다면 입력하세요"
                  rows={3}
                />
              </div>

              {/* 보험 금액 */}
              <div>
                <Label htmlFor="insuranceAmount">보험 금액 (선택사항)</Label>
                <Input
                  id="insuranceAmount"
                  type="number"
                  value={insuranceAmount}
                  onChange={(e) => setInsuranceAmount(Number(e.target.value))}
                  placeholder="보험 금액을 입력하세요"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsShippingDialogOpen(false)}
                >
                  취소
                </Button>
                <Button onClick={() => issueTrackingNumber(selectedOrder.id)}>
                  송장 발급
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 배송 추적 다이얼로그 */}
      <Dialog
        open={isTrackingDialogOpen}
        onOpenChange={setIsTrackingDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>배송 상세 정보</DialogTitle>
            <DialogDescription>
              배송 상태와 추적 정보를 확인하세요
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">배송 정보</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">주문번호</span>
                    <span>{selectedOrder.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">배송번호</span>
                    <span>{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">택배사</span>
                    <span>
                      {
                        couriers.find((c) => c.id === selectedOrder.courier)
                          ?.name
                      }
                    </span>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">송장번호</span>
                      <span className="font-mono">
                        {selectedOrder.trackingNumber}
                      </span>
                    </div>
                  )}
                  {selectedOrder.shippingDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">발송일</span>
                      <span>{selectedOrder.shippingDate}</span>
                    </div>
                  )}
                  {selectedOrder.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">예상 배송일</span>
                      <span>{selectedOrder.estimatedDelivery}</span>
                    </div>
                  )}
                  {selectedOrder.actualDelivery && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">실제 배송일</span>
                      <span>{selectedOrder.actualDelivery}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedOrder.trackingNumber && (
                <div className="flex justify-center">
                  <Button
                    onClick={() =>
                      trackPackage(
                        selectedOrder.trackingNumber!,
                        couriers.find((c) => c.id === selectedOrder.courier)
                          ?.code || ""
                      )
                    }
                    className="w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    배송 추적하기
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
