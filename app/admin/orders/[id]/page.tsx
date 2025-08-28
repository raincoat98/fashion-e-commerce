"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  MessageSquare,
  Save,
  Send,
} from "lucide-react";
import Link from "next/link";

// Mock 데이터
const mockOrder = {
  id: "ORD-2024-001",
  customerName: "김미영",
  customerEmail: "kim@email.com",
  customerPhone: "010-1234-5678",
  products: [
    {
      name: "LUMINA 시그니처 티셔츠",
      quantity: 1,
      price: 89000,
      size: "M",
      color: "화이트",
    },
    {
      name: "프리미엄 데님 팬츠",
      quantity: 1,
      price: 129000,
      size: "L",
      color: "블루",
    },
  ],
  totalAmount: 218000,
  shippingFee: 0,
  discountAmount: 0,
  finalAmount: 218000,
  orderDate: "2024-01-15 14:30:00",
  status: "pending",
  shippingAddress: "서울시 강남구 테헤란로 123, 456호",
  shippingMemo: "문 앞에 놓아주세요",
  paymentMethod: "신용카드",
  trackingNumber: null,
  estimatedDelivery: null,
  actualDelivery: null,
  statusHistory: [
    { status: "pending", date: "2024-01-15 14:30:00", note: "주문 접수" },
  ],
};

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

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState(mockOrder);
  const [isEditing, setIsEditing] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(
    order.trackingNumber || ""
  );
  const [estimatedDelivery, setEstimatedDelivery] = useState(
    order.estimatedDelivery || ""
  );
  const [statusNote, setStatusNote] = useState("");

  // 상태 변경 함수
  const updateOrderStatus = (newStatus: string) => {
    const newHistory = {
      status: newStatus,
      date: new Date().toISOString().replace("T", " ").substring(0, 19),
      note:
        statusNote ||
        `${
          statusConfig[newStatus as keyof typeof statusConfig].label
        }로 상태 변경`,
    };

    setOrder({
      ...order,
      status: newStatus,
      statusHistory: [...order.statusHistory, newHistory],
    });

    setStatusNote("");
    setIsEditing(false);
  };

  // 배송 정보 업데이트
  const updateShippingInfo = () => {
    setOrder({
      ...order,
      trackingNumber,
      estimatedDelivery,
    });
    setIsEditing(false);
  };

  const StatusIcon =
    statusConfig[order.status as keyof typeof statusConfig].icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>뒤로가기</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">주문 상세</h1>
                <p className="text-gray-600">주문번호: {orderId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>고객에게 메시지</span>
              </Button>
              <Button className="lumina-gradient text-white">
                <Save className="w-4 h-4 mr-2" />
                저장
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 주문 상태 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>주문 상태</CardTitle>
                  <Badge
                    className={
                      statusConfig[order.status as keyof typeof statusConfig]
                        .color
                    }
                  >
                    <StatusIcon className="w-4 h-4 mr-2" />
                    {
                      statusConfig[order.status as keyof typeof statusConfig]
                        .label
                    }
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 상태 변경 */}
                  <div className="flex items-center space-x-4">
                    <Select
                      value={order.status}
                      onValueChange={updateOrderStatus}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">결제 대기</SelectItem>
                        <SelectItem value="processing">처리 중</SelectItem>
                        <SelectItem value="shipped">배송 중</SelectItem>
                        <SelectItem value="delivered">배송 완료</SelectItem>
                        <SelectItem value="cancelled">주문 취소</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="상태 변경 메모 (선택사항)"
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                      className="flex-1"
                    />
                  </div>

                  {/* 상태 히스토리 */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">
                      상태 변경 이력
                    </h4>
                    {order.statusHistory.map((history, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {
                              statusConfig[
                                history.status as keyof typeof statusConfig
                              ].label
                            }
                          </p>
                          <p className="text-xs text-gray-600">
                            {history.date}
                          </p>
                        </div>
                        {history.note && (
                          <p className="text-xs text-gray-500">
                            {history.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 배송 정보 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>배송 정보</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "취소" : "수정"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tracking">운송장 번호</Label>
                      <Input
                        id="tracking"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="운송장 번호를 입력하세요"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="delivery">예상 배송일</Label>
                      <Input
                        id="delivery"
                        type="date"
                        value={estimatedDelivery}
                        onChange={(e) => setEstimatedDelivery(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={updateShippingInfo}
                        className="flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>저장</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        취소
                      </Button>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">배송 주소</span>
                    </div>
                    <p className="text-gray-700">{order.shippingAddress}</p>
                    {order.shippingMemo && (
                      <p className="text-sm text-gray-600">
                        메모: {order.shippingMemo}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 주문 상품 */}
            <Card>
              <CardHeader>
                <CardTitle>주문 상품</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          사이즈: {product.size} | 색상: {product.color}
                        </p>
                        <p className="text-sm text-gray-600">
                          수량: {product.quantity}개
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {(product.price * product.quantity).toLocaleString()}
                          원
                        </p>
                        <p className="text-sm text-gray-600">
                          개당 {product.price.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 고객 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>고객 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{order.customerName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{order.customerEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{order.customerPhone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 결제 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>결제 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">상품 금액</span>
                    <span>{order.totalAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">배송비</span>
                    <span>{order.shippingFee.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">할인</span>
                    <span>-{order.discountAmount.toLocaleString()}원</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-medium">
                      <span>최종 결제 금액</span>
                      <span>{order.finalAmount.toLocaleString()}원</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CreditCard className="w-4 h-4" />
                    <span>{order.paymentMethod}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 주문 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>주문 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{order.orderDate}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      주문번호
                    </p>
                    <p className="text-sm text-gray-600">{order.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 빠른 액션 */}
            <Card>
              <CardHeader>
                <CardTitle>빠른 액션</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Send className="w-4 h-4 mr-2" />
                    배송 알림 발송
                  </Button>
                  <Button className="w-full" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    고객에게 메시지
                  </Button>
                  <Button className="w-full" variant="outline">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    주문 취소
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
