"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  RefreshCw,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Package,
  CreditCard,
  Truck,
  FileText,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function ReturnPage() {
  const [selectedTab, setSelectedTab] = useState("policy");

  const returnPolicy = {
    period: "7일",
    conditions: [
      "상품 수령 후 7일 이내",
      "상품의 초기 상태 유지",
      "세탁이나 사용 흔적 없음",
      "태그 및 포장재 보존",
      "교환/반품 신청서 작성",
    ],
    exceptions: [
      "세탁된 상품",
      "사용 흔적이 있는 상품",
      "태그가 제거된 상품",
      "포장재가 훼손된 상품",
      "개봉된 화장품/속옷류",
      "주문제작 상품",
    ],
  };

  const returnProcess = [
    {
      step: 1,
      title: "교환/반품 신청",
      description: "마이페이지에서 신청하거나 고객센터로 연락",
      time: "즉시",
      icon: FileText,
    },
    {
      step: 2,
      title: "신청 확인",
      description: "신청 내용을 검토하고 승인 여부 결정",
      time: "1-2일",
      icon: CheckCircle,
    },
    {
      step: 3,
      title: "상품 발송",
      description: "승인된 경우 상품을 지정된 주소로 발송",
      time: "승인 후 3일 이내",
      icon: Package,
    },
    {
      step: 4,
      title: "상품 확인",
      description: "반품 상품의 상태를 확인",
      time: "수령 후 1-2일",
      icon: CheckCircle,
    },
    {
      step: 5,
      title: "처리 완료",
      description: "교환 상품 발송 또는 환불 처리",
      time: "확인 후 1-2일",
      icon: CreditCard,
    },
  ];

  const refundInfo = {
    methods: [
      {
        method: "신용카드",
        time: "3-5일",
        note: "카드사 정책에 따라 처리",
      },
      {
        method: "체크카드",
        time: "3-5일",
        note: "카드사 정책에 따라 처리",
      },
      {
        method: "계좌이체",
        time: "1-2일",
        note: "입금 계좌 확인 필요",
      },
      {
        method: "간편결제",
        time: "1-3일",
        note: "결제 수단별 정책 적용",
      },
      {
        method: "무통장입금",
        time: "1-2일",
        note: "입금 계좌 확인 필요",
      },
    ],
    fees: [
      {
        type: "단순 변심",
        exchange: "왕복 배송비 고객 부담",
        return: "편도 배송비 고객 부담",
        note: "교환 시 6,000원, 반품 시 3,000원",
      },
      {
        type: "상품 하자",
        exchange: "무료",
        return: "무료",
        note: "모든 비용 회사 부담",
      },
      {
        type: "오배송",
        exchange: "무료",
        return: "무료",
        note: "모든 비용 회사 부담",
      },
    ],
  };

  const faqData = [
    {
      question: "교환/반품 신청은 언제까지 가능한가요?",
      answer:
        "상품 수령 후 7일 이내에 신청 가능합니다. 단, 상품의 상태가 초기 상태와 동일해야 하며, 세탁이나 사용 흔적이 없어야 합니다.",
    },
    {
      question: "교환/반품 배송비는 누가 부담하나요?",
      answer:
        "상품 하자나 오배송의 경우 무료로 처리됩니다. 단순 변심의 경우 고객이 배송비를 부담하며, 교환 시 왕복 배송비, 반품 시 편도 배송비가 발생합니다.",
    },
    {
      question: "환불은 언제 처리되나요?",
      answer:
        "반품 상품 확인 후 3-5일 내에 환불 처리됩니다. 결제 수단에 따라 환불 시점이 다를 수 있으며, 카드 결제의 경우 카드사 정책에 따라 처리됩니다.",
    },
    {
      question: "교환 시 원하는 사이즈가 없으면 어떻게 하나요?",
      answer:
        "원하는 사이즈가 재고가 없는 경우, 다른 사이즈로 교환하거나 반품 처리할 수 있습니다. 고객센터로 문의해주세요.",
    },
    {
      question: "세일 상품도 교환/반품이 가능한가요?",
      answer:
        "네, 세일 상품도 동일한 정책이 적용됩니다. 단, 세일 기간이 종료된 경우 차액을 추가로 결제해야 할 수 있습니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">교환/반품</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            고객님의 만족을 위해 신속하고 정확한 교환/반품 서비스를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  교환/반품 안내
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="policy">정책</TabsTrigger>
                    <TabsTrigger value="process">절차</TabsTrigger>
                    <TabsTrigger value="refund">환불</TabsTrigger>
                  </TabsList>

                  {/* 정책 탭 */}
                  <TabsContent value="policy" className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <Clock className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-semibold text-blue-900">
                          교환/반품 기간: {returnPolicy.period}
                        </h3>
                      </div>
                      <p className="text-blue-800">
                        상품 수령 후 7일 이내에 교환/반품 신청이 가능합니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          교환/반품 가능 조건
                        </h4>
                        <ul className="space-y-2">
                          {returnPolicy.conditions.map((condition, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{condition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <XCircle className="w-5 h-5 text-red-500 mr-2" />
                          교환/반품 불가 조건
                        </h4>
                        <ul className="space-y-2">
                          {returnPolicy.exceptions.map((exception, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{exception}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  {/* 절차 탭 */}
                  <TabsContent value="process" className="space-y-6">
                    <div className="space-y-4">
                      {returnProcess.map((process, index) => {
                        const Icon = process.icon;
                        return (
                          <div
                            key={index}
                            className="flex items-start space-x-4"
                          >
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-semibold text-yellow-600">
                                {process.step}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Icon className="w-4 h-4 text-green-500" />
                                <h4 className="font-semibold text-gray-900">
                                  {process.title}
                                </h4>
                              </div>
                              <p className="text-gray-600 mb-1">
                                {process.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {process.time}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-900 mb-1">
                            주의사항
                          </h4>
                          <ul className="text-sm text-yellow-800 space-y-1">
                            <li>
                              • 교환/반품 신청 전 상품 상태를 확인해주세요
                            </li>
                            <li>• 배송비는 상품 수령 후 별도 청구됩니다</li>
                            <li>
                              • 교환 시 원하는 사이즈의 재고를 확인해주세요
                            </li>
                            <li>
                              • 반품 상품은 지정된 주소로만 발송 가능합니다
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* 환불 탭 */}
                  <TabsContent value="refund" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        환불 처리 시간
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                                결제 수단
                              </th>
                              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                                처리 시간
                              </th>
                              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                                비고
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {refundInfo.methods.map((method, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-3 font-medium">
                                  {method.method}
                                </td>
                                <td className="border border-gray-200 px-4 py-3">
                                  <Badge variant="outline">{method.time}</Badge>
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                                  {method.note}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        배송비 안내
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                                구분
                              </th>
                              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                                교환
                              </th>
                              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                                반품
                              </th>
                              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                                비고
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {refundInfo.fees.map((fee, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-3 font-medium">
                                  {fee.type}
                                </td>
                                <td className="border border-gray-200 px-4 py-3">
                                  <Badge
                                    variant={
                                      fee.exchange === "무료"
                                        ? "default"
                                        : "outline"
                                    }
                                  >
                                    {fee.exchange}
                                  </Badge>
                                </td>
                                <td className="border border-gray-200 px-4 py-3">
                                  <Badge
                                    variant={
                                      fee.return === "무료"
                                        ? "default"
                                        : "outline"
                                    }
                                  >
                                    {fee.return}
                                  </Badge>
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                                  {fee.note}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 빠른 신청 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  교환/반품 신청
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full lumina-gradient text-white">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  신청하기
                </Button>
                <Button variant="outline" className="w-full">
                  <Truck className="w-4 h-4 mr-2" />
                  배송 조회
                </Button>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  자주 묻는 질문
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqData.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-none"
                    >
                      <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-600 pt-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* 고객센터 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">고객센터</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  1588-1234
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  cs@lumina.com
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  문의하기
                </Button>
              </CardContent>
            </Card>

            {/* 주의사항 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">주의사항</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    교환/반품 신청 후 상품 발송 전까지 취소 가능
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    교환 시 원하는 사이즈 재고 확인 필요
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    반품 상품은 지정된 주소로만 발송
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
