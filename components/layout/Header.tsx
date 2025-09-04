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
  Search as SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProductStore } from "@/stores/useProductStore";
import { useCart } from "@/contexts/CartContext";
import Search from "@/components/ui/search";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { wishlist } = useProductStore();
  const { state: cartState } = useCart();
  const pathname = usePathname();

  // 장바구니 아이템 수 계산
  const cartItemCount = cartState.itemCount;

  // 위시리스트 아이템 수 계산
  const wishlistCount = wishlist.length;

  // 모바일 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 모바일 메뉴 닫기
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsSearchExpanded(false);
  };

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // 스크롤 시 헤더 스타일 변경
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b transition-all duration-300 ${
        isScrolled
          ? "border-gray-300 dark:border-gray-600 shadow-lg"
          : "border-gray-200 dark:border-gray-700 shadow-sm"
      }`}
      data-header="true"
      style={{
        top:
          pathname.startsWith("/admin") || isMobile
            ? "0px"
            : "var(--top-banner-height, 0px)",
      }}
    >
      <div className="container mx-auto px-3 sm:px-6">
        {/* Main Header */}
        <div className="flex items-center justify-between py-2 sm:py-4">
          {/* Left Section - Mobile Menu & Logo */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            {/* Mobile Menu Button */}
            <button
              className="p-2.5 lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="text-lg sm:text-2xl font-bold lumina-text-gradient hover:opacity-80 transition-opacity"
            >
              LUMINA
            </Link>
          </div>

          {/* Center Section - Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              href="/categories/new"
              className={`text-sm xl:text-base transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                pathname === "/categories/new"
                  ? "text-gray-900 dark:text-gray-100 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              신상품
            </Link>
            <Link
              href="/categories/best"
              className={`text-sm xl:text-base transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                pathname === "/categories/best"
                  ? "text-gray-900 dark:text-gray-100 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              베스트
            </Link>
            <Link
              href="/categories/outer?categories=아우터"
              className={`text-sm xl:text-base transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                pathname === "/categories/outer"
                  ? "text-gray-900 dark:text-gray-100 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              아우터
            </Link>
            <Link
              href="/categories/top?categories=상의"
              className={`text-sm xl:text-base transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                pathname === "/categories/top"
                  ? "text-gray-900 dark:text-gray-100 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              상의
            </Link>
            <Link
              href="/categories/bottom?categories=하의"
              className={`text-sm xl:text-base transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                pathname === "/categories/bottom"
                  ? "text-gray-900 dark:text-gray-100 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              하의
            </Link>
            <Link
              href="/categories/dress?categories=드레스"
              className={`text-sm xl:text-base transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                pathname === "/categories/dress"
                  ? "text-gray-900 dark:text-gray-100 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              원피스
            </Link>
            <Link
              href="/lookbook"
              className={`text-sm xl:text-base transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                pathname === "/lookbook"
                  ? "text-gray-900 dark:text-gray-100 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              룩북
            </Link>
            <Link
              href="/sale"
              className={`text-sm xl:text-base font-medium transition-colors hover:text-red-700 dark:hover:text-red-400 ${
                pathname === "/sale"
                  ? "text-red-700 dark:text-red-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              SALE
            </Link>
          </nav>

          {/* Right Section - Search, Admin, User Actions */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Search - Desktop */}
            <div className="hidden md:block w-48 lg:w-64 xl:w-80">
              <Search placeholder="상품명, 브랜드를 검색하세요" />
            </div>

            {/* Search Toggle - Mobile */}
            <button
              className="p-2.5 lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              aria-label="검색 열기"
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            {/* Admin Button */}
            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className={`hidden sm:flex items-center space-x-2 border-2 transition-all duration-300 hover:scale-105 ${
                  pathname === "/admin"
                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                    : "border-gray-300 dark:border-gray-600 hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-gray-700 dark:text-gray-300 hover:text-yellow-700 dark:hover:text-yellow-400"
                }`}
              >
                <Settings className="h-4 w-4" />
                <span className="text-xs font-medium">관리자</span>
              </Button>
            </Link>

            {/* User Actions */}
            <div className="flex items-center space-x-0.5 sm:space-x-2">
              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* User Profile */}
              <Link href="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10 relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${
                      wishlistCount > 0
                        ? "text-red-500 fill-current"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center text-[9px] sm:text-[10px] font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10 relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ShoppingBag
                    className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${
                      cartItemCount > 0
                        ? "text-blue-600 fill-current"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center text-[9px] sm:text-[10px] font-medium">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchExpanded && (
          <div className="md:hidden pb-3 animate-slide-down">
            <Search placeholder="상품명, 브랜드를 검색하세요" />
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-3 animate-slide-down bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
            <nav className="space-y-2">
              <Link
                href="/categories/new"
                className={`block px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  pathname === "/categories/new"
                    ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={closeMobileMenu}
              >
                신상품
              </Link>
              <Link
                href="/categories/best"
                className={`block px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  pathname === "/categories/best"
                    ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={closeMobileMenu}
              >
                베스트
              </Link>
              <Link
                href="/categories/outer?categories=아우터"
                className={`block px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  pathname === "/categories/outer"
                    ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={closeMobileMenu}
              >
                아우터
              </Link>
              <Link
                href="/categories/top?categories=상의"
                className={`block px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  pathname === "/categories/top"
                    ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={closeMobileMenu}
              >
                상의
              </Link>
              <Link
                href="/categories/bottom?categories=하의"
                className={`block px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  pathname === "/categories/bottom"
                    ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={closeMobileMenu}
              >
                하의
              </Link>
              <Link
                href="/categories/dress?categories=드레스"
                className={`block px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  pathname === "/categories/dress"
                    ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={closeMobileMenu}
              >
                원피스
              </Link>
              <Link
                href="/lookbook"
                className={`block px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  pathname === "/lookbook"
                    ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={closeMobileMenu}
              >
                룩북
              </Link>
              <Link
                href="/sale"
                className={`block px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  pathname === "/sale"
                    ? "text-red-700 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/20"
                    : "text-red-600 dark:text-red-400"
                }`}
                onClick={closeMobileMenu}
              >
                SALE
              </Link>

              {/* Mobile Admin Button */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/admin"
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    pathname === "/admin"
                      ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-2 border-yellow-500"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-700 dark:hover:text-yellow-400 hover:border-yellow-400 border-2 border-gray-200 dark:border-gray-600"
                  }`}
                  onClick={closeMobileMenu}
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">관리자</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
