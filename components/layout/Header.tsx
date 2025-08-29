"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, User, Heart, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProductStore } from "@/stores/useProductStore";
import { useCart } from "@/contexts/CartContext";
import Search from "@/components/ui/search";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTopBannerVisible, setIsTopBannerVisible] = useState(true);
  const { wishlist } = useProductStore();
  const { state: cartState } = useCart();
  const pathname = usePathname();

  // 장바구니 아이템 수 계산
  const cartItemCount = cartState.itemCount;

  // 위시리스트 아이템 수 계산
  const wishlistCount = wishlist.length;

  // localStorage에서 탑 배너 상태 확인
  useEffect(() => {
    const bannerHidden = localStorage.getItem("lumina-top-banner-hidden");
    if (bannerHidden === "true") {
      setIsTopBannerVisible(false);
    }
  }, []);

  // 탑 배너 닫기 함수
  const closeTopBanner = () => {
    setIsTopBannerVisible(false);
    localStorage.setItem("lumina-top-banner-hidden", "true");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Banner */}
      {isTopBannerVisible && (
        <div className="lumina-gradient text-white text-center py-3 text-sm font-medium relative">
          <div className="flex items-center justify-center">
            <span>✨ NEW ARRIVAL: 봄 시즌 컬렉션 출시! 첫 구매 20% 할인</span>
            <button
              onClick={closeTopBanner}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors p-1"
              aria-label="배너 닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

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
              href="/admin"
              className={`transition-colors ${
                pathname === "/admin"
                  ? "text-gray-900 font-bold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              관리자
            </Link>
            <Link
              href="/categories/outer"
              className={`transition-colors ${
                pathname === "/categories/outer"
                  ? "text-gray-900 font-bold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              아우터
            </Link>
            <Link
              href="/categories/top"
              className={`transition-colors ${
                pathname === "/categories/top"
                  ? "text-gray-900 font-bold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              상의
            </Link>
            <Link
              href="/categories/bottom"
              className={`transition-colors ${
                pathname === "/categories/bottom"
                  ? "text-gray-900 font-bold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              하의
            </Link>
            <Link
              href="/categories/dress"
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
                href="/categories/outer"
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
                href="/categories/top"
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
                href="/categories/bottom"
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
                href="/categories/dress"
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
              <Link
                href="/admin"
                className={`block transition-colors ${
                  pathname === "/admin"
                    ? "text-gray-900 font-bold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                관리자
              </Link>
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
