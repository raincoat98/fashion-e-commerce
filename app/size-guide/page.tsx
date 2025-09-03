"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Ruler,
  Shirt,
  ShoppingBag,
  Package,
  Footprints,
  Info,
  CheckCircle,
} from "lucide-react";
import { useStore } from "@/stores/useStore";

export default function SizeGuidePage() {
  const { selectedSizeCategory, setSelectedSizeCategory, sizeData } =
    useStore();

  const sizeCategories = [
    { id: "top", name: "상의", icon: Shirt },
    { id: "dress", name: "원피스", icon: ShoppingBag },
    { id: "bottom", name: "하의", icon: Package },
    { id: "shoes", name: "신발", icon: Footprints },
  ];

  const measurementGuide = [
    {
      title: "가슴둘레",
      description: "겨드랑이 아래 가장 넓은 부분을 수평으로 측정",
      tip: "너무 조이거나 느슨하지 않게 적당히 측정하세요.",
    },
    {
      title: "허리둘레",
      description: "허리의 가장 얇은 부분을 수평으로 측정",
      tip: "자연스럽게 서서 측정하세요.",
    },
    {
      title: "힙둘레",
      description: "엉덩이의 가장 넓은 부분을 수평으로 측정",
      tip: "바지나 치마를 입을 위치를 기준으로 측정하세요.",
    },
    {
      title: "어깨너비",
      description: "한쪽 어깨 끝에서 다른 쪽 어깨 끝까지 측정",
      tip: "팔을 자연스럽게 내린 상태에서 측정하세요.",
    },
    {
      title: "소매길이",
      description: "어깨 끝에서 손목까지 측정",
      tip: "팔을 자연스럽게 편 상태에서 측정하세요.",
    },
    {
      title: "총장",
      description: "어깨 끝에서 원하는 길이까지 측정",
      tip: "상의의 경우 허리선, 원피스의 경우 무릎 정도를 기준으로 하세요.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              사이즈 가이드
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              정확한 사이즈 선택을 위해 신체 치수를 측정해보세요. 완벽한 핏을
              위한 사이즈 가이드입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 사이즈 차트 */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    사이즈 차트
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={selectedSizeCategory}
                    onValueChange={setSelectedSizeCategory}
                  >
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                      {sizeCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <TabsTrigger
                            key={category.id}
                            value={category.id}
                            className="flex items-center space-x-2"
                          >
                            <Icon className="w-4 h-4" />
                            <span>{category.name}</span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>

                    {sizeCategories.map((category) => {
                      const data =
                        sizeData[category.id as keyof typeof sizeData];
                      return (
                        <TabsContent key={category.id} value={category.id}>
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {data.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                {data.description}
                              </p>
                            </div>

                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                                <thead>
                                  <tr className="bg-gray-50 dark:bg-gray-800">
                                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold dark:text-gray-100">
                                      사이즈
                                    </th>
                                    {data.measurements.map((measurement) => (
                                      <th
                                        key={measurement}
                                        className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold dark:text-gray-100"
                                      >
                                        {measurement}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.sizes.map((size, index) => (
                                    <tr
                                      key={index}
                                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-medium dark:text-gray-100">
                                        <Badge variant="outline">
                                          {size.size}
                                        </Badge>
                                      </td>
                                      {data.measurements.map((measurement) => {
                                        const key =
                                          measurement === "가슴둘레"
                                            ? "chest"
                                            : measurement === "어깨너비"
                                            ? "shoulder"
                                            : measurement === "소매길이"
                                            ? "sleeve"
                                            : measurement === "총장"
                                            ? "length"
                                            : measurement === "허리둘레"
                                            ? "waist"
                                            : measurement === "힙둘레"
                                            ? "hip"
                                            : measurement === "밑위길이"
                                            ? "rise"
                                            : measurement === "발길이"
                                            ? "length"
                                            : measurement === "발볼"
                                            ? "width"
                                            : measurement === "한국사이즈"
                                            ? "kr"
                                            : measurement === "미국사이즈"
                                            ? "us"
                                            : measurement === "유럽사이즈"
                                            ? "eu"
                                            : "";
                                        return (
                                          <td
                                            key={measurement}
                                            className="border border-gray-200 dark:border-gray-700 px-4 py-3 dark:text-gray-100"
                                          >
                                            {size[key as keyof typeof size]}
                                          </td>
                                        );
                                      })}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </TabsContent>
                      );
                    })}
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* 측정 가이드 */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Ruler className="w-5 h-5 mr-2" />
                    측정 방법
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {measurementGuide.map((guide, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-yellow-400 pl-4"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {guide.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {guide.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {guide.tip}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 사이즈 추천 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    사이즈 추천
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                          정확한 사이즈 선택 팁
                        </h4>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                          <li>• 평소 입는 옷의 사이즈를 참고하세요</li>
                          <li>• 브랜드마다 사이즈가 다를 수 있어요</li>
                          <li>• 의류 소재에 따라 핏이 달라질 수 있어요</li>
                          <li>• 불확실할 때는 한 사이즈 크게 선택하세요</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full lumina-gradient text-white">
                    사이즈 추천 받기
                  </Button>
                </CardContent>
              </Card>

              {/* 빠른 링크 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    도움이 필요하세요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    사이즈 문의하기
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    교환/반품 안내
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    고객센터 문의
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
