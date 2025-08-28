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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Calendar,
  Send,
  Download,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";

interface ShippingOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  products: string[];
  totalAmount: number;
  status: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  courier?: string;
  lastUpdate: string;
}

const mockShippingOrders: ShippingOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customerName: "김미영",
    customerPhone: "010-1234-5678",
    shippingAddress: "서울시 강남구 테헤란로 123, 456호",
    products: ["LUMINA 시그니처 티셔츠", "프리미엄 데님 팬츠"],
    totalAmount: 218000,
    status: "ready",
    estimatedDelivery: "2024-01-18",
    courier: "CJ대한통운",
    lastUpdate: "2024-01-15 14:30:00",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customerName: "박지민",
    customerPhone: "010-2345-6789",
    shippingAddress: "서울시 서초구 강남대로 456, 789호",
    products: ["엘레간트 원피스"],
    totalAmount: 159000,
    status: "shipped",
    trackingNumber: "CJ123456789",
    estimatedDelivery: "2024-01-18",
    courier: "CJ대한통운",
    lastUpdate: "2024-01-16 09:15:00",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customerName: "이수진",
    customerPhone: "010-3456-7890",
    shippingAddress: "부산시 해운대구 해운대로 789, 101호",
    products: ["크롭 니트 가디건"],
    totalAmount: 198000,
    status: "delivered",
    trackingNumber: "CJ987654321",
    estimatedDelivery: "2024-01-17",
    actualDelivery: "2024-01-17 14:20:00",
    courier: "CJ대한통운",
    lastUpdate: "2024-01-17 14:20:00",
  },
];

const statusConfig = {
  ready: {
    label: "배송 준비",
    color: "bg-yellow-100 text-yellow-800",
    icon: Package,
  },
  shipped: {
    label: "배송 중",
    color: "bg-blue-100 text-blue-800",
    icon: Truck,
  },
  delivered: {
    label: "배송 완료",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  delayed: {
    label: "배송 지연",
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
  },
};

const courierOptions = [
  { value: "CJ대한통운", label: "CJ대한통운" },
  { value: "한진택배", label: "한진택배" },
  { value: "로젠택배", label: "로젠택배" },
  { value: "우체국택배", label: "우체국택배" },
  { value: "롯데택배", label: "롯데택배" },
];

export default function ShippingManager() {
  const [orders, setOrders] = useState<ShippingOrder[]>(mockShippingOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourier, setSelectedCourier] = useState<string>("all");
  const [bulkActions, setBulkActions] = useState<string[]>([]);

  // 필터링된 주문
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourier =
      selectedCourier === "all" || order.courier === selectedCourier;
    return matchesStatus && matchesSearch && matchesCourier;
  });

  // 배송 상태 업데이트
  const updateShippingStatus = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              lastUpdate: new Date()
                .toISOString()
                .replace("T", " ")
                .substring(0, 19),
            }
          : order
      )
    );
  };

  // 운송장 번호 추가
  const addTrackingNumber = (
    orderId: string,
    trackingNumber: string,
    courier: string
  ) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              trackingNumber,
              courier,
              status: "shipped",
              lastUpdate: new Date()
                .toISOString()
                .replace("T", " ")
                .substring(0, 19),
            }
          : order
      )
    );
  };

  // 배송 알림 발송
  const sendShippingNotification = (orderId: string) => {
    // TODO: 실제 SMS/이메일 발송 로직
    console.log(`배송 알림 발송: ${orderId}`);
  };

  // 일괄 배송 준비
  const bulkPrepareShipping = () => {
    const selectedOrders = orders.filter((order) =>
      bulkActions.includes(order.id)
    );
    setOrders(
      orders.map((order) =>
        bulkActions.includes(order.id)
          ? {
              ...order,
              status: "ready",
              lastUpdate: new Date()
                .toISOString()
                .replace("T", " ")
                .substring(0, 19),
            }
          : order
      )
    );
    setBulkActions([]);
  };

  // 통계 계산
  const readyOrders = orders.filter((order) => order.status === "ready").length;
  const shippedOrders = orders.filter(
    (order) => order.status === "shipped"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;
  const delayedOrders = orders.filter(
    (order) => order.status === "delayed"
  ).length;

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">배송 준비</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {readyOrders}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">배송 중</p>
                <p className="text-2xl font-bold text-blue-600">
                  {shippedOrders}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">배송 완료</p>
                <p className="text-2xl font-bold text-green-600">
                  {deliveredOrders}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">배송 지연</p>
                <p className="text-2xl font-bold text-red-600">
                  {delayedOrders}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 필터 및 검색 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>배송 관리</CardTitle>
              <CardDescription>
                배송 상태를 관리하고 운송장 번호를 입력하세요
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>엑셀 다운로드</span>
              </Button>
              <Button className="lumina-gradient text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                새로고침
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="배송 상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="ready">배송 준비</SelectItem>
                  <SelectItem value="shipped">배송 중</SelectItem>
                  <SelectItem value="delivered">배송 완료</SelectItem>
                  <SelectItem value="delayed">배송 지연</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedCourier}
                onValueChange={setSelectedCourier}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="택배사" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  {courierOptions.map((courier) => (
                    <SelectItem key={courier.value} value={courier.value}>
                      {courier.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="주문번호, 고객명 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>

            {bulkActions.length > 0 && (
              <Button
                onClick={bulkPrepareShipping}
                className="lumina-gradient text-white"
              >
                선택 주문 배송 준비 ({bulkActions.length}개)
              </Button>
            )}
          </div>

          {/* 주문 목록 */}
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon =
                statusConfig[order.status as keyof typeof statusConfig].icon;
              return (
                <Card
                  key={order.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={bulkActions.includes(order.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBulkActions([...bulkActions, order.id]);
                            } else {
                              setBulkActions(
                                bulkActions.filter((id) => id !== order.id)
                              );
                            }
                          }}
                          className="rounded border-gray-300"
                        />

                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-900">
                              {order.orderNumber}
                            </h3>
                            <Badge
                              className={
                                statusConfig[
                                  order.status as keyof typeof statusConfig
                                ].color
                              }
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {
                                statusConfig[
                                  order.status as keyof typeof statusConfig
                                ].label
                              }
                            </Badge>
                          </div>

                          <div className="space-y-1 text-sm text-gray-600">
                            <p>
                              <strong>{order.customerName}</strong> |{" "}
                              {order.customerPhone}
                            </p>
                            <p className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{order.shippingAddress}</span>
                            </p>
                            <p>{order.products.join(", ")}</p>
                            <p className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>예상 배송: {order.estimatedDelivery}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {order.totalAmount.toLocaleString()}원
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.courier || "택배사 미선택"}
                          </p>
                          {order.trackingNumber && (
                            <p className="text-sm text-blue-600">
                              운송장: {order.trackingNumber}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col space-y-2">
                          {order.status === "ready" && (
                            <Button size="sm" variant="outline">
                              운송장 입력
                            </Button>
                          )}
                          {order.status === "shipped" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => sendShippingNotification(order.id)}
                            >
                              <Send className="w-3 h-3 mr-1" />
                              알림 발송
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            상세보기
                          </Button>
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
    </div>
  );
}
