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
  // Mock data - replace with actual API call
  const products = Array.from({ length: 12 }, (_, i) => {
    // 고품질 패션 이미지 ID 배열
    const fashionImageIds = [
      2065195, 1805411, 1021693, 1926769, 852860, 2584269, 1536619, 1545743,
      2065196, 1805412, 1021694, 1926770, 2043590, 2043591, 2043592, 2043593,
    ];

    const mainImageId = fashionImageIds[i % fashionImageIds.length];
    const hoverImageId = fashionImageIds[(i + 1) % fashionImageIds.length];

    return {
      id: i + 1,
      name: `패션 상품 ${i + 1}`,
      price: Math.floor(Math.random() * 50000) + 20000,
      originalPrice: Math.floor(Math.random() * 80000) + 40000,
      image: `https://images.pexels.com/photos/${mainImageId}/pexels-photo-${mainImageId}.jpeg?auto=compress&cs=tinysrgb&w=800`,
      hoverImage: `https://images.pexels.com/photos/${hoverImageId}/pexels-photo-${hoverImageId}.jpeg?auto=compress&cs=tinysrgb&w=800`,
      badge: i % 3 === 0 ? "SALE" : i % 3 === 1 ? "NEW" : "HOT",
      rating: 4.5 + Math.random() * 0.5,
      reviewCount: Math.floor(Math.random() * 200) + 10,
      sizes: ["S", "M", "L"],
    };
  });

  const categoryNames: { [key: string]: string } = {
    new: "신상품",
    best: "베스트",
    outer: "아우터",
    top: "상의",
    bottom: "하의",
    dress: "원피스",
    sale: "세일",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <span>홈</span> /{" "}
          <span className="text-gray-900">
            {categoryNames[params.category] || params.category}
          </span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryNames[params.category] || params.category}
          </h1>
          <p className="text-gray-600">총 {products.length}개의 상품</p>
        </div>

        <CategoryClient
          products={products}
          categoryName={categoryNames[params.category] || params.category}
        />
      </main>

      <Footer />
    </div>
  );
}
