"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  ThumbsUp,
  MessageCircle,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  date: string;
  helpful: number;
}

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
  comments?: Comment[];
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
  const [helpfulClicks, setHelpfulClicks] = useState<Set<number>>(new Set());
  const [reviewHelpfulCounts, setReviewHelpfulCounts] = useState<{
    [key: number]: number;
  }>(() => {
    // 초기 도움됨 카운트를 reviews에서 가져오기
    const initialCounts: { [key: number]: number } = {};
    reviews.forEach((review) => {
      initialCounts[review.id] = review.helpful;
    });
    return initialCounts;
  });

  // 댓글 관련 상태
  const [showComments, setShowComments] = useState<Set<number>>(new Set());
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const [reviewComments, setReviewComments] = useState<{
    [key: number]: Comment[];
  }>(() => {
    // 초기 댓글 데이터를 reviews에서 가져오기
    const initialComments: { [key: number]: Comment[] } = {};
    reviews.forEach((review) => {
      initialComments[review.id] = review.comments || [];
    });
    return initialComments;
  });

  const { toast } = useToast();

  // reviews가 변경되면 reviewHelpfulCounts와 reviewComments 업데이트
  useEffect(() => {
    setReviewHelpfulCounts((prev) => {
      const newCounts: { [key: number]: number } = {};
      reviews.forEach((review) => {
        // 기존에 클릭한 리뷰는 증가된 카운트 유지, 새 리뷰는 기본 카운트 사용
        newCounts[review.id] =
          prev[review.id] !== undefined ? prev[review.id] : review.helpful;
      });
      return newCounts;
    });

    setReviewComments((prev) => {
      const newComments: { [key: number]: Comment[] } = {};
      reviews.forEach((review) => {
        // 기존 댓글 유지, 새 리뷰는 기본 댓글 사용
        newComments[review.id] = prev[review.id] || review.comments || [];
      });
      return newComments;
    });
  }, [reviews]);

  // 도움됨 버튼 클릭 핸들러
  const handleHelpfulClick = (reviewId: number) => {
    if (helpfulClicks.has(reviewId)) {
      // 이미 클릭한 경우
      toast({
        title: "이미 도움됨을 표시했습니다",
        description: "각 리뷰당 한 번만 도움됨을 표시할 수 있습니다.",
        variant: "default",
      });
      return;
    }

    // 도움됨 카운트 증가
    setReviewHelpfulCounts((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));

    // 클릭 기록 추가
    setHelpfulClicks((prev) => new Set(prev).add(reviewId));

    // 성공 메시지
    toast({
      title: "도움됨으로 표시했습니다",
      description: "리뷰 작성자에게 도움이 되었다는 것을 알려드렸습니다.",
      variant: "default",
    });
  };

  // 댓글 토글 핸들러
  const handleToggleComments = (reviewId: number) => {
    setShowComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  // 댓글 입력 핸들러
  const handleCommentChange = (reviewId: number, content: string) => {
    setNewComments((prev) => ({
      ...prev,
      [reviewId]: content,
    }));
  };

  // 댓글 추가 핸들러
  const handleAddComment = (reviewId: number) => {
    const content = newComments[reviewId]?.trim();
    if (!content) {
      toast({
        title: "댓글을 입력해주세요",
        description: "빈 댓글은 등록할 수 없습니다.",
        variant: "destructive",
      });
      return;
    }

    const newComment: Comment = {
      id: Date.now(), // 실제로는 서버에서 생성된 ID 사용
      userId: "current_user", // 실제로는 현재 로그인한 사용자 ID
      userName: "나", // 실제로는 현재 로그인한 사용자 이름
      content: content,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    };

    // 댓글 추가
    setReviewComments((prev) => ({
      ...prev,
      [reviewId]: [...(prev[reviewId] || []), newComment],
    }));

    // 입력 필드 초기화
    setNewComments((prev) => ({
      ...prev,
      [reviewId]: "",
    }));

    toast({
      title: "댓글이 등록되었습니다",
      description: "리뷰에 댓글을 성공적으로 추가했습니다.",
      variant: "default",
    });
  };

  const filteredReviews = reviews.filter(
    (review) => selectedRating === null || review.rating === selectedRating
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "helpful":
        return (
          (reviewHelpfulCounts[b.id] || b.helpful) -
          (reviewHelpfulCounts[a.id] || a.helpful)
        );
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
                      <div key={index} className="relative w-20 h-20">
                        <Image
                          src={image}
                          alt={`리뷰 이미지 ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-cover rounded-lg"
                          unoptimized={true}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button
                    className={`flex items-center space-x-1 transition-colors ${
                      helpfulClicks.has(review.id)
                        ? "text-blue-600 hover:text-blue-700"
                        : "hover:text-gray-700"
                    }`}
                    onClick={() => handleHelpfulClick(review.id)}
                  >
                    <ThumbsUp
                      className={`h-4 w-4 ${
                        helpfulClicks.has(review.id) ? "fill-current" : ""
                      }`}
                    />
                    <span>
                      도움됨 ({reviewHelpfulCounts[review.id] || review.helpful}
                      ){helpfulClicks.has(review.id) && " ✓"}
                    </span>
                  </button>
                  <button
                    className="flex items-center space-x-1 hover:text-gray-700"
                    onClick={() => handleToggleComments(review.id)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>
                      댓글 ({(reviewComments[review.id] || []).length})
                    </span>
                  </button>
                </div>

                {/* 댓글 섹션 */}
                {showComments.has(review.id) && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200">
                    {/* 기존 댓글 목록 */}
                    {(reviewComments[review.id] || []).length > 0 && (
                      <div className="space-y-3 mb-4">
                        {(reviewComments[review.id] || []).map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-gray-50 p-3 rounded-lg"
                          >
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={comment.userAvatar} />
                                <AvatarFallback>
                                  {comment.userName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-sm">
                                    {comment.userName}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {comment.date}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">
                                  {comment.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 댓글 작성 폼 */}
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>나</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <textarea
                            value={newComments[review.id] || ""}
                            onChange={(e) =>
                              handleCommentChange(review.id, e.target.value)
                            }
                            placeholder="댓글을 작성해주세요..."
                            className="w-full p-2 border border-gray-300 rounded-md resize-none text-sm"
                            rows={2}
                          />
                          <div className="flex justify-end mt-2">
                            <Button
                              size="sm"
                              onClick={() => handleAddComment(review.id)}
                              disabled={!newComments[review.id]?.trim()}
                            >
                              댓글 등록
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
