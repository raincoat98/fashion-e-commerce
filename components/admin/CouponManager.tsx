"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Users,
  Percent,
  DollarSign,
  Gift,
  Eye,
  EyeOff,
  Download,
  Search,
  Home,
} from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  applicableCategories: string[];
  applicableProducts: string[];
  createdAt: string;
  createdBy: string;
}

const mockCoupons: Coupon[] = [
  {
    id: "1",
    code: "WELCOME20",
    name: "신규 고객 20% 할인",
    description: "첫 구매 고객을 위한 특별 할인 쿠폰",
    type: "percentage",
    value: 20,
    minOrderAmount: 50000,
    maxDiscountAmount: 50000,
    usageLimit: 1000,
    usedCount: 245,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    isActive: true,
    applicableCategories: ["all"],
    applicableProducts: [],
    createdAt: "2025-01-01",
    createdBy: "admin",
  },
  {
    id: "2",
    code: "SPRING5000",
    name: "봄 시즌 5,000원 할인",
    description: "봄 시즌 컬렉션 구매 시 사용 가능한 쿠폰",
    type: "fixed",
    value: 5000,
    minOrderAmount: 30000,
    usageLimit: 500,
    usedCount: 89,
    startDate: "2025-03-01",
    endDate: "2025-05-31",
    isActive: true,
    applicableCategories: ["new", "outer", "dress"],
    applicableProducts: [],
    createdAt: "2025-02-15",
    createdBy: "admin",
  },
  {
    id: "3",
    code: "FREESHIP",
    name: "무료 배송 쿠폰",
    description: "5만원 이상 구매 시 무료 배송",
    type: "free_shipping",
    value: 0,
    minOrderAmount: 50000,
    usageLimit: 2000,
    usedCount: 567,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    isActive: true,
    applicableCategories: ["all"],
    applicableProducts: [],
    createdAt: "2025-01-01",
    createdBy: "admin",
  },
];

const categoryOptions = [
  { value: "all", label: "전체 상품" },
  { value: "new", label: "신상품" },
  { value: "outer", label: "아우터" },
  { value: "top", label: "상의" },
  { value: "bottom", label: "하의" },
  { value: "dress", label: "원피스" },
  { value: "accessory", label: "액세서리" },
];

export default function CouponManager() {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // 새 쿠폰 폼 상태
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    name: "",
    description: "",
    type: "percentage" as const,
    value: 0,
    minOrderAmount: 0,
    maxDiscountAmount: 0,
    usageLimit: 100,
    startDate: "",
    endDate: "",
    applicableCategories: [] as string[],
  });

  // 필터링된 쿠폰
  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && coupon.isActive) ||
      (selectedStatus === "inactive" && !coupon.isActive);
    return matchesSearch && matchesStatus;
  });

  // 쿠폰 생성
  const createCoupon = () => {
    const coupon: Coupon = {
      id: Date.now().toString(),
      ...newCoupon,
      usedCount: 0,
      isActive: true,
      applicableProducts: [],
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: "admin",
    };
    setCoupons([...coupons, coupon]);
    setIsCreateDialogOpen(false);
    setNewCoupon({
      code: "",
      name: "",
      description: "",
      type: "percentage",
      value: 0,
      minOrderAmount: 0,
      maxDiscountAmount: 0,
      usageLimit: 100,
      startDate: "",
      endDate: "",
      applicableCategories: [],
    });
  };

  // 쿠폰 수정
  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === id ? { ...coupon, ...updates } : coupon
      )
    );
    setEditingCoupon(null);
    setIsEditDialogOpen(false);
  };

  // 쿠폰 수정 다이얼로그 열기
  const openEditDialog = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setIsEditDialogOpen(true);
  };

  // 쿠폰 삭제
  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  // 쿠폰 활성화/비활성화
  const toggleCouponStatus = (id: string) => {
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === id ? { ...coupon, isActive: !coupon.isActive } : coupon
      )
    );
  };

  // 쿠폰 코드 복사
  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  // 쿠폰 코드 자동 생성
  const generateCouponCode = () => {
    const patterns = [
      // LUMINA + 타임스탬프 + 랜덤
      () => {
        const prefix = "LUMINA";
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${prefix}${timestamp}${random}`;
      },
      // 할인율 기반 코드
      () => {
        const discount = newCoupon.value || 20;
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `SAVE${discount}${random}`;
      },
      // 시즌 기반 코드
      () => {
        const seasons = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];
        const currentSeason =
          seasons[Math.floor(Math.random() * seasons.length)];
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `${currentSeason}${random}`;
      },
      // 숫자 기반 코드
      () => {
        const numbers = Math.floor(Math.random() * 900000) + 100000;
        return `CODE${numbers}`;
      },
    ];

    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const generatedCode = randomPattern();
    setNewCoupon({ ...newCoupon, code: generatedCode });
  };

  // 쿠폰 코드 자동 생성 (수정용)
  const generateEditCouponCode = () => {
    const patterns = [
      // LUMINA + 타임스탬프 + 랜덤
      () => {
        const prefix = "LUMINA";
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${prefix}${timestamp}${random}`;
      },
      // 할인율 기반 코드
      () => {
        const discount = editingCoupon?.value || 20;
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `SAVE${discount}${random}`;
      },
      // 시즌 기반 코드
      () => {
        const seasons = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];
        const currentSeason =
          seasons[Math.floor(Math.random() * seasons.length)];
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `${currentSeason}${random}`;
      },
      // 숫자 기반 코드
      () => {
        const numbers = Math.floor(Math.random() * 900000) + 100000;
        return `CODE${numbers}`;
      },
    ];

    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const generatedCode = randomPattern();
    if (editingCoupon) {
      setEditingCoupon({ ...editingCoupon, code: generatedCode });
    }
  };

  // 통계 계산
  const activeCoupons = coupons.filter((coupon) => coupon.isActive).length;
  const totalUsage = coupons.reduce((sum, coupon) => sum + coupon.usedCount, 0);
  const expiringSoon = coupons.filter((coupon) => {
    const endDate = new Date(coupon.endDate);
    const today = new Date();
    const diffDays = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffDays <= 7 && diffDays > 0;
  }).length;

  const getCouponTypeLabel = (type: string) => {
    switch (type) {
      case "percentage":
        return "퍼센트 할인";
      case "fixed":
        return "정액 할인";
      case "free_shipping":
        return "무료 배송";
      default:
        return type;
    }
  };

  const getCouponValueDisplay = (coupon: Coupon) => {
    switch (coupon.type) {
      case "percentage":
        return `${coupon.value}%`;
      case "fixed":
        return `${coupon.value.toLocaleString()}원`;
      case "free_shipping":
        return "무료 배송";
      default:
        return coupon.value;
    }
  };

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">활성 쿠폰</p>
                <p className="text-2xl font-bold text-blue-600">
                  {activeCoupons}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  총 사용 횟수
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {totalUsage}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">만료 예정</p>
                <p className="text-2xl font-bold text-orange-600">
                  {expiringSoon}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 쿠폰</p>
                <p className="text-2xl font-bold text-purple-600">
                  {coupons.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Percent className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 쿠폰 관리 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>쿠폰 관리</CardTitle>
              <CardDescription>쿠폰을 생성하고 관리하세요</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>홈으로 가기</span>
                </Button>
              </Link>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>엑셀 다운로드</span>
              </Button>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="lumina-gradient text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    쿠폰 생성
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>새 쿠폰 생성</DialogTitle>
                    <DialogDescription>
                      새로운 프로모션 쿠폰을 생성하세요
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="code">쿠폰 코드</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="code"
                            value={newCoupon.code}
                            onChange={(e) =>
                              setNewCoupon({
                                ...newCoupon,
                                code: e.target.value,
                              })
                            }
                            placeholder="예: WELCOME20"
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={generateCouponCode}
                            className="whitespace-nowrap"
                          >
                            코드 생성
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="name">쿠폰명</Label>
                        <Input
                          id="name"
                          value={newCoupon.name}
                          onChange={(e) =>
                            setNewCoupon({ ...newCoupon, name: e.target.value })
                          }
                          placeholder="쿠폰 이름"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">설명</Label>
                      <Textarea
                        id="description"
                        value={newCoupon.description}
                        onChange={(e) =>
                          setNewCoupon({
                            ...newCoupon,
                            description: e.target.value,
                          })
                        }
                        placeholder="쿠폰에 대한 설명"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="type">쿠폰 타입</Label>
                        <Select
                          value={newCoupon.type}
                          onValueChange={(value: any) =>
                            setNewCoupon({ ...newCoupon, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">
                              퍼센트 할인
                            </SelectItem>
                            <SelectItem value="fixed">정액 할인</SelectItem>
                            <SelectItem value="free_shipping">
                              무료 배송
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="value">할인 값</Label>
                        <Input
                          id="value"
                          type="number"
                          value={newCoupon.value}
                          onChange={(e) =>
                            setNewCoupon({
                              ...newCoupon,
                              value: parseInt(e.target.value),
                            })
                          }
                          placeholder={
                            newCoupon.type === "percentage" ? "20" : "5000"
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="minOrder">최소 주문 금액</Label>
                        <Input
                          id="minOrder"
                          type="number"
                          value={newCoupon.minOrderAmount}
                          onChange={(e) =>
                            setNewCoupon({
                              ...newCoupon,
                              minOrderAmount: parseInt(e.target.value),
                            })
                          }
                          placeholder="30000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">시작일</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={newCoupon.startDate}
                          onChange={(e) =>
                            setNewCoupon({
                              ...newCoupon,
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">종료일</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={newCoupon.endDate}
                          onChange={(e) =>
                            setNewCoupon({
                              ...newCoupon,
                              endDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateDialogOpen(false)}
                      >
                        취소
                      </Button>
                      <Button
                        onClick={createCoupon}
                        className="lumina-gradient text-white"
                      >
                        쿠폰 생성
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* 쿠폰 수정 다이얼로그 */}
              <Dialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              >
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>쿠폰 수정</DialogTitle>
                    <DialogDescription>
                      쿠폰 정보를 수정하세요
                    </DialogDescription>
                  </DialogHeader>
                  {editingCoupon && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="edit-code">쿠폰 코드</Label>
                          <div className="flex space-x-2">
                            <Input
                              id="edit-code"
                              value={editingCoupon.code}
                              onChange={(e) =>
                                setEditingCoupon({
                                  ...editingCoupon,
                                  code: e.target.value,
                                })
                              }
                              placeholder="예: WELCOME20"
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={generateEditCouponCode}
                              className="whitespace-nowrap"
                            >
                              코드 생성
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="edit-name">쿠폰명</Label>
                          <Input
                            id="edit-name"
                            value={editingCoupon.name}
                            onChange={(e) =>
                              setEditingCoupon({
                                ...editingCoupon,
                                name: e.target.value,
                              })
                            }
                            placeholder="쿠폰 이름"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="edit-description">설명</Label>
                        <Textarea
                          id="edit-description"
                          value={editingCoupon.description}
                          onChange={(e) =>
                            setEditingCoupon({
                              ...editingCoupon,
                              description: e.target.value,
                            })
                          }
                          placeholder="쿠폰에 대한 설명"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="edit-type">쿠폰 타입</Label>
                          <Select
                            value={editingCoupon.type}
                            onValueChange={(value: any) =>
                              setEditingCoupon({
                                ...editingCoupon,
                                type: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="percentage">
                                퍼센트 할인
                              </SelectItem>
                              <SelectItem value="fixed">정액 할인</SelectItem>
                              <SelectItem value="free_shipping">
                                무료 배송
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="edit-value">할인 값</Label>
                          <Input
                            id="edit-value"
                            type="number"
                            value={editingCoupon.value}
                            onChange={(e) =>
                              setEditingCoupon({
                                ...editingCoupon,
                                value: parseInt(e.target.value),
                              })
                            }
                            placeholder={
                              editingCoupon.type === "percentage"
                                ? "20"
                                : "5000"
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-minOrder">최소 주문 금액</Label>
                          <Input
                            id="edit-minOrder"
                            type="number"
                            value={editingCoupon.minOrderAmount}
                            onChange={(e) =>
                              setEditingCoupon({
                                ...editingCoupon,
                                minOrderAmount: parseInt(e.target.value),
                              })
                            }
                            placeholder="30000"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="edit-startDate">시작일</Label>
                          <Input
                            id="edit-startDate"
                            type="date"
                            value={editingCoupon.startDate}
                            onChange={(e) =>
                              setEditingCoupon({
                                ...editingCoupon,
                                startDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-endDate">종료일</Label>
                          <Input
                            id="edit-endDate"
                            type="date"
                            value={editingCoupon.endDate}
                            onChange={(e) =>
                              setEditingCoupon({
                                ...editingCoupon,
                                endDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="edit-usageLimit">사용 제한</Label>
                        <Input
                          id="edit-usageLimit"
                          type="number"
                          value={editingCoupon.usageLimit}
                          onChange={(e) =>
                            setEditingCoupon({
                              ...editingCoupon,
                              usageLimit: parseInt(e.target.value),
                            })
                          }
                          placeholder="100"
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditDialogOpen(false)}
                        >
                          취소
                        </Button>
                        <Button
                          onClick={() =>
                            updateCoupon(editingCoupon.id, editingCoupon)
                          }
                          className="lumina-gradient text-white"
                        >
                          수정 완료
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="active">활성</SelectItem>
                  <SelectItem value="inactive">비활성</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="쿠폰 코드, 이름 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>

          {/* 쿠폰 목록 */}
          <div className="space-y-4">
            {filteredCoupons.map((coupon) => (
              <Card
                key={coupon.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">
                            {coupon.name}
                          </h3>
                          <Badge
                            className={
                              coupon.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {coupon.isActive ? "활성" : "비활성"}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800">
                            {getCouponTypeLabel(coupon.type)}
                          </Badge>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <strong>코드:</strong> {coupon.code}
                          </p>
                          <p>{coupon.description}</p>
                          <p>
                            <strong>할인:</strong>{" "}
                            {getCouponValueDisplay(coupon)}
                          </p>
                          <p>
                            <strong>최소 주문:</strong>{" "}
                            {coupon.minOrderAmount.toLocaleString()}원
                          </p>
                          <p>
                            <strong>사용:</strong> {coupon.usedCount} /{" "}
                            {coupon.usageLimit}
                          </p>
                          <p>
                            <strong>기간:</strong> {coupon.startDate} ~{" "}
                            {coupon.endDate}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyCouponCode(coupon.code)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(coupon)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleCouponStatus(coupon.id)}
                      >
                        {coupon.isActive ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteCoupon(coupon.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
