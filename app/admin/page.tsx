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
  Plus,
  Image,
  Home,
  BarChart3,
  ShoppingCart,
  Settings,
  Bell,
  Menu,
  X,
  Eye,
  ArrowUpRight,
  Activity,
  Star,
} from "lucide-react";
import Link from "next/link";
import CouponManager from "@/components/admin/CouponManager";
import ProductManager from "@/components/admin/ProductManager";
import CollectionManager from "@/components/admin/CollectionManager";
import OrderStatusManager from "@/components/admin/OrderStatusManager";
import ShippingManager from "@/components/admin/ShippingManager";
import CustomerManager from "@/components/admin/CustomerManager";
import BannerManager from "@/components/admin/BannerManager";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Mock 데이터
const mockOrders = [
  {
    id: "ORD-2025-001",
    customerName: "김미영",
    customerEmail: "kim@email.com",
    customerPhone: "010-1234-5678",
    products: [
      { name: "LUMINA 시그니처 티셔츠", quantity: 1, price: 89000 },
      { name: "프리미엄 데님 팬츠", quantity: 1, price: 129000 },
    ],
    totalAmount: 218000,
    orderDate: "2025-01-15",
    status: "pending",
    shippingAddress: "서울시 강남구 테헤란로 123, 456호",
    trackingNumber: null,
    estimatedDelivery: null,
  },
  {
    id: "ORD-2025-002",
    customerName: "박지민",
    customerEmail: "park@email.com",
    customerPhone: "010-2345-6789",
    products: [{ name: "엘레간트 원피스", quantity: 1, price: 159000 }],
    totalAmount: 159000,
    orderDate: "2025-01-14",
    status: "processing",
    shippingAddress: "서울시 서초구 강남대로 456, 789호",
    trackingNumber: "CJ123456789",
    estimatedDelivery: "2025-01-18",
  },
  {
    id: "ORD-2025-003",
    customerName: "이수진",
    customerEmail: "lee@email.com",
    customerPhone: "010-3456-7890",
    products: [{ name: "크롭 니트 가디건", quantity: 2, price: 99000 }],
    totalAmount: 198000,
    orderDate: "2025-01-13",
    status: "shipped",
    shippingAddress: "부산시 해운대구 해운대로 789, 101호",
    trackingNumber: "CJ987654321",
    estimatedDelivery: "2025-01-17",
  },
  {
    id: "ORD-2025-004",
    customerName: "최영희",
    customerEmail: "choi@email.com",
    customerPhone: "010-4567-8901",
    products: [
      { name: "LUMINA 시그니처 티셔츠", quantity: 1, price: 89000 },
      { name: "프리미엄 데님 팬츠", quantity: 1, price: 129000 },
      { name: "엘레간트 원피스", quantity: 1, price: 159000 },
    ],
    totalAmount: 377000,
    orderDate: "2025-01-12",
    status: "delivered",
    shippingAddress: "대구시 수성구 동대구로 321, 654호",
    trackingNumber: "CJ456789123",
    estimatedDelivery: "2025-01-16",
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // 주문 관리 상태
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isStatusChangeDialogOpen, setIsStatusChangeDialogOpen] =
    useState(false);
  const [isPartialCancelDialogOpen, setIsPartialCancelDialogOpen] =
    useState(false);
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const [cancelItems, setCancelItems] = useState<{ [key: string]: number }>({});

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

  // 주문 플로우에 맞는 메뉴 아이템들
  const menuItems = [
    {
      id: "dashboard",
      name: "대시보드",
      icon: BarChart3,
      description: "전체 현황 보기",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "orders",
      name: "주문 관리",
      icon: ShoppingCart,
      description: "신규 주문 및 처리",
      color: "text-green-600",
      bgColor: "bg-green-50",
      badge: pendingOrders > 0 ? pendingOrders : null,
    },
    {
      id: "order-status",
      name: "주문 상태",
      icon: RefreshCw,
      description: "주문 상태 업데이트",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "shipping",
      name: "배송 관리",
      icon: Truck,
      description: "배송 및 물류",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "products",
      name: "상품 관리",
      icon: Package,
      description: "재고 및 상품 정보",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      id: "collections",
      name: "컬렉션",
      icon: Tag,
      description: "상품 카테고리",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      id: "customers",
      name: "고객 관리",
      icon: Users,
      description: "고객 정보 및 분석",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      id: "banners",
      name: "배너 관리",
      icon: Image,
      description: "홈페이지 배너",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: "coupons",
      name: "쿠폰 관리",
      icon: Gift,
      description: "할인 쿠폰",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

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

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // 실제로는 API 호출로 상태 업데이트
    console.log(`Order ${orderId} status changed to ${newStatus}`);
  };

  // 주문 상태 변경
  const handleOrderStatusChange = () => {
    if (selectedOrder && newOrderStatus) {
      handleStatusChange(selectedOrder.id, newOrderStatus);
      setIsStatusChangeDialogOpen(false);
      setSelectedOrder(null);
      setNewOrderStatus("");
    }
  };

  // 부분 취소 처리
  const handlePartialCancel = () => {
    if (selectedOrder) {
      const cancelledItems = Object.entries(cancelItems)
        .filter(([_, quantity]) => quantity > 0)
        .map(([productName, quantity]) => ({ productName, quantity }));

      console.log(`Order ${selectedOrder.id} partial cancel:`, cancelledItems);
      setIsPartialCancelDialogOpen(false);
      setSelectedOrder(null);
      setCancelItems({});
    }
  };

  // 영수증 발급
  const generateReceipt = (order: any) => {
    const receiptContent = `
LUMINA - 영수증
=================

주문번호: ${order.id}
주문일자: ${order.orderDate}
고객명: ${order.customerName}
고객이메일: ${order.customerEmail}
고객전화: ${order.customerPhone}

주문 상품:
${order.products
  .map(
    (product: any) =>
      `${product.name} - ${
        product.quantity
      }개 x ${product.price.toLocaleString()}원 = ${(
        product.quantity * product.price
      ).toLocaleString()}원`
  )
  .join("\n")}

총 주문금액: ${order.totalAmount.toLocaleString()}원
주문상태: ${
      statusConfig[order.status as keyof typeof statusConfig]?.label ||
      order.status
    }

배송지: ${order.shippingAddress}
${order.trackingNumber ? `운송장번호: ${order.trackingNumber}` : ""}
${order.estimatedDelivery ? `예상배송일: ${order.estimatedDelivery}` : ""}

발급일시: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 엑셀 다운로드 함수들
  const handleExportOrders = () => {
    const csvContent = generateOrdersCSV(filteredOrders);
    downloadCSV(
      csvContent,
      `orders_${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  const handleExportOrderStatus = () => {
    const csvContent = generateOrderStatusCSV(mockOrders);
    downloadCSV(
      csvContent,
      `order_status_${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  const handleExportShipping = () => {
    const csvContent = generateShippingCSV(mockOrders);
    downloadCSV(
      csvContent,
      `shipping_${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  // CSV 생성 함수들
  const generateOrdersCSV = (orders: any[]) => {
    const headers = [
      "주문번호",
      "고객명",
      "고객이메일",
      "고객전화",
      "상품명",
      "수량",
      "총액",
      "주문일",
      "상태",
      "배송주소",
    ];
    const rows = orders.map((order) => [
      order.id,
      order.customerName,
      order.customerEmail,
      order.customerPhone,
      order.products.map((p: any) => p.name).join("; "),
      order.products.reduce((sum: number, p: any) => sum + p.quantity, 0),
      order.totalAmount,
      order.orderDate,
      statusConfig[order.status as keyof typeof statusConfig]?.label ||
        order.status,
      order.shippingAddress,
    ]);
    return [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
  };

  const generateOrderStatusCSV = (orders: any[]) => {
    const headers = [
      "주문번호",
      "고객명",
      "주문일",
      "상태",
      "상태변경일",
      "처리자",
    ];
    const rows = orders.map((order) => [
      order.id,
      order.customerName,
      order.orderDate,
      statusConfig[order.status as keyof typeof statusConfig]?.label ||
        order.status,
      order.orderDate, // 실제로는 상태 변경일이 있어야 함
      "관리자", // 실제로는 처리자 정보가 있어야 함
    ]);
    return [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
  };

  const generateShippingCSV = (orders: any[]) => {
    const headers = [
      "주문번호",
      "고객명",
      "배송주소",
      "운송장번호",
      "예상배송일",
      "배송상태",
    ];
    const rows = orders.map((order) => [
      order.id,
      order.customerName,
      order.shippingAddress,
      order.trackingNumber || "미발급",
      order.estimatedDelivery || "미정",
      statusConfig[order.status as keyof typeof statusConfig]?.label ||
        order.status,
    ]);
    return [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
  };

  // CSV 다운로드 함수
  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 모바일 사이드바 */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <div className="h-full bg-white border-r">
            <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-bold text-white">LUMINA</h2>
                  <p className="text-blue-100 text-sm">관리자 대시보드</p>
                </div>
              </div>
            </div>
            <nav className="p-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full p-4 rounded-xl mb-2 text-left transition-all duration-200 ${
                      activeTab === item.id
                        ? `${item.bgColor} ${item.color} border-2 border-current/20`
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs opacity-75">
                          {item.description}
                        </div>
                      </div>
                      {item.badge && (
                        <Badge className="bg-red-500 text-white">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex min-h-screen">
        {/* 데스크톱 사이드바 */}
        <div className="hidden lg:flex lg:flex-col lg:w-80 lg:flex-shrink-0 h-screen bg-white border-r border-gray-200 sticky top-0 overflow-y-auto">
          <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-white truncate">
                  LUMINA
                </h2>
                <p className="text-blue-100 text-sm truncate">
                  관리자 대시보드
                </p>
              </div>
            </div>
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? `${item.bgColor} ${item.color} border-2 border-current/20 shadow-lg`
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-xs opacity-75 truncate">
                        {item.description}
                      </div>
                    </div>
                    {item.badge && (
                      <Badge className="bg-red-500 text-white flex-shrink-0">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 min-w-0">
          {/* 헤더 */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="px-4 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 lg:space-x-4 min-w-0 flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden flex-shrink-0"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-lg lg:text-2xl font-bold text-gray-900 truncate">
                      {menuItems.find((item) => item.id === activeTab)?.name ||
                        "대시보드"}
                    </h1>
                    <p className="text-gray-600 text-xs lg:text-sm truncate">
                      {
                        menuItems.find((item) => item.id === activeTab)
                          ?.description
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
                    {pendingOrders > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {pendingOrders}
                      </span>
                    )}
                  </Button>
                  <Link href="/">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Home className="w-4 h-4" />
                      <span className="hidden sm:inline">쇼핑몰로</span>
                      <span className="sm:hidden">홈</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <main className="p-4 lg:p-8 min-w-0 overflow-hidden">
            {/* 대시보드 홈 */}
            {activeTab === "dashboard" && (
              <div className="space-y-4 lg:space-y-6">
                {/* 상단 통계 카드 */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                        <div className="flex items-center space-x-3 lg:space-x-0 lg:block">
                          <div className="w-10 h-10 lg:hidden bg-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                            <ShoppingCart className="w-5 h-5 text-blue-700" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs lg:text-sm font-medium text-blue-700 truncate">
                              총 주문
                            </p>
                            <p className="text-xl lg:text-3xl font-bold text-blue-900">
                              {totalOrders}
                            </p>
                            <p className="text-xs text-blue-600 mt-0 lg:mt-1">
                              +12% 이번 달
                            </p>
                          </div>
                        </div>
                        <div className="hidden lg:flex w-14 h-14 bg-blue-200 rounded-2xl items-center justify-center">
                          <ShoppingCart className="w-7 h-7 text-blue-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                        <div className="flex items-center space-x-3 lg:space-x-0 lg:block">
                          <div className="w-10 h-10 lg:hidden bg-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-5 h-5 text-emerald-700" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs lg:text-sm font-medium text-emerald-700 truncate">
                              총 매출
                            </p>
                            <p className="text-xl lg:text-3xl font-bold text-emerald-900">
                              {Math.floor(totalRevenue / 10000)}만원
                            </p>
                            <p className="text-xs text-emerald-600 mt-0 lg:mt-1">
                              +8% 이번 달
                            </p>
                          </div>
                        </div>
                        <div className="hidden lg:flex w-14 h-14 bg-emerald-200 rounded-2xl items-center justify-center">
                          <TrendingUp className="w-7 h-7 text-emerald-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                        <div className="flex items-center space-x-3 lg:space-x-0 lg:block">
                          <div className="w-10 h-10 lg:hidden bg-orange-200 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Activity className="w-5 h-5 text-orange-700" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs lg:text-sm font-medium text-orange-700 truncate">
                              처리 중
                            </p>
                            <p className="text-xl lg:text-3xl font-bold text-orange-900">
                              {processingOrders + pendingOrders}
                            </p>
                            <p className="text-xs text-orange-600 mt-0 lg:mt-1">
                              확인 필요
                            </p>
                          </div>
                        </div>
                        <div className="hidden lg:flex w-14 h-14 bg-orange-200 rounded-2xl items-center justify-center">
                          <Activity className="w-7 h-7 text-orange-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                        <div className="flex items-center space-x-3 lg:space-x-0 lg:block">
                          <div className="w-10 h-10 lg:hidden bg-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Star className="w-5 h-5 text-purple-700" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs lg:text-sm font-medium text-purple-700 truncate">
                              고객 만족도
                            </p>
                            <p className="text-xl lg:text-3xl font-bold text-purple-900">
                              4.8
                            </p>
                            <p className="text-xs text-purple-600 mt-0 lg:mt-1">
                              5점 만점
                            </p>
                          </div>
                        </div>
                        <div className="hidden lg:flex w-14 h-14 bg-purple-200 rounded-2xl items-center justify-center">
                          <Star className="w-7 h-7 text-purple-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 빠른 액션 카드 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  <Card
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer bg-gradient-to-br from-white to-green-50 border-green-200"
                    onClick={() => setActiveTab("orders")}
                  >
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">
                            신규 주문 처리
                          </h3>
                          <p className="text-xs lg:text-sm text-gray-600 truncate">
                            {pendingOrders}개의 새로운 주문
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer bg-gradient-to-br from-white to-orange-50 border-orange-200"
                    onClick={() => setActiveTab("shipping")}
                  >
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Truck className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">
                            배송 관리
                          </h3>
                          <p className="text-xs lg:text-sm text-gray-600 truncate">
                            {shippedOrders}개 상품 배송 중
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer bg-gradient-to-br from-white to-indigo-50 border-indigo-200"
                    onClick={() => setActiveTab("products")}
                  >
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">
                            재고 관리
                          </h3>
                          <p className="text-xs lg:text-sm text-gray-600 truncate">
                            상품 재고 확인 및 관리
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 최근 주문 요약 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>최근 주문</CardTitle>
                        <CardDescription>
                          오늘 들어온 주문을 확인하세요
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("orders")}
                        className="flex items-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>전체 보기</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockOrders.slice(0, 3).map((order) => {
                        const StatusIcon =
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ].icon;
                        return (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <StatusIcon className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {order.id}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.customerName}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">
                                {order.totalAmount.toLocaleString()}원
                              </p>
                              <Badge
                                className={
                                  statusConfig[
                                    order.status as keyof typeof statusConfig
                                  ].color
                                }
                              >
                                {
                                  statusConfig[
                                    order.status as keyof typeof statusConfig
                                  ].label
                                }
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 주문 관리 탭 */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>주문 관리</CardTitle>
                        <CardDescription>
                          주문 상태를 관리하고 배송 정보를 업데이트하세요
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          className="flex items-center space-x-2"
                          onClick={() => handleExportOrders()}
                        >
                          <Download className="w-4 h-4" />
                          <span>엑셀 다운로드</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1">
                        <Select
                          value={selectedStatus}
                          onValueChange={setSelectedStatus}
                        >
                          <SelectTrigger className="w-full sm:w-40">
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

                        <div className="relative flex-1 sm:max-w-xs">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            placeholder="주문번호, 고객명 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 모바일: 카드 형태, 데스크톱: 테이블 형태 */}
                    <div className="lg:hidden space-y-4">
                      {filteredOrders.map((order) => {
                        const StatusIcon =
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ].icon;
                        return (
                          <Card
                            key={order.id}
                            className="bg-white border-gray-200"
                          >
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                {/* 주문 번호와 상태 */}
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold text-gray-900">
                                    {order.id}
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

                                {/* 고객 정보 */}
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

                                {/* 상품 정보 */}
                                <div>
                                  <p className="text-sm font-medium text-gray-900 mb-1">
                                    주문 상품
                                  </p>
                                  <div className="space-y-1">
                                    {order.products.map((product, index) => (
                                      <div
                                        key={index}
                                        className="text-sm text-gray-600"
                                      >
                                        <span className="font-medium">
                                          {product.name}
                                        </span>
                                        <span> x{product.quantity}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* 금액과 날짜 */}
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      주문일
                                    </p>
                                    <p className="text-sm font-medium">
                                      {order.orderDate}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-gray-600">
                                      총액
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                      {order.totalAmount.toLocaleString()}원
                                    </p>
                                  </div>
                                </div>

                                {/* 배송 정보 */}
                                {order.trackingNumber && (
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      운송장: {order.trackingNumber}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      예상 배송: {order.estimatedDelivery}
                                    </p>
                                  </div>
                                )}

                                {/* 액션 버튼 */}
                                <div className="pt-3 border-t space-y-2">
                                  <div className="grid grid-cols-2 gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setSelectedOrder(order);
                                        setNewOrderStatus(order.status);
                                        setIsStatusChangeDialogOpen(true);
                                      }}
                                      className="text-xs"
                                    >
                                      상태변경
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setSelectedOrder(order);
                                        setCancelItems({});
                                        setIsPartialCancelDialogOpen(true);
                                      }}
                                      className="text-xs"
                                    >
                                      부분취소
                                    </Button>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => generateReceipt(order)}
                                      className="text-xs"
                                    >
                                      영수증
                                    </Button>
                                    <Link
                                      href={`/admin/orders/${order.id}`}
                                      className="block"
                                    >
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full text-xs"
                                      >
                                        상세보기
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>

                    {/* 데스크톱 테이블 */}
                    <div className="hidden lg:block">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[120px]">
                                주문번호
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[200px]">
                                고객정보
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[200px]">
                                상품
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[100px]">
                                총액
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[120px]">
                                주문일
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[120px]">
                                상태
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[150px]">
                                배송정보
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[100px]">
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
                                  <td className="py-4 px-4 min-w-[120px]">
                                    <span className="font-medium text-gray-900">
                                      {order.id}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 min-w-[200px]">
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
                                  <td className="py-4 px-4 min-w-[200px]">
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
                                  <td className="py-4 px-4 min-w-[100px]">
                                    <span className="font-medium text-gray-900">
                                      {order.totalAmount.toLocaleString()}원
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 min-w-[120px]">
                                    <span className="text-sm text-gray-600">
                                      {order.orderDate}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 min-w-[120px]">
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
                                  <td className="py-4 px-4 min-w-[150px]">
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
                                  <td className="py-4 px-4 min-w-[180px]">
                                    <div className="flex flex-wrap gap-1">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setSelectedOrder(order);
                                          setNewOrderStatus(order.status);
                                          setIsStatusChangeDialogOpen(true);
                                        }}
                                        className="text-xs px-2 py-1"
                                      >
                                        상태변경
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setSelectedOrder(order);
                                          setCancelItems({});
                                          setIsPartialCancelDialogOpen(true);
                                        }}
                                        className="text-xs px-2 py-1"
                                      >
                                        부분취소
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => generateReceipt(order)}
                                        className="text-xs px-2 py-1"
                                      >
                                        영수증
                                      </Button>
                                      <Link href={`/admin/orders/${order.id}`}>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="text-xs px-2 py-1"
                                        >
                                          상세보기
                                        </Button>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 주문 상태 관리 탭 */}
            {activeTab === "order-status" && (
              <div className="space-y-6">
                <OrderStatusManager />
              </div>
            )}

            {/* 배송 관리 탭 */}
            {activeTab === "shipping" && (
              <div className="space-y-6">
                <ShippingManager />
              </div>
            )}

            {/* 고객 관리 탭 */}
            {activeTab === "customers" && (
              <div className="space-y-6">
                <CustomerManager />
              </div>
            )}

            {/* 상품 관리 탭 */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <ProductManager />
              </div>
            )}

            {/* 컬렉션 관리 탭 */}
            {activeTab === "collections" && (
              <div className="space-y-6">
                <CollectionManager />
              </div>
            )}

            {/* 배너 관리 탭 */}
            {activeTab === "banners" && (
              <div className="space-y-6">
                <BannerManager />
              </div>
            )}

            {/* 쿠폰 관리 탭 */}
            {activeTab === "coupons" && (
              <div className="space-y-6">
                <CouponManager />
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 주문 상태 변경 다이얼로그 */}
      <Dialog
        open={isStatusChangeDialogOpen}
        onOpenChange={setIsStatusChangeDialogOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>주문 상태 변경</DialogTitle>
            <DialogDescription>
              주문 {selectedOrder?.id}의 상태를 변경하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="orderStatus">새로운 상태</Label>
              <Select value={newOrderStatus} onValueChange={setNewOrderStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="상태를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">결제 대기</SelectItem>
                  <SelectItem value="processing">처리 중</SelectItem>
                  <SelectItem value="shipped">배송 중</SelectItem>
                  <SelectItem value="delivered">배송 완료</SelectItem>
                  <SelectItem value="cancelled">주문 취소</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsStatusChangeDialogOpen(false)}
              >
                취소
              </Button>
              <Button onClick={handleOrderStatusChange}>상태 변경</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 부분 취소 다이얼로그 */}
      <Dialog
        open={isPartialCancelDialogOpen}
        onOpenChange={setIsPartialCancelDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>부분 취소</DialogTitle>
            <DialogDescription>
              주문 {selectedOrder?.id}에서 취소할 상품과 수량을 선택하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedOrder?.products.map((product: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-600">
                      주문 수량: {product.quantity}개 | 단가:{" "}
                      {product.price.toLocaleString()}원
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`cancel-${index}`} className="text-sm">
                      취소 수량:
                    </Label>
                    <Input
                      id={`cancel-${index}`}
                      type="number"
                      min="0"
                      max={product.quantity}
                      value={cancelItems[product.name] || 0}
                      onChange={(e) =>
                        setCancelItems({
                          ...cancelItems,
                          [product.name]: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-20"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="text-sm text-gray-600">
                취소 예상 금액:{" "}
                {Object.entries(cancelItems)
                  .reduce((total, [productName, quantity]) => {
                    const product = selectedOrder?.products.find(
                      (p: any) => p.name === productName
                    );
                    return total + (product ? product.price * quantity : 0);
                  }, 0)
                  .toLocaleString()}
                원
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsPartialCancelDialogOpen(false)}
              >
                취소
              </Button>
              <Button onClick={handlePartialCancel} variant="destructive">
                부분 취소 처리
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
