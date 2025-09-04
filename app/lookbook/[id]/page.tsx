"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Share2,
  Eye,
  ShoppingBag,
  ArrowLeft,
  Star,
  Tag,
} from "lucide-react";
import { LookbookItem } from "@/app/lookbook/page";

// 샘플 룩북 데이터 (실제로는 API에서 가져와야 함)
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
  // 다른 룩북 데이터들...
];

export default function LookbookDetailPage() {
  const params = useParams();
  const lookbookId = params.id as string;
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 실제로는 API에서 데이터를 가져와야 함
  const lookbook = lookbookData.find((item) => item.id === lookbookId);

  if (!lookbook) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">룩북을 찾을 수 없습니다</h1>
            <Link href="/lookbook">
              <Button>룩북 목록으로 돌아가기</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const totalPrice = lookbook.products.reduce(
    (sum, product) => sum + product.price,
    0
  );

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lookbook.title,
        text: lookbook.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const allImages = [lookbook.images.main, ...lookbook.images.thumbnails];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* 뒤로가기 버튼 */}
          <div className="mb-6">
            <Link href="/lookbook">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                룩북 목록으로 돌아가기
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 이미지 섹션 */}
            <div className="space-y-4">
              {/* 메인 이미지 */}
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <Image
                  src={allImages[selectedImageIndex]}
                  alt={lookbook.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* 액션 버튼들 */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white"
                    onClick={handleLike}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>

                {/* 피처드 배지 */}
                {lookbook.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-400 text-black font-semibold">
                      <Star className="w-3 h-3 mr-1" />
                      추천
                    </Badge>
                  </div>
                )}
              </div>

              {/* 썸네일 네비게이션 */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImageIndex
                          ? "border-blue-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={image}
                        alt={`${lookbook.title} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 정보 섹션 */}
            <div className="space-y-6">
              {/* 헤더 정보 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{lookbook.season}</Badge>
                  <Badge variant="secondary">{lookbook.category}</Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">{lookbook.title}</h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {lookbook.description}
                </p>
              </div>

              {/* 태그 */}
              <div className="flex flex-wrap gap-2">
                {lookbook.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* 통계 */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{lookbook.likes + (isLiked ? 1 : 0)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{lookbook.views}</span>
                </div>
                <span>
                  {new Date(lookbook.createdAt).toLocaleDateString("ko-KR")}
                </span>
              </div>

              {/* 포함 상품 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">포함 상품</h2>
                <div className="space-y-3">
                  {lookbook.products.map((product) => (
                    <Card key={product.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-500">
                              {product.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">
                              {formatPrice(product.price)}원
                            </p>
                            <Link href={`/products/${product.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="mt-1"
                              >
                                상품 보기
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 총 가격 및 구매 버튼 */}
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        총 가격
                      </p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(totalPrice)}원
                      </p>
                    </div>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      전체 구매하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
