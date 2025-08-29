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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const [order, setOrder] = useState(mockOrder);
  const [isEditing, setIsEditing] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<string>(
    order.trackingNumber || ""
  );
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>(
    order.estimatedDelivery || ""
  );
  const [statusNote, setStatusNote] = useState("");

  // 고객 메시지 관련 상태
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [customerMessage, setCustomerMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState<
    { date: string; message: string }[]
  >([]);

  // 배송 알림 관련 상태
  const [
    isShippingNotificationDialogOpen,
    setIsShippingNotificationDialogOpen,
  ] = useState(false);
  const [shippingNotificationMessage, setShippingNotificationMessage] =
    useState("");

  // 주문 취소 관련 상태
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

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
      trackingNumber: (trackingNumber.trim() ? trackingNumber : null) as any,
      estimatedDelivery: (estimatedDelivery.trim()
        ? estimatedDelivery
        : null) as any,
    });
    setIsEditing(false);
  };

  // 고객 메시지 저장
  const saveCustomerMessage = () => {
    if (customerMessage.trim()) {
      const newMessage = {
        date: new Date().toISOString().replace("T", " ").substring(0, 19),
        message: customerMessage.trim(),
      };
      setMessageHistory([...messageHistory, newMessage]);
      setCustomerMessage("");
      setIsMessageDialogOpen(false);

      // 실제로는 API 호출로 메시지 저장
      console.log("고객 메시지 저장:", newMessage);
      toast({
        title: "메시지 저장 완료",
        description: "고객 메시지가 성공적으로 저장되었습니다.",
      });
    }
  };

  // 배송 알림 발송
  const sendShippingNotification = () => {
    if (!trackingNumber) {
      toast({
        title: "운송장 번호 필요",
        description: "운송장 번호를 먼저 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const defaultMessage = `안녕하세요, ${
      order.customerName
    }님!\n\n주문하신 상품이 배송을 시작했습니다.\n\n운송장 번호: ${trackingNumber}\n${
      estimatedDelivery ? `예상 배송일: ${estimatedDelivery}` : ""
    }\n\n배송 상황은 운송장 번호로 확인하실 수 있습니다.\n감사합니다.`;

    const messageToSend = shippingNotificationMessage || defaultMessage;

    // 실제로는 SMS/이메일 발송 API 호출
    console.log("배송 알림 발송:", {
      to: order.customerEmail,
      phone: order.customerPhone,
      message: messageToSend,
    });

    setShippingNotificationMessage("");
    setIsShippingNotificationDialogOpen(false);
    toast({
      title: "배송 알림 발송 완료",
      description: "고객에게 배송 알림이 성공적으로 발송되었습니다.",
    });
  };

  // 주문 취소
  const cancelOrder = () => {
    if (!cancelReason.trim()) {
      toast({
        title: "취소 사유 필요",
        description: "취소 사유를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const newHistory = {
      status: "cancelled",
      date: new Date().toISOString().replace("T", " ").substring(0, 19),
      note: `주문 취소 - ${cancelReason}`,
    };

    setOrder({
      ...order,
      status: "cancelled",
      statusHistory: [...order.statusHistory, newHistory],
    });

    setCancelReason("");
    setIsCancelDialogOpen(false);

    // 실제로는 API 호출로 주문 취소 처리
    console.log("주문 취소:", { orderId: order.id, reason: cancelReason });
    toast({
      title: "주문 취소 완료",
      description: "주문이 성공적으로 취소되었습니다.",
      variant: "destructive",
    });
  };

  const StatusIcon =
    statusConfig[order.status as keyof typeof statusConfig].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">뒤로가기</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  주문 상세
                </h1>
                <p className="text-sm text-gray-600">주문번호: {orderId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMessageDialogOpen(true)}
                className="hidden md:flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>고객에게 메시지</span>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              >
                <Save className="w-4 h-4 lg:mr-2" />
                <span className="hidden lg:inline">저장</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* 주문 상태 */}
            <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <CardTitle className="text-lg">주문 상태</CardTitle>
                  <Badge
                    className={`w-fit ${
                      statusConfig[order.status as keyof typeof statusConfig]
                        .color
                    }`}
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
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Select
                      value={order.status}
                      onValueChange={updateOrderStatus}
                    >
                      <SelectTrigger className="w-full sm:w-48">
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
            <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <CardTitle className="text-lg">배송 정보</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-fit"
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
            <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">주문 상품</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-200 rounded-xl bg-white"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shrink-0">
                        <Package className="w-8 h-8 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                          <span>사이즈: {product.size}</span>
                          <span>|</span>
                          <span>색상: {product.color}</span>
                          <span>|</span>
                          <span>수량: {product.quantity}개</span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <p className="font-semibold text-gray-900">
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
          <div className="space-y-4 lg:space-y-6">
            {/* 고객 정보 */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">
                  고객 정보
                </CardTitle>
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
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardHeader>
                <CardTitle className="text-lg text-emerald-900">
                  결제 정보
                </CardTitle>
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
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg text-purple-900">
                  주문 정보
                </CardTitle>
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
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-900">
                  빠른 액션
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                    onClick={() => setIsShippingNotificationDialogOpen(true)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    배송 알림 발송
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => setIsMessageDialogOpen(true)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    고객에게 메시지
                  </Button>
                  <Button
                    className="w-full bg-red-600 text-white hover:bg-red-700"
                    onClick={() => setIsCancelDialogOpen(true)}
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    주문 취소
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 고객 메시지 다이얼로그 */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>고객에게 메시지</DialogTitle>
            <DialogDescription>
              {order.customerName}님에게 보낼 메시지를 작성하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* 메시지 히스토리 */}
            {messageHistory.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">이전 메시지</h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {messageHistory.map((msg, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-800">{msg.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{msg.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 새 메시지 작성 */}
            <div>
              <Label htmlFor="customerMessage">새 메시지</Label>
              <Textarea
                id="customerMessage"
                placeholder="고객에게 보낼 메시지를 입력하세요..."
                value={customerMessage}
                onChange={(e) => setCustomerMessage(e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsMessageDialogOpen(false)}
              >
                취소
              </Button>
              <Button onClick={saveCustomerMessage}>
                <Save className="w-4 h-4 mr-2" />
                메시지 저장
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 배송 알림 다이얼로그 */}
      <Dialog
        open={isShippingNotificationDialogOpen}
        onOpenChange={setIsShippingNotificationDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>배송 알림 발송</DialogTitle>
            <DialogDescription>
              {order.customerName}님에게 배송 알림을 발송합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">발송 정보</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p>수신자: {order.customerName}</p>
                <p>이메일: {order.customerEmail}</p>
                <p>전화번호: {order.customerPhone}</p>
                <p>운송장 번호: {trackingNumber || "입력되지 않음"}</p>
              </div>
            </div>

            <div>
              <Label htmlFor="shippingMessage">알림 메시지 (선택사항)</Label>
              <Textarea
                id="shippingMessage"
                placeholder="기본 메시지가 자동으로 작성됩니다. 필요시 수정하세요."
                value={shippingNotificationMessage}
                onChange={(e) => setShippingNotificationMessage(e.target.value)}
                rows={6}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                비워두면 기본 배송 알림 메시지가 발송됩니다.
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsShippingNotificationDialogOpen(false)}
              >
                취소
              </Button>
              <Button onClick={sendShippingNotification}>
                <Send className="w-4 h-4 mr-2" />
                알림 발송
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 주문 취소 다이얼로그 */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>주문 취소</DialogTitle>
            <DialogDescription>
              주문 {order.id}를 취소하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-sm text-red-800 font-medium">주의사항</p>
              </div>
              <p className="text-sm text-red-700 mt-1">
                주문을 취소하면 되돌릴 수 없습니다.
              </p>
            </div>

            <div>
              <Label htmlFor="cancelReason">취소 사유 *</Label>
              <Textarea
                id="cancelReason"
                placeholder="취소 사유를 입력해주세요..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                className="mt-1"
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsCancelDialogOpen(false)}
              >
                취소
              </Button>
              <Button onClick={cancelOrder} variant="destructive">
                <AlertCircle className="w-4 h-4 mr-2" />
                주문 취소
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
