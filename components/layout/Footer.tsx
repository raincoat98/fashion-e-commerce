"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Story */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 lumina-gradient rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">L</span>
              </div>
              <h3 className="text-2xl font-bold lumina-text-gradient">
                LUMINA
              </h3>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-md">
              "빛나는 당신을 위한 디자인" LUMINA는 단순한 의류가 아닌, 당신의
              개성과 아름다움을 빛나게 하는 스타일을 제안합니다. 세련된 디자인과
              최고급 소재로 완성된 프리미엄 브랜드입니다.
            </p>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-yellow-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">Made with Love</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">쇼핑</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/categories/new"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  신상품
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/best"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  베스트 셀러
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/sale"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  세일
                </Link>
              </li>
              <li>
                <Link
                  href="/lookbook"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  룩북
                </Link>
              </li>
              <li>
                <Link
                  href="/style-guide"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  스타일 가이드
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">고객센터</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  문의하기
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  사이즈 가이드
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  배송 안내
                </Link>
              </li>
              <li>
                <Link
                  href="/return"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  교환/반품
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Social */}
        <div className="border-t border-gray-800 mt-12 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                뉴스레터 구독
              </h4>
              <p className="text-gray-300 text-sm">
                새로운 컬렉션과 특별한 혜택을 가장 먼저 받아보세요.
              </p>
              <div className="flex space-x-3">
                <input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                />
                <Button className="lumina-gradient hover:opacity-90 text-white px-6 py-3 font-semibold transition-all duration-300 group">
                  구독
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">소셜 미디어</h4>
              <p className="text-gray-300 text-sm">
                LUMINA의 일상을 팔로우하고 최신 스타일을 확인하세요.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 LUMINA. All rights reserved. "빛나는 당신을 위한 스타일"
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                이용약관
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                사이트맵
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
