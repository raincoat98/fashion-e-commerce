"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Heart,
  ShoppingBag,
  X,
  Grid,
  Sparkles,
  Star,
  Heart as HeartIcon,
  Bookmark,
  List,
  Menu,
  CreditCard,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useProductStore } from "@/stores/useProductStore";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlistByProductId } = useProductStore();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isGridView, setIsGridView] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  // 선택된 아이템들 계산
  const selectedCount = selectedItems.length;
  const isAllSelected =
    selectedItems.length === wishlist.length && wishlist.length > 0;
  const selectedTotalPrice = useMemo(() => {
    return wishlist
      .filter((item) => selectedItems.includes(item.productId))
      .reduce((sum, item) => sum + item.price, 0);
  }, [wishlist, selectedItems]);

  // 개별 항목 선택/해제
  const toggleSelectItem = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // 전체 선택/해제
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlist.map((item) => item.productId));
    }
  };

  // 개별 위시리스트 제거
  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlistByProductId(productId);
    setSelectedItems((prev) => prev.filter((id) => id !== productId));
  };

  // 선택된 항목들 일괄 삭제
  const handleRemoveSelected = () => {
    selectedItems.forEach((productId) => {
      removeFromWishlistByProductId(productId);
    });
    setSelectedItems([]);
  };

  // 장바구니에 추가
  const handleAddToCart = (item: any) => {
    addItem({
      id: parseInt(item.productId),
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      size: "M",
      color: "기본",
    });
  };

  // 선택된 항목들 장바구니에 추가
  const handleAddSelectedToCart = useCallback(() => {
    const selectedWishlistItems = wishlist.filter((item) =>
      selectedItems.includes(item.productId)
    );

    selectedWishlistItems.forEach((item) => {
      addItem({
        id: parseInt(item.productId),
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        size: "M",
        color: "기본",
      });
    });
  }, [wishlist, selectedItems, addItem]);

  // 개별 상품 바로 구매
  const handleBuyNow = (item: any) => {
    addItem({
      id: parseInt(item.productId),
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      size: "M",
      color: "기본",
    });
    // 장바구니 페이지로 이동
    window.location.href = "/checkout";
  };

  // 선택된 항목들 바로 구매
  const handleBuySelected = useCallback(() => {
    const selectedWishlistItems = wishlist.filter((item) =>
      selectedItems.includes(item.productId)
    );

    selectedWishlistItems.forEach((item) => {
      addItem({
        id: parseInt(item.productId),
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        size: "M",
        color: "기본",
      });
    });
    // 장바구니 페이지로 이동
    window.location.href = "/checkout";
  }, [wishlist, selectedItems, addItem]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <main className="container mx-auto py-3 sm:py-6 md:py-8 px-3 sm:px-4 max-w-7xl">
        {/* 헤더 섹션 */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg sm:rounded-xl">
                <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  나의 위시리스트
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                  마음에 드는 아이템들을 모아보세요
                </p>
              </div>
            </div>

            {wishlist.length > 0 && (
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                <Badge
                  variant="secondary"
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                >
                  {wishlist.length}개 상품
                </Badge>
                <div className="flex items-center gap-1">
                  <Button
                    variant={isGridView ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsGridView(true)}
                    className="gap-1 sm:gap-2 px-2 sm:px-3 h-8 sm:h-9"
                  >
                    <Grid className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline text-xs sm:text-sm">
                      그리드
                    </span>
                  </Button>
                  <Button
                    variant={!isGridView ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsGridView(false)}
                    className="gap-1 sm:gap-2 px-2 sm:px-3 h-8 sm:h-9"
                  >
                    <List className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline text-xs sm:text-sm">
                      리스트
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* 선택 컨트롤 - Material Design 3 스타일 */}
          {wishlist.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleSelectAll}
                    className="h-5 w-5"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      전체 선택
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {selectedCount}/{wishlist.length}
                    </Badge>
                  </div>
                  {selectedCount > 0 && (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium">
                      {selectedTotalPrice.toLocaleString()}원
                    </Badge>
                  )}
                </div>

                {selectedCount > 0 && (
                  <Button
                    onClick={handleRemoveSelected}
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    삭제
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center shadow-sm">
            <div className="mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-200 dark:to-purple-200 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <HeartIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                위시리스트가 비어있어요
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed px-4">
                마음에 드는 상품들을 위시리스트에 추가해서
                <br />
                나만의 스타일을 완성해보세요
              </p>
            </div>
            <Link href="/">
              <Button
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-xl gap-2 text-xs sm:text-sm md:text-base"
                size="lg"
              >
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                쇼핑 시작하기
              </Button>
            </Link>
          </div>
        ) : (
          <div
            className={cn(
              "gap-2 sm:gap-3 md:gap-6",
              isGridView
                ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                : "space-y-2 sm:space-y-3 md:space-y-4"
            )}
          >
            {wishlist.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm transition-all duration-200",
                  isGridView ? "p-3" : "p-3 flex items-center gap-3",
                  selectedItems.includes(item.productId) &&
                    "ring-2 ring-blue-500 dark:ring-blue-400 bg-blue-50/50 dark:bg-blue-900/20",
                  !isScrolling && "hover:shadow-md hover:scale-[1.01]"
                )}
              >
                <div
                  className={cn(
                    "relative",
                    isGridView ? "mb-2 sm:mb-4" : "flex-shrink-0"
                  )}
                >
                  <Checkbox
                    checked={selectedItems.includes(item.productId)}
                    onCheckedChange={() => toggleSelectItem(item.productId)}
                    className="absolute top-2 left-2 z-10 bg-white/90 dark:bg-gray-800/90 border-white/50 dark:border-gray-600/50 rounded-md h-4 w-4"
                  />

                  <Link href={`/products/${item.productId}`}>
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700",
                        isGridView ? "aspect-square" : "w-20 h-20"
                      )}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className={cn(
                          "object-cover transition-transform duration-300",
                          !isScrolling && "group-hover:scale-105"
                        )}
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        priority={false}
                      />
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300",
                          !isScrolling
                            ? "opacity-0 group-hover:opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </div>
                  </Link>

                  <button
                    onClick={() => handleRemoveFromWishlist(item.productId)}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-gray-800/90 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className={cn("flex-1", isGridView ? "" : "min-w-0")}>
                  <Link href={`/products/${item.productId}`}>
                    <h3
                      className={cn(
                        "font-semibold text-gray-900 dark:text-gray-100 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200 line-clamp-2",
                        isGridView
                          ? "text-sm sm:text-base mb-1 sm:mb-2"
                          : "text-xs sm:text-sm mb-1"
                      )}
                    >
                      {item.name}
                    </h3>
                  </Link>

                  {isGridView ? (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="font-bold text-xs sm:text-sm md:text-lg text-gray-900 dark:text-gray-100">
                            {item.price.toLocaleString()}원
                          </span>
                          {item.originalPrice && (
                            <Badge
                              variant="destructive"
                              className="text-xs px-1 py-0"
                            >
                              -
                              {Math.round(
                                (1 - item.price / item.originalPrice) * 100
                              )}
                              %
                            </Badge>
                          )}
                        </div>
                        {item.originalPrice && (
                          <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 line-through">
                            {item.originalPrice.toLocaleString()}원
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAddToCart(item)}
                          variant="outline"
                          className="flex-1 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          size="sm"
                        >
                          <ShoppingBag className="h-4 w-4 mr-1" />
                          담기
                        </Button>
                        <Button
                          onClick={() => handleBuyNow(item)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                          size="sm"
                        >
                          <CreditCard className="h-4 w-4 mr-1" />
                          구매
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                          {item.price.toLocaleString()}원
                        </span>
                        {item.originalPrice && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                              {item.originalPrice.toLocaleString()}원
                            </span>
                            <Badge
                              variant="destructive"
                              className="text-xs px-1 py-0"
                            >
                              -
                              {Math.round(
                                (1 - item.price / item.originalPrice) * 100
                              )}
                              %
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          onClick={() => handleAddToCart(item)}
                          variant="outline"
                          size="sm"
                          className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-2"
                        >
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          담기
                        </Button>
                        <Button
                          onClick={() => handleBuyNow(item)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-2"
                        >
                          <CreditCard className="h-3 w-3 mr-1" />
                          구매
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 하단 액션 바 - Material Design 3 스타일 */}
        {wishlist.length > 0 && (
          <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    총 {wishlist.length}개 상품
                  </span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium">
                  {wishlist
                    .reduce((sum, item) => sum + item.price, 0)
                    .toLocaleString()}
                  원
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  완성도
                </span>
                <Badge variant="outline" className="text-sm">
                  {Math.min(100, Math.round((wishlist.length / 10) * 100))}%
                </Badge>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  if (selectedCount > 0) {
                    const selectedWishlistItems = wishlist.filter((item) =>
                      selectedItems.includes(item.productId)
                    );
                    selectedWishlistItems.forEach((item) => {
                      addItem({
                        id: parseInt(item.productId),
                        name: item.name,
                        price: item.price,
                        originalPrice: item.originalPrice,
                        image: item.image,
                        size: "M",
                        color: "기본",
                      });
                    });
                    toast({
                      title: "선택된 상품이 장바구니에 추가되었습니다",
                      duration: 2000,
                    });
                  } else {
                    wishlist.forEach((item) => {
                      addItem({
                        id: parseInt(item.productId),
                        name: item.name,
                        price: item.price,
                        originalPrice: item.originalPrice,
                        image: item.image,
                        size: "M",
                        color: "기본",
                      });
                    });
                    toast({
                      title: "모든 상품이 장바구니에 추가되었습니다",
                      duration: 2000,
                    });
                  }
                }}
                disabled={wishlist.length === 0}
                variant="outline"
                className={`flex-1 ${
                  wishlist.length === 0
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                }`}
                size="lg"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {selectedCount > 0 ? "선택상품 담기" : "전체 담기"}
              </Button>

              <Button
                onClick={() => {
                  if (selectedCount > 0) {
                    const selectedWishlistItems = wishlist.filter((item) =>
                      selectedItems.includes(item.productId)
                    );
                    selectedWishlistItems.forEach((item) => {
                      addItem({
                        id: parseInt(item.productId),
                        name: item.name,
                        price: item.price,
                        originalPrice: item.originalPrice,
                        image: item.image,
                        size: "M",
                        color: "기본",
                      });
                    });
                  } else {
                    wishlist.forEach((item) => {
                      addItem({
                        id: parseInt(item.productId),
                        name: item.name,
                        price: item.price,
                        originalPrice: item.originalPrice,
                        image: item.image,
                        size: "M",
                        color: "기본",
                      });
                    });
                  }
                  window.location.href = "/checkout";
                }}
                disabled={wishlist.length === 0}
                className={`flex-1 ${
                  wishlist.length === 0
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                }`}
                size="lg"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                {selectedCount > 0 ? "선택상품 구매" : "전체 구매"}
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
