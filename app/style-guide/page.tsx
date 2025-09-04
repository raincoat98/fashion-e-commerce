"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Ruler,
  Palette,
  Shirt,
  Sparkles,
  Heart,
  Star,
  Users,
  TrendingUp,
  CheckCircle,
  Info,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react";

export default function StyleGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const styleCategories = [
    { id: "all", name: "전체", icon: Sparkles },
    { id: "casual", name: "캐주얼", icon: Shirt },
    { id: "formal", name: "포멀", icon: Star },
    { id: "street", name: "스트리트", icon: Zap },
    { id: "minimal", name: "미니멀", icon: Target },
  ];

  const colorPalettes = [
    {
      name: "클래식 네이비",
      colors: ["#1e3a8a", "#3b82f6", "#60a5fa", "#93c5fd"],
      description: "신뢰감과 전문성을 주는 클래식한 컬러",
      bestFor: ["비즈니스", "포멀", "데일리"],
    },
    {
      name: "워밍 베이지",
      colors: ["#92400e", "#d97706", "#f59e0b", "#fbbf24"],
      description: "따뜻하고 우아한 느낌의 뉴트럴 톤",
      bestFor: ["캐주얼", "데이트", "여행"],
    },
    {
      name: "소프트 파스텔",
      colors: ["#ec4899", "#f472b6", "#f9a8d4", "#fce7f3"],
      description: "부드럽고 로맨틱한 여성스러운 컬러",
      bestFor: ["데이트", "파티", "봄/여름"],
    },
    {
      name: "모던 그레이",
      colors: ["#374151", "#6b7280", "#9ca3af", "#d1d5db"],
      description: "세련되고 모던한 느낌의 그레이 톤",
      bestFor: ["미니멀", "스트리트", "데일리"],
    },
  ];

  const stylingTips = [
    {
      category: "기본 원칙",
      tips: [
        {
          title: "3:2:1 룰",
          description:
            "상의 3개, 하의 2개, 신발 1개로 조합하여 다양한 스타일을 연출하세요.",
          icon: Target,
        },
        {
          title: "컬러 밸런스",
          description: "전체 의상에서 3가지 이상의 색상을 사용하지 마세요.",
          icon: Palette,
        },
        {
          title: "비율 조절",
          description: "상의와 하의의 길이 비율을 1:2 또는 2:1로 맞춰주세요.",
          icon: Ruler,
        },
      ],
    },
    {
      category: "체형별 스타일링",
      tips: [
        {
          title: "슬림 체형",
          description: "레이어링과 볼륨감 있는 아이템으로 균형을 맞춰주세요.",
          icon: Users,
        },
        {
          title: "어깨 넓은 체형",
          description: "V넥이나 딥넥으로 시선을 아래로 유도하세요.",
          icon: Users,
        },
        {
          title: "허리 굵은 체형",
          description: "하이웨이스트 팬츠와 벨트로 허리라인을 강조하세요.",
          icon: Users,
        },
      ],
    },
    {
      category: "상황별 스타일링",
      tips: [
        {
          title: "비즈니스 미팅",
          description:
            "네이비나 차콜 톤의 정장에 깔끔한 액세서리로 마무리하세요.",
          icon: Star,
        },
        {
          title: "데이트",
          description: "부드러운 컬러와 텍스처로 로맨틱한 느낌을 연출하세요.",
          icon: Heart,
        },
        {
          title: "여행",
          description: "편안하면서도 스타일리시한 레이어링을 활용하세요.",
          icon: Zap,
        },
      ],
    },
  ];

  const seasonalStyles = [
    {
      season: "봄",
      colors: ["#fef3c7", "#fde68a", "#f59e0b", "#d97706"],
      items: ["트렌치코트", "라이트 니트", "데님 재킷", "화이트 스니커즈"],
      description: "밝고 상쾌한 컬러로 새로운 시작을 표현하세요.",
    },
    {
      season: "여름",
      colors: ["#dbeafe", "#93c5fd", "#3b82f6", "#1e40af"],
      items: ["린넨 셔츠", "쇼트 팬츠", "샌들", "선글라스"],
      description: "시원하고 가벼운 소재로 여름을 시원하게 보내세요.",
    },
    {
      season: "가을",
      colors: ["#fef3c7", "#f59e0b", "#d97706", "#92400e"],
      items: ["가디건", "부츠", "스카프", "가죽 재킷"],
      description: "따뜻한 톤과 레이어링으로 가을의 깊이를 표현하세요.",
    },
    {
      season: "겨울",
      colors: ["#f3f4f6", "#9ca3af", "#4b5563", "#1f2937"],
      items: ["코트", "니트", "부츠", "장갑"],
      description: "따뜻하고 세련된 아이템으로 겨울을 스타일리시하게 보내세요.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 lumina-text-gradient">
              스타일 가이드
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 word-break-keep">
              당신만의 완벽한 스타일을 찾아보세요. LUMINA가 제안하는
              <br />
              세련된 패션 가이드와 스타일링 팁을 확인하세요.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                전문가 추천
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Users className="w-4 h-4 mr-2" />
                체형별 가이드
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                트렌드 반영
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="color" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="color" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>컬러 가이드</span>
            </TabsTrigger>
            <TabsTrigger
              value="styling"
              className="flex items-center space-x-2"
            >
              <Lightbulb className="w-4 h-4" />
              <span>스타일링 팁</span>
            </TabsTrigger>
            <TabsTrigger
              value="seasonal"
              className="flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>계절별 스타일</span>
            </TabsTrigger>
            <TabsTrigger value="body" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>체형별 가이드</span>
            </TabsTrigger>
          </TabsList>

          {/* 컬러 가이드 */}
          <TabsContent value="color" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                컬러 가이드
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto word-break-keep">
                상황과 개성에 맞는 완벽한 컬러 조합을 찾아보세요. 각 컬러의
                특성과 활용법을 알아보세요.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {colorPalettes.map((palette, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: palette.colors[0] }}
                      />
                      <span>{palette.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      {palette.colors.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-12 h-12 rounded-lg shadow-sm border-2 border-white dark:border-gray-800"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {palette.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {palette.bestFor.map((use, useIndex) => (
                        <Badge
                          key={useIndex}
                          variant="outline"
                          className="text-xs"
                        >
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 스타일링 팁 */}
          <TabsContent value="styling" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                스타일링 팁
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto word-break-keep">
                전문가가 추천하는 실용적인 스타일링 팁으로 완벽한 룩을
                완성하세요.
              </p>
            </div>

            <div className="space-y-12">
              {stylingTips.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.tips.map((tip, tipIndex) => (
                      <Card
                        key={tipIndex}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              <tip.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {tip.title}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400 text-sm word-break-keep">
                                {tip.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* 계절별 스타일 */}
          <TabsContent value="seasonal" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                계절별 스타일
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto word-break-keep">
                계절의 특성을 살린 완벽한 스타일링으로 언제나 세련된 모습을
                유지하세요.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {seasonalStyles.map((season, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl">{season.season}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex space-x-2">
                      {season.colors.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-8 h-8 rounded-full shadow-sm border-2 border-white dark:border-gray-800"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {season.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        추천 아이템
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {season.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 체형별 가이드 */}
          <TabsContent value="body" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                체형별 가이드
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto word-break-keep">
                당신의 체형에 맞는 완벽한 스타일링으로 자신감 넘치는 모습을
                연출하세요.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  type: "슬림 체형",
                  description: "마른 체형으로 볼륨감이 부족한 경우",
                  tips: [
                    "레이어링으로 볼륨감 연출",
                    "패턴이나 텍스처 활용",
                    "벨트로 허리라인 강조",
                    "부츠나 힐로 하체 볼륨감",
                  ],
                  avoid: ["너무 타이트한 옷", "단조로운 실루엣"],
                  color: "blue",
                },
                {
                  type: "어깨 넓은 체형",
                  description: "어깨가 넓어 상체가 부각되는 경우",
                  tips: [
                    "V넥이나 딥넥 활용",
                    "하체 볼륨감 있는 아이템",
                    "어깨라인을 가리는 재킷",
                    "A라인 스커트나 팬츠",
                  ],
                  avoid: ["패딩이나 볼륨 소재", "어깨 강조 디자인"],
                  color: "green",
                },
                {
                  type: "허리 굵은 체형",
                  description: "허리 부분이 두꺼워 보이는 경우",
                  tips: [
                    "하이웨이스트 팬츠",
                    "벨트로 허리라인 강조",
                    "A라인이나 플레어 실루엣",
                    "상의는 허리 아래로 내려오는 길이",
                  ],
                  avoid: ["허리 강조 디자인", "너무 타이트한 옷"],
                  color: "purple",
                },
                {
                  type: "하체 굵은 체형",
                  description: "하체가 상체보다 굵어 보이는 경우",
                  tips: [
                    "상의는 밝은 색상",
                    "하의는 어두운 색상",
                    "A라인 스커트나 팬츠",
                    "상의에 포인트 주기",
                  ],
                  avoid: ["하체 강조 디자인", "너무 타이트한 하의"],
                  color: "orange",
                },
                {
                  type: "통통한 체형",
                  description: "전체적으로 둥글고 볼륨감 있는 체형",
                  tips: [
                    "수직 라인 활용",
                    "단색이나 미니멀한 패턴",
                    "적당한 핏의 옷",
                    "V넥이나 딥넥 활용",
                  ],
                  avoid: ["너무 큰 패턴", "수평 라인"],
                  color: "red",
                },
                {
                  type: "키 작은 체형",
                  description: "전체적으로 작고 아담한 체형",
                  tips: [
                    "하이웨이스트 아이템",
                    "수직 라인 활용",
                    "단색 조합",
                    "적당한 길이의 옷",
                  ],
                  avoid: ["너무 긴 옷", "복잡한 패턴"],
                  color: "indigo",
                },
              ].map((bodyType, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>{bodyType.type}</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {bodyType.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        추천 스타일
                      </h4>
                      <ul className="space-y-1">
                        {bodyType.tips.map((tip, tipIndex) => (
                          <li
                            key={tipIndex}
                            className="text-sm text-gray-600 dark:text-gray-400"
                          >
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                        <Info className="w-4 h-4 text-orange-500 mr-2" />
                        피해야 할 스타일
                      </h4>
                      <ul className="space-y-1">
                        {bodyType.avoid.map((avoid, avoidIndex) => (
                          <li
                            key={avoidIndex}
                            className="text-sm text-gray-600 dark:text-gray-400"
                          >
                            • {avoid}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                지금 바로 스타일링을 시작해보세요
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto word-break-keep">
                LUMINA의 다양한 컬렉션에서 당신만의 완벽한 스타일을 찾아보세요.
                전문가가 추천하는 아이템들로 더욱 세련된 모습을 연출하세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="lumina-gradient hover:opacity-90">
                  <Shirt className="w-5 h-5 mr-2" />
                  컬렉션 보러가기
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  위시리스트 보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
