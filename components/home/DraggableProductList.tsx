"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Star,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

interface DraggableProductListProps {
  title: string;
  subtitle?: string;
  products: Product[];
  showViewAll?: boolean;
  viewAllLink?: string;
  className?: string;
}

export default function DraggableProductList({
  title,
  subtitle,
  products,
  showViewAll = true,
  viewAllLink = "/products",
  className,
}: DraggableProductListProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set());

  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  // 스크롤 위치에 따른 화살표 표시/숨김
  const updateArrowVisibility = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    updateArrowVisibility();
  }, [updateArrowVisibility, products]);

  // 상품이 변경될 때 이미지 로딩 상태 초기화
  useEffect(() => {
    // 이미지가 있는 상품들만 로딩 상태에 추가
    const productsWithImages = products.filter(
      (p) => p.image && p.image.trim() !== ""
    );
    setImageLoading(new Set(productsWithImages.map((p) => p.id)));
    setImageErrors(new Set());
  }, [products]);

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (!containerRef.current) return;

    setIsDragging(false);
    containerRef.current.style.cursor = "grab";
    containerRef.current.style.userSelect = "auto";
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 화살표 네비게이션
  const scrollToDirection = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.8;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    // 스크롤 완료 후 화살표 상태 업데이트
    setTimeout(updateArrowVisibility, 500);
  };

  // 상품 추가 핸들러
  const handleAddToCart = (product: Product) => {
    addItem({
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      size: "M", // 기본 사이즈
      color: "기본", // 기본 컬러
    });
  };

  const handleAddToWishlist = (productId: string) => {
    // 위시리스트 추가 로직
    console.log("Added to wishlist:", productId);
  };

  // 이미지 로딩 핸들러
  const handleImageLoad = (productId: string) => {
    setImageLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  // 이미지 에러 핸들러
  const handleImageError = (productId: string) => {
    setImageErrors((prev) => new Set(prev).add(productId));
    setImageLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  // 기본 플레이스홀더 이미지
  const getPlaceholderImage = () => {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%239ca3af'%3E이미지 없음%3C/text%3E%3C/svg%3E";
  };

  if (!products.length) {
    return null;
  }

  return (
    <section className={cn("py-16 bg-white", className)}>
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          {showViewAll && (
            <Link href={viewAllLink}>
              <Button variant="outline" className="flex items-center space-x-2">
                <span>전체 보기</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>

        {/* 드래그 슬라이드 컨테이너 */}
        <div className="relative group">
          {/* 좌측 화살표 */}
          {showLeftArrow && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-white/90 hover:bg-white shadow-lg border rounded-full w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => scrollToDirection("left")}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}

          {/* 우측 화살표 */}
          {showRightArrow && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-white/90 hover:bg-white shadow-lg border rounded-full w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => scrollToDirection("right")}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}

          {/* 상품 리스트 */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onScroll={updateArrowVisibility}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                className="flex-shrink-0 w-72 group/card hover:shadow-lg transition-all duration-300"
                style={{ pointerEvents: isDragging ? "none" : "auto" }}
              >
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Link href={`/products/${product.id}`}>
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
                        {/* 로딩 스켈레톤 */}
                        {imageLoading.has(product.id) && (
                          <Skeleton className="w-full h-full absolute inset-0" />
                        )}

                        {/* 이미지 */}
                        {!imageErrors.has(product.id) &&
                        product.image &&
                        product.image.trim() !== "" ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={300}
                            height={300}
                            className={cn(
                              "w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300",
                              imageLoading.has(product.id) && "opacity-0"
                            )}
                            onLoad={() => handleImageLoad(product.id)}
                            onError={() => handleImageError(product.id)}
                            priority={false}
                          />
                        ) : (
                          /* 에러 시 플레이스홀더 */
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <div className="text-center">
                              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">
                                이미지 없음
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* 배지들 */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isNew && (
                        <Badge className="bg-blue-500 text-white text-xs">
                          NEW
                        </Badge>
                      )}
                      {product.isSale && product.discount && (
                        <Badge className="bg-red-500 text-white text-xs">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>

                    {/* 액션 버튼들 */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="w-8 h-8 bg-white/90 hover:bg-white"
                        onClick={() => handleAddToWishlist(product.id)}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="w-8 h-8 bg-white/90 hover:bg-white"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 group-hover/card:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg text-gray-900">
                          {product.price.toLocaleString()}원
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice.toLocaleString()}원
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                        <span>({product.reviewCount})</span>
                      </div>
                      <span className="text-gray-500">{product.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
