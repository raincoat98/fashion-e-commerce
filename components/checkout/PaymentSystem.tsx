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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Building,
  Smartphone,
  CheckCircle,
  Clock,
  AlertCircle,
  Receipt,
  Download,
  Mail,
  Lock,
  Shield,
  Zap,
} from "lucide-react";
import { usePointStore } from "@/stores/usePointStore";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  processingTime: string;
  fee: number;
  available: boolean;
}

interface PaymentInfo {
  method: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardHolder?: string;
  bankCode?: string;
  accountNumber?: string;
  phoneNumber?: string;
}

interface OrderSummary {
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  pointDiscount: number;
  totalAmount: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "신용카드",
    icon: CreditCard,
    description: "VISA, MasterCard, 국내 모든 카드",
    processingTime: "즉시",
    fee: 0,
    available: true,
  },
  {
    id: "bank",
    name: "계좌이체",
    icon: Building,
    description: "실시간 계좌이체",
    processingTime: "즉시",
    fee: 0,
    available: true,
  },
  {
    id: "kakao",
    name: "카카오페이",
    icon: Smartphone,
    description: "카카오페이로 간편 결제",
    processingTime: "즉시",
    fee: 0,
    available: true,
  },
  {
    id: "naver",
    name: "네이버페이",
    icon: Smartphone,
    description: "네이버페이로 간편 결제",
    processingTime: "즉시",
    fee: 0,
    available: true,
  },
  {
    id: "payco",
    name: "페이코",
    icon: Smartphone,
    description: "페이코로 간편 결제",
    processingTime: "즉시",
    fee: 0,
    available: true,
  },
];

const banks = [
  { code: "001", name: "한국은행" },
  { code: "002", name: "산업은행" },
  { code: "003", name: "기업은행" },
  { code: "004", name: "국민은행" },
  { code: "005", name: "하나은행" },
  { code: "007", name: "수협은행" },
  { code: "008", name: "수출입은행" },
  { code: "011", name: "농협은행" },
  { code: "012", name: "농협회원조합" },
  { code: "020", name: "우리은행" },
  { code: "023", name: "SC제일은행" },
  { code: "027", name: "한국씨티은행" },
  { code: "031", name: "대구은행" },
  { code: "032", name: "부산은행" },
  { code: "034", name: "광주은행" },
  { code: "035", name: "제주은행" },
  { code: "037", name: "전북은행" },
  { code: "039", name: "경남은행" },
  { code: "045", name: "새마을금고" },
  { code: "048", name: "신협" },
  { code: "050", name: "상호저축은행" },
  { code: "052", name: "모간스탠리은행" },
  { code: "054", name: "HSBC은행" },
  { code: "055", name: "도이치은행" },
  { code: "057", name: "제이피모간체이스은행" },
  { code: "058", name: "미즈호은행" },
  { code: "059", name: "미쓰비시도쿄UFJ은행" },
  { code: "060", name: "BOA은행" },
  { code: "061", name: "비엔피파리바은행" },
  { code: "062", name: "중국공상은행" },
  { code: "063", name: "중국은행" },
  { code: "064", name: "산림조합중앙회" },
  { code: "065", name: "대화은행" },
  { code: "066", name: "교통은행" },
  { code: "067", name: "중국건설은행" },
  { code: "071", name: "우체국" },
  { code: "081", name: "하나은행" },
  { code: "088", name: "신한은행" },
  { code: "089", name: "케이뱅크" },
  { code: "090", name: "카카오뱅크" },
  { code: "092", name: "토스뱅크" },
  { code: "094", name: "코리아스탠다드차타드은행" },
  { code: "095", name: "애큐온저축은행" },
  { code: "096", name: "신용보증기금" },
  { code: "097", name: "기술보증기금" },
  { code: "098", name: "한국주택금융공사" },
  { code: "099", name: "서울보증보험" },
];

interface PaymentSystemProps {
  orderSummary: OrderSummary;
  onPaymentComplete: (paymentResult: any) => void;
}

export default function PaymentSystem({
  orderSummary,
  onPaymentComplete,
}: PaymentSystemProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(
    {} as PaymentInfo
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);

  const { addPoints, calculateEarnedPoints } = usePointStore();
  const { toast } = useToast();

  // 카드 번호 포맷팅
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // 만료일 포맷팅
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  // 결제 처리
  const processPayment = async () => {
    setIsProcessing(true);

    // 실제 결제 API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = {
      success: true,
      transactionId: `TXN-${Date.now()}`,
      amount: orderSummary.totalAmount,
      method: selectedMethod,
      timestamp: new Date().toISOString(),
      receiptNumber: `RCP-${Date.now()}`,
    };

    // 포인트 적립 처리
    const earnedPoints = calculateEarnedPoints(orderSummary.totalAmount);
    if (earnedPoints > 0) {
      addPoints(earnedPoints, "주문 완료 적립", result.transactionId);

      toast({
        title: "포인트 적립 완료",
        description: `${earnedPoints.toLocaleString()}P가 적립되었습니다.`,
      });
    }

    setPaymentResult(result);
    setIsProcessing(false);
    onPaymentComplete(result);
  };

  // 영수증 다운로드
  const downloadReceipt = () => {
    const receiptContent = `
LUMINA - 영수증
================

거래번호: ${paymentResult?.transactionId}
영수증번호: ${paymentResult?.receiptNumber}
결제일시: ${new Date(paymentResult?.timestamp).toLocaleString()}
결제수단: ${paymentMethods.find((m) => m.id === paymentResult?.method)?.name}

상품 내역:
${orderSummary.items
  .map(
    (item) =>
      `${item.name} x${item.quantity} - ${(
        item.price * item.quantity
      ).toLocaleString()}원`
  )
  .join("\n")}

상품금액: ${orderSummary.subtotal.toLocaleString()}원
배송비: ${orderSummary.shippingFee.toLocaleString()}원
할인금액: -${orderSummary.discountAmount.toLocaleString()}원${
      orderSummary.pointDiscount > 0
        ? `\n포인트 사용: -${orderSummary.pointDiscount.toLocaleString()}P`
        : ""
    }
총 결제금액: ${orderSummary.totalAmount.toLocaleString()}원

감사합니다.
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${paymentResult?.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 결제 수단 선택 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>결제 수단 선택</span>
          </CardTitle>
          <CardDescription>
            안전하고 편리한 결제 수단을 선택하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Card
                  key={method.id}
                  className={`cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? "ring-2 ring-blue-500 dark:ring-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "hover:shadow-md"
                  } ${
                    !method.available ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() =>
                    method.available && setSelectedMethod(method.id)
                  }
                >
                  <CardContent className="p-2 lg:p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-3 space-y-2 lg:space-y-0">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 mx-auto lg:mx-0">
                        <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0 text-center lg:text-left">
                        <h3 className="font-medium text-xs lg:text-base text-gray-900 dark:text-gray-100">
                          {method.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 hidden lg:block">
                          {method.description}
                        </p>
                        <div className="flex items-center justify-center lg:justify-start space-x-1 lg:space-x-2 mt-1 lg:mt-2">
                          <Badge variant="outline" className="text-xs">
                            {method.processingTime}
                          </Badge>
                          {method.fee > 0 && (
                            <Badge variant="outline" className="text-xs">
                              수수료 {method.fee}원
                            </Badge>
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

      {/* 결제 정보 입력 */}
      {selectedMethod && (
        <Card>
          <CardHeader>
            <CardTitle>결제 정보 입력</CardTitle>
            <CardDescription>
              {paymentMethods.find((m) => m.id === selectedMethod)?.name} 결제
              정보를 입력하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 lg:space-y-4">
              {selectedMethod === "card" && (
                <>
                  <div>
                    <Label
                      htmlFor="cardNumber"
                      className="text-sm lg:text-base"
                    >
                      카드 번호
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber || ""}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardNumber: formatCardNumber(e.target.value),
                        })
                      }
                      maxLength={19}
                      className="h-10 lg:h-10 text-sm lg:text-base"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    <div>
                      <Label
                        htmlFor="expiryDate"
                        className="text-sm lg:text-base"
                      >
                        만료일
                      </Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate || ""}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            expiryDate: formatExpiryDate(e.target.value),
                          })
                        }
                        maxLength={5}
                        className="h-10 lg:h-10 text-sm lg:text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-sm lg:text-base">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentInfo.cvv || ""}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cvv: e.target.value
                              .replace(/\D/g, "")
                              .substring(0, 3),
                          })
                        }
                        maxLength={3}
                        className="h-10 lg:h-10 text-sm lg:text-base"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="cardHolder"
                      className="text-sm lg:text-base"
                    >
                      카드 소유자명
                    </Label>
                    <Input
                      id="cardHolder"
                      placeholder="홍길동"
                      value={paymentInfo.cardHolder || ""}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardHolder: e.target.value,
                        })
                      }
                      className="h-10 lg:h-10 text-sm lg:text-base"
                    />
                  </div>
                </>
              )}

              {selectedMethod === "bank" && (
                <>
                  <div>
                    <Label htmlFor="bankCode" className="text-sm lg:text-base">
                      은행 선택
                    </Label>
                    <Select
                      value={paymentInfo.bankCode}
                      onValueChange={(value) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          bankCode: value,
                        })
                      }
                    >
                      <SelectTrigger className="h-10 lg:h-10 text-sm lg:text-base">
                        <SelectValue placeholder="은행을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {banks.map((bank) => (
                          <SelectItem key={bank.code} value={bank.code}>
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="accountNumber"
                      className="text-sm lg:text-base"
                    >
                      계좌번호
                    </Label>
                    <Input
                      id="accountNumber"
                      placeholder="계좌번호를 입력하세요"
                      value={paymentInfo.accountNumber || ""}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          accountNumber: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="h-10 lg:h-10 text-sm lg:text-base"
                    />
                  </div>
                </>
              )}

              {(selectedMethod === "kakao" ||
                selectedMethod === "naver" ||
                selectedMethod === "payco") && (
                <div>
                  <Label htmlFor="phoneNumber" className="text-sm lg:text-base">
                    휴대폰 번호
                  </Label>
                  <Input
                    id="phoneNumber"
                    placeholder="010-1234-5678"
                    value={paymentInfo.phoneNumber || ""}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="h-10 lg:h-10 text-sm lg:text-base"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 주문 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base lg:text-lg">주문 요약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 lg:space-y-3">
            {orderSummary.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 flex-1 mr-2">
                  {item.name} x{item.quantity}
                </span>
                <span className="text-xs lg:text-sm font-medium text-gray-900 dark:text-gray-100">
                  {(item.price * item.quantity).toLocaleString()}원
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 lg:pt-3 space-y-1 lg:space-y-2">
              <div className="flex justify-between">
                <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  상품금액
                </span>
                <span className="text-xs lg:text-sm text-gray-900 dark:text-gray-100">
                  {orderSummary.subtotal.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  배송비
                </span>
                <span className="text-xs lg:text-sm text-gray-900 dark:text-gray-100">
                  {orderSummary.shippingFee.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  할인금액
                </span>
                <span className="text-xs lg:text-sm text-red-600 dark:text-red-400">
                  -{orderSummary.discountAmount.toLocaleString()}원
                </span>
              </div>
              {orderSummary.pointDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                    포인트 사용
                  </span>
                  <span className="text-xs lg:text-sm text-blue-600 dark:text-blue-400">
                    -{orderSummary.pointDiscount.toLocaleString()}P
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base lg:text-lg font-semibold border-t border-gray-200 dark:border-gray-700 pt-2">
                <span className="text-gray-900 dark:text-gray-100">
                  총 결제금액
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {orderSummary.totalAmount.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 결제 버튼 */}
      <div className="space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
        {/* 보안 정보 - 모바일에서는 상단에 표시 */}
        <div className="flex items-center justify-center lg:justify-start space-x-2 text-xs lg:text-sm text-gray-600 dark:text-gray-400">
          <Lock className="w-4 h-4" />
          <span>SSL 보안 결제</span>
          <Shield className="w-4 h-4" />
          <span>개인정보 보호</span>
        </div>

        {/* 결제 버튼 - 모바일에서는 하단에 전체 너비로 표시 */}
        <Button
          size="lg"
          className="w-full lg:w-auto px-6 lg:px-8 h-12 lg:h-11 text-base lg:text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={processPayment}
          disabled={!selectedMethod || isProcessing}
        >
          {isProcessing ? (
            <>
              <Clock className="w-5 h-5 lg:w-4 lg:h-4 mr-2 animate-spin" />
              <span className="text-sm lg:text-base">결제 처리 중...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 lg:w-4 lg:h-4 mr-2" />
              <span className="text-sm lg:text-base">
                {orderSummary.totalAmount.toLocaleString()}원 결제하기
              </span>
            </>
          )}
        </Button>
      </div>

      {/* 영수증 다이얼로그 */}
      <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>결제 완료</span>
            </DialogTitle>
            <DialogDescription>
              결제가 성공적으로 완료되었습니다
            </DialogDescription>
          </DialogHeader>
          {paymentResult && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">거래번호:</span>{" "}
                    {paymentResult.transactionId}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">결제수단:</span>{" "}
                    {
                      paymentMethods.find((m) => m.id === paymentResult.method)
                        ?.name
                    }
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">결제금액:</span>{" "}
                    {paymentResult.amount.toLocaleString()}원
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">결제일시:</span>{" "}
                    {new Date(paymentResult.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={downloadReceipt}>
                  <Download className="w-4 h-4 mr-2" />
                  영수증 다운로드
                </Button>
                <Button onClick={() => setIsReceiptDialogOpen(false)}>
                  확인
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
