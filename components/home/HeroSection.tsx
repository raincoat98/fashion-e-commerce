"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="container mx-auto py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                전 상품
                <br />
                <span className="text-red-600">균일가 세일</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                매장에서 직접 선별한 트렌디한 여성 의류를
                <br />
                특별한 가격에 만나보세요
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/categories/sale">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg"
                >
                  세일 상품 보기
                </Button>
              </Link>
              <Link href="/categories/new">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 rounded-lg"
                >
                  신상품 보기
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">24H</span>
                </div>
                <p className="text-sm font-medium">당일발송</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">7D</span>
                </div>
                <p className="text-sm font-medium">교환보장</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">
                    5만+
                  </span>
                </div>
                <p className="text-sm font-medium">무료배송</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
              <img
                src="https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fashion Hero"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-full text-sm font-bold animate-pulse">
              UP TO 70% OFF
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
