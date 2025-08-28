"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  User,
  ShoppingBag,
  Star,
  CheckCircle,
  X,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react";

interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  joinDate: string;
  lastLogin: string;
  status: "active" | "inactive" | "suspended";
  membershipLevel: "bronze" | "silver" | "gold" | "platinum";
  totalOrders: number;
  totalSpent: number;
  totalReviews: number;
  averageRating: number;
}

interface Review {
  id: string;
  customerId: string;
  customerName: string;
  productId: string;
  productName: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  helpfulCount: number;
}

const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    email: "kim@email.com",
    name: "김미영",
    phone: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123, 456호",
    joinDate: "2023-01-15",
    lastLogin: "2024-01-20 14:30:00",
    status: "active",
    membershipLevel: "gold",
    totalOrders: 12,
    totalSpent: 850000,
    totalReviews: 8,
    averageRating: 4.5,
  },
  {
    id: "CUST-002",
    email: "park@email.com",
    name: "박지민",
    phone: "010-9876-5432",
    address: "부산시 해운대구 해운대로 456, 789호",
    joinDate: "2023-03-10",
    lastLogin: "2024-01-19 09:15:00",
    status: "active",
    membershipLevel: "silver",
    totalOrders: 6,
    totalSpent: 320000,
    totalReviews: 4,
    averageRating: 4.2,
  },
];

const mockReviews: Review[] = [
  {
    id: "REV-001",
    customerId: "CUST-001",
    customerName: "김미영",
    productId: "1",
    productName: "LUMINA 시그니처 티셔츠",
    rating: 5,
    title: "정말 만족스러워요!",
    content:
      "소재가 너무 부드럽고 착용감이 좋아요. 디자인도 심플하면서 세련되어서 여러 번 구매하고 싶어요.",
    createdAt: "2024-01-18 16:30:00",
    status: "approved",
    helpfulCount: 12,
  },
  {
    id: "REV-002",
    customerId: "CUST-002",
    customerName: "박지민",
    productId: "3",
    productName: "베이직 후드 집업",
    rating: 4,
    title: "좋은 상품이에요",
    content: "기본에 충실한 후드집업이에요. 색상도 예쁘고 착용감도 좋아요.",
    createdAt: "2024-01-17 14:20:00",
    status: "pending",
    helpfulCount: 3,
  },
];

export default function CustomerManager() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [reviewStatusFilter, setReviewStatusFilter] = useState<string>("all");

  // 고객 통계
  const getCustomerStats = () => {
    return {
      total: customers.length,
      active: customers.filter((c) => c.status === "active").length,
      gold: customers.filter((c) => c.membershipLevel === "gold").length,
      platinum: customers.filter((c) => c.membershipLevel === "platinum")
        .length,
    };
  };

  // 리뷰 통계
  const getReviewStats = () => {
    return {
      total: reviews.length,
      pending: reviews.filter((r) => r.status === "pending").length,
      approved: reviews.filter((r) => r.status === "approved").length,
      averageRating:
        reviews.length > 0
          ? (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)
          : "0.0",
    };
  };

  const customerStats = getCustomerStats();
  const reviewStats = getReviewStats();

  // 고객 검색 및 필터링
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 리뷰 필터링
  const filteredReviews = reviews.filter((review) => {
    return reviewStatusFilter === "all" || review.status === reviewStatusFilter;
  });

  // 리뷰 승인/거부
  const updateReviewStatus = (
    reviewId: string,
    status: "approved" | "rejected"
  ) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          return { ...review, status };
        }
        return review;
      })
    );
    setIsReviewDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMembershipColor = (level: string) => {
    switch (level) {
      case "bronze":
        return "bg-orange-100 text-orange-800";
      case "silver":
        return "bg-gray-100 text-gray-800";
      case "gold":
        return "bg-yellow-100 text-yellow-800";
      case "platinum":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getReviewStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* 고객 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">전체 고객</p>
                <p className="text-xl font-bold text-gray-900">
                  {customerStats.total}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-blue-800">
                <Users className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">활성 고객</p>
                <p className="text-xl font-bold text-gray-900">
                  {customerStats.active}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">VIP 고객</p>
                <p className="text-xl font-bold text-gray-900">
                  {customerStats.gold + customerStats.platinum}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-yellow-100 text-yellow-800">
                <Award className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">승인 대기</p>
                <p className="text-xl font-bold text-gray-900">
                  {reviewStats.pending}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-yellow-100 text-yellow-800">
                <Clock className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 메인 탭 */}
      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="customers"
            className="flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>고객 관리</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center space-x-2">
            <Star className="w-4 h-4" />
            <span>리뷰 관리</span>
          </TabsTrigger>
        </TabsList>

        {/* 고객 관리 탭 */}
        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>고객 목록</CardTitle>
              <CardDescription>
                고객 정보를 관리하고 주문 이력을 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 검색 및 필터 */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="고객명, 이메일로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="active">활성</SelectItem>
                    <SelectItem value="inactive">비활성</SelectItem>
                    <SelectItem value="suspended">정지</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 고객 목록 */}
              <div className="space-y-4">
                {filteredCustomers.map((customer) => (
                  <Card
                    key={customer.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {customer.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {customer.email}
                            </p>
                            <p className="text-sm text-gray-600">
                              {customer.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status === "active"
                              ? "활성"
                              : customer.status === "inactive"
                              ? "비활성"
                              : "정지"}
                          </Badge>
                          <Badge
                            className={getMembershipColor(
                              customer.membershipLevel
                            )}
                          >
                            {customer.membershipLevel === "bronze"
                              ? "브론즈"
                              : customer.membershipLevel === "silver"
                              ? "실버"
                              : customer.membershipLevel === "gold"
                              ? "골드"
                              : "플래티넘"}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">주문 수</p>
                          <p className="font-medium">
                            {customer.totalOrders}건
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">총 구매액</p>
                          <p className="font-medium">
                            {customer.totalSpent.toLocaleString()}원
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">리뷰 수</p>
                          <p className="font-medium">
                            {customer.totalReviews}개
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">평균 평점</p>
                          <p className="font-medium">
                            {customer.averageRating}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="text-sm text-gray-600">
                          가입일: {customer.joinDate} | 마지막 로그인:{" "}
                          {customer.lastLogin}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedCustomer(customer);
                              setIsCustomerDialogOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            상세보기
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 리뷰 관리 탭 */}
        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>리뷰 관리</CardTitle>
              <CardDescription>고객 리뷰를 승인하고 관리하세요</CardDescription>
            </CardHeader>
            <CardContent>
              {/* 리뷰 필터 */}
              <div className="flex items-center space-x-4 mb-6">
                <Select
                  value={reviewStatusFilter}
                  onValueChange={setReviewStatusFilter}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="pending">승인 대기</SelectItem>
                    <SelectItem value="approved">승인됨</SelectItem>
                    <SelectItem value="rejected">거부됨</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 리뷰 목록 */}
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <Card
                    key={review.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">
                              {review.customerName}
                            </h3>
                            <Badge
                              className={getReviewStatusColor(review.status)}
                            >
                              {review.status === "pending"
                                ? "승인 대기"
                                : review.status === "approved"
                                ? "승인됨"
                                : "거부됨"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {review.productName}
                          </p>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {review.rating}/5
                            </span>
                          </div>
                          <h4 className="font-medium mb-1">{review.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {review.content}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{review.createdAt}</span>
                            <span>도움됨 {review.helpfulCount}개</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {review.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateReviewStatus(review.id, "approved")
                                }
                              >
                                <ThumbsUp className="w-4 h-4 mr-1" />
                                승인
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateReviewStatus(review.id, "rejected")
                                }
                              >
                                <ThumbsDown className="w-4 h-4 mr-1" />
                                거부
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedReview(review);
                              setIsReviewDialogOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            상세보기
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 고객 상세 다이얼로그 */}
      <Dialog
        open={isCustomerDialogOpen}
        onOpenChange={setIsCustomerDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>고객 상세 정보</DialogTitle>
            <DialogDescription>
              고객 정보와 주문 이력을 확인하세요
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">기본 정보</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">이름</span>
                      <span>{selectedCustomer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">이메일</span>
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">전화번호</span>
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">주소</span>
                      <span>{selectedCustomer.address}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">계정 정보</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">가입일</span>
                      <span>{selectedCustomer.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">마지막 로그인</span>
                      <span>{selectedCustomer.lastLogin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">상태</span>
                      <Badge
                        className={getStatusColor(selectedCustomer.status)}
                      >
                        {selectedCustomer.status === "active"
                          ? "활성"
                          : selectedCustomer.status === "inactive"
                          ? "비활성"
                          : "정지"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">멤버십</span>
                      <Badge
                        className={getMembershipColor(
                          selectedCustomer.membershipLevel
                        )}
                      >
                        {selectedCustomer.membershipLevel === "bronze"
                          ? "브론즈"
                          : selectedCustomer.membershipLevel === "silver"
                          ? "실버"
                          : selectedCustomer.membershipLevel === "gold"
                          ? "골드"
                          : "플래티넘"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">주문 수</p>
                  <p className="text-xl font-bold">
                    {selectedCustomer.totalOrders}건
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">총 구매액</p>
                  <p className="text-xl font-bold">
                    {selectedCustomer.totalSpent.toLocaleString()}원
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">리뷰 수</p>
                  <p className="text-xl font-bold">
                    {selectedCustomer.totalReviews}개
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">평균 평점</p>
                  <p className="text-xl font-bold">
                    {selectedCustomer.averageRating}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 리뷰 상세 다이얼로그 */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>리뷰 상세</DialogTitle>
            <DialogDescription>
              리뷰 내용을 확인하고 승인/거부를 결정하세요
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{selectedReview.customerName}</h4>
                  <Badge
                    className={getReviewStatusColor(selectedReview.status)}
                  >
                    {selectedReview.status === "pending"
                      ? "승인 대기"
                      : selectedReview.status === "approved"
                      ? "승인됨"
                      : "거부됨"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedReview.productName}
                </p>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= selectedReview.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {selectedReview.rating}/5
                  </span>
                </div>
                <h5 className="font-medium mb-1">{selectedReview.title}</h5>
                <p className="text-sm text-gray-600">
                  {selectedReview.content}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  작성일: {selectedReview.createdAt}
                </p>
              </div>

              {selectedReview.status === "pending" && (
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      updateReviewStatus(selectedReview.id, "approved")
                    }
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    승인
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      updateReviewStatus(selectedReview.id, "rejected")
                    }
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    거부
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
