"use client";

import React, { useState } from "react";
import {
  Star,
  ThumbsUp,
  MessageCircle,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Review {
  id: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  size: string;
  color: string;
  helpful: number;
  date: string;
  verified: boolean;
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
}

export default function ReviewSection({
  reviews,
  averageRating,
  totalReviews,
  ratingDistribution,
}: ReviewSectionProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">(
    "recent"
  );

  const filteredReviews = reviews.filter(
    (review) => selectedRating === null || review.rating === selectedRating
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "helpful":
        return b.helpful - a.helpful;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center my-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-sm text-gray-600">{totalReviews}개 리뷰</div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating] || 0;
              const percentage =
                totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{rating}점</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Review Stats */}
          <div className="text-center space-y-2">
            <div className="text-lg font-semibold">리뷰 통계</div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>
                사진 리뷰:{" "}
                {reviews.filter((r) => r.images && r.images.length > 0).length}
                개
              </div>
              <div>인증 구매: {reviews.filter((r) => r.verified).length}개</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={selectedRating === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRating(null)}
          >
            전체
          </Button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant={selectedRating === rating ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRating(rating)}
            >
              {rating}점 ({ratingDistribution[rating] || 0})
            </Button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "recent" | "helpful" | "rating")
          }
          className="border border-gray-300 rounded-md px-3 py-1 text-sm"
        >
          <option value="recent">최신순</option>
          <option value="helpful">도움순</option>
          <option value="rating">평점순</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.userAvatar} />
                <AvatarFallback>{review.userName[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          인증구매
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600">
                        {review.date}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {review.size} / {review.color}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {review.content}
                  </p>
                </div>

                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`리뷰 이미지 ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-gray-700">
                    <ThumbsUp className="h-4 w-4" />
                    <span>도움됨 ({review.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-gray-700">
                    <MessageCircle className="h-4 w-4" />
                    <span>댓글</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {sortedReviews.length < reviews.length && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            더 많은 리뷰 보기
          </Button>
        </div>
      )}
    </div>
  );
}
