"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useProductStore } from "@/stores/useProductStore";
import { useToast } from "@/hooks/use-toast";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useProductStore();
  const { toast } = useToast();

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
    toast({
      title: "위시리스트에서 제거되었습니다",
      description: "상품이 위시리스트에서 제거되었습니다.",
      duration: 2000,
    });
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      size: "M", // 기본 사이즈
      color: "기본",
      quantity: 1,
      stock: 10,
    });

    toast({
      title: "장바구니에 추가되었습니다",
      description: `${item.name}이(가) 장바구니에 추가되었습니다.`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">위시리스트</h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 text-gray-300" />
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              위시리스트가 비어있습니다
            </h2>
            <p className="text-gray-600 mb-8">
              마음에 드는 상품을 위시리스트에 담아보세요
            </p>
            <div className="space-y-3">
              <Link href="/">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                  쇼핑 계속하기
                </Button>
              </Link>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  • 상품 상세 페이지에서 하트 버튼을 눌러 위시리스트에
                  추가하세요
                </p>
                <p>• 위시리스트에서 장바구니로 바로 추가할 수 있습니다</p>
                <p>• 위시리스트는 로그인 후에도 유지됩니다</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wishlist Items */}
            <div className="lg:col-span-2 space-y-4">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex space-x-4">
                    <Link href={`/products/${item.productId}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-1">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="font-medium text-gray-900 hover:text-gray-700 mb-2">
                          {item.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">
                            {item.rating}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({item.reviewCount})
                          </span>
                        </div>
                        {item.isNew && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            NEW
                          </span>
                        )}
                        {item.isSale && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            SALE
                          </span>
                        )}
                        {item.isBest && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            BEST
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg">
                            {item.price.toLocaleString()}원
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {item.originalPrice.toLocaleString()}원
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          {/* Add to Cart Button */}
                          <Button
                            onClick={() => handleAddToCart(item)}
                            className="bg-gray-900 hover:bg-gray-800 text-white"
                            size="sm"
                          >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            장바구니
                          </Button>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
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
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  위시리스트 요약
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">총 상품 수</span>
                    <span className="font-medium">{wishlist.length}개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">총 가격</span>
                    <span className="font-medium">
                      {wishlist
                        .reduce((sum, item) => sum + item.price, 0)
                        .toLocaleString()}
                      원
                    </span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="text-sm text-gray-500">
                    <p>
                      • 위시리스트에 담긴 상품은 언제든지 장바구니에 추가할 수
                      있습니다
                    </p>
                    <p>• 상품을 클릭하면 상세 페이지로 이동합니다</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/cart">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3">
                      장바구니 보기
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      쇼핑 계속하기
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
