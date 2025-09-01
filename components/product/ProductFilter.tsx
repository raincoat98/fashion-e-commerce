"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export interface FilterOptions {
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  ratings: number[];
  tags: string[];
  sortBy: string;
  inStock: boolean;
  onSale: boolean;
  isNew: boolean;
  isBest: boolean;
}

interface ProductFilterProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isMobile?: boolean;
  totalProducts?: number;
  filteredCount?: number;
}

const CATEGORIES = [
  "상의",
  "하의",
  "아우터",
  "드레스",
  "신발",
  "가방",
  "액세서리",
  "언더웨어",
];

const BRANDS = [
  "Nike",
  "Adidas",
  "Zara",
  "H&M",
  "Uniqlo",
  "Calvin Klein",
  "Tommy Hilfiger",
  "Ralph Lauren",
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const COLORS = [
  { name: "검정", value: "black", color: "#000000" },
  { name: "흰색", value: "white", color: "#FFFFFF" },
  { name: "회색", value: "gray", color: "#808080" },
  { name: "빨강", value: "red", color: "#FF0000" },
  { name: "파랑", value: "blue", color: "#0000FF" },
  { name: "초록", value: "green", color: "#008000" },
  { name: "노랑", value: "yellow", color: "#FFFF00" },
  { name: "분홍", value: "pink", color: "#FFC0CB" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "인기순" },
  { value: "newest", label: "최신순" },
  { value: "price-low", label: "낮은 가격순" },
  { value: "price-high", label: "높은 가격순" },
  { value: "rating", label: "평점순" },
  { value: "review", label: "리뷰 많은순" },
];

export default function ProductFilter({
  isOpen,
  onOpenChange,
  filters,
  onFiltersChange,
  isMobile = false,
  totalProducts = 0,
  filteredCount = 0,
}: ProductFilterProps) {
  const searchParams = useSearchParams();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["category", "price", "rating"])
  );

  // URL 파라미터가 변경되면 확장된 섹션 업데이트
  useEffect(() => {
    const newExpanded = new Set<string>();

    // URL에 필터가 있으면 해당 섹션을 확장
    if (searchParams.get("categories")) newExpanded.add("category");
    if (searchParams.get("brands")) newExpanded.add("brand");
    if (searchParams.get("sizes")) newExpanded.add("size");
    if (searchParams.get("colors")) newExpanded.add("color");
    if (searchParams.get("priceMin") || searchParams.get("priceMax"))
      newExpanded.add("price");
    if (searchParams.get("ratings")) newExpanded.add("rating");
    if (
      searchParams.get("inStock") ||
      searchParams.get("onSale") ||
      searchParams.get("isNew") ||
      searchParams.get("isBest")
    )
      newExpanded.add("other");

    // 기본적으로 확장할 섹션들
    if (newExpanded.size === 0) {
      newExpanded.add("category");
      newExpanded.add("price");
      newExpanded.add("rating");
    }

    setExpandedSections(newExpanded);
  }, [searchParams]);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleArrayItem = (key: keyof FilterOptions, item: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(item)
      ? currentArray.filter((i) => i !== item)
      : [...currentArray, item];
    updateFilter(key, newArray);
  };

  const toggleNumberArrayItem = (key: keyof FilterOptions, item: number) => {
    const currentArray = filters[key] as number[];
    const newArray = currentArray.includes(item)
      ? currentArray.filter((i) => i !== item)
      : [...currentArray, item];
    updateFilter(key, newArray);
  };

  const clearAllFilters = () => {
    onFiltersChange({
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
      isBest: false,
    });
  };

  const getActiveFilterCount = () => {
    return (
      filters.categories.length +
      filters.brands.length +
      filters.sizes.length +
      filters.colors.length +
      filters.ratings.length +
      (filters.inStock ? 1 : 0) +
      (filters.onSale ? 1 : 0) +
      (filters.isNew ? 1 : 0) +
      (filters.isBest ? 1 : 0) +
      (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000 ? 1 : 0)
    );
  };

  const renderFilterSection = (
    title: string,
    key: string,
    content: React.ReactNode
  ) => (
    <Collapsible
      open={expandedSections.has(key)}
      onOpenChange={() => toggleSection(key)}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left font-medium hover:bg-gray-50 transition-colors">
        <span>{title}</span>
        {expandedSections.has(key) ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">{content}</CollapsibleContent>
    </Collapsible>
  );

  const filterContent = (
    <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* 필터 헤더 */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5" />
          <h3 className="text-lg font-semibold">필터</h3>
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getActiveFilterCount()}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          disabled={getActiveFilterCount() === 0}
        >
          전체 해제
        </Button>
      </div>

      {/* 정렬 */}
      <div className="p-3 border-b">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          정렬
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {SORT_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={filters.sortBy === option.value ? "default" : "outline"}
              size="sm"
              className="justify-start text-xs"
              onClick={() => updateFilter("sortBy", option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 카테고리 */}
      {renderFilterSection(
        "카테고리",
        "category",
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleArrayItem("categories", category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      )}

      {/* 가격 범위 */}
      {renderFilterSection(
        "가격",
        "price",
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value)}
            max={1000000}
            min={0}
            step={10000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{filters.priceRange[0].toLocaleString()}원</span>
            <span>{filters.priceRange[1].toLocaleString()}원</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => updateFilter("priceRange", [0, 50000])}
            >
              5만원 이하
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => updateFilter("priceRange", [50000, 100000])}
            >
              5~10만원
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => updateFilter("priceRange", [100000, 200000])}
            >
              10~20만원
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => updateFilter("priceRange", [200000, 1000000])}
            >
              20만원 이상
            </Button>
          </div>
        </div>
      )}

      {/* 브랜드 */}
      {renderFilterSection(
        "브랜드",
        "brand",
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => toggleArrayItem("brands", brand)}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      )}

      {/* 사이즈 */}
      {renderFilterSection(
        "사이즈",
        "size",
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map((size) => (
            <Button
              key={size}
              variant={filters.sizes.includes(size) ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => toggleArrayItem("sizes", size)}
            >
              {size}
            </Button>
          ))}
        </div>
      )}

      {/* 색상 */}
      {renderFilterSection(
        "색상",
        "color",
        <div className="grid grid-cols-4 gap-2">
          {COLORS.map((color) => (
            <Button
              key={color.value}
              variant="outline"
              size="sm"
              className={cn(
                "flex items-center space-x-1 text-xs",
                filters.colors.includes(color.value) && "ring-2 ring-blue-500"
              )}
              onClick={() => toggleArrayItem("colors", color.value)}
            >
              <div
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: color.color }}
              />
              <span className="hidden sm:inline">{color.name}</span>
            </Button>
          ))}
        </div>
      )}

      {/* 평점 */}
      {renderFilterSection(
        "평점",
        "rating",
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.ratings.includes(rating)}
                onCheckedChange={() => toggleNumberArrayItem("ratings", rating)}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="flex items-center space-x-1 cursor-pointer"
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-3 h-3",
                        i < rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm ml-1">이상</span>
              </Label>
            </div>
          ))}
        </div>
      )}

      {/* 기타 옵션 */}
      {renderFilterSection(
        "기타",
        "other",
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilter("inStock", checked)}
            />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer">
              재고 있음만
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={filters.onSale}
              onCheckedChange={(checked) => updateFilter("onSale", checked)}
            />
            <Label htmlFor="on-sale" className="text-sm cursor-pointer">
              할인 상품만
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-new"
              checked={filters.isNew}
              onCheckedChange={(checked) => updateFilter("isNew", checked)}
            />
            <Label htmlFor="is-new" className="text-sm cursor-pointer">
              신상품만
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-best"
              checked={filters.isBest}
              onCheckedChange={(checked) => updateFilter("isBest", checked)}
            />
            <Label htmlFor="is-best" className="text-sm cursor-pointer">
              베스트 상품만
            </Label>
          </div>
        </div>
      )}

      {/* 결과 요약 */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="text-sm text-gray-600 text-center">
          전체 {totalProducts}개 중 {filteredCount}개 상품
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>필터</span>
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-1">
                {getActiveFilterCount()}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>상품 필터</SheetTitle>
          </SheetHeader>
          <div className="mt-4">{filterContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Card className={cn("w-full h-fit", !isOpen && "hidden")}>
      <CardContent className="p-0">{filterContent}</CardContent>
    </Card>
  );
}
