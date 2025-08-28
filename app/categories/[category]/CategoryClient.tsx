"use client";

import React, { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, ChevronDown } from "lucide-react";
import { useProductStore } from "@/stores/useProductStore";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
}

interface CategoryClientProps {
  products: Product[];
  categoryName: string;
  categorySlug: string;
}

export default function CategoryClient({
  products,
  categoryName,
  categorySlug,
}: CategoryClientProps) {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  // 스토어에서 실제 상품 데이터 가져오기
  const { products: storeProducts, setSelectedCategory } = useProductStore();

  // 카테고리 설정
  React.useEffect(() => {
    setSelectedCategory(categorySlug);
  }, [categorySlug, setSelectedCategory]);

  // 실제 상품 데이터 사용 (props로 받은 데이터는 fallback)
  const displayProducts = storeProducts.length > 0 ? storeProducts : products;

  return (
    <>
      {/* Filter and Sort Bar */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>필터</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </Button>

            {/* Size Filter Pills */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                S
              </Button>
              <Button variant="outline" size="sm">
                M
              </Button>
              <Button variant="outline" size="sm">
                L
              </Button>
            </div>
          </div>

          {/* Sort and View */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="popular">인기순</option>
              <option value="newest">최신순</option>
              <option value="price-low">낮은 가격순</option>
              <option value="price-high">높은 가격순</option>
              <option value="rating">평점순</option>
            </select>

            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-none px-3"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200 animate-slide-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h3 className="font-medium mb-3">가격대</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">2만원 이하</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">2-5만원</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">5-10만원</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">색상</h3>
                <div className="flex flex-wrap gap-2">
                  {["블랙", "화이트", "베이지", "네이비", "핑크"].map(
                    (color) => (
                      <Button
                        key={color}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {color}
                      </Button>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">브랜드</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">브랜드 A</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">브랜드 B</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">할인율</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">30% 이상</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">50% 이상</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            : "space-y-4"
        }`}
      >
        {displayProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.images[0] || "/images/placeholder.jpg",
              hoverImage:
                product.images[1] ||
                product.images[0] ||
                "/images/placeholder.jpg",
              badge: product.isNew
                ? "NEW"
                : product.isSale
                ? "SALE"
                : product.isBest
                ? "BEST"
                : "",
              rating: product.rating,
              reviewCount: product.reviewCount,
              sizes: product.sizes,
            }}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg" className="px-8 py-3">
          더 보기 (24개 상품 더)
        </Button>
      </div>
    </>
  );
}
