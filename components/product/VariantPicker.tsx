"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ruler } from "lucide-react";

interface Size {
  name: string;
  available: boolean;
  stock: number;
}

interface Color {
  name: string;
  hex: string;
  available: boolean;
}

interface Measurements {
  [key: string]: {
    chest: number;
    shoulder: number;
    length: number;
    sleeve: number;
  };
}

interface VariantPickerProps {
  sizes: Size[];
  colors: Color[];
  selectedVariant: { size: string; color: string };
  onVariantChange: (variant: { size: string; color: string }) => void;
  measurements: Measurements;
}

export default function VariantPicker({
  sizes,
  colors,
  selectedVariant,
  onVariantChange,
  measurements,
}: VariantPickerProps) {
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const handleSizeChange = (size: string) => {
    onVariantChange({ ...selectedVariant, size });
  };

  const handleColorChange = (color: string) => {
    onVariantChange({ ...selectedVariant, color });
  };

  return (
    <div className="space-y-6 overflow-hidden">
      {/* Size Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            사이즈: <span className="font-bold">{selectedVariant.size}</span>
          </label>
          <Dialog open={showSizeGuide} onOpenChange={setShowSizeGuide}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <Ruler className="h-4 w-4 mr-1" />
                사이즈 가이드
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-gray-100">
                  사이즈 가이드
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 font-medium text-gray-900 dark:text-gray-100">
                          사이즈
                        </th>
                        <th className="text-center py-2 font-medium text-gray-900 dark:text-gray-100">
                          가슴둘레
                        </th>
                        <th className="text-center py-2 font-medium text-gray-900 dark:text-gray-100">
                          어깨너비
                        </th>
                        <th className="text-center py-2 font-medium text-gray-900 dark:text-gray-100">
                          총길이
                        </th>
                        <th className="text-center py-2 font-medium text-gray-900 dark:text-gray-100">
                          소매길이
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(measurements).map(([size, measures]) => (
                        <tr
                          key={size}
                          className="border-b border-gray-200 dark:border-gray-700"
                        >
                          <td className="py-2 font-medium text-gray-900 dark:text-gray-100">
                            {size}
                          </td>
                          <td className="text-center py-2 text-gray-700 dark:text-gray-300">
                            {measures.chest}cm
                          </td>
                          <td className="text-center py-2 text-gray-700 dark:text-gray-300">
                            {measures.shoulder}cm
                          </td>
                          <td className="text-center py-2 text-gray-700 dark:text-gray-300">
                            {measures.length}cm
                          </td>
                          <td className="text-center py-2 text-gray-700 dark:text-gray-300">
                            {measures.sleeve}cm
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium mb-2 text-gray-900 dark:text-gray-100">
                    📏 측정 방법:
                  </p>
                  <ul className="space-y-1">
                    <li>• 가슴둘레: 가슴 가장 넓은 부분의 단면 길이</li>
                    <li>• 어깨너비: 어깨 끝에서 끝까지의 직선 길이</li>
                    <li>• 총길이: 목 뒷부분에서 밑단까지의 길이</li>
                    <li>• 소매길이: 어깨 끝에서 소매 끝까지의 길이</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Button
              key={size.name}
              variant={
                selectedVariant.size === size.name ? "default" : "outline"
              }
              size="sm"
              onClick={() => handleSizeChange(size.name)}
              disabled={!size.available}
              className={`min-w-[48px] transition-all ${
                !size.available
                  ? "opacity-50 cursor-not-allowed"
                  : selectedVariant.size === size.name
                  ? "bg-gray-900 text-white shadow-lg"
                  : "hover:border-gray-900 hover:shadow-md"
              }`}
            >
              {size.name}
              {!size.available && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-gray-400 text-xs font-bold">품절</span>
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          색상: <span className="font-bold">{selectedVariant.color}</span>
        </label>

        <div className="flex flex-wrap gap-4">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorChange(color.name)}
              disabled={!color.available}
              className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                selectedVariant.color === color.name
                  ? "border-gray-900 border-4 shadow-lg"
                  : "border-gray-300 hover:border-gray-400 hover:shadow-md"
              } ${
                !color.available
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {!color.available && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-gray-400 text-xs font-bold">품절</span>
                </span>
              )}
              {color.hex === "#FFFFFF" && (
                <div className="absolute inset-0 rounded-full border border-gray-200" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
