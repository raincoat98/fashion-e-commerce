"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useStore } from "@/stores/useStore";

export default function ContactPage() {
  const {
    contactForm,
    isContactSubmitted,
    setContactForm,
    submitContact,
    resetContact,
  } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact();
  };

  const handleChange = (field: string, value: string) => {
    setContactForm({ [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              문의하기
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto word-break-keep">
              궁금한 점이나 문의사항이 있으시면 언제든 연락주세요. 빠른 시일
              내에 답변드리겠습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 문의 양식 */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    문의 양식
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isContactSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        문의가 성공적으로 접수되었습니다!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 word-break-keep">
                        빠른 시일 내에 답변드리겠습니다.
                      </p>
                      <Button
                        onClick={resetContact}
                        className="lumina-gradient text-white"
                      >
                        새 문의 작성
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            이름 *
                          </label>
                          <Input
                            type="text"
                            value={contactForm.name}
                            onChange={(e) =>
                              handleChange("name", e.target.value)
                            }
                            required
                            placeholder="이름을 입력하세요"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            이메일 *
                          </label>
                          <Input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) =>
                              handleChange("email", e.target.value)
                            }
                            required
                            placeholder="이메일을 입력하세요"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          연락처
                        </label>
                        <Input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          placeholder="전화번호를 입력하세요"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          문의 유형 *
                        </label>
                        <Select
                          value={contactForm.category}
                          onValueChange={(value) =>
                            handleChange("category", value)
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="문의 유형을 선택하세요" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="order">주문/결제</SelectItem>
                            <SelectItem value="shipping">배송</SelectItem>
                            <SelectItem value="return">교환/반품</SelectItem>
                            <SelectItem value="product">상품 문의</SelectItem>
                            <SelectItem value="size">사이즈 문의</SelectItem>
                            <SelectItem value="other">기타</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          제목 *
                        </label>
                        <Input
                          type="text"
                          value={contactForm.subject}
                          onChange={(e) =>
                            handleChange("subject", e.target.value)
                          }
                          required
                          placeholder="문의 제목을 입력하세요"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          문의 내용 *
                        </label>
                        <Textarea
                          value={contactForm.message}
                          onChange={(e) =>
                            handleChange("message", e.target.value)
                          }
                          required
                          placeholder="문의 내용을 자세히 입력해주세요"
                          rows={6}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full lumina-gradient text-white py-3 text-lg font-semibold"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        문의하기
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 연락처 정보 */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    연락처 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        고객센터
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        1588-1234
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        평일 09:00 - 18:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        이메일
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        cs@lumina.com
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        24시간 접수 가능
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        본사 주소
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        서울특별시 강남구 테헤란로 123
                        <br />
                        LUMINA 빌딩 8층
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        운영시간
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        평일: 09:00 - 18:00
                        <br />
                        토요일: 09:00 - 15:00
                        <br />
                        일요일/공휴일: 휴무
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 빠른 문의 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">빠른 문의</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    주문 확인 및 변경
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    배송 조회
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    교환/반품 신청
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    사이즈 문의
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
