"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Menu,
  X,
  User,
  Heart,
  Truck,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProductStore } from "@/stores/useProductStore";
import { useCart } from "@/contexts/CartContext";
import Search from "@/components/ui/search";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { wishlist } = useProductStore();
  const { state: cartState } = useCart();
  const pathname = usePathname();

  // 장바구니 아이템 수 계산
  const cartItemCount = cartState.itemCount;

  // 위시리스트 아이템 수 계산
  const wishlistCount = wishlist.length;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button and Admin Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Mobile Admin Button (Small) */}
            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center space-x-1 border-2 transition-all duration-300 ${
                  pathname === "/admin"
                    ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                    : "border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 text-gray-700 hover:text-yellow-700"
                }`}
              >
                <Settings className="h-4 w-4" />
                <span className="text-xs font-medium">관리자</span>
              </Button>
            </Link>
          </div>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold lumina-text-gradient">
            LUMINA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link
              href="/categories/new"
              className={`transition-colors ${
                pathname === "/categories/new"
                  ? "text-gray-900 font-bold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              신상품
            </Link>
            <Link
              href="/categories/best"
              className={`transition-colors ${
                pathname === "/categories/best"
                  ? "text-gray-900 font-bold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              베스트
            </Link>
            <Link
              href="/categories/outer?categories=아우터"
              className={`transition-colors ${
                pathname === "/categories/outer"
                  ? "text-gray-900 font-bold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              아우터
            </Link>
            <Link
              href="/categories/top?categories=상의"
              className={`transition-colors ${
                pathname === "/categories/top"
                  ? "text-gray-900 font-bold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              상의
            </Link>
            <Link
              href="/categories/bottom?categories=하의"
              className={`transition-colors ${
                pathname === "/categories/bottom"
                  ? "text-gray-900 font-bold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              하의
            </Link>
            <Link
              href="/categories/dress?categories=드레스"
              className={`transition-colors ${
                pathname === "/categories/dress"
                  ? "text-gray-900 font-bold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              원피스
            </Link>
            <Link
              href="/sale"
              className={`transition-colors ${
                pathname === "/sale"
                  ? "text-red-700 font-bold"
                  : "text-red-600 hover:text-red-700 font-medium"
              }`}
            >
              SALE
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="hidden sm:block w-64">
              <Search placeholder="상품명, 브랜드를 검색하세요" />
            </div>

            {/* Admin Button */}
            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className={`hidden lg:flex items-center space-x-2 border-2 transition-all duration-300 ${
                  pathname === "/admin"
                    ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                    : "border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 text-gray-700 hover:text-yellow-700"
                }`}
              >
                <Settings className="h-4 w-4" />
                <span className="font-medium">관리자</span>
              </Button>
            </Link>

            {/* User */}
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex relative"
              >
                <Heart
                  className={`h-5 w-5 transition-all duration-300 ${
                    wishlistCount > 0
                      ? "text-red-500 fill-current"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-3.5 w-3.5 flex items-center justify-center text-[9px] font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag
                  className={`h-5 w-5 transition-all duration-300 ${
                    cartItemCount > 0
                      ? "text-blue-600 fill-current"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-3.5 w-3.5 flex items-center justify-center text-[9px] font-medium">
                    {cartItemCount}
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
                className={`block transition-colors ${
                  pathname === "/categories/new"
                    ? "text-gray-900 font-bold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                신상품
              </Link>
              <Link
                href="/categories/best"
                className={`block transition-colors ${
                  pathname === "/categories/best"
                    ? "text-gray-900 font-bold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                베스트
              </Link>
              <Link
                href="/categories/outer?categories=아우터"
                className={`block transition-colors ${
                  pathname === "/categories/outer"
                    ? "text-gray-900 font-bold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                아우터
              </Link>
              <Link
                href="/categories/top?categories=상의"
                className={`block transition-colors ${
                  pathname === "/categories/top"
                    ? "text-gray-900 font-bold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                상의
              </Link>
              <Link
                href="/categories/bottom?categories=하의"
                className={`block transition-colors ${
                  pathname === "/categories/bottom"
                    ? "text-gray-900 font-bold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                하의
              </Link>
              <Link
                href="/categories/dress?categories=드레스"
                className={`block transition-colors ${
                  pathname === "/categories/dress"
                    ? "text-gray-900 font-bold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                원피스
              </Link>
              <Link
                href="/sale"
                className={`block transition-colors ${
                  pathname === "/sale"
                    ? "text-red-700 font-bold"
                    : "text-red-600 hover:text-red-700 font-medium"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                SALE
              </Link>

              {/* Mobile Admin Button */}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/admin"
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                    pathname === "/admin"
                      ? "bg-yellow-50 text-yellow-700 border-2 border-yellow-500"
                      : "bg-gray-50 text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-400 border-2 border-gray-200"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">관리자</span>
                </Link>
              </div>
            </nav>
          </div>
        )}

        {/* Search Bar (Mobile) */}
        <div className="sm:hidden pb-4">
          <Search placeholder="상품명, 브랜드를 검색하세요" />
        </div>
      </div>
    </header>
  );
}
