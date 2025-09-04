"use client";

import React from "react";
import LookbookCard from "./LookbookCard";
import { LookbookItem } from "@/app/lookbook/page";

interface LookbookGridProps {
  lookbooks: LookbookItem[];
  featured?: boolean;
}

export default function LookbookGrid({
  lookbooks,
  featured = false,
}: LookbookGridProps) {
  if (lookbooks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-500 dark:text-gray-400 text-lg">
          {featured
            ? "추천 룩북이 없습니다."
            : "해당 조건에 맞는 룩북이 없습니다."}
        </div>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          다른 조건으로 검색해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {lookbooks.map((lookbook) => (
        <LookbookCard
          key={lookbook.id}
          lookbook={lookbook}
          featured={featured}
        />
      ))}
    </div>
  );
}
