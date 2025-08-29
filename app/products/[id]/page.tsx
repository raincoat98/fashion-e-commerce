import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductTabs from "@/components/product/ProductTabs";
import ProductDetailWrapper from "./ProductDetailWrapper";

// Static generation for export - 기본 상품 ID들
export async function generateStaticParams() {
  // 기본 샘플 상품들의 ID만 생성 (실제로는 모든 상품 ID를 가져와야 함)
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

// Generate metadata for each product
export async function generateMetadata({ params }: { params: { id: string } }) {
  // 기본 메타데이터 (실제로는 상품 데이터를 가져와서 생성해야 함)
  const defaultProduct = {
    name: "LUMINA 상품",
    description:
      "LUMINA의 프리미엄 패션 아이템으로 당신의 일상을 빛나게 만듭니다.",
  };

  return {
    title: `${defaultProduct.name} - LUMINA`,
    description: defaultProduct.description,
    openGraph: {
      title: defaultProduct.name,
      description: defaultProduct.description,
      type: "website",
      images: [
        {
          url: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
          width: 800,
          height: 800,
          alt: defaultProduct.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultProduct.name,
      description: defaultProduct.description,
      images: [
        "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto py-6" id="product-main">
        {/* 페이지 로딩 애니메이션을 위한 wrapper */}
        <div className="product-page-wrapper">
          <ProductDetailWrapper productId={params.id} />
        </div>
      </main>

      {/* Mobile bottom padding for sticky actions */}
      <div className="lg:hidden h-20"></div>

      <Footer />
    </div>
  );
}
