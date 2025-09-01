"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BannerSlider from "@/components/home/BannerSlider";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategorySection from "@/components/home/CategorySection";
import PromoSection from "@/components/home/PromoSection";
import PromotionBanner from "@/components/home/PromotionBanner";
import RecentlyViewed from "@/components/home/RecentlyViewed";
import DraggableProductList from "@/components/home/DraggableProductList";
import { useBanners } from "@/hooks/useBanners";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const { activeBanners, loading: bannersLoading } = useBanners();
  const {
    getNewProducts,
    getSaleProducts,
    getPopularProducts,
    getProductsByCategory,
    loading: productsLoading,
  } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* 메인 배너 슬라이드 */}
        <section className="w-full">
          {bannersLoading ? (
            <div className="w-full h-96 md:h-[500px] bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-500">배너 로딩 중...</div>
            </div>
          ) : (
            <BannerSlider banners={activeBanners} />
          )}
        </section>

        {/* 프로모션 배너 */}
        <div className="container mx-auto px-4 py-8">
          <PromotionBanner />
        </div>

        {/* 추천 상품 섹션 */}
        <FeaturedProducts />

        {/* 신상품 드래그 슬라이드 */}
        <DraggableProductList
          title="신상품"
          subtitle="새롭게 출시된 LUMINA 컬렉션을 만나보세요"
          products={getNewProducts()}
          viewAllLink="/categories/new"
        />

        {/* 할인 상품 드래그 슬라이드 */}
        <DraggableProductList
          title="특가 할인"
          subtitle="한정 시간 특별 할인 상품들을 놓치지 마세요"
          products={getSaleProducts()}
          viewAllLink="/sale"
          className="bg-gray-50"
        />

        {/* 카테고리별 상품 드래그 슬라이드 */}
        <DraggableProductList
          title="상의"
          subtitle="트렌디한 상의 컬렉션을 만나보세요"
          products={getProductsByCategory("상의")}
          viewAllLink="/categories/top?categories=상의"
        />
        <DraggableProductList
          title="하의"
          subtitle="편안하고 스타일리시한 하의 컬렉션"
          products={getProductsByCategory("하의")}
          viewAllLink="/categories/bottom?categories=하의"
          className="bg-gray-50"
        />
        <DraggableProductList
          title="원피스"
          subtitle="우아하고 여성스러운 원피스 컬렉션"
          products={getProductsByCategory("원피스")}
          viewAllLink="/categories/dress?categories=드레스"
        />
        <DraggableProductList
          title="아우터"
          subtitle="계절을 완성하는 아우터 컬렉션"
          products={getProductsByCategory("아우터")}
          viewAllLink="/categories/outer?categories=아우터"
          className="bg-gray-50"
        />

        {/* 프로모션 상품 섹션 */}
        <PromoSection />

        {/* 카테고리 섹션 */}
        <CategorySection />

        {/* 최근 본 상품 섹션 */}
        <RecentlyViewed />
      </main>
      <Footer />
    </div>
  );
}
