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
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `상품 ${i + 1}`,
    price: Math.floor(Math.random() * 50000) + 20000,
    originalPrice: Math.floor(Math.random() * 80000) + 40000,
    image: `https://images.pexels.com/photos/${1536619 + i}/pexels-photo-${
      1536619 + i
    }.jpeg?auto=compress&cs=tinysrgb&w=400`,
    hoverImage: `https://images.pexels.com/photos/${1545743 + i}/pexels-photo-${
      1545743 + i
    }.jpeg?auto=compress&cs=tinysrgb&w=400`,
    badge: i % 3 === 0 ? "SALE" : undefined,
    rating: 4.5 + Math.random() * 0.5,
    reviewCount: Math.floor(Math.random() * 200) + 10,
    sizes: ["S", "M", "L"],
  }));

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
