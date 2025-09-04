"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LookbookGrid from "@/components/lookbook/LookbookGrid";
import LookbookFilter from "@/components/lookbook/LookbookFilter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Eye } from "lucide-react";

// 룩북 데이터 타입 정의
export interface LookbookItem {
  id: string;
  title: string;
  description: string;
  season: string;
  category: string;
  tags: string[];
  images: {
    main: string;
    thumbnails: string[];
  };
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  }[];
  likes: number;
  views: number;
  createdAt: string;
  featured: boolean;
}

// 샘플 룩북 데이터
const lookbookData: LookbookItem[] = [
  {
    id: "1",
    title: "봄의 시작",
    description: "따뜻한 봄날을 위한 세련된 스타일링",
    season: "봄",
    category: "캐주얼",
    tags: ["봄", "캐주얼", "데일리"],
    images: {
      main: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnails: [
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1043472/pexels-photo-1043472.jpeg?auto=compress&cs=tinysrgb&w=400",
      ],
    },
    products: [
      {
        id: "p1",
        name: "봄 코튼 블라우스",
        price: 89000,
        image:
          "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "상의",
      },
      {
        id: "p2",
        name: "데님 스커트",
        price: 129000,
        image:
          "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "하의",
      },
    ],
    likes: 245,
    views: 1200,
    createdAt: "2024-03-15",
    featured: true,
  },
  {
    id: "2",
    title: "오피스 룩",
    description: "프로페셔널한 비즈니스 스타일",
    season: "사계절",
    category: "비즈니스",
    tags: ["오피스", "비즈니스", "프로페셔널"],
    images: {
      main: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnails: [
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1043470/pexels-photo-1043470.jpeg?auto=compress&cs=tinysrgb&w=400",
      ],
    },
    products: [
      {
        id: "p3",
        name: "블레이저",
        price: 199000,
        image:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "아우터",
      },
      {
        id: "p4",
        name: "슬랙스",
        price: 159000,
        image:
          "https://images.pexels.com/photos/1043470/pexels-photo-1043470.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "하의",
      },
    ],
    likes: 189,
    views: 890,
    createdAt: "2024-03-10",
    featured: false,
  },
  {
    id: "3",
    title: "데이트 룩",
    description: "로맨틱한 데이트를 위한 우아한 스타일",
    season: "사계절",
    category: "데이트",
    tags: ["데이트", "로맨틱", "우아함"],
    images: {
      main: "https://images.pexels.com/photos/1043469/pexels-photo-1043469.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnails: [
        "https://images.pexels.com/photos/1043469/pexels-photo-1043469.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1043468/pexels-photo-1043468.jpeg?auto=compress&cs=tinysrgb&w=400",
      ],
    },
    products: [
      {
        id: "p5",
        name: "플로럴 드레스",
        price: 179000,
        image:
          "https://images.pexels.com/photos/1043469/pexels-photo-1043469.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "원피스",
      },
      {
        id: "p6",
        name: "힐",
        price: 129000,
        image:
          "https://images.pexels.com/photos/1043468/pexels-photo-1043468.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "신발",
      },
    ],
    likes: 312,
    views: 1560,
    createdAt: "2024-03-08",
    featured: true,
  },
  {
    id: "4",
    title: "캐주얼 데이",
    description: "편안한 주말을 위한 캐주얼 스타일",
    season: "사계절",
    category: "캐주얼",
    tags: ["캐주얼", "편안함", "주말"],
    images: {
      main: "https://images.pexels.com/photos/1043467/pexels-photo-1043467.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnails: [
        "https://images.pexels.com/photos/1043467/pexels-photo-1043467.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1043466/pexels-photo-1043466.jpeg?auto=compress&cs=tinysrgb&w=400",
      ],
    },
    products: [
      {
        id: "p7",
        name: "후드티",
        price: 69000,
        image:
          "https://images.pexels.com/photos/1043467/pexels-photo-1043467.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "상의",
      },
      {
        id: "p8",
        name: "데님 팬츠",
        price: 119000,
        image:
          "https://images.pexels.com/photos/1043466/pexels-photo-1043466.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "하의",
      },
    ],
    likes: 156,
    views: 780,
    createdAt: "2024-03-05",
    featured: false,
  },
  {
    id: "5",
    title: "여름 바캉스",
    description: "시원한 여름 휴가를 위한 스타일",
    season: "여름",
    category: "휴가",
    tags: ["여름", "휴가", "시원함"],
    images: {
      main: "https://images.pexels.com/photos/1043465/pexels-photo-1043465.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnails: [
        "https://images.pexels.com/photos/1043465/pexels-photo-1043465.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1043464/pexels-photo-1043464.jpeg?auto=compress&cs=tinysrgb&w=400",
      ],
    },
    products: [
      {
        id: "p9",
        name: "린넨 셔츠",
        price: 99000,
        image:
          "https://images.pexels.com/photos/1043465/pexels-photo-1043465.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "상의",
      },
      {
        id: "p10",
        name: "쇼트 팬츠",
        price: 79000,
        image:
          "https://images.pexels.com/photos/1043464/pexels-photo-1043464.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "하의",
      },
    ],
    likes: 278,
    views: 1340,
    createdAt: "2024-03-01",
    featured: true,
  },
  {
    id: "6",
    title: "겨울 아웃핏",
    description: "따뜻하고 스타일리시한 겨울 룩",
    season: "겨울",
    category: "아우터",
    tags: ["겨울", "따뜻함", "아우터"],
    images: {
      main: "https://images.pexels.com/photos/1043463/pexels-photo-1043463.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnails: [
        "https://images.pexels.com/photos/1043463/pexels-photo-1043463.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1043462/pexels-photo-1043462.jpeg?auto=compress&cs=tinysrgb&w=400",
      ],
    },
    products: [
      {
        id: "p11",
        name: "울 코트",
        price: 299000,
        image:
          "https://images.pexels.com/photos/1043463/pexels-photo-1043463.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "아우터",
      },
      {
        id: "p12",
        name: "니트 스웨터",
        price: 149000,
        image:
          "https://images.pexels.com/photos/1043462/pexels-photo-1043462.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "상의",
      },
    ],
    likes: 198,
    views: 920,
    createdAt: "2024-02-28",
    featured: false,
  },
];

export default function LookbookPage() {
  const [filteredData, setFilteredData] =
    useState<LookbookItem[]>(lookbookData);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedSeason, setSelectedSeason] = useState<string>("전체");

  const handleFilter = (category: string, season: string) => {
    setSelectedCategory(category);
    setSelectedSeason(season);

    let filtered = lookbookData;

    if (category !== "전체") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (season !== "전체") {
      filtered = filtered.filter((item) => item.season === season);
    }

    setFilteredData(filtered);
  };

  const featuredLookbooks = lookbookData.filter((item) => item.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="pt-20">
        {/* 히어로 섹션 */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                LUMINA
                <span className="block text-yellow-400">룩북</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                다양한 상황과 계절에 맞는 완벽한 스타일링을 만나보세요
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  <Heart className="w-4 h-4 mr-1" />
                  {lookbookData.reduce((sum, item) => sum + item.likes, 0)}{" "}
                  좋아요
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  {lookbookData.reduce((sum, item) => sum + item.views, 0)}{" "}
                  조회수
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* 피처드 룩북 섹션 */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">추천 룩북</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                가장 인기 있는 스타일링을 확인해보세요
              </p>
            </div>
            <LookbookGrid lookbooks={featuredLookbooks} featured={true} />
          </div>
        </section>

        {/* 필터 섹션 */}
        <section className="py-8 bg-gray-100 dark:bg-gray-700">
          <div className="container mx-auto px-4">
            <LookbookFilter
              onFilter={handleFilter}
              selectedCategory={selectedCategory}
              selectedSeason={selectedSeason}
            />
          </div>
        </section>

        {/* 전체 룩북 섹션 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">전체 룩북</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {filteredData.length}개의 룩북이 있습니다
              </p>
            </div>
            <LookbookGrid lookbooks={filteredData} featured={false} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
