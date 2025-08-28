"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImageGallery from "@/components/product/ImageGallery";
import VariantPicker from "@/components/product/VariantPicker";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductTabs from "@/components/product/ProductTabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Heart,
  Share2,
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedVariant, setSelectedVariant] = useState({
    size: "M",
    color: "Black",
  });
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data - replace with actual API call
  const product = {
    id: parseInt(params.id as string),
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
  };

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const selectedSize = product.sizes.find(
    (size) => size.name === selectedVariant.size
  );
  const isInStock = selectedSize?.available && selectedSize.stock > 0;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <span>홈</span>
          <ChevronRight className="h-4 w-4" />
          <span>상의</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {product.brand}
                </Badge>
                {product.badge && (
                  <Badge variant="destructive" className="text-xs">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-500">
                  ({product.reviewCount}개 리뷰)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price.toLocaleString()}원
                </span>
                <span className="text-lg text-gray-400 line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
                <Badge variant="destructive" className="text-sm">
                  {discountPercentage}% 할인
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                5만원 이상 구매시 <strong>무료배송</strong>
              </p>
            </div>

            {/* Variant Selection */}
            <VariantPicker
              sizes={product.sizes}
              colors={product.colors}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
              measurements={product.measurements}
            />

            {/* Quantity */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                수량
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                    disabled={
                      !isInStock || quantity >= (selectedSize?.stock || 0)
                    }
                  >
                    +
                  </button>
                </div>
                {selectedSize && (
                  <span className="text-sm text-gray-500">
                    {selectedSize.stock}개 남음
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Button
                  size="lg"
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3"
                  disabled={!isInStock}
                >
                  {isInStock ? "장바구니 담기" : "품절"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="px-4"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
                <Button size="lg" variant="outline" className="px-4">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {isInStock && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white py-3"
                >
                  바로 구매하기
                </Button>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium">당일발송</div>
                <div className="text-xs text-gray-500">
                  평일 오후 2시까지 주문시
                </div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium">교환보장</div>
                <div className="text-xs text-gray-500">7일 내 무료 교환</div>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <div className="text-sm font-medium">품질보증</div>
                <div className="text-xs text-gray-500">불량 시 즉시 교환</div>
              </div>
            </div>

            {/* Product Features */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">상품 특징</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-2 text-sm text-gray-700"
                  >
                    <span className="text-gray-400 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <ProductTabs
            description={product.description}
            materials={product.materials}
            care={product.care}
            modelInfo={product.modelInfo}
            measurements={product.measurements}
          />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts currentProductId={product.id} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
