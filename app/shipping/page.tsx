"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  Clock, 
  MapPin, 
  Package, 
  CreditCard, 
  Shield, 
  AlertCircle, 
  CheckCircle,
  Search,
  Phone,
  Mail
} from "lucide-react";

export default function ShippingPage() {
  const shippingMethods = [
    {
      id: "standard",
      name: "일반 배송",
      description: "가장 일반적인 배송 방법",
      price: "3,000원",
      freeThreshold: "30,000원",
      deliveryTime: "2-3일",
      icon: Truck,
      features: [
        "결제 완료 후 1-2일 내 출고",
        "배송 완료까지 2-3일 소요",
        "제주도 및 도서산간 추가 1-2일",
        "부재 시 2회 재시도"
      ]
    },
    {
      id: "express",
      name: "빠른 배송",
      description: "다음날 배송 서비스",
      price: "5,000원",
      freeThreshold: "50,000원",
      deliveryTime: "1일",
      icon: Package,
      features: [
        "오후 2시 이전 주문 시 당일 출고",
        "다음날 오전 배송 완료",
        "서울/경기 지역 한정",
        "부재 시 편의점 보관"
      ]
    },
    {
      id: "premium",
      name: "프리미엄 배송",
      description: "특별한 서비스와 함께",
      price: "10,000원",
      freeThreshold: "100,000원",
      deliveryTime: "1일",
      icon: Shield,
      features: [
        "전국 어디든 1일 배송",
        "전화 예약 배송",
        "부재 시 재방문 서비스",
        "포장 상태 확인 서비스"
      ]
    }
  ];

  const deliveryAreas = [
    {
      region: "서울/경기",
      standard: "1-2일",
      express: "1일",
      premium: "1일",
      note: "가장 빠른 배송"
    },
    {
      region: "인천/강원",
      standard: "2-3일",
      express: "1-2일",
      premium: "1일",
      note: "일반적인 배송"
    },
    {
      region: "충청/전라",
      standard: "2-3일",
      express: "2일",
      premium: "1일",
      note: "안정적인 배송"
    },
    {
      region: "경상/부산",
      standard: "2-3일",
      express: "2일",
      premium: "1일",
      note: "안정적인 배송"
    },
    {
      region: "제주도",
      standard: "3-4일",
      express: "2-3일",
      premium: "1일",
      note: "추가 배송비 발생"
    },
    {
      region: "도서산간",
      standard: "3-5일",
      express: "2-3일",
      premium: "1일",
      note: "추가 배송비 발생"
    }
  ];

  const deliveryProcess = [
    {
      step: 1,
      title: "주문 접수",
      description: "주문이 성공적으로 접수됩니다",
      time: "즉시",
      icon: CheckCircle
    },
    {
      step: 2,
      title: "결제 확인",
      description: "결제가 완료되면 주문이 확정됩니다",
      time: "1-2시간",
      icon: CreditCard
    },
    {
      step: 3,
      title: "상품 준비",
      description: "상품을 포장하고 출고 준비를 합니다",
      time: "1-2일",
      icon: Package
    },
    {
      step: 4,
      title: "배송 시작",
      description: "택배업체에 상품을 인계합니다",
      time: "출고 당일",
      icon: Truck
    },
    {
      step: 5,
      title: "배송 완료",
      description: "고객님께 상품이 전달됩니다",
      time: "2-3일",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">배송 안내</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            빠르고 안전한 배송 서비스로 고객님께 만족스러운 쇼핑 경험을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 배송 방법 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">배송 방법</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="standard">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    {shippingMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <TabsTrigger key={method.id} value={method.id} className="flex items-center space-x-2">
                          <Icon className="w-4 h-4" />
                          <span>{method.name}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {shippingMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <TabsContent key={method.id} value={method.id}>
                        <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {method.name}
                              </h3>
                              <p className="text-gray-600 mb-4">{method.description}</p>
                              <div className="flex flex-wrap gap-4">
                                <Badge variant="outline" className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{method.deliveryTime}</span>
                                </Badge>
                                <Badge variant="outline" className="flex items-center space-x-1">
                                  <CreditCard className="w-3 h-3" />
                                  <span>{method.price}</span>
                                </Badge>
                                <Badge variant="outline" className="flex items-center space-x-1">
                                  <Shield className="w-3 h-3" />
                                  <span>{method.freeThreshold} 이상 무료</span>
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-3">서비스 특징</h4>
                            <ul className="space-y-2">
                              {method.features.map((feature, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </CardContent>
            </Card>

            {/* 배송 지역별 소요시간 */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold">지역별 배송 소요시간</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">지역</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">일반 배송</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">빠른 배송</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">프리미엄 배송</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveryAreas.map((area, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-3 font-medium">
                            {area.region}
                          </td>
                          <td className="border border-gray-200 px-4 py-3">
                            <Badge variant="outline">{area.standard}</Badge>
                          </td>
                          <td className="border border-gray-200 px-4 py-3">
                            <Badge variant="outline">{area.express}</Badge>
                          </td>
                          <td className="border border-gray-200 px-4 py-3">
                            <Badge variant="outline">{area.premium}</Badge>
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                            {area.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 배송 프로세스 및 기타 정보 */}
          <div className="space-y-6">
            {/* 배송 프로세스 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">배송 프로세스</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {deliveryProcess.map((process, index) => {
                  const Icon = process.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-yellow-600">{process.step}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Icon className="w-4 h-4 text-green-500" />
                          <h4 className="font-semibold text-gray-900">{process.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{process.description}</p>
                        <p className="text-xs text-gray-500">{process.time}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* 배송 추적 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">배송 추적</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Search className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">배송 조회 방법</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• 마이페이지 > 주문내역에서 조회</li>
                        <li>• 송장번호로 직접 조회</li>
                        <li>• 고객센터로 문의</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button className="w-full lumina-gradient text-white">
                  배송 조회하기
                </Button>
              </CardContent>
            </Card>

            {/* 주의사항 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">배송 주의사항</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">부재 시 2회 재시도 후 고객센터로 연락</span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">제주도 및 도서산간 추가 배송비 발생</span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">공휴일 및 주말은 배송 제외</span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">오후 2시 이후 주문은 다음날 출고</span>
                </div>
              </CardContent>
            </Card>

            {/* 고객센터 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">배송 문의</CardTitle>
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
                  <MapPin className="w-4 h-4 mr-2" />
                  문의하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
