"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Search,
  HelpCircle,
  ShoppingBag,
  Truck,
  RefreshCw,
  User,
  CreditCard,
} from "lucide-react";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "전체", icon: HelpCircle },
    { id: "order", name: "주문/결제", icon: ShoppingBag },
    { id: "shipping", name: "배송", icon: Truck },
    { id: "return", name: "교환/반품", icon: RefreshCw },
    { id: "member", name: "회원정보", icon: User },
    { id: "payment", name: "결제", icon: CreditCard },
  ];

  const faqData = {
    order: [
      {
        question: "주문 후 주문내역을 확인할 수 있나요?",
        answer:
          "네, 로그인 후 '마이페이지 > 주문내역'에서 모든 주문 정보를 확인할 수 있습니다. 주문번호, 배송상태, 결제정보 등을 한눈에 볼 수 있어요.",
      },
      {
        question: "주문 취소는 언제까지 가능한가요?",
        answer:
          "상품 출고 전까지 주문 취소가 가능합니다. 출고 후에는 교환/반품 신청을 통해 처리해주세요. 출고 상태는 주문내역에서 실시간으로 확인할 수 있습니다.",
      },
      {
        question: "비회원으로도 주문할 수 있나요?",
        answer:
          "네, 비회원으로도 주문 가능합니다. 단, 주문조회와 배송추적을 위해서는 주문 시 입력한 이메일과 주문번호가 필요합니다.",
      },
      {
        question: "주문 시 쿠폰을 여러 개 사용할 수 있나요?",
        answer:
          "아니요, 한 번의 주문에 하나의 쿠폰만 사용 가능합니다. 쿠폰 사용 조건과 할인 혜택을 확인 후 사용해주세요.",
      },
    ],
    shipping: [
      {
        question: "배송은 얼마나 걸리나요?",
        answer:
          "일반 배송은 결제 완료 후 1-2일 내 출고, 2-3일 내 배송 완료됩니다. 제주도 및 도서산간 지역은 추가 1-2일이 소요될 수 있습니다.",
      },
      {
        question: "배송비는 얼마인가요?",
        answer:
          "3만원 이상 구매 시 무료배송, 3만원 미만 구매 시 3,000원의 배송비가 발생합니다. 제주도 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.",
      },
      {
        question: "배송 추적은 어떻게 하나요?",
        answer:
          "주문내역에서 '배송조회' 버튼을 클릭하거나, 배송업체에서 제공하는 송장번호로 직접 조회할 수 있습니다. 실시간 배송 현황을 확인할 수 있어요.",
      },
      {
        question: "부재 시 택배는 어떻게 처리되나요?",
        answer:
          "1차 배송 실패 시 2회 재시도하며, 3회 모두 실패 시 고객센터로 연락드립니다. 편의점 보관이나 재배송 요청도 가능합니다.",
      },
    ],
    return: [
      {
        question: "교환/반품 신청은 언제까지 가능한가요?",
        answer:
          "상품 수령 후 7일 이내에 교환/반품 신청이 가능합니다. 단, 상품의 상태가 초기 상태와 동일해야 하며, 세탁이나 사용 흔적이 없어야 합니다.",
      },
      {
        question: "교환/반품 배송비는 누가 부담하나요?",
        answer:
          "상품 하자나 오배송의 경우 무료로 처리됩니다. 단순 변심의 경우 고객이 배송비를 부담하며, 교환 시 왕복 배송비, 반품 시 편도 배송비가 발생합니다.",
      },
      {
        question: "교환/반품 신청은 어떻게 하나요?",
        answer:
          "마이페이지 > 주문내역에서 해당 주문의 '교환/반품 신청' 버튼을 클릭하여 신청할 수 있습니다. 사유와 함께 신청해주세요.",
      },
      {
        question: "환불은 언제 처리되나요?",
        answer:
          "반품 상품 확인 후 3-5일 내에 환불 처리됩니다. 결제 수단에 따라 환불 시점이 다를 수 있으며, 카드 결제의 경우 카드사 정책에 따라 처리됩니다.",
      },
    ],
    member: [
      {
        question: "회원가입은 어떻게 하나요?",
        answer:
          "홈페이지 우측 상단의 '회원가입' 버튼을 클릭하여 이메일, 비밀번호, 개인정보를 입력하면 가입이 완료됩니다. 이메일 인증 후 모든 서비스를 이용할 수 있습니다.",
      },
      {
        question: "비밀번호를 잊어버렸어요.",
        answer:
          "로그인 페이지의 '비밀번호 찾기'를 통해 이메일로 임시 비밀번호를 발송받을 수 있습니다. 로그인 후 반드시 비밀번호를 변경해주세요.",
      },
      {
        question: "회원 탈퇴는 어떻게 하나요?",
        answer:
          "마이페이지 > 회원정보에서 '회원탈퇴' 버튼을 클릭하여 탈퇴할 수 있습니다. 탈퇴 시 모든 개인정보가 삭제되며, 복구가 불가능합니다.",
      },
      {
        question: "개인정보 변경은 어떻게 하나요?",
        answer:
          "마이페이지 > 회원정보에서 주소, 연락처 등 개인정보를 수정할 수 있습니다. 이메일 주소 변경은 고객센터로 문의해주세요.",
      },
    ],
    payment: [
      {
        question: "어떤 결제 방법을 지원하나요?",
        answer:
          "신용카드, 체크카드, 계좌이체, 간편결제(카카오페이, 네이버페이, 페이코), 무통장입금을 지원합니다. 모든 결제는 안전한 SSL 암호화로 보호됩니다.",
      },
      {
        question: "무통장입금은 언제까지 해야 하나요?",
        answer:
          "주문 후 24시간 이내에 입금해주세요. 24시간이 지나면 주문이 자동 취소됩니다. 입금 확인 후 상품이 출고됩니다.",
      },
      {
        question: "결제 오류가 발생했어요.",
        answer:
          "결제 수단별로 오류 원인이 다를 수 있습니다. 카드사 한도 초과, 잔액 부족, 네트워크 오류 등을 확인해보시고, 지속적인 오류 시 고객센터로 문의해주세요.",
      },
      {
        question: "부분 취소가 가능한가요?",
        answer:
          "네, 주문 상품 중 일부만 취소할 수 있습니다. 주문내역에서 '부분 취소' 버튼을 클릭하여 원하는 상품만 선택하여 취소할 수 있습니다.",
      },
    ],
  };

  const allFAQs = Object.entries(faqData).flatMap(([category, faqs]) =>
    faqs.map((faq) => ({ ...faq, category }))
  );

  const filteredFAQs = allFAQs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            자주 묻는 질문
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            고객님들이 자주 문의하시는 내용들을 모았습니다. 궁금한 점을 빠르게
            찾아보세요.
          </p>
        </div>

        {/* 검색 및 카테고리 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="궁금한 내용을 검색해보세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outline"
              className="md:w-auto"
            >
              초기화
            </Button>
          </div>

          {/* 카테고리 버튼 */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? "lumina-gradient text-white"
                      : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* FAQ 목록 */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <Card key={index}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-none"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="text-left font-semibold text-gray-900">
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-600 mb-6">
                  다른 키워드로 검색하거나 카테고리를 변경해보세요.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="lumina-gradient text-white"
                >
                  전체 보기
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 추가 도움말 */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                더 궁금한 점이 있으신가요?
              </h3>
              <p className="text-gray-600 mb-6">
                FAQ에서 답을 찾지 못하셨다면, 언제든 문의해주세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="lumina-gradient text-white">문의하기</Button>
                <Button variant="outline">고객센터 연락처</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
