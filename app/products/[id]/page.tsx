import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductTabs from "@/components/product/ProductTabs";

// Static generation for export
export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ];
}

// Generate metadata for each product
export async function generateMetadata({ params }: { params: { id: string } }) {
  // Mock product data - in real app, fetch from API
  const product = {
    id: parseInt(params.id),
    name: "베이직 코튼 티셔츠",
    description:
      "부드러운 코튼 소재로 편안한 착용감을 제공하는 베이직 티셔츠입니다.",
    price: 29000,
    originalPrice: 49000,
  };

  return {
    title: `${product.name} - Fashion Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: [
        {
          url: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
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
  // Mock product data - replace with actual API call
  // In real app, this would be fetched from API based on params.id
  const productId = parseInt(params.id);

  // Simulate product not found for certain IDs
  if (productId > 6) {
    throw new Error("Product not found");
  }

  const product = {
    id: parseInt(params.id),
    name: "베이직 코튼 티셔츠",
    brand: "FASHION BRAND",
    price: 29000,
    originalPrice: 49000,
    description:
      "부드러운 코튼 소재로 편안한 착용감을 제공하는 베이직 티셔츠입니다. 깔끔한 핏과 다양한 컬러로 어떤 스타일링에도 잘 어울립니다.",
    images: [
      "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2587543/pexels-photo-2587543.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3007759/pexels-photo-3007759.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    rating: 4.8,
    reviewCount: 127,
    sizes: [
      { name: "S", available: true, stock: 5 },
      { name: "M", available: true, stock: 12 },
      { name: "L", available: true, stock: 8 },
      { name: "XL", available: false, stock: 0 },
    ],
    colors: [
      { name: "Black", hex: "#000000", available: true },
      { name: "White", hex: "#FFFFFF", available: true },
      { name: "Gray", hex: "#9CA3AF", available: true },
      { name: "Navy", hex: "#1E3A8A", available: false },
    ],
    materials: "코튼 100%",
    care: "찬물 단독 세탁, 자연 건조",
    modelInfo: "모델 착용 사이즈: M / 키 168cm",
    measurements: {
      S: { chest: 44, shoulder: 40, length: 60, sleeve: 18 },
      M: { chest: 47, shoulder: 42, length: 62, sleeve: 19 },
      L: { chest: 50, shoulder: 44, length: 64, sleeve: 20 },
      XL: { chest: 53, shoulder: 46, length: 66, sleeve: 21 },
    },
    features: [
      "부드러운 코튼 100% 소재",
      "편안한 레귤러 핏",
      "일상 착용에 적합한 두께감",
      "세탁 후에도 변형 없는 안정적인 핏",
    ],
    badge: "40% OFF",
    reviews: [
      {
        id: 1,
        userId: "user1",
        userName: "김**",
        rating: 5,
        title: "정말 만족스러운 구매였어요!",
        content:
          "사이즈도 딱 맞고 소재도 부드러워서 정말 좋습니다. 일상복으로 입기 완벽해요. 다음에도 구매할 예정입니다.",
        images: [
          "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=200",
        ],
        size: "M",
        color: "Black",
        helpful: 12,
        date: "2024-01-15",
        verified: true,
      },
      {
        id: 2,
        userId: "user2",
        userName: "이**",
        rating: 4,
        title: "가격 대비 괜찮아요",
        content:
          "기본 티셔츠로는 괜찮습니다. 다만 약간 얇은 느낌이 있어서 겹쳐입기 좋아요.",
        size: "L",
        color: "White",
        helpful: 8,
        date: "2024-01-10",
        verified: true,
      },
      {
        id: 3,
        userId: "user3",
        userName: "박**",
        rating: 5,
        title: "색상이 예뻐요",
        content:
          "그레이 컬러가 생각보다 예쁘네요. 핏도 좋고 색상도 마음에 들어요. 추천합니다!",
        images: [
          "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=200",
        ],
        size: "S",
        color: "Gray",
        helpful: 15,
        date: "2024-01-08",
        verified: false,
      },
    ],
    averageRating: 4.7,
    totalReviews: 127,
    ratingDistribution: {
      5: 89,
      4: 25,
      3: 10,
      2: 2,
      1: 1,
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto py-6" id="product-main">
        <ProductDetailClient product={product} />

        {/* Product Details Tabs */}
        <div className="mt-16">
          <ProductTabs
            description={product.description}
            materials={product.materials}
            care={product.care}
            modelInfo={product.modelInfo}
            measurements={product.measurements}
            reviews={product.reviews}
            averageRating={product.averageRating}
            totalReviews={product.totalReviews}
            ratingDistribution={product.ratingDistribution}
          />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts currentProductId={product.id} />
        </div>
      </main>

      {/* Mobile bottom padding for sticky actions */}
      <div className="lg:hidden h-20"></div>

      <Footer />
    </div>
  );
}
