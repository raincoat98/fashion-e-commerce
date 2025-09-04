"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
  Mail,
} from "lucide-react";
import { useStore } from "@/stores/useStore";

export default function ShippingPage() {
  const {
    selectedShippingTab,
    setSelectedShippingTab,
    shippingMethods,
    deliveryAreas,
  } = useStore();

  const [isScrolling, setIsScrolling] = useState(false);

  // 스크롤 성능 최적화
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const deliveryProcess = [
    {
      step: 1,
      title: "주문 접수",
      description: "주문이 성공적으로 접수됩니다",
      time: "즉시",
      icon: CheckCircle,
    },
    {
      step: 2,
      title: "결제 확인",
      description: "결제가 완료되면 주문이 확정됩니다",
      time: "1-2시간",
      icon: CreditCard,
    },
    {
      step: 3,
      title: "상품 준비",
      description: "상품을 포장하고 출고 준비를 합니다",
      time: "1-2일",
      icon: Package,
    },
    {
      step: 4,
      title: "배송 시작",
      description: "택배업체에 상품을 인계합니다",
      time: "출고 당일",
      icon: Truck,
    },
    {
      step: 5,
      title: "배송 완료",
      description: "고객님께 상품이 전달됩니다",
      time: "2-3일",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="py-6 sm:py-12">
        <div className="container mx-auto px-3 sm:px-4">
          {/* 헤더 */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              배송 안내
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              빠르고 안전한 배송 서비스로 고객님께 만족스러운 쇼핑 경험을
              제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* 배송 방법 */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl sm:text-2xl font-bold">
                    배송 방법
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={selectedShippingTab}
                    onValueChange={setSelectedShippingTab}
                  >
                    <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 h-auto touch-manipulation">
                      {shippingMethods.map((method) => {
                        const getIcon = (id: string) => {
                          switch (id) {
                            case "standard":
                              return Truck;
                            case "express":
                              return Clock;
                            case "premium":
                              return Shield;
                            default:
                              return Package;
                          }
                        };
                        const Icon = getIcon(method.id);
                        return (
                          <TabsTrigger
                            key={method.id}
                            value={method.id}
                            className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 sm:p-3 text-xs sm:text-sm touch-manipulation min-h-[44px] sm:min-h-auto"
                          >
                            <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">
                              {method.name}
                            </span>
                            <span className="sm:hidden text-xs">
                              {method.name.split(" ")[0]}
                            </span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>

                    {shippingMethods.map((method) => {
                      const getIcon = (id: string) => {
                        switch (id) {
                          case "standard":
                            return Truck;
                          case "express":
                            return Clock;
                          case "premium":
                            return Shield;
                          default:
                            return Package;
                        }
                      };
                      const Icon = getIcon(method.id);
                      return (
                        <TabsContent key={method.id} value={method.id}>
                          <div className="space-y-4 sm:space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                              </div>
                              <div className="text-center sm:text-left">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                  {method.name}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                  {method.description}
                                </p>
                                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
                                  <Badge
                                    variant="outline"
                                    className="flex items-center justify-center sm:justify-start space-x-1 text-xs sm:text-sm"
                                  >
                                    <Clock className="w-3 h-3" />
                                    <span>{method.deliveryTime}</span>
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="flex items-center justify-center sm:justify-start space-x-1 text-xs sm:text-sm"
                                  >
                                    <CreditCard className="w-3 h-3" />
                                    <span>{method.price}</span>
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="flex items-center justify-center sm:justify-start space-x-1 text-xs sm:text-sm"
                                  >
                                    <Shield className="w-3 h-3" />
                                    <span>
                                      {method.freeThreshold} 이상 무료
                                    </span>
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                              <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-3">
                                서비스 특징
                              </h4>
                              <ul className="space-y-2">
                                {method.features.map((feature, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start space-x-2"
                                  >
                                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                      {feature}
                                    </span>
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
              <Card className="mt-6 sm:mt-8">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl font-bold">
                    지역별 배송 소요시간
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* 모바일 카드 뷰 */}
                  <div className="block sm:hidden space-y-3">
                    {deliveryAreas.map((area, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {area.region}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              일반 배송
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {area.standard}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              빠른 배송
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {area.express}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              프리미엄 배송
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {area.premium}
                            </Badge>
                          </div>
                          {area.note && (
                            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {area.note}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 데스크톱 테이블 뷰 */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold dark:text-gray-100">
                            지역
                          </th>
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold dark:text-gray-100">
                            일반 배송
                          </th>
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold dark:text-gray-100">
                            빠른 배송
                          </th>
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold dark:text-gray-100">
                            프리미엄 배송
                          </th>
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold dark:text-gray-100">
                            비고
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {deliveryAreas.map((area, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-medium dark:text-gray-100">
                              {area.region}
                            </td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">
                              <Badge variant="outline">{area.standard}</Badge>
                            </td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">
                              <Badge variant="outline">{area.express}</Badge>
                            </td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">
                              <Badge variant="outline">{area.premium}</Badge>
                            </td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
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
            <div className="space-y-4 sm:space-y-6">
              {/* 배송 프로세스 */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl font-bold">
                    배송 프로세스
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {deliveryProcess.map((process, index) => {
                    const Icon = process.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs sm:text-sm font-semibold text-yellow-600">
                            {process.step}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                            <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                              {process.title}
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {process.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {process.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* 배송 추적 */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl font-bold">
                    배송 추적
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Search className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-blue-900 dark:text-blue-100 mb-1">
                          배송 조회 방법
                        </h4>
                        <ul className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 space-y-1">
                          <li>• 마이페이지 &gt; 주문내역에서 조회</li>
                          <li>• 송장번호로 직접 조회</li>
                          <li>• 고객센터로 문의</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full lumina-gradient text-white text-sm sm:text-base py-2 sm:py-3 touch-manipulation min-h-[44px]">
                    배송 조회하기
                  </Button>
                </CardContent>
              </Card>

              {/* 주의사항 */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl font-bold">
                    배송 주의사항
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      부재 시 2회 재시도 후 고객센터로 연락
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      제주도 및 도서산간 추가 배송비 발생
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      공휴일 및 주말은 배송 제외
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      오후 2시 이후 주문은 다음날 출고
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* 고객센터 */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl font-bold">
                    배송 문의
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm sm:text-base py-2 sm:py-3 touch-manipulation min-h-[44px]"
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    1588-1234
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm sm:text-base py-2 sm:py-3 touch-manipulation min-h-[44px]"
                  >
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    cs@lumina.com
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm sm:text-base py-2 sm:py-3 touch-manipulation min-h-[44px]"
                  >
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    문의하기
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
