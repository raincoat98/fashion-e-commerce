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
  Check,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useProductStore } from "@/stores/useProductStore";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// CartItem 타입 정의
interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

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
  // 디버깅을 위한 로그 (렌더링 최적화)
  const renderCount = useRef(0);
  renderCount.current += 1;

  if (renderCount.current <= 3) {
    // 처음 3번만 로그 출력
    console.log("DraggableProductList 렌더링:", {
      title,
      productsCount: products?.length,
      products: products?.slice(0, 2), // 처음 2개만 로그
      renderCount: renderCount.current,
    });
  }
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set());
  const [cartAddingItems, setCartAddingItems] = useState<Set<string>>(
    new Set()
  );
  const [wishlistAddingItems, setWishlistAddingItems] = useState<Set<string>>(
    new Set()
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem, state } = useCart();
  const { toast } = useToast();

  // useProductStore에서 위시리스트 관련 함수들 가져오기
  const {
    wishlist,
    addToWishlist,
    removeFromWishlistByProductId,
    isInWishlist: storeIsInWishlist,
  } = useProductStore();

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
    if (products && products.length > 0) {
      console.log("이미지 로딩 상태 초기화 - 상품 개수:", products.length);

      // 이미지가 있는 상품들 확인
      const productsWithImages = products.filter(
        (p) => p.image && p.image.trim() !== ""
      );

      console.log(
        "이미지가 있는 상품들:",
        productsWithImages.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.image,
        }))
      );

      const newImageLoading = new Set(productsWithImages.map((p) => p.id));

      console.log(
        "이미지 로딩 상태에 추가할 상품 ID들:",
        Array.from(newImageLoading)
      );

      setImageLoading(newImageLoading);
      setImageErrors(new Set());
    }
  }, [products]);

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setDragDistance(0);
    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const x = e.pageX - containerRef.current.offsetLeft;
    const distance = Math.abs(x - startX);
    setDragDistance(distance);

    // 5px 이상 움직였을 때만 드래그로 간주
    if (distance > 5) {
      e.preventDefault();
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    // 드래그 거리가 5px 미만이면 클릭으로 간주
    if (dragDistance < 5) {
      // 클릭으로 처리 - 기본 동작 허용
    } else {
      // 드래그로 처리 - 클릭 방지
      e.preventDefault();
      e.stopPropagation();
    }

    setIsDragging(false);
    setDragDistance(0);
    containerRef.current.style.cursor = "grab";
    containerRef.current.style.userSelect = "auto";
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setDragDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const distance = Math.abs(x - startX);
    setDragDistance(distance);

    // 5px 이상 움직였을 때만 드래그로 간주
    if (distance > 5) {
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // 드래그 거리가 5px 미만이면 클릭으로 간주
    if (dragDistance >= 5) {
      // 드래그로 처리 - 클릭 방지
      e.preventDefault();
      e.stopPropagation();
    }

    setIsDragging(false);
    setDragDistance(0);
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

  // 상품이 장바구니에 있는지 확인 (인라인으로 처리)
  const isInCart = (productId: string) => {
    return state.items.some(
      (item: CartItem) => item.id.toString() === productId
    );
  };

  // 상품이 위시리스트에 있는지 확인 (인라인으로 처리)
  const isInWishlist = (productId: string) => {
    return storeIsInWishlist(productId);
  };

  // 장바구니 추가 핸들러
  const handleAddToCart = useCallback(
    async (product: Product) => {
      console.log("장바구니 추가 시도:", product);

      // isInCart 함수를 직접 호출하여 의존성 제거
      const alreadyInCart = state.items.some(
        (item: CartItem) => item.id.toString() === product.id
      );

      if (alreadyInCart) {
        console.log("이미 장바구니에 있음:", product.id);
        return;
      }

      setCartAddingItems((prev) => new Set(prev).add(product.id));

      try {
        const cartItem = {
          id: parseInt(product.id) || Date.now(), // 숫자가 아니면 현재 시간으로 대체
          name: product.name,
          price: product.price,
          image: product.image,
          size: "M", // 기본 사이즈
          color: "기본", // 기본 컬러
        };

        console.log("장바구니에 추가할 아이템:", cartItem);
        addItem(cartItem);
      } catch (error) {
        console.error("장바구니 추가 오류:", error);
      } finally {
        setTimeout(() => {
          setCartAddingItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(product.id);
            return newSet;
          });
        }, 1000);
      }
    },
    [state.items, addItem]
  );

  // 위시리스트 추가/제거 핸들러
  const handleToggleWishlist = useCallback(
    async (product: Product) => {
      console.log("위시리스트 토글 시도:", product);
      setWishlistAddingItems((prev) => new Set(prev).add(product.id));

      try {
        // storeIsInWishlist 함수를 직접 호출하여 의존성 제거
        const alreadyInWishlist = storeIsInWishlist(product.id);

        if (alreadyInWishlist) {
          console.log("위시리스트에서 제거:", product.id);
          removeFromWishlistByProductId(product.id);
        } else {
          console.log("위시리스트에 추가:", product.id);
          // 위시리스트에 추가
          const wishlistItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            rating: product.rating,
            reviewCount: product.reviewCount,
            isNew: product.isNew || false,
            isSale: product.isSale || false,
            isBest: false, // 기본값
          };

          console.log("위시리스트에 추가할 아이템:", wishlistItem);
          addToWishlist(wishlistItem);
        }
      } catch (error) {
        console.error("위시리스트 작업 오류:", error);
      } finally {
        setTimeout(() => {
          setWishlistAddingItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(product.id);
            return newSet;
          });
        }, 1000);
      }
    },
    [storeIsInWishlist, wishlist, removeFromWishlistByProductId, addToWishlist]
  );

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

  if (!products || products.length === 0) {
    console.log(`${title} 섹션에 상품이 없습니다.`);
    return (
      <section className={cn("py-16 bg-white dark:bg-gray-900", className)}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {title}
              </h2>
              {subtitle && (
                <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              표시할 상품이 없습니다.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              관리자 페이지에서 상품을 추가해주세요.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-16 bg-white dark:bg-gray-900", className)}>
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
          {showViewAll && (
            <Link href={viewAllLink}>
              <Button
                variant="outline"
                className="flex items-center space-x-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-600 rounded-full w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-600 rounded-full w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
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
                className="flex-shrink-0 w-72 group/card hover:shadow-lg dark:hover:shadow-gray-800/50 transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                style={{
                  pointerEvents:
                    isDragging && dragDistance > 5 ? "none" : "auto",
                  userSelect: isDragging ? "none" : "auto",
                }}
              >
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Link
                      href={`/products/${product.id}`}
                      onClick={(e) => {
                        // 드래그가 진행 중이면 클릭 방지
                        if (isDragging && dragDistance > 5) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                    >
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 relative">
                        {/* 로딩 스켈레톤 - 일시적으로 비활성화 */}
                        {/* {imageLoading.has(product.id) && (
                          <Skeleton className="w-full h-full absolute inset-0" />
                        )} */}

                        {/* 이미지 */}
                        {!imageErrors.has(product.id) &&
                        product.image &&
                        product.image.trim() !== "" ? (
                          <Image
                            src={product.image}
                            alt={product.name || "상품 이미지"}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                            onLoad={() => handleImageLoad(product.id)}
                            onError={() => handleImageError(product.id)}
                            priority={false}
                            unoptimized={true}
                          />
                        ) : (
                          /* 에러 시 플레이스홀더 */
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                            <div className="text-center">
                              <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                이미지 없음
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {product.id}:{" "}
                                {imageErrors.has(product.id)
                                  ? "에러"
                                  : "URL없음"}
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
                  </div>

                  <div className="space-y-2">
                    <Link
                      href={`/products/${product.id}`}
                      onClick={(e) => {
                        // 드래그가 진행 중이면 클릭 방지
                        if (isDragging && dragDistance > 5) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          {product.price.toLocaleString()}원
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            {product.originalPrice.toLocaleString()}원
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                        <span>({product.reviewCount})</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        {product.category}
                      </span>
                    </div>

                    {/* 액션 버튼들 */}
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className={cn(
                          "flex-1 h-8 text-xs transition-all duration-200 border-gray-300 dark:border-gray-600",
                          isInWishlist(product.id)
                            ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                        )}
                        onClick={() => handleToggleWishlist(product)}
                        disabled={wishlistAddingItems.has(product.id)}
                      >
                        {wishlistAddingItems.has(product.id) ? (
                          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
                        ) : isInWishlist(product.id) ? (
                          <Heart className="w-3 h-3 fill-current mr-1" />
                        ) : (
                          <Heart className="w-3 h-3 mr-1" />
                        )}
                        위시리스트
                      </Button>
                      <Button
                        size="sm"
                        className={cn(
                          "flex-1 h-8 text-xs transition-all duration-200 text-white",
                          isInCart(product.id)
                            ? "bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800"
                            : "bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600"
                        )}
                        onClick={() => handleAddToCart(product)}
                        disabled={cartAddingItems.has(product.id)}
                      >
                        {cartAddingItems.has(product.id) ? (
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                        ) : isInCart(product.id) ? (
                          <Check className="w-3 h-3 mr-1" />
                        ) : (
                          <ShoppingCart className="w-3 h-3 mr-1" />
                        )}
                        {isInCart(product.id) ? "추가됨" : "장바구니"}
                      </Button>
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
