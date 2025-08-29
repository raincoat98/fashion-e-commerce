"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBanners } from "@/hooks/useBanners";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  ArrowUp,
  ArrowDown,
  Home,
} from "lucide-react";

interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BannerManager() {
  const {
    banners,
    loading,
    error,
    addBanner,
    updateBanner,
    deleteBanner,
    reorderBanners,
    toggleBannerStatus,
  } = useBanners();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    order: 1,
    isActive: true,
  });

  const handleAddBanner = () => {
    setEditingBanner(null);
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      linkUrl: "",
      order: banners.length + 1,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      description: banner.description,
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl,
      order: banner.order,
      isActive: banner.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteBanner = async (id: string) => {
    if (confirm("정말로 이 배너를 삭제하시겠습니까?")) {
      try {
        await deleteBanner(id);
      } catch (error) {
        console.error("Failed to delete banner:", error);
      }
    }
  };

  const handleSaveBanner = async () => {
    try {
      if (editingBanner) {
        // 수정
        await updateBanner(editingBanner.id, formData);
      } else {
        // 새로 추가
        await addBanner(formData);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to save banner:", error);
    }
  };

  const handleOrderChange = async (id: string, direction: "up" | "down") => {
    const currentIndex = banners.findIndex((banner) => banner.id === id);
    if (currentIndex === -1) return;

    const newBanners = [...banners];
    if (direction === "up" && currentIndex > 0) {
      [newBanners[currentIndex], newBanners[currentIndex - 1]] = [
        newBanners[currentIndex - 1],
        newBanners[currentIndex],
      ];
    } else if (direction === "down" && currentIndex < banners.length - 1) {
      [newBanners[currentIndex], newBanners[currentIndex + 1]] = [
        newBanners[currentIndex + 1],
        newBanners[currentIndex],
      ];
    }

    // 순서 번호 업데이트
    const bannerIds = newBanners.map((banner) => banner.id);
    try {
      await reorderBanners(bannerIds);
    } catch (error) {
      console.error("Failed to reorder banners:", error);
    }
  };

  const handleToggleBannerStatus = async (id: string) => {
    try {
      await toggleBannerStatus(id);
    } catch (error) {
      console.error("Failed to toggle banner status:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div className="text-gray-500">배너 로딩 중...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center text-red-500">
              <div>에러: {error}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>배너 관리</CardTitle>
              <CardDescription>
                메인 페이지 배너를 등록, 수정, 삭제할 수 있습니다
              </CardDescription>
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
              <Button
                onClick={handleAddBanner}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>배너 추가</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>순서</TableHead>
                  <TableHead>이미지</TableHead>
                  <TableHead>제목</TableHead>
                  <TableHead>링크</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>등록일</TableHead>
                  <TableHead>액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners.map((banner) => (
                  <TableRow key={banner.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{banner.order}</span>
                        <div className="flex flex-col space-y-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOrderChange(banner.id, "up")}
                            disabled={banner.order === 1}
                          >
                            <ArrowUp className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOrderChange(banner.id, "down")}
                            disabled={banner.order === banners.length}
                          >
                            <ArrowDown className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-20 h-12 rounded-lg overflow-hidden">
                        <img
                          src={banner.imageUrl}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{banner.title}</p>
                        <p className="text-sm text-gray-600">
                          {banner.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-blue-600">
                        {banner.linkUrl}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={banner.isActive}
                          onCheckedChange={() =>
                            handleToggleBannerStatus(banner.id)
                          }
                        />
                        <Badge
                          variant={banner.isActive ? "default" : "secondary"}
                        >
                          {banner.isActive ? (
                            <>
                              <Eye className="w-3 h-3 mr-1" />
                              노출
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 mr-1" />
                              숨김
                            </>
                          )}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {banner.createdAt}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditBanner(banner)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          수정
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteBanner(banner.id)}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          삭제
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 배너 추가/수정 다이얼로그 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingBanner ? "배너 수정" : "새 배너 추가"}
            </DialogTitle>
            <DialogDescription>
              배너 정보를 입력하고 저장하세요
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">배너 제목</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="배너 제목을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="order">노출 순서</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value),
                    })
                  }
                  min="1"
                  max={banners.length + 1}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">배너 설명</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="배너에 대한 설명을 입력하세요"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">이미지 URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="이미지 URL을 입력하세요"
                />
                <Button variant="outline" size="icon">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="linkUrl">링크 URL</Label>
              <Input
                id="linkUrl"
                value={formData.linkUrl}
                onChange={(e) =>
                  setFormData({ ...formData, linkUrl: e.target.value })
                }
                placeholder="클릭 시 이동할 URL을 입력하세요"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
              <Label htmlFor="isActive">배너 노출</Label>
            </div>
            {formData.imageUrl && (
              <div>
                <Label>미리보기</Label>
                <div className="mt-2 w-full h-48 rounded-lg overflow-hidden border">
                  <img
                    src={formData.imageUrl}
                    alt="배너 미리보기"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSaveBanner}>
              {editingBanner ? "수정" : "추가"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
