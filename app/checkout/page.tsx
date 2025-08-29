"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Truck,
  CheckCircle,
  ArrowLeft,
  ShoppingCart,
  CreditCard,
  Building,
  Smartphone,
  Lock,
  Shield,
  Zap,
  Clock,
  Download,
  Receipt,
  Plus,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import PaymentSystem from "@/components/checkout/PaymentSystem";
import CouponInput from "@/components/checkout/CouponInput";
import PointInput from "@/components/checkout/PointInput";
import AddressManager from "@/components/shipping/AddressManager";
import { useAddressStore, ShippingAddress } from "@/stores/useAddressStore";
import { usePointStore } from "@/stores/usePointStore";

interface ShippingInfo {
  name: string;
  phone: string;
  postcode: string;
  address: string;
  detailAddress: string;
  memo: string;
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

export default function CheckoutPage() {
  const { state: cartState, clearCart } = useCart();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const { addresses, getDefaultAddress, getAddressById, initializeAddresses } =
    useAddressStore();
  const { usablePoints, usePoints } = usePointStore();

  // URL 파라미터에서 모드 확인
  const mode = searchParams.get("mode");
  const isBuyNowMode = mode === "buyNow";

  // 바로 구매하기 상품 데이터
  const [buyNowProduct, setBuyNowProduct] = useState<any>(null);

  // 배송지 데이터 초기화 및 기본 배송지 설정
  useEffect(() => {
    initializeAddresses();
    const defaultAddress = getDefaultAddress();
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
      setShippingInfo({
        name: defaultAddress.recipient,
        phone: defaultAddress.phone,
        postcode: defaultAddress.postcode,
        address: defaultAddress.address,
        detailAddress: defaultAddress.detailAddress,
        memo: defaultAddress.memo || "",
      });
    }
  }, [initializeAddresses, getDefaultAddress]);

  // 바로 구매하기 모드일 때 세션 스토리지에서 상품 데이터 가져오기
  useEffect(() => {
    if (isBuyNowMode) {
      const storedProduct = sessionStorage.getItem("buyNowProduct");
      if (storedProduct) {
        setBuyNowProduct(JSON.parse(storedProduct));
      }
    }
  }, [isBuyNowMode]);

  // 쿠폰 배너에서 온 경우 쿠폰 자동 적용
  useEffect(() => {
    const fromCoupon = searchParams.get("from") === "coupon";
    if (fromCoupon) {
      const storedCoupon = sessionStorage.getItem("selectedCoupon");
      if (storedCoupon) {
        try {
          const coupon = JSON.parse(storedCoupon);
          setAppliedCoupon(coupon);
          toast({
            title: "쿠폰이 적용되었습니다",
            description: `${coupon.name} 쿠폰이 자동으로 적용되었습니다.`,
            duration: 3000,
          });
          // 쿠폰 정보 삭제 (한 번만 사용)
          sessionStorage.removeItem("selectedCoupon");
        } catch (error) {
          console.error("쿠폰 적용 실패:", error);
        }
      }
    }
  }, [searchParams, toast]);

  // cartState가 초기화되지 않았을 때를 대비한 안전한 처리
  const safeCartState = cartState || { items: [], total: 0, itemCount: 0 };

  // 바로 구매하기 모드일 때는 buyNowProduct를 사용, 아니면 장바구니 사용
  const currentItems =
    isBuyNowMode && buyNowProduct ? [buyNowProduct] : safeCartState.items;
  const [currentStep, setCurrentStep] = useState<
    "shipping" | "payment" | "complete"
  >("shipping");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "",
    phone: "",
    postcode: "",
    address: "",
    detailAddress: "",
    memo: "",
  });
  const [showAddressManager, setShowAddressManager] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    payment: false,
  });
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [usedPoints, setUsedPoints] = useState<number>(0);
  const [paymentResult, setPaymentResult] = useState<any>(null);

  // 배송비 계산
  const calculateShippingFee = (subtotal: number) => {
    if (subtotal >= 100000) return 0;
    if (subtotal >= 50000) return 1000;
    return 3000;
  };

  // 주문 요약 계산
  const subtotal = currentItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = calculateShippingFee(subtotal);
  const discountAmount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.floor(subtotal * (appliedCoupon.value / 100))
      : appliedCoupon.value
    : 0;
  const totalAmount = subtotal + shippingFee - discountAmount - usedPoints;

  const orderSummary = {
    subtotal,
    shippingFee,
    discountAmount,
    pointDiscount: usedPoints,
    totalAmount,
    items: currentItems.map((item) => ({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  };

  const allAgreed = Object.values(agreements).every(Boolean);

  const handleAgreementChange = (
    key: keyof typeof agreements,
    checked: boolean
  ) => {
    setAgreements((prev) => ({ ...prev, [key]: checked }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      alert("필수 배송 정보를 입력해주세요.");
      return;
    }
    setCurrentStep("payment");
  };

  const handlePaymentComplete = (result: any) => {
    // 포인트 사용 처리
    if (usedPoints > 0) {
      usePoints(usedPoints, "주문 시 포인트 사용", result.transactionId);
    }

    setPaymentResult(result);
    setCurrentStep("complete");

    // 장바구니 모드면 장바구니 비우기, 바로구매 모드면 세션 스토리지 정리
    if (isBuyNowMode) {
      sessionStorage.removeItem("buyNowProduct");
    } else {
      clearCart();
    }

    toast({
      title: "주문 완료!",
      description:
        "주문이 성공적으로 완료되었습니다. 주문 확인 이메일을 확인해주세요.",
      duration: 5000,
    });
  };

  const handleBackToShipping = () => {
    setCurrentStep("shipping");
  };

  const handleBackToPayment = () => {
    setCurrentStep("payment");
  };

  const handleAddressSelect = (addressId: string) => {
    const address = getAddressById(addressId);
    if (address) {
      setSelectedAddressId(addressId);
      setShippingInfo({
        name: address.recipient,
        phone: address.phone,
        postcode: address.postcode,
        address: address.address,
        detailAddress: address.detailAddress,
        memo: address.memo || "",
      });
    }
  };

  const handleManualAddressToggle = () => {
    setSelectedAddressId(null);
    setShippingInfo({
      name: "",
      phone: "",
      postcode: "",
      address: "",
      detailAddress: "",
      memo: "",
    });
  };

  if (currentItems.length === 0 && currentStep !== "complete") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto py-8">
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isBuyNowMode
                ? "구매할 상품이 없습니다"
                : "장바구니가 비어있습니다"}
            </h1>
            <p className="text-gray-600 mb-6">
              {isBuyNowMode
                ? "상품을 선택한 후 다시 시도해주세요."
                : "상품을 추가한 후 주문을 진행해주세요."}
            </p>
            <Link href="/">
              <Button>쇼핑 계속하기</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-8">
        {/* 진행 단계 표시 */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div
              className={`flex items-center space-x-2 ${
                currentStep === "shipping"
                  ? "text-blue-600"
                  : currentStep === "payment"
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "shipping"
                    ? "bg-blue-600 text-white"
                    : currentStep === "payment"
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-white"
                }`}
              >
                {currentStep === "shipping" ? (
                  "1"
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
              </div>
              <span className="font-medium">배송 정보</span>
            </div>
            <div className="w-8 h-1 bg-gray-300"></div>
            <div
              className={`flex items-center space-x-2 ${
                currentStep === "payment"
                  ? "text-blue-600"
                  : currentStep === "complete"
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "payment"
                    ? "bg-blue-600 text-white"
                    : currentStep === "complete"
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-white"
                }`}
              >
                {currentStep === "payment" ? (
                  "2"
                ) : currentStep === "complete" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  "2"
                )}
              </div>
              <span className="font-medium">결제</span>
            </div>
            <div className="w-8 h-1 bg-gray-300"></div>
            <div
              className={`flex items-center space-x-2 ${
                currentStep === "complete" ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "complete"
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-white"
                }`}
              >
                {currentStep === "complete" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  "3"
                )}
              </div>
              <span className="font-medium">완료</span>
            </div>
          </div>
        </div>

        {/* 배송 정보 입력 */}
        {currentStep === "shipping" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>배송 정보</span>
                  </CardTitle>
                  <CardDescription>
                    상품을 받으실 주소와 연락처를 입력해주세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* 등록된 배송지 선택 */}
                  {addresses.length > 0 && (
                    <div className="mb-6">
                      <Label className="text-sm font-medium">
                        등록된 배송지
                      </Label>
                      <div
                        className={`mt-2 space-y-2 ${
                          addresses.length >= 3
                            ? "max-h-60 overflow-y-auto pr-1"
                            : ""
                        }`}
                      >
                        {addresses.map((address) => (
                          <div
                            key={address.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedAddressId === address.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => handleAddressSelect(address.id)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">
                                  {address.name}
                                </span>
                                {address.isDefault && (
                                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                    기본
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p>
                                {address.recipient} | {address.phone}
                              </p>
                              <p>
                                [{address.postcode}] {address.address}{" "}
                                {address.detailAddress}
                              </p>
                              {address.memo && (
                                <p className="text-gray-500 mt-1">
                                  📝 {address.memo}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowAddressManager(true)}
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-2" />새 배송지 추가
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleManualAddressToggle}
                          size="sm"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          직접 입력
                        </Button>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">받는 분 *</Label>
                        <Input
                          id="name"
                          value={shippingInfo.name}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              name: e.target.value,
                            })
                          }
                          placeholder="이름을 입력하세요"
                          spellCheck={false}
                          required
                          disabled={selectedAddressId !== null}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">연락처 *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              phone: e.target.value,
                            })
                          }
                          placeholder="010-0000-0000"
                          spellCheck={false}
                          required
                          disabled={selectedAddressId !== null}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="postcode">주소 *</Label>
                      <div className="flex space-x-2 mb-2">
                        <Input
                          id="postcode"
                          value={shippingInfo.postcode}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              postcode: e.target.value,
                            })
                          }
                          placeholder="우편번호"
                          className="w-32"
                          required
                          disabled={selectedAddressId !== null}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={selectedAddressId !== null}
                        >
                          주소 검색
                        </Button>
                      </div>
                      <Input
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            address: e.target.value,
                          })
                        }
                        placeholder="기본 주소"
                        className="mb-2"
                        required
                        disabled={selectedAddressId !== null}
                      />
                      <Input
                        value={shippingInfo.detailAddress}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            detailAddress: e.target.value,
                          })
                        }
                        placeholder="상세 주소"
                        required
                        disabled={selectedAddressId !== null}
                      />
                    </div>

                    <div>
                      <Label htmlFor="memo">배송 메모</Label>
                      <Textarea
                        id="memo"
                        value={shippingInfo.memo}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            memo: e.target.value,
                          })
                        }
                        placeholder="배송시 요청사항을 입력하세요 (선택사항)"
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="px-8"
                        onClick={() => {
                          toast({
                            title: "배송 정보 저장",
                            description:
                              "배송 정보가 저장되어 결제 단계로 이동합니다.",
                            duration: 2000,
                          });
                        }}
                      >
                        다음 단계
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* 주문 요약 */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>
                    {isBuyNowMode ? "구매 상품" : "주문 상품"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {currentItems.map((item) => (
                      <div key={item.id} className="flex space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.size} / {item.color} / {item.quantity}개
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {(item.price * item.quantity).toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">상품 금액</span>
                      <span>{subtotal.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">배송비</span>
                      <span>
                        {shippingFee === 0
                          ? "무료"
                          : `${shippingFee.toLocaleString()}원`}
                      </span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">쿠폰 할인</span>
                        <span className="text-red-600">
                          -{discountAmount.toLocaleString()}원
                        </span>
                      </div>
                    )}
                    {usedPoints > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">포인트 사용</span>
                        <span className="text-blue-600">
                          -{usedPoints.toLocaleString()}P
                        </span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>총 결제 금액</span>
                      <span className="text-red-600">
                        {totalAmount.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* 결제 단계 */}
        {currentStep === "payment" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* 쿠폰 입력 */}
                <Card>
                  <CardHeader>
                    <CardTitle>쿠폰 적용</CardTitle>
                    <CardDescription>
                      보유한 쿠폰을 적용하여 할인을 받으세요
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CouponInput
                      onCouponApplied={setAppliedCoupon}
                      appliedCoupon={appliedCoupon}
                    />
                  </CardContent>
                </Card>

                {/* 포인트 사용 */}
                <Card>
                  <CardHeader>
                    <CardTitle>포인트 사용</CardTitle>
                    <CardDescription>
                      보유한 포인트를 사용하여 할인을 받으세요
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PointInput
                      totalAmount={subtotal + shippingFee - discountAmount}
                      onPointsUsed={setUsedPoints}
                      usedPoints={usedPoints}
                      availablePoints={usablePoints}
                    />
                  </CardContent>
                </Card>

                {/* 결제 시스템 */}
                <PaymentSystem
                  orderSummary={orderSummary}
                  onPaymentComplete={handlePaymentComplete}
                />

                {/* 약관 동의 */}
                <Card>
                  <CardHeader>
                    <CardTitle>약관 동의</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="terms"
                          checked={agreements.terms}
                          onCheckedChange={(checked) =>
                            handleAgreementChange("terms", checked as boolean)
                          }
                        />
                        <Label
                          htmlFor="terms"
                          className="flex-1 cursor-pointer"
                        >
                          <span className="text-red-600">[필수]</span> 이용약관
                          동의
                        </Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500"
                        >
                          보기
                        </Button>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="privacy"
                          checked={agreements.privacy}
                          onCheckedChange={(checked) =>
                            handleAgreementChange("privacy", checked as boolean)
                          }
                        />
                        <Label
                          htmlFor="privacy"
                          className="flex-1 cursor-pointer"
                        >
                          <span className="text-red-600">[필수]</span>{" "}
                          개인정보처리방침 동의
                        </Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500"
                        >
                          보기
                        </Button>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="payment"
                          checked={agreements.payment}
                          onCheckedChange={(checked) =>
                            handleAgreementChange("payment", checked as boolean)
                          }
                        />
                        <Label
                          htmlFor="payment"
                          className="flex-1 cursor-pointer"
                        >
                          <span className="text-red-600">[필수]</span> 결제대행
                          서비스 약관 동의
                        </Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500"
                        >
                          보기
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBackToShipping}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    배송 정보 수정
                  </Button>
                </div>
              </div>
            </div>

            {/* 주문 요약 */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>
                    {isBuyNowMode ? "구매 요약" : "주문 요약"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {currentItems.map((item) => (
                      <div key={item.id} className="flex space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.size} / {item.color} / {item.quantity}개
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {(item.price * item.quantity).toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">상품 금액</span>
                      <span>{subtotal.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">배송비</span>
                      <span>
                        {shippingFee === 0
                          ? "무료"
                          : `${shippingFee.toLocaleString()}원`}
                      </span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">쿠폰 할인</span>
                        <span className="text-red-600">
                          -{discountAmount.toLocaleString()}원
                        </span>
                      </div>
                    )}
                    {usedPoints > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">포인트 사용</span>
                        <span className="text-blue-600">
                          -{usedPoints.toLocaleString()}P
                        </span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>총 결제 금액</span>
                      <span className="text-red-600">
                        {totalAmount.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* 결제 완료 */}
        {currentStep === "complete" && paymentResult && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">
                  주문이 완료되었습니다!
                </CardTitle>
                <CardDescription>
                  주문이 성공적으로 처리되었습니다. 주문 내역은 마이페이지에서
                  확인하실 수 있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 주문 정보 */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-3">주문 정보</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">주문번호</span>
                        <span className="font-medium">
                          {paymentResult.transactionId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">결제금액</span>
                        <span className="font-medium">
                          {paymentResult.amount.toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">결제일시</span>
                        <span className="font-medium">
                          {new Date(paymentResult.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 배송 정보 */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-3">배송 정보</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">받는 분</span>
                        <span>{shippingInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">연락처</span>
                        <span>{shippingInfo.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">배송지</span>
                        <span className="text-right">
                          {shippingInfo.address} {shippingInfo.detailAddress}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      주문서 다운로드
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Receipt className="w-4 h-4 mr-2" />
                      영수증 다운로드
                    </Button>
                  </div>

                  <div className="flex space-x-3">
                    <Link href="/" className="flex-1">
                      <Button variant="outline" className="w-full">
                        쇼핑 계속하기
                      </Button>
                    </Link>
                    <Link href="/order" className="flex-1">
                      <Button className="w-full">주문 내역 보기</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* 배송지 관리 다이얼로그 */}
      {showAddressManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto m-4 w-full">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">배송지 관리</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddressManager(false)}
              >
                ✕
              </Button>
            </div>
            <div className="p-6">
              <AddressManager />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
