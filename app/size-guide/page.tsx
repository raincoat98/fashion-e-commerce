"use client";

import React, { useState } from "react";
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

export default function SizeGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState("top");

  const sizeCategories = [
    { id: "top", name: "상의", icon: Shirt },
    { id: "dress", name: "원피스", icon: ShoppingBag },
    { id: "bottom", name: "하의", icon: Package },
    { id: "shoes", name: "신발", icon: Footprints },
  ];

  const sizeData = {
    top: {
      title: "상의 사이즈 가이드",
      description:
        "가슴둘레, 어깨너비, 소매길이를 기준으로 사이즈를 선택하세요.",
      measurements: ["가슴둘레", "어깨너비", "소매길이", "총장"],
      sizes: [
        {
          size: "XS",
          chest: "82-86",
          shoulder: "34-36",
          sleeve: "58-60",
          length: "58-62",
        },
        {
          size: "S",
          chest: "86-90",
          shoulder: "36-38",
          sleeve: "60-62",
          length: "60-64",
        },
        {
          size: "M",
          chest: "90-94",
          shoulder: "38-40",
          sleeve: "62-64",
          length: "62-66",
        },
        {
          size: "L",
          chest: "94-98",
          shoulder: "40-42",
          sleeve: "64-66",
          length: "64-68",
        },
        {
          size: "XL",
          chest: "98-102",
          shoulder: "42-44",
          sleeve: "66-68",
          length: "66-70",
        },
        {
          size: "XXL",
          chest: "102-106",
          shoulder: "44-46",
          sleeve: "68-70",
          length: "68-72",
        },
      ],
    },
    dress: {
      title: "원피스 사이즈 가이드",
      description: "가슴둘레, 허리둘레, 힙둘레를 기준으로 사이즈를 선택하세요.",
      measurements: ["가슴둘레", "허리둘레", "힙둘레", "총장"],
      sizes: [
        {
          size: "XS",
          chest: "82-86",
          waist: "62-66",
          hip: "86-90",
          length: "85-90",
        },
        {
          size: "S",
          chest: "86-90",
          waist: "66-70",
          hip: "90-94",
          length: "87-92",
        },
        {
          size: "M",
          chest: "90-94",
          waist: "70-74",
          hip: "94-98",
          length: "89-94",
        },
        {
          size: "L",
          chest: "94-98",
          waist: "74-78",
          hip: "98-102",
          length: "91-96",
        },
        {
          size: "XL",
          chest: "98-102",
          waist: "78-82",
          hip: "102-106",
          length: "93-98",
        },
        {
          size: "XXL",
          chest: "102-106",
          waist: "82-86",
          hip: "106-110",
          length: "95-100",
        },
      ],
    },
    bottom: {
      title: "하의 사이즈 가이드",
      description: "허리둘레, 힙둘레, 밑위길이를 기준으로 사이즈를 선택하세요.",
      measurements: ["허리둘레", "힙둘레", "밑위길이", "총장"],
      sizes: [
        {
          size: "XS",
          waist: "62-66",
          hip: "86-90",
          rise: "22-24",
          length: "95-100",
        },
        {
          size: "S",
          waist: "66-70",
          hip: "90-94",
          rise: "23-25",
          length: "97-102",
        },
        {
          size: "M",
          waist: "70-74",
          hip: "94-98",
          rise: "24-26",
          length: "99-104",
        },
        {
          size: "L",
          waist: "74-78",
          hip: "98-102",
          rise: "25-27",
          length: "101-106",
        },
        {
          size: "XL",
          waist: "78-82",
          hip: "102-106",
          rise: "26-28",
          length: "103-108",
        },
        {
          size: "XXL",
          waist: "82-86",
          hip: "106-110",
          rise: "27-29",
          length: "105-110",
        },
      ],
    },
    shoes: {
      title: "신발 사이즈 가이드",
      description: "발길이를 기준으로 사이즈를 선택하세요.",
      measurements: [
        "발길이",
        "발볼",
        "한국사이즈",
        "미국사이즈",
        "유럽사이즈",
      ],
      sizes: [
        {
          size: "220",
          length: "220",
          width: "D",
          kr: "220",
          us: "5",
          eu: "36",
        },
        {
          size: "225",
          length: "225",
          width: "D",
          kr: "225",
          us: "5.5",
          eu: "37",
        },
        {
          size: "230",
          length: "230",
          width: "D",
          kr: "230",
          us: "6",
          eu: "38",
        },
        {
          size: "235",
          length: "235",
          width: "D",
          kr: "235",
          us: "6.5",
          eu: "39",
        },
        {
          size: "240",
          length: "240",
          width: "D",
          kr: "240",
          us: "7",
          eu: "40",
        },
        {
          size: "245",
          length: "245",
          width: "D",
          kr: "245",
          us: "7.5",
          eu: "41",
        },
        {
          size: "250",
          length: "250",
          width: "D",
          kr: "250",
          us: "8",
          eu: "42",
        },
      ],
    },
  };

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            사이즈 가이드
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            정확한 사이즈 선택을 위해 신체 치수를 측정해보세요. 완벽한 핏을 위한
            사이즈 가이드입니다.
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
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
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
                    const data = sizeData[category.id as keyof typeof sizeData];
                    return (
                      <TabsContent key={category.id} value={category.id}>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {data.title}
                            </h3>
                            <p className="text-gray-600">{data.description}</p>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                                    사이즈
                                  </th>
                                  {data.measurements.map((measurement) => (
                                    <th
                                      key={measurement}
                                      className="border border-gray-200 px-4 py-3 text-left font-semibold"
                                    >
                                      {measurement}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {data.sizes.map((size, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-200 px-4 py-3 font-medium">
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
                                          className="border border-gray-200 px-4 py-3"
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
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {guide.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      {guide.description}
                    </p>
                    <p className="text-xs text-gray-500">{guide.tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 사이즈 추천 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">사이즈 추천</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">
                        정확한 사이즈 선택 팁
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
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
  );
}
