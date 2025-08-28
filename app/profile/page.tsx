"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddressManager from "@/components/shipping/AddressManager";
import {
  User,
  ShoppingBag,
  Star,
  Heart,
  Settings,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Package,
  CheckCircle,
  Clock,
  Truck,
  Edit,
  Save,
  X,
} from "lucide-react";

interface CustomerProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  joinDate: string;
  lastLogin: string;
  membershipLevel: "bronze" | "silver" | "gold" | "platinum";
  totalOrders: number;
  totalSpent: number;
  totalReviews: number;
  averageRating: number;
  points: number;
}

interface Order {
  id: string;
  orderDate: string;
  status:
    | "pending"
    | "paid"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  totalAmount: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    size: string;
    color: string;
    image: string;
  }[];
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
}

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  helpfulCount: number;
}

const mockProfile: CustomerProfile = {
  id: "CUST-001",
  email: "kim@email.com",
  name: "김미영",
  phone: "010-1234-5678",
  address: "서울시 강남구 테헤란로 123, 456호",
  joinDate: "2023-01-15",
  lastLogin: "2024-01-20 14:30:00",
  membershipLevel: "gold",
  totalOrders: 12,
  totalSpent: 850000,
  totalReviews: 8,
  averageRating: 4.5,
  points: 1250,
};

const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    orderDate: "2024-01-15 14:30:00",
    status: "delivered",
    totalAmount: 89000,
    items: [
      {
        id: "1",
        name: "LUMINA 시그니처 티셔츠",
        quantity: 2,
        price: 35000,
        size: "M",
        color: "화이트",
        image: "https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=T-Shirt",
      },
      {
        id: "2",
        name: "프리미엄 데님 팬츠",
        quantity: 1,
        price: 19000,
        size: "L",
        color: "블루",
        image: "https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=Pants",
      },
    ],
    shippingAddress: "서울시 강남구 테헤란로 123, 456호",
    paymentMethod: "신용카드",
    trackingNumber: "HJ1234567890",
  },
  {
    id: "ORD-2024-002",
    orderDate: "2024-01-10 11:20:00",
    status: "shipped",
    totalAmount: 125000,
    items: [
      {
        id: "3",
        name: "베이직 후드 집업",
        quantity: 1,
        price: 65000,
        size: "L",
        color: "그레이",
        image: "https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=Hoodie",
      },
      {
        id: "4",
        name: "크롭 니트 가디건",
        quantity: 1,
        price: 60000,
        size: "M",
        color: "베이지",
        image: "https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=Cardigan",
      },
    ],
    shippingAddress: "서울시 강남구 테헤란로 123, 456호",
    paymentMethod: "카카오페이",
    trackingNumber: "CJ9876543210",
  },
];

const mockReviews: Review[] = [
  {
    id: "REV-001",
    productId: "1",
    productName: "LUMINA 시그니처 티셔츠",
    productImage:
      "https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=T-Shirt",
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
    productId: "2",
    productName: "프리미엄 데님 팬츠",
    productImage: "https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=Pants",
    rating: 4,
    title: "좋은 상품이에요",
    content: "기본에 충실한 데님 팬츠에요. 색상도 예쁘고 착용감도 좋아요.",
    createdAt: "2024-01-16 14:20:00",
    status: "approved",
    helpfulCount: 8,
  },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<CustomerProfile>(mockProfile);
  const [orders] = useState<Order[]>(mockOrders);
  const [reviews] = useState<Review[]>(mockReviews);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    phone: profile.phone,
    address: profile.address,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "결제 대기";
      case "paid":
        return "결제 완료";
      case "processing":
        return "처리 중";
      case "shipped":
        return "배송 중";
      case "delivered":
        return "배송 완료";
      case "cancelled":
        return "취소됨";
      default:
        return status;
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

  const getMembershipLabel = (level: string) => {
    switch (level) {
      case "bronze":
        return "브론즈";
      case "silver":
        return "실버";
      case "gold":
        return "골드";
      case "platinum":
        return "플래티넘";
      default:
        return level;
    }
  };

  const handleSave = () => {
    setProfile({
      ...profile,
      ...editForm,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      phone: profile.phone,
      address: profile.address,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* 프로필 헤더 */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">마이페이지</h1>
              <p className="text-gray-600">내 정보와 주문 내역을 관리하세요</p>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "취소" : "정보 수정"}
            </Button>
          </div>

          {/* 프로필 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>프로필 정보</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">이름</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-gray-900">{profile.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">이메일</Label>
                    <p className="text-gray-900">{profile.email}</p>
                  </div>
                  <div>
                    <Label htmlFor="phone">전화번호</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) =>
                          setEditForm({ ...editForm, phone: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-gray-900">{profile.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="address">주소</Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={editForm.address}
                        onChange={(e) =>
                          setEditForm({ ...editForm, address: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-gray-900">{profile.address}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>멤버십 레벨</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        className={getMembershipColor(profile.membershipLevel)}
                      >
                        {getMembershipLabel(profile.membershipLevel)}
                      </Badge>
                      <Award className="w-4 h-4 text-yellow-500" />
                    </div>
                  </div>
                  <div>
                    <Label>포인트</Label>
                    <p className="text-gray-900">
                      {profile.points.toLocaleString()}P
                    </p>
                  </div>
                  <div>
                    <Label>가입일</Label>
                    <p className="text-gray-900">{profile.joinDate}</p>
                  </div>
                  <div>
                    <Label>마지막 로그인</Label>
                    <p className="text-gray-900">{profile.lastLogin}</p>
                  </div>
                </div>
              </div>
              {isEditing && (
                <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    취소
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    저장
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 통계 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">총 주문</p>
                    <p className="text-xl font-bold text-gray-900">
                      {profile.totalOrders}건
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-blue-800">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      총 구매액
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {profile.totalSpent.toLocaleString()}원
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
                    <p className="text-sm font-medium text-gray-600">리뷰 수</p>
                    <p className="text-xl font-bold text-gray-900">
                      {profile.totalReviews}개
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-100 text-purple-800">
                    <Star className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      평균 평점
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {profile.averageRating}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-yellow-100 text-yellow-800">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 메인 탭 */}
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="orders"
                className="flex items-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>주문 내역</span>
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="flex items-center space-x-2"
              >
                <Star className="w-4 h-4" />
                <span>내 리뷰</span>
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="flex items-center space-x-2"
              >
                <MapPin className="w-4 h-4" />
                <span>배송지 관리</span>
              </TabsTrigger>
              <TabsTrigger
                value="wishlist"
                className="flex items-center space-x-2"
              >
                <Heart className="w-4 h-4" />
                <span>위시리스트</span>
              </TabsTrigger>
            </TabsList>

            {/* 주문 내역 탭 */}
            <TabsContent value="orders" className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <CardDescription>{order.orderDate}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              {item.size} / {item.color} / {item.quantity}개
                            </p>
                            <p className="text-sm text-gray-600">
                              {(item.price * item.quantity).toLocaleString()}원
                            </p>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">총 결제금액</p>
                            <p className="text-lg font-bold">
                              {order.totalAmount.toLocaleString()}원
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">결제수단</p>
                            <p className="text-sm">{order.paymentMethod}</p>
                          </div>
                        </div>
                        {order.trackingNumber && (
                          <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-blue-900">
                              송장번호
                            </p>
                            <p className="text-sm text-blue-700">
                              {order.trackingNumber}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* 내 리뷰 탭 */}
            <TabsContent value="reviews" className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{review.productName}</h4>
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
                        <h5 className="font-medium mb-1">{review.title}</h5>
                        <p className="text-sm text-gray-600 mb-2">
                          {review.content}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{review.createdAt}</span>
                          <span>도움됨 {review.helpfulCount}개</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(review.status)}>
                        {review.status === "pending"
                          ? "승인 대기"
                          : review.status === "approved"
                          ? "승인됨"
                          : "거부됨"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* 배송지 관리 탭 */}
            <TabsContent value="addresses" className="space-y-4">
              <AddressManager />
            </TabsContent>

            {/* 위시리스트 탭 */}
            <TabsContent value="wishlist" className="space-y-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    위시리스트가 비어있습니다
                  </h3>
                  <p className="text-gray-600 mb-4">
                    관심 있는 상품을 위시리스트에 추가해보세요
                  </p>
                  <Button>쇼핑하러 가기</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
