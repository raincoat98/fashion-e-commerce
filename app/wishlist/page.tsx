"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Heart,
  ShoppingBag,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react";
import Link from "next/link";
import { useProductStore } from "@/stores/useProductStore";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useProductStore();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState<"addedAt" | "price" | "name">("addedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterSale, setFilterSale] = useState(false);

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
    toast({
      title: "위시리스트에서 제거되었습니다",
      description: "상품이 위시리스트에서 제거되었습니다.",
      duration: 2000,
    });
  };

  const handleAddToCart = (item: any, removeFromWishlistAfterAdd = false) => {
    addItem({
      id: parseInt(item.productId),
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      size: "M", // 기본 사이즈
      color: "기본",
    });

    if (removeFromWishlistAfterAdd) {
      removeFromWishlist(item.id);
      toast({
        title: "장바구니에 추가되었습니다",
        description: `${item.name}이(가) 장바구니에 추가되고 위시리스트에서 제거되었습니다.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "장바구니에 추가되었습니다",
        description: `${item.name}이(가) 장바구니에 추가되었습니다.`,
        duration: 2000,
      });
    }
  };

  // 필터링 및 정렬된 위시리스트
  const filteredAndSortedWishlist = useMemo(() => {
    let filtered = wishlist;

    // 할인 상품 필터링
    if (filterSale) {
      filtered = filtered.filter((item) => item.isSale);
    }

    // 정렬
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case "addedAt":
          aValue = new Date(a.addedAt);
          bValue = new Date(b.addedAt);
          break;
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        default:
          aValue = new Date(a.addedAt);
          bValue = new Date(b.addedAt);
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [wishlist, sortBy, sortOrder, filterSale]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">위시리스트</h1>

        {filteredAndSortedWishlist.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="relative">
              <Heart className="h-16 w-16 mx-auto mb-6 text-gray-300 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="h-8 w-8 text-red-400 animate-bounce" />
              </div>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              위시리스트가 비어있습니다
            </h2>
            <p className="text-gray-600 mb-8">
              마음에 드는 상품을 위시리스트에 담아보세요
            </p>
            <div className="space-y-3">
              <Link href="/">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 hover:scale-105">
                  ✨ 쇼핑 계속하기
                </Button>
              </Link>
              <div className="text-sm text-gray-500 space-y-2 mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-red-400" />
                  <p>
                    상품 상세 페이지에서 하트 버튼을 눌러 위시리스트에
                    추가하세요
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-4 w-4 text-blue-400" />
                  <p>위시리스트에서 장바구니로 바로 추가할 수 있습니다</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <p>위시리스트는 로그인 후에도 유지됩니다</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filter and Sort Controls */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        필터:
                      </span>
                      <button
                        onClick={() => setFilterSale(!filterSale)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          filterSale
                            ? "bg-red-100 text-red-700 shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm"
                        }`}
                      >
                        할인 상품만
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      정렬:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(
                          e.target.value as "addedAt" | "price" | "name"
                        )
                      }
                      className="text-sm border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                    >
                      <option value="addedAt">추가일순</option>
                      <option value="price">가격순</option>
                      <option value="name">이름순</option>
                    </select>
                    <button
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                    >
                      {sortOrder === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="lg:col-span-2 space-y-4">
              {filteredAndSortedWishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="flex space-x-4">
                    <Link
                      href={`/products/${item.productId}`}
                      className="group"
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium">
                            상세보기
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="flex-1">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="font-medium text-gray-900 hover:text-gray-700 mb-2 transition-colors">
                          {item.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium text-yellow-600">
                            ★ {item.rating}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({item.reviewCount})
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          {item.isNew && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                              NEW
                            </span>
                          )}
                          {item.isSale && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                              SALE
                            </span>
                          )}
                          {item.isBest && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                              BEST
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg text-gray-900">
                            {item.price.toLocaleString()}원
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {item.originalPrice.toLocaleString()}원
                            </span>
                          )}
                          {item.originalPrice && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                              {Math.round(
                                ((item.originalPrice - item.price) /
                                  item.originalPrice) *
                                  100
                              )}
                              % 할인
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          {/* Add to Cart Button */}
                          <Button
                            onClick={() => handleAddToCart(item)}
                            className="bg-gray-600 hover:bg-gray-700 text-white transition-all duration-300 hover:scale-102 shadow-sm hover:shadow-md"
                            size="sm"
                          >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            장바구니
                          </Button>

                          {/* Add to Cart and Remove Button */}
                          <Button
                            onClick={() => handleAddToCart(item, true)}
                            variant="outline"
                            className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-102 shadow-sm hover:shadow-md"
                            size="sm"
                          >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            추가 후 제거
                          </Button>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="p-3 text-gray-400 hover:text-red-400 hover:bg-red-50 rounded-full transition-all duration-300"
                            title="위시리스트에서 제거"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6 border border-gray-100">
                <div className="flex items-center space-x-2 mb-6">
                  <Heart className="h-6 w-6 text-red-500" />
                  <h2 className="text-xl font-bold text-gray-900">
                    위시리스트 요약
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">총 상품 수</span>
                    <span className="font-bold text-gray-900">
                      {filteredAndSortedWishlist.length}개
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">총 가격</span>
                    <span className="font-bold text-gray-900">
                      {filteredAndSortedWishlist
                        .reduce((sum, item) => sum + item.price, 0)
                        .toLocaleString()}
                      원
                    </span>
                  </div>
                  {filteredAndSortedWishlist.some(
                    (item) => item.originalPrice
                  ) && (
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-red-600">할인 혜택</span>
                      <span className="font-bold text-red-600">
                        {filteredAndSortedWishlist
                          .filter((item) => item.originalPrice)
                          .reduce(
                            (sum, item) =>
                              sum + (item.originalPrice! - item.price),
                            0
                          )
                          .toLocaleString()}
                        원 절약
                      </span>
                    </div>
                  )}
                  <hr className="border-gray-200" />
                  <div className="text-sm text-gray-500 space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <p>
                        위시리스트에 담긴 상품은 언제든지 장바구니에 추가할 수
                        있습니다
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-0.5">→</span>
                      <p>상품을 클릭하면 상세 페이지로 이동합니다</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-purple-500 mt-0.5">♥</span>
                      <p>위시리스트는 브라우저에 저장되어 유지됩니다</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 flex flex-col">
                  <Button
                    onClick={() => {
                      filteredAndSortedWishlist.forEach((item) => {
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
                        description: `${filteredAndSortedWishlist.length}개 상품이 장바구니에 추가되었습니다.`,
                        duration: 3000,
                      });
                    }}
                    className="w-full bg-blue-400 hover:bg-blue-500 text-white py-4 transition-all duration-300 hover:scale-102 shadow-sm hover:shadow-md"
                  >
                    🛒 전체 장바구니 추가
                  </Button>
                  <Button
                    onClick={() => {
                      filteredAndSortedWishlist.forEach((item) => {
                        addItem({
                          id: parseInt(item.productId),
                          name: item.name,
                          price: item.price,
                          originalPrice: item.originalPrice,
                          image: item.image,
                          size: "M",
                          color: "기본",
                        });
                        removeFromWishlist(item.id);
                      });
                      toast({
                        title: "모든 상품이 장바구니에 추가되었습니다",
                        description: `${filteredAndSortedWishlist.length}개 상품이 장바구니에 추가되고 위시리스트에서 제거되었습니다.`,
                        duration: 3000,
                      });
                    }}
                    variant="outline"
                    className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 py-4 transition-all duration-300 hover:scale-102"
                  >
                    🛒 전체 추가 후 위시리스트 비우기
                  </Button>
                  <Link href="/cart">
                    <Button className="w-full bg-red-400 hover:bg-red-500 text-white py-4 transition-all duration-300 hover:scale-102 shadow-sm hover:shadow-md">
                      🛒 장바구니 보기
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button
                      variant="outline"
                      className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 py-4 transition-all duration-300 hover:scale-102"
                    >
                      ✨ 쇼핑 계속하기
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
