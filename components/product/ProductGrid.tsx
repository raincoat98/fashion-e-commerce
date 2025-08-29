"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Grid,
  List,
  Filter,
  SortAsc,
  Heart,
  Star,
  ShoppingBag,
  Eye,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useProductStore } from "@/stores/useProductStore";
import ProductFilter, { FilterOptions } from "./ProductFilter";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand?: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors?: string[];
  tags?: string[];
  isNew?: boolean;
  isSale?: boolean;
  isBest?: boolean;
  inStock?: boolean;
  description?: string;
}

interface ProductGridProps {
  products: Product[];
  showSearchBar?: boolean;
  defaultViewMode?: "grid" | "list";
  itemsPerPage?: number;
  className?: string;
  saleTheme?: boolean; // 할인 페이지 테마
}

export default function ProductGrid({
  products = [],
  showSearchBar = true,
  defaultViewMode = "grid",
  itemsPerPage = 20,
  className,
  saleTheme = false,
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">(defaultViewMode);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const { toast } = useToast();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlistByProductId, isInWishlist } =
    useProductStore();

  // 필터 초기 상태
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    brands: [],
    sizes: [],
    colors: [],
    priceRange: [0, 1000000],
    ratings: [],
    tags: [],
    sortBy: "popular",
    inStock: false,
    onSale: false,
    isNew: false,
  });

  // 모바일 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 필터링된 상품
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 검색어 필터링
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search) ||
          product.brand?.toLowerCase().includes(search) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(search))
      );
    }

    // 카테고리 필터링
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // 브랜드 필터링
    if (filters.brands.length > 0) {
      result = result.filter(
        (product) => product.brand && filters.brands.includes(product.brand)
      );
    }

    // 가격 필터링
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // 사이즈 필터링
    if (filters.sizes.length > 0) {
      result = result.filter((product) =>
        filters.sizes.some((size) => product.sizes.includes(size))
      );
    }

    // 색상 필터링
    if (filters.colors.length > 0) {
      result = result.filter(
        (product) =>
          product.colors &&
          filters.colors.some((color) => product.colors.includes(color))
      );
    }

    // 평점 필터링
    if (filters.ratings.length > 0) {
      result = result.filter((product) =>
        filters.ratings.some((rating) => product.rating >= rating)
      );
    }

    // 기타 옵션 필터링
    if (filters.inStock) {
      result = result.filter((product) => product.inStock !== false);
    }

    if (filters.onSale) {
      result = result.filter(
        (product) => product.isSale || product.originalPrice
      );
    }

    if (filters.isNew) {
      result = result.filter((product) => product.isNew);
    }

    // 정렬
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case "rating":
          return b.rating - a.rating;
        case "review":
          return b.reviewCount - a.reviewCount;
        case "popular":
        default:
          return (b.isBest ? 1 : 0) - (a.isBest ? 1 : 0);
      }
    });

    return result;
  }, [products, searchTerm, filters]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 시 스크롤 to top
  useEffect(() => {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      size: product.sizes[0] || "M",
      color: product.colors?.[0] || "기본",
    });

    toast({
      title: "장바구니에 추가되었습니다",
      description: `${product.name}이(가) 장바구니에 추가되었습니다.`,
      duration: 2000,
    });
  };

  const handleToggleWishlist = (product: Product) => {
    const isWishlisted = isInWishlist(product.id);

    if (isWishlisted) {
      removeFromWishlistByProductId(product.id);
      toast({
        title: "위시리스트에서 제거되었습니다",
        description: `${product.name}이(가) 위시리스트에서 제거되었습니다.`,
        duration: 2000,
      });
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        rating: product.rating,
        reviewCount: product.reviewCount,
        isNew: product.isNew || false,
        isSale: product.isSale || !!product.originalPrice,
        isBest: product.isBest || false,
      });
      toast({
        title: "위시리스트에 추가되었습니다",
        description: `${product.name}이(가) 위시리스트에 추가되었습니다.`,
        duration: 2000,
      });
    }
  };

  // 그리드 뷰 렌더링
  const renderGridView = () => (
    <div
      className={cn(
        "grid gap-4 md:gap-6",
        isMobile
          ? "grid-cols-2"
          : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      )}
    >
      {paginatedProducts.map((product) => (
        <ProductGridItem
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isMobile={isMobile}
          saleTheme={saleTheme}
        />
      ))}
    </div>
  );

  // 리스트 뷰 렌더링
  const renderListView = () => (
    <div className="space-y-4">
      {paginatedProducts.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          saleTheme={saleTheme}
        />
      ))}
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {/* 검색바 */}
      {showSearchBar && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="상품명, 브랜드, 카테고리로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 사이드바 필터 (데스크톱) */}
        {!isMobile && (
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-4">
              <ProductFilter
                isOpen={true}
                onOpenChange={() => {}}
                filters={filters}
                onFiltersChange={setFilters}
                isMobile={false}
                totalProducts={products.length}
                filteredCount={filteredProducts.length}
              />
            </div>
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <div className="flex-1 space-y-6">
          {/* 툴바 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {/* 모바일 필터 버튼 */}
              {isMobile && (
                <ProductFilter
                  isOpen={showFilters}
                  onOpenChange={setShowFilters}
                  filters={filters}
                  onFiltersChange={setFilters}
                  isMobile={true}
                  totalProducts={products.length}
                  filteredCount={filteredProducts.length}
                />
              )}

              {/* 뷰 모드 토글 */}
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                  {!isMobile && <span className="ml-1">그리드</span>}
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                  {!isMobile && <span className="ml-1">리스트</span>}
                </Button>
              </div>
            </div>

            {/* 결과 요약 */}
            <div className="text-sm text-gray-600">
              총 {filteredProducts.length}개 상품
              {searchTerm && ` (검색: "${searchTerm}")`}
            </div>
          </div>

          {/* 상품 목록 */}
          {paginatedProducts.length > 0 ? (
            <>
              {viewMode === "grid" ? renderGridView() : renderListView()}

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    이전
                  </Button>

                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const page = i + 1;
                    if (totalPages <= 5) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    }
                    // 복잡한 페이지네이션 로직은 생략하고 간단히 구현
                    return null;
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    다음
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-600 mb-4">
                다른 검색어나 필터를 시도해보세요
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setFilters({
                    categories: [],
                    brands: [],
                    sizes: [],
                    colors: [],
                    priceRange: [0, 1000000],
                    ratings: [],
                    tags: [],
                    sortBy: "popular",
                    inStock: false,
                    onSale: false,
                    isNew: false,
                  });
                }}
              >
                필터 초기화
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 그리드 아이템 컴포넌트
function ProductGridItem({
  product,
  onAddToCart,
  onToggleWishlist,
  isMobile = false,
  saleTheme = false,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isMobile?: boolean;
  saleTheme?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist } = useProductStore();
  const isWishlisted = isInWishlist(product.id);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.images[0] || "/images/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* 배지들 */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-blue-500 text-white text-xs">NEW</Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-red-500 text-white text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          {product.isBest && (
            <Badge className="bg-purple-500 text-white text-xs">BEST</Badge>
          )}
        </div>

        {/* 위시리스트 버튼 */}
        <button
          onClick={() => onToggleWishlist(product)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            )}
          />
        </button>

        {/* 호버 액션들 */}
        {!isMobile && (
          <div
            className={cn(
              "absolute bottom-2 left-2 right-2 flex gap-2 transition-all duration-300",
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            )}
          >
            <Button
              size="sm"
              className="flex-1 bg-white text-gray-900 hover:bg-gray-100"
              onClick={() => onAddToCart(product)}
            >
              <ShoppingBag className="w-4 h-4" />
            </Button>
            <Link href={`/products/${product.id}`} className="flex-1">
              <Button size="sm" variant="outline" className="w-full bg-white">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>

      <CardContent className="p-3 space-y-2">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-sm leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* 평점 */}
        <div className="flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* 가격 */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span
              className={cn(
                "font-bold",
                saleTheme ? "text-red-600" : "text-gray-900"
              )}
            >
              {product.price.toLocaleString()}원
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.originalPrice.toLocaleString()}원
              </span>
            )}
          </div>
        </div>

        {/* 모바일 액션 버튼들 */}
        {isMobile && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onAddToCart(product)}
            >
              <ShoppingBag className="w-3 h-3 mr-1" />
              담기
            </Button>
            <Link href={`/products/${product.id}`} className="flex-1">
              <Button size="sm" variant="outline" className="w-full">
                보기
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 리스트 아이템 컴포넌트
function ProductListItem({
  product,
  onAddToCart,
  onToggleWishlist,
  saleTheme = false,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  saleTheme?: boolean;
}) {
  const { isInWishlist } = useProductStore();
  const isWishlisted = isInWishlist(product.id);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* 상품 이미지 */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <Link href={`/products/${product.id}`}>
              <img
                src={product.images[0] || "/images/placeholder.jpg"}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </Link>

            {/* 배지들 */}
            <div className="absolute top-1 left-1 flex flex-col gap-1">
              {product.isNew && (
                <Badge className="bg-blue-500 text-white text-xs">NEW</Badge>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-red-500 text-white text-xs">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>
          </div>

          {/* 상품 정보 */}
          <div className="flex-1 space-y-2">
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>

            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-gray-500">
                ({product.reviewCount})
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span
                className={cn(
                  "text-lg font-bold",
                  saleTheme ? "text-red-600" : "text-gray-900"
                )}
              >
                {product.price.toLocaleString()}원
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
            )}

            <div className="flex items-center space-x-2 pt-2">
              <Button
                size="sm"
                onClick={() => onAddToCart(product)}
                className="flex items-center space-x-1"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>장바구니</span>
              </Button>

              <button
                onClick={() => onToggleWishlist(product)}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-red-500 transition-colors"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                  )}
                />
                <span>위시리스트</span>
              </button>

              <Link href={`/products/${product.id}`}>
                <Button size="sm" variant="outline">
                  상세보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
