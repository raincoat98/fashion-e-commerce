"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Share2, Eye, ShoppingBag, Star } from "lucide-react";
import { LookbookItem } from "@/app/lookbook/page";

interface LookbookCardProps {
  lookbook: LookbookItem;
  featured?: boolean;
}

export default function LookbookCard({
  lookbook,
  featured = false,
}: LookbookCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // 공유 기능 구현
    if (navigator.share) {
      navigator.share({
        title: lookbook.title,
        text: lookbook.description,
        url: window.location.href,
      });
    } else {
      // 클립보드에 복사
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
        featured ? "ring-2 ring-yellow-400/50" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/lookbook/${lookbook.id}`}>
        <div className="relative">
          {/* 메인 이미지 */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={lookbook.images.main}
              alt={lookbook.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* 액션 버튼들 */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            {featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-yellow-400 text-black font-semibold">
                  <Star className="w-3 h-3 mr-1" />
                  추천
                </Badge>
              </div>
            )}

            {/* 계절/카테고리 배지 */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {lookbook.season}
              </Badge>
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {lookbook.category}
              </Badge>
            </div>

            {/* 썸네일 네비게이션 */}
            {lookbook.images.thumbnails.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-1">
                {lookbook.images.thumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 콘텐츠 */}
          <CardContent className="p-6">
            <div className="space-y-3">
              {/* 제목과 설명 */}
              <div>
                <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-yellow-600 transition-colors">
                  {lookbook.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {lookbook.description}
                </p>
              </div>

              {/* 태그 */}
              <div className="flex flex-wrap gap-1">
                {lookbook.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* 상품 미리보기 */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  포함 상품 ({lookbook.products.length}개)
                </p>
                <div className="flex gap-2 overflow-x-auto">
                  {lookbook.products.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex-shrink-0">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </div>
                  ))}
                  {lookbook.products.length > 3 && (
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-500">
                        +{lookbook.products.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 가격 정보 */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-500">총 가격</span>
                  <div className="font-bold text-lg">
                    {formatPrice(
                      lookbook.products.reduce(
                        (sum, product) => sum + product.price,
                        0
                      )
                    )}
                    원
                  </div>
                </div>
                <Button
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ShoppingBag className="w-4 h-4 mr-1" />
                  구매하기
                </Button>
              </div>

              {/* 통계 */}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{lookbook.likes + (isLiked ? 1 : 0)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{lookbook.views}</span>
                  </div>
                </div>
                <span className="text-xs">
                  {new Date(lookbook.createdAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}
