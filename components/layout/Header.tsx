"use client";

import React, { useState } from "react";
import { Search, ShoppingBag, Menu, X, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state: cartState } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Banner */}
      <div className="bg-gray-900 text-white text-center py-2 text-sm">
        🎉 전 상품 균일가 세일! 5만원 이상 무료배송
      </div>

      <div className="container mx-auto">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            FASHION
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link
              href="/categories/new"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              신상품
            </Link>
            <Link
              href="/categories/best"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              베스트
            </Link>
            <Link
              href="/categories/outer"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              아우터
            </Link>
            <Link
              href="/categories/top"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              상의
            </Link>
            <Link
              href="/categories/bottom"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              하의
            </Link>
            <Link
              href="/categories/dress"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              원피스
            </Link>
            <Link
              href="/sale"
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              SALE
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* User */}
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartState.itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 animate-slide-up">
            <nav className="space-y-4">
              <Link
                href="/categories/new"
                className="block text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                신상품
              </Link>
              <Link
                href="/categories/best"
                className="block text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                베스트
              </Link>
              <Link
                href="/categories/outer"
                className="block text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                아우터
              </Link>
              <Link
                href="/categories/top"
                className="block text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                상의
              </Link>
              <Link
                href="/categories/bottom"
                className="block text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                하의
              </Link>
              <Link
                href="/categories/dress"
                className="block text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                원피스
              </Link>
              <Link
                href="/sale"
                className="block text-red-600 hover:text-red-700 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                SALE
              </Link>
            </nav>
          </div>
        )}

        {/* Search Bar (Mobile) */}
        <div className="sm:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="상품명, 브랜드를 검색하세요"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
