"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useProductStore } from "@/stores/useProductStore";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useProductStore();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
    toast({
      title: "위시리스트에서 제거되었습니다",
      duration: 2000,
    });
  };

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

    toast({
      title: "장바구니에 추가되었습니다",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">위시리스트</h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h2 className="text-lg font-medium text-gray-900 mb-3">
              위시리스트가 비어있습니다
            </h2>
            <p className="text-gray-600 mb-6">
              마음에 드는 상품을 위시리스트에 담아보세요
            </p>
            <Link href="/">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                쇼핑 계속하기
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-4 shadow-sm border"
              >
                <div className="flex items-center space-x-4">
                  <Link href={`/products/${item.productId}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>

                  <div className="flex-1">
                    <Link href={`/products/${item.productId}`}>
                      <h3 className="font-medium text-gray-900 hover:text-gray-700 mb-2">
                        {item.name}
                      </h3>
                    </Link>

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
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="bg-gray-900 hover:bg-gray-800 text-white"
                          size="sm"
                        >
                          <ShoppingBag className="h-4 w-4 mr-1" />
                          장바구니
                        </Button>

                        <button
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {wishlist.length > 0 && (
              <div className="bg-white rounded-lg p-4 border mt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">
                    총 {wishlist.length}개 상품
                  </span>
                  <span className="font-bold text-gray-900">
                    {wishlist
                      .reduce((sum, item) => sum + item.price, 0)
                      .toLocaleString()}
                    원
                  </span>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={() => {
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
                    }}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    전체 장바구니 담기
                  </Button>

                  <Link href="/cart">
                    <Button variant="outline" className="w-full">
                      장바구니 보기
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
