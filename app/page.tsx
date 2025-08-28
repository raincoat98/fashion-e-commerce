"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategorySection from "@/components/home/CategorySection";
import PromoSection from "@/components/home/PromoSection";
import PromotionBanner from "@/components/home/PromotionBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 py-8">
          <PromotionBanner />
        </div>
        <PromoSection />
        <CategorySection />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}
