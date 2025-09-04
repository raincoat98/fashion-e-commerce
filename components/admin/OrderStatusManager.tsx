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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Receipt,
  X,
  RefreshCw,
  Download,
  Mail,
  CreditCard,
  ShoppingCart,
  Calendar,
  MapPin,
} from "lucide-react";
import { useProductStore } from "@/stores/useProductStore";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  cancelled: boolean;
  cancelledQuantity: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingAddress: string;
  shippingMemo?: string;
  orderDate: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  trackingNumber?: string;
  statusHistory: {
    status: string;
    date: string;
    note?: string;
  }[];
  receipt: {
    issued: boolean;
    issuedDate?: string;
    receiptNumber?: string;
  };
}

const orderStatusFlow = [
  {
    value: "pending",
    label: "결제 대기",
    color:
      "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-100 dark:hover:bg-yellow-900/30",
    icon: Clock,
  },
  {
    value: "paid",
    label: "결제 완료",
    color:
      "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-900/30",
    icon: CheckCircle,
  },
  {
    value: "processing",
    label: "주문 처리",
    color:
      "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/30",
    icon: Package,
  },
  {
    value: "shipped",
    label: "배송 중",
    color:
      "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900/30",
    icon: Truck,
  },
  {
    value: "delivered",
    label: "배송 완료",
    color:
      "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-900/30",
    icon: CheckCircle,
  },
  {
    value: "cancelled",
    label: "주문 취소",
    color:
      "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/30",
    icon: X,
  },
  {
    value: "refunded",
    label: "환불 완료",
    color:
      "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
    icon: RefreshCw,
  },
];

const paymentMethods = [
  { value: "card", label: "신용카드" },
  { value: "bank", label: "계좌이체" },
  { value: "kakao", label: "카카오페이" },
  { value: "naver", label: "네이버페이" },
  { value: "payco", label: "페이코" },
];

const shippingFeeTable = [
  { minAmount: 0, maxAmount: 30000, fee: 3000 },
  { minAmount: 30000, maxAmount: 50000, fee: 2000 },
  { minAmount: 50000, maxAmount: 100000, fee: 1000 },
  { minAmount: 100000, maxAmount: Infinity, fee: 0 },
];

export default function OrderStatusManager() {
  const { orders, updateOrderStatus: updateOrderStatusInStore } =
    useProductStore();
  const [localOrders, setLocalOrders] = useState<Order[]>([
    {
      id: "ORD-2024-001",
      customerName: "김미영",
      customerEmail: "kim@email.com",
      customerPhone: "010-1234-5678",
      items: [
        {
          id: "1",
          name: "LUMINA 시그니처 티셔츠",
          price: 89000,
          quantity: 2,
          size: "M",
          color: "화이트",
          cancelled: false,
          cancelledQuantity: 0,
        },
        {
          id: "2",
          name: "프리미엄 데님 팬츠",
          price: 129000,
          quantity: 1,
          size: "L",
          color: "블루",
          cancelled: false,
          cancelledQuantity: 0,
        },
      ],
      subtotal: 307000,
      shippingFee: 0,
      discountAmount: 5000,
      totalAmount: 302000,
      status: "processing",
      paymentMethod: "card",
      paymentStatus: "paid",
      shippingAddress: "서울시 강남구 테헤란로 123, 456호",
      shippingMemo: "문 앞에 놓아주세요",
      orderDate: "2024-01-15 14:30:00",
      estimatedDelivery: "2024-01-18",
      statusHistory: [
        { status: "pending", date: "2024-01-15 14:30:00", note: "주문 접수" },
        { status: "paid", date: "2024-01-15 14:35:00", note: "결제 완료" },
        {
          status: "processing",
          date: "2024-01-15 16:00:00",
          note: "주문 처리 시작",
        },
      ],
      receipt: {
        issued: false,
      },
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const [statusNote, setStatusNote] = useState("");

  // 엑셀 다운로드 함수
  const handleExportOrderStatus = () => {
    const csvContent = generateOrderStatusCSV(localOrders);
    downloadCSV(
      csvContent,
      `order_status_${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  // CSV 생성 함수
  const generateOrderStatusCSV = (orders: Order[]) => {
    const headers = [
      "주문번호",
      "고객명",
      "고객이메일",
      "고객전화",
      "주문일",
      "상태",
      "총액",
      "결제방법",
      "결제상태",
      "배송주소",
      "예상배송일",
      "운송장번호",
    ];
    const rows = orders.map((order) => [
      order.id,
      order.customerName,
      order.customerEmail,
      order.customerPhone,
      order.orderDate,
      orderStatusFlow.find((s) => s.value === order.status)?.label ||
        order.status,
      order.totalAmount,
      order.paymentMethod === "card" ? "카드" : order.paymentMethod,
      order.paymentStatus === "paid" ? "결제완료" : order.paymentStatus,
      order.shippingAddress,
      order.estimatedDelivery || "미정",
      order.trackingNumber || "미발급",
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

  // 배송비 계산
  const calculateShippingFee = (subtotal: number) => {
    const feeRule = shippingFeeTable.find(
      (rule) => subtotal >= rule.minAmount && subtotal < rule.maxAmount
    );
    return feeRule ? feeRule.fee : 0;
  };

  // 주문 상태 업데이트
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // 스토어의 주문 상태 업데이트
    updateOrderStatusInStore(orderId, newStatus as any);

    // 로컬 주문 상태도 업데이트
    setLocalOrders(
      localOrders.map((order) => {
        if (order.id === orderId) {
          const newHistory = {
            status: newStatus,
            date: new Date().toISOString().replace("T", " ").substring(0, 19),
            note:
              statusNote ||
              `${
                orderStatusFlow.find((s) => s.value === newStatus)?.label
              }로 상태 변경`,
          };
          return {
            ...order,
            status: newStatus,
            statusHistory: [...order.statusHistory, newHistory],
          };
        }
        return order;
      })
    );
    setIsStatusDialogOpen(false);
    setStatusNote("");
  };

  // 부분 취소
  const partialCancel = (
    orderId: string,
    itemId: string,
    cancelQuantity: number
  ) => {
    setLocalOrders(
      localOrders.map((order) => {
        if (order.id === orderId) {
          const updatedItems = order.items.map((item) => {
            if (item.id === itemId) {
              const newCancelledQuantity =
                item.cancelledQuantity + cancelQuantity;
              const cancelled = newCancelledQuantity >= item.quantity;
              return {
                ...item,
                cancelledQuantity: newCancelledQuantity,
                cancelled,
              };
            }
            return item;
          });

          // 재계산
          const newSubtotal = updatedItems.reduce((sum, item) => {
            const activeQuantity = item.quantity - item.cancelledQuantity;
            return sum + item.price * activeQuantity;
          }, 0);

          const newShippingFee = calculateShippingFee(newSubtotal);
          const newTotalAmount =
            newSubtotal + newShippingFee - order.discountAmount;

          return {
            ...order,
            items: updatedItems,
            subtotal: newSubtotal,
            shippingFee: newShippingFee,
            totalAmount: newTotalAmount,
          };
        }
        return order;
      })
    );
    setIsCancelDialogOpen(false);
  };

  // 영수증 발급
  const issueReceipt = (orderId: string) => {
    setLocalOrders(
      localOrders.map((order) => {
        if (order.id === orderId) {
          const receiptNumber = `RCP-${Date.now()}`;
          return {
            ...order,
            receipt: {
              issued: true,
              issuedDate: new Date()
                .toISOString()
                .replace("T", " ")
                .substring(0, 19),
              receiptNumber,
            },
          };
        }
        return order;
      })
    );
    setIsReceiptDialogOpen(false);
  };

  // 주문 상태별 통계
  const getStatusStats = () => {
    const stats: { [key: string]: number } = {};
    orderStatusFlow.forEach((status) => {
      stats[status.value] = localOrders.filter(
        (order) => order.status === status.value
      ).length;
    });
    return stats;
  };

  const statusStats = getStatusStats();

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* 주문 상태 통계 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 lg:gap-4">
        {orderStatusFlow.map((status) => {
          const Icon = status.icon;
          return (
            <Card
              key={status.value}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
            >
              <CardContent className="p-3 lg:p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center ${status.color}`}
                    >
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {statusStats[status.value] || 0}
                    </p>
                  </div>
                  <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                    {status.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 주문 목록 */}
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-gray-100">
                주문 관리
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                주문 상태를 관리하고 부분 취소, 영수증 발급을 처리하세요
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 w-full sm:w-fit border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={handleExportOrderStatus}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">엑셀 다운로드</span>
              <span className="sm:hidden">엑셀</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {localOrders.map((order) => {
              const StatusIcon =
                orderStatusFlow.find((s) => s.value === order.status)?.icon ||
                Clock;
              const PaymentMethod = paymentMethods.find(
                (p) => p.value === order.paymentMethod
              );

              return (
                <Card
                  key={order.id}
                  className="hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      {/* 주문 헤더 */}
                      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">
                          <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100">
                            {order.id}
                          </h3>
                          <Badge
                            className={`${
                              orderStatusFlow.find(
                                (s) => s.value === order.status
                              )?.color
                            } px-2 sm:px-3 py-1 text-xs sm:text-sm`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {
                              orderStatusFlow.find(
                                (s) => s.value === order.status
                              )?.label
                            }
                          </Badge>
                          <Badge
                            variant="outline"
                            className="px-2 sm:px-3 py-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs sm:text-sm"
                          >
                            {PaymentMethod?.label}
                          </Badge>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {order.orderDate}
                        </div>
                      </div>

                      {/* 고객 정보 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3 sm:p-4 rounded-xl">
                          <div className="flex items-center space-x-2 mb-2">
                            <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <p className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-100">
                              고객 정보
                            </p>
                          </div>
                          <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">
                            {order.customerName}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                            {order.customerEmail}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            {order.customerPhone}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-3 sm:p-4 rounded-xl">
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            <p className="text-xs sm:text-sm font-semibold text-orange-900 dark:text-orange-100">
                              배송지
                            </p>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {order.shippingAddress}
                          </p>
                          {order.shippingMemo && (
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
                              메모: {order.shippingMemo}
                            </p>
                          )}
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 sm:p-4 rounded-xl sm:col-span-2 lg:col-span-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <p className="text-xs sm:text-sm font-semibold text-green-900 dark:text-green-100">
                              금액 정보
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              상품: {order.subtotal.toLocaleString()}원
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              배송비: {order.shippingFee.toLocaleString()}원
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              할인: -{order.discountAmount.toLocaleString()}원
                            </p>
                            <div className="border-t border-green-200 dark:border-green-700 pt-1 mt-2">
                              <p className="font-semibold text-sm sm:text-base text-green-900 dark:text-green-100">
                                총 결제: {order.totalAmount.toLocaleString()}원
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 주문 상품 */}
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <ShoppingCart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            주문 상품
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600"
                            >
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                                  {item.name}
                                </p>
                                <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  <span>{item.size}</span>
                                  <span>•</span>
                                  <span>{item.color}</span>
                                  <span>•</span>
                                  <span>{item.price.toLocaleString()}원</span>
                                </div>
                              </div>
                              <div className="text-left sm:text-right shrink-0">
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  {item.quantity - item.cancelledQuantity}개
                                  {item.cancelledQuantity > 0 && (
                                    <span className="text-red-600 dark:text-red-400 ml-2 text-sm">
                                      (취소: {item.cancelledQuantity}개)
                                    </span>
                                  )}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {(
                                    item.price *
                                    (item.quantity - item.cancelledQuantity)
                                  ).toLocaleString()}
                                  원
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsStatusDialogOpen(true);
                            }}
                          >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">상태 변경</span>
                            <span className="sm:hidden">상태</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsCancelDialogOpen(true);
                            }}
                          >
                            <X className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">부분 취소</span>
                            <span className="sm:hidden">취소</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-200 dark:border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsReceiptDialogOpen(true);
                            }}
                            disabled={order.receipt.issued}
                          >
                            <Receipt className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">
                              {order.receipt.issued
                                ? "영수증 발급됨"
                                : "영수증 발급"}
                            </span>
                            <span className="sm:hidden">영수증</span>
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">주문서</span>
                            <span className="sm:hidden">다운로드</span>
                          </Button>
                          {order.receipt.issued && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <Receipt className="w-4 h-4 mr-1" />
                              <span className="hidden sm:inline">영수증</span>
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

      {/* 상태 변경 다이얼로그 */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
              주문 상태 변경
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              주문 상태를 변경하세요
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div>
                <Label className="text-gray-900 dark:text-gray-100">
                  현재 상태
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {
                    orderStatusFlow.find(
                      (s) => s.value === selectedOrder.status
                    )?.label
                  }
                </p>
              </div>
              <div>
                <Label className="text-gray-900 dark:text-gray-100">
                  새로운 상태
                </Label>
                <Select
                  onValueChange={(value) =>
                    updateOrderStatus(selectedOrder.id, value)
                  }
                >
                  <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderStatusFlow.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-900 dark:text-gray-100">메모</Label>
                <Textarea
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="상태 변경 사유를 입력하세요"
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 부분 취소 다이얼로그 */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
              부분 취소
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              취소할 상품과 수량을 선택하세요
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              {selectedOrder.items.map((item) => {
                const availableQuantity =
                  item.quantity - item.cancelledQuantity;
                if (availableQuantity <= 0) return null;

                return (
                  <div
                    key={item.id}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.size} / {item.color} /{" "}
                          {item.price.toLocaleString()}원
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          주문: {item.quantity}개
                        </p>
                        <p className="text-sm text-red-600 dark:text-red-400">
                          취소: {item.cancelledQuantity}개
                        </p>
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          가능: {availableQuantity}개
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min="1"
                        max={availableQuantity}
                        placeholder="취소 수량"
                        className="w-20 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        id={`cancel-${item.id}`}
                      />
                      <Button
                        size="sm"
                        onClick={() => {
                          const quantity = parseInt(
                            (
                              document.getElementById(
                                `cancel-${item.id}`
                              ) as HTMLInputElement
                            ).value
                          );
                          if (
                            quantity &&
                            quantity > 0 &&
                            quantity <= availableQuantity
                          ) {
                            partialCancel(selectedOrder.id, item.id, quantity);
                          }
                        }}
                        className="bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white"
                      >
                        취소
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 영수증 발급 다이얼로그 */}
      <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
              영수증 발급
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              주문에 대한 영수증을 발급하세요
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">
                  주문 정보
                </h4>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  주문번호: {selectedOrder.id}
                </p>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  고객명: {selectedOrder.customerName}
                </p>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  주문일: {selectedOrder.orderDate}
                </p>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  총 결제금액: {selectedOrder.totalAmount.toLocaleString()}원
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsReceiptDialogOpen(false)}
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  취소
                </Button>
                <Button
                  onClick={() => issueReceipt(selectedOrder.id)}
                  className="bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white"
                >
                  영수증 발급
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
