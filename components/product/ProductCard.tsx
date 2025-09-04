"use client";

import React, { useState } from "react";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useProductStore } from "@/stores/useProductStore";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState("");
  const { toast } = useToast();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlistByProductId, isInWishlist } =
    useProductStore();
  const isWishlisted = isInWishlist(product.id);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "사이즈를 선택해주세요",
        description: "장바구니에 추가하기 전에 사이즈를 선택해주세요.",
        duration: 3000,
      });
      return;
    }

    addItem({
      id: parseInt(product.id.toString()),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      size: selectedSize,
      color: selectedColor || "기본",
    });
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlistByProductId(product.id);
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        rating: product.rating,
        reviewCount: product.reviewCount,
        isNew: false,
        isSale: !!product.originalPrice,
        isBest: false,
      });
    }
  };

  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-gray-800/50 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Link href={`/products/${product.id}`}>
          <img
            src={
              isHovered && product.hoverImage
                ? product.hoverImage
                : product.image
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Badges */}
        {product.badge && (
          <div
            className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-bold text-white ${
              product.badge === "NEW" ? "bg-blue-500" : "bg-red-500"
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-400 dark:text-gray-300"
            } transition-colors`}
          />
        </button>

        {/* Quick Actions (appears on hover) */}
        <div
          className={`absolute bottom-4 left-4 right-4 transform transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex space-x-2">
            {product.sizes.slice(0, 3).map((size) => (
              <Button
                key={size}
                size="sm"
                variant="secondary"
                className={`text-xs px-3 py-1 transition-colors ${
                  selectedSize === size
                    ? "bg-gray-900 dark:bg-gray-700 text-white"
                    : "bg-white dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-600 hover:text-white"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
            {product.sizes.length > 3 && (
              <Button
                size="sm"
                variant="secondary"
                className="text-xs px-3 py-1 bg-white dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-600 hover:text-white"
              >
                +{product.sizes.length - 3}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {product.price.toLocaleString()}원
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
              {product.originalPrice.toLocaleString()}원
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="text-sm text-red-600 dark:text-red-400 font-bold">
              {discountPercentage}%
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            className="flex-1 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-lg py-2 transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            장바구니
          </Button>

          <Link href={`/products/${product.id}`}>
            <Button
              variant="outline"
              className="px-4 py-2 rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              상세보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
