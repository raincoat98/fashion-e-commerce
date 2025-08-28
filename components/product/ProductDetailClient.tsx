"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ImageGallery from "@/components/product/ImageGallery";
import VariantPicker from "@/components/product/VariantPicker";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import {
  Star,
  Heart,
  Share2,
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

interface ProductDetailClientProps {
  product: {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice: number;
    description: string;
    images: string[];
    rating: number;
    reviewCount: number;
    sizes: Array<{ name: string; available: boolean; stock: number }>;
    colors: Array<{ name: string; hex: string; available: boolean }>;
    materials: string;
    care: string;
    modelInfo: string;
    measurements: {
      [key: string]: {
        chest: number;
        shoulder: number;
        length: number;
        sleeve: number;
      };
    };
    features: string[];
    badge: string;
    reviews: Array<{
      id: number;
      userId: string;
      userName: string;
      rating: number;
      title: string;
      content: string;
      images?: string[];
      size: string;
      color: string;
      helpful: number;
      date: string;
      verified: boolean;
    }>;
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
      [key: number]: number;
    };
  };
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState({
    size: "M",
    color: "Black",
  });
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // GSAP 애니메이션 refs
  const containerRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const brandStoryRef = useRef<HTMLDivElement>(null);

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const selectedSize = product.sizes.find(
    (size) => size.name === selectedVariant.size
  );
  const isInStock = selectedSize?.available && selectedSize.stock > 0;

  // GSAP 애니메이션 설정
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 브레드크럼 애니메이션
      gsap.fromTo(
        breadcrumbRef.current,
        {
          y: -20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      // 이미지 갤러리 애니메이션
      gsap.fromTo(
        imageRef.current,
        {
          x: -50,
          opacity: 0,
          scale: 0.95,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // 상품 정보 애니메이션
      gsap.fromTo(
        infoRef.current,
        {
          x: 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.4,
        }
      );

      // 기능 섹션 애니메이션
      gsap.fromTo(
        featuresRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 브랜드 스토리 애니메이션
      gsap.fromTo(
        brandStoryRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: brandStoryRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 가격 정보 애니메이션
      gsap.fromTo(
        ".price-animation",
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.6,
          stagger: 0.1,
        }
      );

      // 액션 버튼들 애니메이션
      gsap.fromTo(
        ".action-buttons",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.8,
          stagger: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = () => {
    if (!isInStock) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      size: selectedVariant.size,
      color: selectedVariant.color,
    });

    toast({
      title: "장바구니에 추가되었습니다",
      description: `${product.name} (${selectedVariant.size}, ${selectedVariant.color})`,
    });
  };

  const handleBuyNow = () => {
    if (!isInStock) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      size: selectedVariant.size,
      color: selectedVariant.color,
    });

    router.push("/checkout");
  };

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Breadcrumb */}
      <div
        ref={breadcrumbRef}
        className="flex items-center space-x-2 text-sm text-gray-500 mb-6"
      >
        <span>홈</span>
        <ChevronRight className="h-4 w-4" />
        <span>상의</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div ref={imageRef} className="order-1 lg:order-1">
          <ImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Info */}
        <div ref={infoRef} className="order-2 lg:order-2 space-y-6">
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
            <p className="text-sm text-gray-600 mb-4 italic">
              "당신만의 빛을 내는 스타일"
            </p>
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
              <span className="price-animation text-3xl font-bold text-gray-900">
                {product.price.toLocaleString()}원
              </span>
              <span className="price-animation text-lg text-gray-400 line-through">
                {product.originalPrice.toLocaleString()}원
              </span>
              <Badge variant="destructive" className="price-animation text-sm">
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
                className="action-buttons flex-1 lumina-gradient hover:opacity-90 text-white py-3 font-medium transition-all duration-300 lumina-shadow"
                disabled={!isInStock}
                onClick={handleAddToCart}
              >
                {isInStock ? "✨ 장바구니에 담기" : "품절"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="action-buttons px-4"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="action-buttons px-4"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {isInStock && (
              <Button
                size="lg"
                variant="outline"
                className="action-buttons w-full lumina-border-gradient text-gray-900 hover:lumina-gradient hover:text-white py-3 font-medium transition-all duration-300"
                onClick={handleBuyNow}
              >
                💫 바로 구매하기
              </Button>
            )}
          </div>

          {/* SNS Share */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">공유하기</h4>
            <div className="flex space-x-3 action-buttons">
              <button
                onClick={() => {
                  const shareText = product.name + " - LUMINA";
                  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}&quote=${encodeURIComponent(shareText)}`;
                  window.open(url, "_blank");
                }}
                className="flex-1 bg-[#1877F2] hover:bg-[#166FE5] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                📘 Facebook
              </button>
              <button
                onClick={() => {
                  const url = `https://www.instagram.com/explore/tags/${encodeURIComponent(
                    product.name.replace(/\s+/g, "")
                  )}/`;
                  window.open(url, "_blank");
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                📸 Instagram
              </button>
              <button
                onClick={async () => {
                  try {
                    const currentUrl = window.location.href;
                    await navigator.clipboard.writeText(currentUrl);
                    toast({
                      title: "링크가 복사되었습니다",
                      description: "클립보드에 상품 링크가 저장되었습니다.",
                    });
                  } catch (err) {
                    // 폴백: 구식 브라우저 지원
                    const textArea = document.createElement("textarea");
                    textArea.value = window.location.href;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textArea);
                    toast({
                      title: "링크가 복사되었습니다",
                      description: "클립보드에 상품 링크가 저장되었습니다.",
                    });
                  }
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                📋 링크복사
              </button>
            </div>
          </div>

          {/* Mobile Sticky Actions */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
            <div className="flex space-x-3">
              <Button
                size="lg"
                className="flex-1 lumina-gradient hover:opacity-90 text-white"
                disabled={!isInStock}
                onClick={handleAddToCart}
              >
                {isInStock ? "✨ 장바구니" : "품절"}
              </Button>
              {isInStock && (
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 lumina-border-gradient text-gray-900 hover:lumina-gradient hover:text-white"
                  onClick={handleBuyNow}
                >
                  💫 구매
                </Button>
              )}
            </div>
          </div>

          {/* Features */}
          <div
            ref={featuresRef}
            className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200"
          >
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

          {/* Brand Story */}
          <div
            ref={brandStoryRef}
            className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 lumina-gradient rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">L</span>
              </div>
              <h3 className="font-semibold text-gray-900">LUMINA Story</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              "빛나는 당신을 위한 디자인" LUMINA는 단순한 의류가 아닌, 당신의
              개성과 아름다움을 빛나게 하는 스타일을 제안합니다. 세련된 디자인과
              최고급 소재로 완성된 이 제품으로 특별한 순간을 더욱 빛나게
              만들어보세요.
            </p>
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
    </div>
  );
}
