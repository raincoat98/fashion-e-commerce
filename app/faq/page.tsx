"use client";

import React from "react";
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
import { useStore } from "@/stores/useStore";

export default function FAQPage() {
  const {
    faqSearchTerm,
    faqSelectedCategory,
    setFaqSearchTerm,
    setFaqSelectedCategory,
    resetFaqFilters,
    faqData,
  } = useStore();

  const categories = [
    { id: "all", name: "전체", icon: HelpCircle },
    { id: "order", name: "주문/결제", icon: ShoppingBag },
    { id: "shipping", name: "배송", icon: Truck },
    { id: "return", name: "교환/반품", icon: RefreshCw },
    { id: "member", name: "회원정보", icon: User },
    { id: "payment", name: "결제", icon: CreditCard },
  ];

  const allFAQs = Object.entries(faqData).flatMap(([category, faqs]) =>
    faqs.map((faq) => ({ ...faq, category }))
  );

  const filteredFAQs = allFAQs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(faqSearchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearchTerm.toLowerCase());
    const matchesCategory =
      faqSelectedCategory === "all" || faq.category === faqSelectedCategory;
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
                value={faqSearchTerm}
                onChange={(e) => setFaqSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <Button
              onClick={resetFaqFilters}
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
                    faqSelectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setFaqSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 ${
                    faqSelectedCategory === category.id
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
                  onClick={resetFaqFilters}
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
