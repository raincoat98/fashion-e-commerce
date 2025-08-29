"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  Package,
  Star,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface Order {
  id: string;
  orderDate: string;
  status:
    | "pending"
    | "paid"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    orderDate: "2024-01-15 14:30:00",
    status: "delivered",
    totalAmount: 89000,
    items: [
      {
        id: "1",
        name: "LUMINA 시그니처 티셔츠",
        quantity: 2,
        price: 35000,
        size: "M",
        color: "화이트",
        image:
          "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "2",
        name: "프리미엄 데님 팬츠",
        quantity: 1,
        price: 19000,
        size: "L",
        color: "블루",
        image:
          "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
    shippingAddress: "서울시 강남구 테헤란로 123, 456호",
    paymentMethod: "신용카드",
    trackingNumber: "HJ1234567890",
    estimatedDelivery: "2024-01-18",
  },
  {
    id: "ORD-2024-002",
    orderDate: "2024-01-10 11:20:00",
    status: "shipped",
    totalAmount: 125000,
    items: [
      {
        id: "3",
        name: "베이직 후드 집업",
        quantity: 1,
        price: 65000,
        size: "L",
        color: "그레이",
        image:
          "https://images.pexels.com/photos/2703907/pexels-photo-2703907.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "4",
        name: "크롭 니트 가디건",
        quantity: 1,
        price: 60000,
        size: "M",
        color: "베이지",
        image:
          "https://images.pexels.com/photos/6811705/pexels-photo-6811705.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
    shippingAddress: "서울시 강남구 테헤란로 123, 456호",
    paymentMethod: "카카오페이",
    trackingNumber: "CJ9876543210",
    estimatedDelivery: "2024-01-25",
  },
  {
    id: "ORD-2024-003",
    orderDate: "2024-01-05 09:15:00",
    status: "processing",
    totalAmount: 168000,
    items: [
      {
        id: "5",
        name: "플로럴 원피스",
        quantity: 1,
        price: 168000,
        size: "S",
        color: "블루",
        image:
          "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
    shippingAddress: "서울시 강남구 테헤란로 123, 456호",
    paymentMethod: "신용카드",
    estimatedDelivery: "2024-01-30",
  },
  {
    id: "ORD-2024-004",
    orderDate: "2024-01-01 16:45:00",
    status: "pending",
    totalAmount: 79000,
    items: [
      {
        id: "6",
        name: "데님 스커트",
        quantity: 1,
        price: 79000,
        size: "M",
        color: "라이트블루",
        image:
          "https://images.pexels.com/photos/1021694/pexels-photo-1021694.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
    shippingAddress: "서울시 강남구 테헤란로 123, 456호",
    paymentMethod: "카카오페이",
  },
];

export default function OrderPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [activeTab, setActiveTab] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
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
        return "결제 대기";
      case "paid":
        return "결제 완료";
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <Package className="w-4 h-4" />;
      default:
        return <ShoppingBag className="w-4 h-4" />;
    }
  };

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const getOrderCount = (status: string) => {
    if (status === "all") return orders.length;
    return orders.filter((order) => order.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* 페이지 헤더 */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">주문 내역</h1>
            <p className="text-gray-600">주문하신 상품의 상태를 확인하세요</p>
          </div>

          {/* 주문 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      전체 주문
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {getOrderCount("all")}건
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-blue-800">
                    <ShoppingBag className="w-4 h-4" />
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
                      {getOrderCount("shipped")}건
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-100 text-indigo-800">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      배송 완료
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {getOrderCount("delivered")}건
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
                    <p className="text-sm font-medium text-gray-600">처리 중</p>
                    <p className="text-xl font-bold text-gray-900">
                      {getOrderCount("processing")}건
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-100 text-purple-800">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 주문 목록 */}
          <Card>
            <CardHeader>
              <CardTitle>주문 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="all">
                    전체 ({getOrderCount("all")})
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    결제 대기 ({getOrderCount("pending")})
                  </TabsTrigger>
                  <TabsTrigger value="processing">
                    처리 중 ({getOrderCount("processing")})
                  </TabsTrigger>
                  <TabsTrigger value="shipped">
                    배송 중 ({getOrderCount("shipped")})
                  </TabsTrigger>
                  <TabsTrigger value="delivered">
                    배송 완료 ({getOrderCount("delivered")})
                  </TabsTrigger>
                  <TabsTrigger value="cancelled">
                    취소됨 ({getOrderCount("cancelled")})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4 mt-6">
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        주문 내역이 없습니다
                      </h3>
                      <p className="text-gray-600 mb-6">
                        해당 상태의 주문이 없습니다.
                      </p>
                      <Link href="/">
                        <Button>쇼핑하러 가기</Button>
                      </Link>
                    </div>
                  ) : (
                    filteredOrders.map((order) => (
                      <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">
                                {order.id}
                              </CardTitle>
                              <CardDescription>
                                {order.orderDate}
                              </CardDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(order.status)}>
                                <div className="flex items-center space-x-1">
                                  {getStatusIcon(order.status)}
                                  <span>{getStatusLabel(order.status)}</span>
                                </div>
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {/* 상품 목록 */}
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center space-x-4"
                                >
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">
                                      {item.name}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {item.size} / {item.color} /{" "}
                                      {item.quantity}개
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                      {(
                                        item.price * item.quantity
                                      ).toLocaleString()}
                                      원
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="border-t pt-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-gray-600">
                                    총 결제금액
                                  </p>
                                  <p className="text-lg font-bold text-gray-900">
                                    {order.totalAmount.toLocaleString()}원
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-600">
                                    결제수단
                                  </p>
                                  <p className="text-sm font-medium">
                                    {order.paymentMethod}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* 배송 정보 */}
                            {order.trackingNumber && (
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-medium text-blue-900">
                                      송장번호
                                    </p>
                                    <p className="text-sm text-blue-700">
                                      {order.trackingNumber}
                                    </p>
                                  </div>
                                  <Link href="/profile">
                                    <Button size="sm" variant="outline">
                                      <Truck className="w-4 h-4 mr-1" />
                                      배송조회
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            )}

                            {/* 액션 버튼 */}
                            <div className="flex items-center justify-between pt-4 border-t">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-1" />
                                  상세보기
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="w-4 h-4 mr-1" />
                                  주문서
                                </Button>
                                {order.status === "delivered" && (
                                  <Button variant="outline" size="sm">
                                    <Star className="w-4 h-4 mr-1" />
                                    리뷰작성
                                  </Button>
                                )}
                              </div>
                              {order.status === "shipped" && (
                                <Button size="sm">
                                  <RefreshCw className="w-4 h-4 mr-1" />
                                  배송상태 새로고침
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
