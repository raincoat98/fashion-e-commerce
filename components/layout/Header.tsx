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
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const { wishlist } = useProductStore();
  const { state: cartState } = useCart();
  const pathname = usePathname();

  // 장바구니 아이템 수 계산
  const cartItemCount = cartState.itemCount;

  // 위시리스트 아이템 수 계산
  const wishlistCount = wishlist.length;

  // 화면 크기 감지 및 최적화
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
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

  // 화면 크기별 스타일 클래스
  const getResponsiveClasses = () => {
    const baseClasses =
      "fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b transition-all duration-300";
    const scrolledClasses = isScrolled
      ? "border-gray-300 dark:border-gray-600 shadow-lg"
      : "border-gray-200 dark:border-gray-700 shadow-sm";

    return `${baseClasses} ${scrolledClasses}`;
  };

  // 터치 친화적 버튼 크기
  const getTouchButtonSize = () => {
    switch (screenSize) {
      case "mobile":
        return "h-11 w-11 p-3";
      case "tablet":
        return "h-10 w-10 p-2.5";
      default:
        return "h-9 w-9 p-2";
    }
  };

  return (
    <header
      className={getResponsiveClasses()}
      data-header="true"
      style={{
        top:
          pathname.startsWith("/admin") || screenSize === "mobile"
            ? "0px"
            : "var(--top-banner-height, 0px)",
      }}
    >
      <div
        className={`container mx-auto ${
          screenSize === "mobile"
            ? "px-4"
            : screenSize === "tablet"
            ? "px-6"
            : "px-8"
        }`}
      >
        {/* Main Header */}
        <div
          className={`flex items-center justify-between ${
            screenSize === "mobile"
              ? "py-3"
              : screenSize === "tablet"
              ? "py-4"
              : "py-5"
          }`}
        >
          {/* Left Section - Mobile Menu & Logo */}
          <div
            className={`flex items-center ${
              screenSize === "mobile"
                ? "space-x-2"
                : screenSize === "tablet"
                ? "space-x-3"
                : "space-x-4"
            }`}
          >
            {/* Mobile Menu Button */}
            <button
              className={`${getTouchButtonSize()} lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X
                  className={`${
                    screenSize === "mobile"
                      ? "h-6 w-6"
                      : screenSize === "tablet"
                      ? "h-5 w-5"
                      : "h-4 w-4"
                  }`}
                />
              ) : (
                <Menu
                  className={`${
                    screenSize === "mobile"
                      ? "h-6 w-6"
                      : screenSize === "tablet"
                      ? "h-5 w-5"
                      : "h-4 w-4"
                  }`}
                />
              )}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className={`font-bold lumina-text-gradient hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 rounded ${
                screenSize === "mobile"
                  ? "text-xl"
                  : screenSize === "tablet"
                  ? "text-2xl"
                  : "text-3xl"
              }`}
            >
              LUMINA
            </Link>
          </div>

          {/* Center Section - Desktop Navigation */}
          <nav
            className={`hidden lg:flex items-center ${
              screenSize === "desktop" ? "space-x-8" : "space-x-6"
            }`}
          >
            {[
              {
                href: "/categories/new",
                label: "신상품",
                path: "/categories/new",
              },
              {
                href: "/categories/best",
                label: "베스트",
                path: "/categories/best",
              },
              {
                href: "/categories/top?categories=상의",
                label: "상의",
                path: "/categories/top",
              },
              {
                href: "/categories/bottom?categories=하의",
                label: "하의",
                path: "/categories/bottom",
              },
              {
                href: "/categories/dress?categories=드레스",
                label: "원피스",
                path: "/categories/dress",
              },
              { href: "/lookbook", label: "룩북", path: "/lookbook" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  screenSize === "desktop" ? "text-base" : "text-sm"
                } transition-colors hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 rounded px-1 py-0.5 ${
                  pathname === item.path
                    ? "text-gray-900 dark:text-gray-100 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/sale"
              className={`${
                screenSize === "desktop" ? "text-base" : "text-sm"
              } font-medium transition-colors hover:text-red-700 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-600 rounded px-1 py-0.5 ${
                pathname === "/sale"
                  ? "text-red-700 dark:text-red-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              SALE
            </Link>
          </nav>

          {/* Right Section - Search, Admin, User Actions */}
          <div
            className={`flex items-center ${
              screenSize === "mobile"
                ? "space-x-1"
                : screenSize === "tablet"
                ? "space-x-2"
                : "space-x-3"
            }`}
          >
            {/* Search - Desktop */}
            <div
              className={`hidden md:block ${
                screenSize === "tablet" ? "w-48" : "w-64"
              }`}
            >
              <Search placeholder="상품명, 브랜드를 검색하세요" />
            </div>

            {/* Search Toggle - Mobile */}
            <button
              className={`${getTouchButtonSize()} lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600`}
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              aria-label="검색 열기"
              aria-expanded={isSearchExpanded}
            >
              <SearchIcon
                className={`${
                  screenSize === "mobile"
                    ? "h-5 w-5"
                    : screenSize === "tablet"
                    ? "h-4 w-4"
                    : "h-4 w-4"
                }`}
              />
            </button>

            {/* Admin Button */}
            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className={`hidden sm:flex items-center ${
                  screenSize === "tablet" ? "space-x-1.5" : "space-x-2"
                } border-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-600 ${
                  pathname === "/admin"
                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                    : "border-gray-300 dark:border-gray-600 hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-gray-700 dark:text-gray-300 hover:text-yellow-700 dark:hover:text-yellow-400"
                }`}
              >
                <Settings
                  className={`${
                    screenSize === "tablet" ? "h-3.5 w-3.5" : "h-4 w-4"
                  }`}
                />
                <span
                  className={`${
                    screenSize === "tablet" ? "text-[10px]" : "text-xs"
                  } font-medium`}
                >
                  관리자
                </span>
              </Button>
            </Link>

            {/* User Actions */}
            <div
              className={`flex items-center ${
                screenSize === "mobile"
                  ? "space-x-0.5"
                  : screenSize === "tablet"
                  ? "space-x-1"
                  : "space-x-2"
              }`}
            >
              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* User Profile */}
              <Link href="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${getTouchButtonSize()} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600`}
                >
                  <User
                    className={`${
                      screenSize === "mobile"
                        ? "h-5 w-5"
                        : screenSize === "tablet"
                        ? "h-4 w-4"
                        : "h-4 w-4"
                    }`}
                  />
                </Button>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${getTouchButtonSize()} relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600`}
                >
                  <Heart
                    className={`${
                      screenSize === "mobile"
                        ? "h-5 w-5"
                        : screenSize === "tablet"
                        ? "h-4 w-4"
                        : "h-4 w-4"
                    } transition-all duration-300 ${
                      wishlistCount > 0
                        ? "text-red-500 fill-current"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  />
                  {wishlistCount > 0 && (
                    <span
                      className={`absolute -top-0.5 -right-0.5 bg-red-500 text-white rounded-full flex items-center justify-center font-medium ${
                        screenSize === "mobile"
                          ? "h-4 w-4 text-[10px]"
                          : screenSize === "tablet"
                          ? "h-3.5 w-3.5 text-[9px]"
                          : "h-3.5 w-3.5 text-[9px]"
                      }`}
                    >
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
                  className={`${getTouchButtonSize()} relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600`}
                >
                  <ShoppingBag
                    className={`${
                      screenSize === "mobile"
                        ? "h-5 w-5"
                        : screenSize === "tablet"
                        ? "h-4 w-4"
                        : "h-4 w-4"
                    } transition-all duration-300 ${
                      cartItemCount > 0
                        ? "text-blue-600 fill-current"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  />
                  {cartItemCount > 0 && (
                    <span
                      className={`absolute -top-0.5 -right-0.5 bg-red-500 text-white rounded-full flex items-center justify-center font-medium ${
                        screenSize === "mobile"
                          ? "h-4 w-4 text-[10px]"
                          : screenSize === "tablet"
                          ? "h-3.5 w-3.5 text-[9px]"
                          : "h-3.5 w-3.5 text-[9px]"
                      }`}
                    >
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
          <div
            className={`md:hidden animate-slide-down ${
              screenSize === "mobile" ? "pb-4" : "pb-3"
            }`}
          >
            <Search placeholder="상품명, 브랜드를 검색하세요" />
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`lg:hidden border-t border-gray-200 dark:border-gray-700 animate-slide-down bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm ${
              screenSize === "mobile" ? "py-4" : "py-3"
            }`}
          >
            <nav
              className={`${
                screenSize === "mobile" ? "space-y-3" : "space-y-2"
              }`}
            >
              {[
                {
                  href: "/categories/new",
                  label: "신상품",
                  path: "/categories/new",
                },
                {
                  href: "/categories/best",
                  label: "베스트",
                  path: "/categories/best",
                },
                {
                  href: "/categories/top?categories=상의",
                  label: "상의",
                  path: "/categories/top",
                },
                {
                  href: "/categories/bottom?categories=하의",
                  label: "하의",
                  path: "/categories/bottom",
                },
                {
                  href: "/categories/dress?categories=드레스",
                  label: "원피스",
                  path: "/categories/dress",
                },
                { href: "/lookbook", label: "룩북", path: "/lookbook" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block ${
                    screenSize === "mobile" ? "px-4 py-3" : "px-4 py-2.5"
                  } rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 ${
                    pathname === item.path
                      ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/sale"
                className={`block ${
                  screenSize === "mobile" ? "px-4 py-3" : "px-4 py-2.5"
                } rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-600 ${
                  pathname === "/sale"
                    ? "text-red-700 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/20"
                    : "text-red-600 dark:text-red-400"
                }`}
                onClick={closeMobileMenu}
              >
                SALE
              </Link>

              {/* Mobile Admin Button */}
              <div
                className={`${
                  screenSize === "mobile" ? "pt-3" : "pt-2"
                } border-t border-gray-200 dark:border-gray-700`}
              >
                <Link
                  href="/admin"
                  className={`flex items-center ${
                    screenSize === "mobile"
                      ? "space-x-3 px-4 py-3"
                      : "space-x-3 px-4 py-2.5"
                  } rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-600 ${
                    pathname === "/admin"
                      ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-2 border-yellow-500"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-700 dark:hover:text-yellow-400 hover:border-yellow-400 border-2 border-gray-200 dark:border-gray-600"
                  }`}
                  onClick={closeMobileMenu}
                >
                  <Settings
                    className={`${
                      screenSize === "mobile" ? "h-6 w-6" : "h-5 w-5"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      screenSize === "mobile" ? "text-base" : "text-sm"
                    }`}
                  >
                    관리자
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
