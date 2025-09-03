"use client";

import React, { useState } from "react";
import { Star, Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  productId: string;
  productName: string;
  productImage?: string;
  onSubmit?: (reviewData: {
    rating: number;
    title: string;
    content: string;
    images: File[];
    pros: string;
    cons: string;
    recommend: boolean;
  }) => void;
  onCancel?: () => void;
}

export default function ReviewForm({
  productId,
  productName,
  productImage,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [recommend, setRecommend] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  // 별점 텍스트 매핑
  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "매우 불만족";
      case 2:
        return "불만족";
      case 3:
        return "보통";
      case 4:
        return "만족";
      case 5:
        return "매우 만족";
      default:
        return "평점을 선택하세요";
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // 최대 5개까지만 허용
    if (images.length + files.length > 5) {
      toast({
        title: "이미지 업로드 제한",
        description: "최대 5개의 이미지까지 업로드할 수 있습니다.",
        variant: "destructive",
      });
      return;
    }

    // 파일 크기 체크 (각 파일 5MB 제한)
    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: "파일 크기 초과",
        description: "각 이미지는 5MB 이하여야 합니다.",
        variant: "destructive",
      });
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  // 이미지 제거 핸들러
  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (rating === 0) {
      toast({
        title: "평점을 선택해주세요",
        description: "상품에 대한 평점을 1~5점으로 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (title.trim().length < 5) {
      toast({
        title: "제목을 입력해주세요",
        description: "리뷰 제목은 최소 5자 이상 작성해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (content.trim().length < 10) {
      toast({
        title: "리뷰 내용을 입력해주세요",
        description: "리뷰 내용은 최소 10자 이상 작성해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        rating,
        title: title.trim(),
        content: content.trim(),
        images,
        pros: pros.trim(),
        cons: cons.trim(),
        recommend,
      };

      // 부모 컴포넌트로 데이터 전달
      if (onSubmit) {
        await onSubmit(reviewData);
      }

      toast({
        title: "리뷰가 등록되었습니다",
        description: "소중한 리뷰를 남겨주셔서 감사합니다. 검토 후 게시됩니다.",
        variant: "default",
      });

      // 폼 초기화
      setRating(0);
      setTitle("");
      setContent("");
      setPros("");
      setCons("");
      setRecommend(true);
      setImages([]);
    } catch (error) {
      console.error("리뷰 등록 오류:", error);
      toast({
        title: "오류가 발생했습니다",
        description: "리뷰 등록 중 문제가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          {productImage && (
            <img
              src={productImage}
              alt={productName}
              className="w-12 h-12 object-cover rounded"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold">리뷰 작성</h3>
            <p className="text-sm text-gray-600">{productName}</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 평점 */}
          <div className="space-y-2">
            <Label className="text-base font-medium">평점 *</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 hover:scale-110 transition-transform"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={cn(
                        "w-8 h-8 transition-colors",
                        star <= (hoverRating || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[120px]">
                {getRatingText(hoverRating || rating)}
              </span>
            </div>
          </div>

          {/* 리뷰 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium">
              리뷰 제목 *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="리뷰 제목을 입력하세요 (최소 5자)"
              maxLength={100}
              className="w-full"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {title.length}/100자
            </p>
          </div>

          {/* 리뷰 내용 */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-base font-medium">
              리뷰 내용 *
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="상품에 대한 솔직한 후기를 작성해주세요 (최소 10자)"
              rows={5}
              maxLength={1000}
              className="w-full resize-none"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {content.length}/1000자
            </p>
          </div>

          {/* 장점 */}
          <div className="space-y-2">
            <Label htmlFor="pros" className="text-base font-medium">
              좋았던 점
            </Label>
            <Textarea
              id="pros"
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              placeholder="이 상품의 장점을 적어주세요 (선택사항)"
              rows={2}
              maxLength={300}
              className="w-full resize-none"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {pros.length}/300자
            </p>
          </div>

          {/* 단점 */}
          <div className="space-y-2">
            <Label htmlFor="cons" className="text-base font-medium">
              아쉬웠던 점
            </Label>
            <Textarea
              id="cons"
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              placeholder="이 상품의 단점이나 개선사항을 적어주세요 (선택사항)"
              rows={2}
              maxLength={300}
              className="w-full resize-none"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {cons.length}/300자
            </p>
          </div>

          {/* 추천 여부 */}
          <div className="space-y-2">
            <Label className="text-base font-medium">추천 여부</Label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="recommend"
                  checked={recommend === true}
                  onChange={() => setRecommend(true)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  추천해요
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="recommend"
                  checked={recommend === false}
                  onChange={() => setRecommend(false)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  추천하지 않아요
                </span>
              </label>
            </div>
          </div>

          {/* 이미지 업로드 */}
          <div className="space-y-2">
            <Label className="text-base font-medium">
              사진 첨부 (선택, 최대 5장)
            </Label>
            <div className="space-y-3">
              {/* 업로드 버튼 */}
              {images.length < 5 && (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      클릭하여 이미지 업로드
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, JPEG (최대 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              )}

              {/* 업로드된 이미지 미리보기 */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`업로드 이미지 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 주의사항 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              리뷰 작성 시 주의사항
            </h4>
            <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
              <li>• 상품과 관련 없는 내용은 삭제될 수 있습니다</li>
              <li>• 개인정보나 연락처는 포함하지 마세요</li>
              <li>• 허위사실이나 과장된 내용은 작성하지 마세요</li>
              <li>• 타인을 비방하거나 욕설은 금지됩니다</li>
            </ul>
          </div>

          {/* 버튼 영역 */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>등록 중...</span>
                </div>
              ) : (
                "리뷰 등록"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
