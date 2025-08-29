"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, ShoppingBag, Star, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useProductStore } from "@/stores/useProductStore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SalePage() {
  const { toast } = useToast();
  const router = useRouter();
  const {
    products,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    cartItemCount,
  } = useProductStore();

  // 세일 상품만 필터링
  const saleProducts = products.filter((product) => product.isSale);

  // 디버깅: 장바구니 개수 확인
  console.log("현재 장바구니 개수:", cartItemCount);
  console.log("장바구니 상태:", useProductStore.getState().cart);

  const [sortBy, setSortBy] = useState("discount");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 카테고리별 필터링
  const filteredProducts = saleProducts.filter(
    (product) =>
      selectedCategory === "all" || product.category === selectedCategory
  );

  // 정렬 로직
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "discount":
        // 할인율 계산 (originalPrice가 있는 경우)
        const discountA = a.originalPrice
          ? ((a.originalPrice - a.price) / a.originalPrice) * 100
          : 0;
        const discountB = b.originalPrice
          ? ((b.originalPrice - b.price) / b.originalPrice) * 100
          : 0;
        return discountB - discountA;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 SALE</h1>
          <p className="text-lg text-gray-600 mb-8">
            최대 50% 할인! 봄 시즌을 위한 특별한 혜택을 놓치지 마세요
          </p>

          {/* 세일 배너 */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-lg mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold">50%</div>
                <div className="text-sm">할인</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">무료배송</div>
                <div className="text-sm">5만원 이상</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">7일</div>
                <div className="text-sm">교환/반품</div>
              </div>
            </div>
          </div>
        </div>

        {/* 필터 및 정렬 */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="상의">상의</SelectItem>
                <SelectItem value="하의">하의</SelectItem>
                <SelectItem value="원피스">원피스</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">정렬:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">할인율 높은순</SelectItem>
                <SelectItem value="price-low">가격 낮은순</SelectItem>
                <SelectItem value="price-high">가격 높은순</SelectItem>
                <SelectItem value="rating">평점 높은순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 상품 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            const discountRate = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )
              : 0;
            const isWishlisted = isInWishlist(product.id);

            return (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="relative p-0">
                  {/* 상품 이미지 */}
                  <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          상품 이미지
                        </span>
                      </div>
                    )}

                    {/* 할인 배지 */}
                    {discountRate > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        {discountRate}% OFF
                      </Badge>
                    )}

                    {/* 뉴/베스트 배지 */}
                    {product.isNew && (
                      <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
                        NEW
                      </Badge>
                    )}
                    {product.isBest && (
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                        BEST
                      </Badge>
                    )}

                    {/* 위시리스트 버튼 */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-2 right-2 transition-opacity bg-white/80 hover:bg-white ${
                        isWishlisted
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                      onClick={() => {
                        if (isWishlisted) {
                          const wishlistItem = useProductStore
                            .getState()
                            .wishlist.find(
                              (item) => item.productId === product.id
                            );
                          if (wishlistItem) {
                            removeFromWishlist(wishlistItem.id);
                            toast({
                              title: "위시리스트에서 제거됨",
                              description: `${product.name}이(가) 위시리스트에서 제거되었습니다.`,
                            });
                          }
                        } else {
                          addToWishlist({
                            productId: product.id,
                            name: product.name,
                            price: product.price,
                            originalPrice: product.originalPrice,
                            image: product.images[0] || "",
                            rating: product.rating,
                            reviewCount: product.reviewCount,
                            isNew: product.isNew,
                            isSale: product.isSale,
                            isBest: product.isBest,
                          });
                          toast({
                            title: "위시리스트에 추가됨",
                            description: `${product.name}이(가) 위시리스트에 추가되었습니다.`,
                          });
                        }
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isWishlisted ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <Link href={`/products/${product.id}`} className="block">
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  {/* 평점 */}
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({product.reviewCount})
                    </span>
                  </div>

                  {/* 가격 */}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-red-600">
                      {formatPrice(product.price)}원
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}원
                      </span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      addToCart({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        image: product.images[0] || "",
                        size: product.sizes[0] || "M",
                        color: product.colors[0] || "기본",
                        quantity: 1,
                        stock: product.stock,
                      });

                      toast({
                        title: "장바구니에 추가됨",
                        description: `${product.name}이(가) 장바구니에 추가되었습니다.`,
                      });
                    }}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    장바구니 담기
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* 세일 안내 */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">세일 안내</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">할인 혜택</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 최대 50% 할인 적용</li>
                <li>• 중복 할인 불가</li>
                <li>• 쿠폰 사용 가능</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">배송 안내</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 5만원 이상 구매 시 무료배송</li>
                <li>• 1-2일 내 배송 시작</li>
                <li>• 교환/반품 7일 이내 가능</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
