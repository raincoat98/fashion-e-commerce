"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const {
    state: cartState,
    updateQuantity: updateCartQuantity,
    removeItem: removeCartItem,
  } = useCart();
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleUpdateQuantity = (
    id: number,
    size: string,
    color: string,
    newQuantity: number
  ) => {
    if (newQuantity === 0) {
      removeCartItem(id, size, color);
    } else {
      updateCartQuantity(id, size, color, newQuantity);
    }
  };

  const handleRemoveItem = (id: number, size: string, color: string) => {
    removeCartItem(id, size, color);
  };

  // 선택 관련 함수들
  const toggleSelectAll = () => {
    if (selectedItems.length === cartState.items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(
        cartState.items.map((item) => `${item.id}-${item.size}-${item.color}`)
      );
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const removeSelectedItems = () => {
    selectedItems.forEach((id) => {
      const [itemId, size, color] = id.split("-");
      removeCartItem(parseInt(itemId), size, color);
    });
    setSelectedItems([]);
  };

  // 선택된 상품들의 총액 계산
  const selectedItemsTotal = cartState.items
    .filter((item) =>
      selectedItems.includes(`${item.id}-${item.size}-${item.color}`)
    )
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const subtotal = selectedItemsTotal;
  const shipping = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">장바구니</h1>

        {cartState.items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-gray-300" />
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              장바구니가 비어있습니다
            </h2>
            <p className="text-gray-600 mb-8">
              원하는 상품을 장바구니에 담아보세요
            </p>
            <div className="space-y-3">
              <Link href="/">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                  쇼핑 계속하기
                </Button>
              </Link>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  • 상품 상세 페이지에서 사이즈를 선택하고 장바구니에 추가하세요
                </p>
                <p>
                  • 장바구니에서 수량을 조절하고 선택한 상품만 주문할 수
                  있습니다
                </p>
                <p>• 5만원 이상 구매 시 무료배송 혜택을 받을 수 있습니다</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Cart Header */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={toggleSelectAll}
                      className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-colors ${
                        selectedItems.length === cartState.items.length &&
                        cartState.items.length > 0
                          ? "bg-gray-900 border-gray-900"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedItems.length === cartState.items.length &&
                        cartState.items.length > 0 && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                    </button>
                    <span className="text-sm font-medium">
                      전체 선택 ({selectedItems.length}/{cartState.items.length}
                      )
                    </span>
                  </div>
                  {selectedItems.length > 0 && (
                    <button
                      onClick={removeSelectedItems}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      선택 삭제
                    </button>
                  )}
                </div>
              </div>
              {cartState.items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-start space-x-4">
                    {/* Selection Checkbox */}
                    <button
                      onClick={() =>
                        toggleSelectItem(
                          `${item.id}-${item.size}-${item.color}`
                        )
                      }
                      className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-colors mt-2 ${
                        selectedItems.includes(
                          `${item.id}-${item.size}-${item.color}`
                        )
                          ? "bg-gray-900 border-gray-900"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedItems.includes(
                        `${item.id}-${item.size}-${item.color}`
                      ) && <Check className="h-3 w-3 text-white" />}
                    </button>
                    <Link href={`/products/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-1">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-medium text-gray-900 hover:text-gray-700 mb-2">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>사이즈: {item.size}</span>
                        <span>색상: {item.color}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg">
                            {(item.price * item.quantity).toLocaleString()}원
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {(
                                item.originalPrice * item.quantity
                              ).toLocaleString()}
                              원
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            (개당 {item.price.toLocaleString()}원)
                          </span>
                        </div>

                        <div className="flex items-center space-x-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.id,
                                  item.size,
                                  item.color,
                                  item.quantity - 1
                                )
                              }
                              className="p-2 hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.id,
                                  item.size,
                                  item.color,
                                  item.quantity + 1
                                )
                              }
                              className="p-2 hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() =>
                              handleRemoveItem(item.id, item.size, item.color)
                            }
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

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  주문 요약
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">상품 금액</span>
                    <span className="font-medium">
                      {subtotal.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">배송비</span>
                    <span className="font-medium">
                      {shipping === 0
                        ? "무료"
                        : `${shipping.toLocaleString()}원`}
                    </span>
                  </div>
                  {subtotal < 50000 && (
                    <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                      <strong>{(50000 - subtotal).toLocaleString()}원</strong>{" "}
                      더 담으면 무료배송!
                    </div>
                  )}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>총 결제 금액</span>
                    <span className="text-red-600">
                      {total.toLocaleString()}원
                    </span>
                  </div>
                </div>

                <div className="space-y-3 flex flex-col">
                  <Link href="/checkout">
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                      disabled={selectedItems.length === 0}
                    >
                      {selectedItems.length > 0
                        ? `선택 상품 주문하기 (${selectedItems.length}개)`
                        : "상품을 선택해주세요"}
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
