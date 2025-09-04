"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

interface LookbookFilterProps {
  onFilter: (category: string, season: string) => void;
  selectedCategory: string;
  selectedSeason: string;
}

const categories = [
  { value: "전체", label: "전체" },
  { value: "캐주얼", label: "캐주얼" },
  { value: "비즈니스", label: "비즈니스" },
  { value: "데이트", label: "데이트" },
  { value: "휴가", label: "휴가" },
  { value: "아우터", label: "아우터" },
];

const seasons = [
  { value: "전체", label: "전체" },
  { value: "봄", label: "봄" },
  { value: "여름", label: "여름" },
  { value: "가을", label: "가을" },
  { value: "겨울", label: "겨울" },
  { value: "사계절", label: "사계절" },
];

export default function LookbookFilter({
  onFilter,
  selectedCategory,
  selectedSeason,
}: LookbookFilterProps) {
  const handleCategoryChange = (category: string) => {
    onFilter(category, selectedSeason);
  };

  const handleSeasonChange = (season: string) => {
    onFilter(selectedCategory, season);
  };

  const clearFilters = () => {
    onFilter("전체", "전체");
  };

  const hasActiveFilters =
    selectedCategory !== "전체" || selectedSeason !== "전체";

  return (
    <div className="space-y-6">
      {/* 필터 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold">필터</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4 mr-1" />
            필터 초기화
          </Button>
        )}
      </div>

      {/* 활성 필터 표시 */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory !== "전체" && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              카테고리: {selectedCategory}
            </Badge>
          )}
          {selectedSeason !== "전체" && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              계절: {selectedSeason}
            </Badge>
          )}
        </div>
      )}

      {/* 카테고리 필터 */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700 dark:text-gray-300">
          카테고리
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={
                selectedCategory === category.value ? "default" : "outline"
              }
              size="sm"
              onClick={() => handleCategoryChange(category.value)}
              className={`transition-all duration-200 ${
                selectedCategory === category.value
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 계절 필터 */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700 dark:text-gray-300">계절</h4>
        <div className="flex flex-wrap gap-2">
          {seasons.map((season) => (
            <Button
              key={season.value}
              variant={selectedSeason === season.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleSeasonChange(season.value)}
              className={`transition-all duration-200 ${
                selectedSeason === season.value
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {season.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
