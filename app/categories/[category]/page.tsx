import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryClient from "./CategoryClient";

export async function generateStaticParams() {
  return [
    { category: "new" },
    { category: "best" },
    { category: "outer" },
    { category: "top" },
    { category: "bottom" },
    { category: "dress" },
    { category: "sale" },
  ];
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  // 서버 사이드에서 카테고리 정보 처리
  const categoryInfo = getCategoryInfo(params.category);
  const categoryProducts = getCategoryProducts(params.category);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <span>홈</span> /{" "}
          <span className="text-gray-900">{categoryInfo.name}</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryInfo.name}
          </h1>
          <p className="text-gray-600 mb-2">{categoryInfo.description}</p>
          <p className="text-gray-600">총 {categoryProducts.length}개의 상품</p>
        </div>

        <CategoryClient
          products={categoryProducts}
          categoryName={categoryInfo.name}
          categorySlug={params.category}
        />
      </main>

      <Footer />
    </div>
  );
}

// 카테고리 정보 가져오기 함수
function getCategoryInfo(categorySlug: string) {
  if (categorySlug === "new") {
    return {
      name: "신상품",
      description: "새롭게 출시된 상품들을 만나보세요",
    };
  } else if (categorySlug === "best") {
    return {
      name: "베스트",
      description: "고객들이 가장 사랑하는 베스트 상품",
    };
  } else if (categorySlug === "sale") {
    return { name: "세일", description: "특별한 할인 혜택을 받아보세요" };
  } else {
    // 실제로는 데이터베이스에서 가져와야 함
    const categoryMap: {
      [key: string]: { name: string; description: string };
    } = {
      top: {
        name: "상의",
        description: "티셔츠, 블라우스, 니트 등 다양한 상의",
      },
      bottom: { name: "하의", description: "팬츠, 스커트 등 다양한 하의" },
      dress: { name: "원피스", description: "우아하고 세련된 원피스 컬렉션" },
      outer: { name: "아우터", description: "자켓, 코트 등 다양한 아우터" },
    };

    return categoryMap[categorySlug] || { name: categorySlug, description: "" };
  }
}

// 카테고리별 상품 가져오기 함수
function getCategoryProducts(categorySlug: string) {
  // 실제로는 데이터베이스에서 가져와야 함
  // 여기서는 샘플 데이터를 반환
  const sampleProducts = [
    {
      id: "1",
      name: "LUMINA 클래식 블라우스",
      price: 89000,
      originalPrice: 120000,
      image:
        "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/1805411/pexels-photo-1805411.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "SALE",
      rating: 4.8,
      reviewCount: 156,
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: "2",
      name: "LUMINA 베이직 티셔츠",
      price: 29000,
      originalPrice: 49000,
      image:
        "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/852860/pexels-photo-852860.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "NEW",
      rating: 4.6,
      reviewCount: 89,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "3",
      name: "LUMINA 와이드 팬츠",
      price: 79000,
      originalPrice: 99000,
      image:
        "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "BEST",
      rating: 4.9,
      reviewCount: 234,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "4",
      name: "LUMINA 플로럴 원피스",
      price: 129000,
      originalPrice: 159000,
      image:
        "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
      hoverImage:
        "https://images.pexels.com/photos/2703907/pexels-photo-2703907.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "SALE",
      rating: 4.7,
      reviewCount: 178,
      sizes: ["XS", "S", "M", "L"],
    },
  ];

  // 카테고리별 필터링 (실제로는 데이터베이스 쿼리)
  if (categorySlug === "new") {
    return sampleProducts.filter((product) => product.badge === "NEW");
  } else if (categorySlug === "best") {
    return sampleProducts.filter((product) => product.badge === "BEST");
  } else if (categorySlug === "sale") {
    return sampleProducts.filter((product) => product.badge === "SALE");
  } else {
    return sampleProducts; // 모든 상품 반환
  }
}
