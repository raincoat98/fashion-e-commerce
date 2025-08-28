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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  Search,
  Filter,
  Download,
  Gift,
  Tag,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import CouponManager from "@/components/admin/CouponManager";
import ProductManager from "@/components/admin/ProductManager";
import CollectionManager from "@/components/admin/CollectionManager";
import OrderStatusManager from "@/components/admin/OrderStatusManager";
import ShippingManager from "@/components/admin/ShippingManager";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock 데이터
const mockOrders = [
  {
    id: "ORD-2024-001",
    customerName: "김미영",
    customerEmail: "kim@email.com",
    customerPhone: "010-1234-5678",
    products: [
      { name: "LUMINA 시그니처 티셔츠", quantity: 1, price: 89000 },
      { name: "프리미엄 데님 팬츠", quantity: 1, price: 129000 },
    ],
    totalAmount: 218000,
    orderDate: "2024-01-15",
    status: "pending",
    shippingAddress: "서울시 강남구 테헤란로 123, 456호",
    trackingNumber: null,
    estimatedDelivery: null,
  },
  {
    id: "ORD-2024-002",
    customerName: "박지민",
    customerEmail: "park@email.com",
    customerPhone: "010-2345-6789",
    products: [{ name: "엘레간트 원피스", quantity: 1, price: 159000 }],
    totalAmount: 159000,
    orderDate: "2024-01-14",
    status: "processing",
    shippingAddress: "서울시 서초구 강남대로 456, 789호",
    trackingNumber: "CJ123456789",
    estimatedDelivery: "2024-01-18",
  },
  {
    id: "ORD-2024-003",
    customerName: "이수진",
    customerEmail: "lee@email.com",
    customerPhone: "010-3456-7890",
    products: [{ name: "크롭 니트 가디건", quantity: 2, price: 99000 }],
    totalAmount: 198000,
    orderDate: "2024-01-13",
    status: "shipped",
    shippingAddress: "부산시 해운대구 해운대로 789, 101호",
    trackingNumber: "CJ987654321",
    estimatedDelivery: "2024-01-17",
  },
  {
    id: "ORD-2024-004",
    customerName: "최영희",
    customerEmail: "choi@email.com",
    customerPhone: "010-4567-8901",
    products: [
      { name: "LUMINA 시그니처 티셔츠", quantity: 1, price: 89000 },
      { name: "프리미엄 데님 팬츠", quantity: 1, price: 129000 },
      { name: "엘레간트 원피스", quantity: 1, price: 159000 },
    ],
    totalAmount: 377000,
    orderDate: "2024-01-12",
    status: "delivered",
    shippingAddress: "대구시 수성구 동대구로 321, 654호",
    trackingNumber: "CJ456789123",
    estimatedDelivery: "2024-01-16",
  },
];

const statusConfig = {
  pending: {
    label: "결제 대기",
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
  cancelled: {
    label: "주문 취소",
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
  },
};

export default function AdminPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 통계 계산
  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter(
    (order) => order.status === "pending"
  ).length;
  const processingOrders = mockOrders.filter(
    (order) => order.status === "processing"
  ).length;
  const shippedOrders = mockOrders.filter(
    (order) => order.status === "shipped"
  ).length;
  const deliveredOrders = mockOrders.filter(
    (order) => order.status === "delivered"
  ).length;
  const totalRevenue = mockOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  // 필터링된 주문
  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              관리자 대시보드
            </h1>
            <p className="text-gray-600 mt-1">LUMINA 주문 및 쿠폰 관리</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>엑셀 다운로드</span>
            </Button>
            <Link href="/admin/settings">
              <Button className="lumina-gradient text-white">설정</Button>
            </Link>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 주문</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalOrders}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">결제 대기</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {pendingOrders}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">처리 중</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {processingOrders}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">배송 중</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {shippedOrders}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 매출</p>
                  <p className="text-2xl font-bold text-green-600">
                    {totalRevenue.toLocaleString()}원
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 메인 탭 */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>주문 관리</span>
            </TabsTrigger>
            <TabsTrigger
              value="order-status"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>주문 상태</span>
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="flex items-center space-x-2"
            >
              <Truck className="w-4 h-4" />
              <span>배송 관리</span>
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="flex items-center space-x-2"
            >
              <Package className="w-4 h-4" />
              <span>상품 관리</span>
            </TabsTrigger>
            <TabsTrigger
              value="collections"
              className="flex items-center space-x-2"
            >
              <Tag className="w-4 h-4" />
              <span>컬렉션 관리</span>
            </TabsTrigger>
            <TabsTrigger
              value="coupons"
              className="flex items-center space-x-2"
            >
              <Gift className="w-4 h-4" />
              <span>쿠폰 관리</span>
            </TabsTrigger>
          </TabsList>

          {/* 주문 관리 탭 */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>주문 관리</CardTitle>
                    <CardDescription>
                      주문 상태를 관리하고 배송 정보를 업데이트하세요
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="상태" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="pending">결제 대기</SelectItem>
                        <SelectItem value="processing">처리 중</SelectItem>
                        <SelectItem value="shipped">배송 중</SelectItem>
                        <SelectItem value="delivered">배송 완료</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="주문번호, 고객명 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          주문번호
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          고객정보
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          상품
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          총액
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          주문일
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          상태
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          배송정보
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          액션
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => {
                        const StatusIcon =
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ].icon;
                        return (
                          <tr
                            key={order.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-4 px-4">
                              <span className="font-medium text-gray-900">
                                {order.id}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {order.customerName}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.customerEmail}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.customerPhone}
                                </p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="space-y-1">
                                {order.products.map((product, index) => (
                                  <div key={index} className="text-sm">
                                    <span className="font-medium">
                                      {product.name}
                                    </span>
                                    <span className="text-gray-600">
                                      {" "}
                                      x{product.quantity}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-medium text-gray-900">
                                {order.totalAmount.toLocaleString()}원
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-600">
                                {order.orderDate}
                              </span>
                            </td>
                            <td className="py-4 px-4">
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
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-sm">
                                {order.trackingNumber ? (
                                  <div>
                                    <p className="font-medium">
                                      운송장: {order.trackingNumber}
                                    </p>
                                    <p className="text-gray-600">
                                      예상 배송: {order.estimatedDelivery}
                                    </p>
                                  </div>
                                ) : (
                                  <span className="text-gray-500">
                                    배송 정보 없음
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <Link href={`/admin/orders/${order.id}`}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex items-center space-x-1"
                                >
                                  <span>상세보기</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 주문 상태 관리 탭 */}
          <TabsContent value="order-status" className="space-y-6">
            <OrderStatusManager />
          </TabsContent>

          {/* 배송 관리 탭 */}
          <TabsContent value="shipping" className="space-y-6">
            <ShippingManager />
          </TabsContent>

          {/* 상품 관리 탭 */}
          <TabsContent value="products" className="space-y-6">
            <ProductManager />
          </TabsContent>

          {/* 컬렉션 관리 탭 */}
          <TabsContent value="collections" className="space-y-6">
            <CollectionManager />
          </TabsContent>

          {/* 쿠폰 관리 탭 */}
          <TabsContent value="coupons" className="space-y-6">
            <CouponManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
