"use client";

import React, { useState, useEffect } from "react";
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
  ExternalLink,
  Calendar,
  Clock,
  Users,
  Monitor,
  Smartphone,
} from "lucide-react";

interface Popup {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  linkUrl: string;
  width: number;
  height: number;
  position:
    | "center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  displayType: "immediate" | "delay" | "scroll";
  delaySeconds: number;
  scrollPercentage: number;
  targetAudience: "all" | "new" | "returning" | "mobile" | "desktop";
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PopupManager() {
  const [popups, setPopups] = useState<Popup[]>([]);

  // 초기 데이터 로드
  useEffect(() => {
    const savedPopups = localStorage.getItem("popups");
    if (savedPopups) {
      try {
        setPopups(JSON.parse(savedPopups));
      } catch (error) {
        console.error("Failed to parse saved popups:", error);
      }
    } else {
      // 기본 데이터 설정
      const defaultPopups: Popup[] = [
        {
          id: "1",
          title: "신규 회원 특별 혜택",
          content: "회원가입 시 10,000원 할인 쿠폰을 드립니다!",
          imageUrl: "/images/popup-welcome.jpg",
          linkUrl: "/signup",
          width: 400,
          height: 300,
          position: "center",
          displayType: "delay",
          delaySeconds: 3,
          scrollPercentage: 0,
          targetAudience: "new",
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          startTime: "09:00",
          endTime: "18:00",
          isActive: true,
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-01-01T00:00:00Z",
        },
        {
          id: "2",
          title: "특가 상품 안내",
          content: "한정 수량 특가 상품을 확인해보세요!",
          imageUrl: "/images/popup-sale.jpg",
          linkUrl: "/sale",
          width: 500,
          height: 400,
          position: "top-right",
          displayType: "scroll",
          delaySeconds: 0,
          scrollPercentage: 50,
          targetAudience: "all",
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          startTime: "00:00",
          endTime: "23:59",
          isActive: false,
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-01-01T00:00:00Z",
        },
      ];
      setPopups(defaultPopups);
      localStorage.setItem("popups", JSON.stringify(defaultPopups));
    }
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    linkUrl: "",
    width: 400,
    height: 300,
    position: "center" as
      | "center"
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right",
    displayType: "delay" as "immediate" | "delay" | "scroll",
    delaySeconds: 3,
    scrollPercentage: 0,
    targetAudience: "all" as "all" | "new" | "returning" | "mobile" | "desktop",
    startDate: "",
    endDate: "",
    startTime: "09:00",
    endTime: "18:00",
    isActive: true,
  });

  const handleAddPopup = () => {
    setEditingPopup(null);
    setFormData({
      title: "",
      content: "",
      imageUrl: "",
      linkUrl: "",
      width: 400,
      height: 300,
      position: "center" as
        | "center"
        | "top-left"
        | "top-right"
        | "bottom-left"
        | "bottom-right",
      displayType: "delay" as "immediate" | "delay" | "scroll",
      delaySeconds: 3,
      scrollPercentage: 0,
      targetAudience: "all" as
        | "all"
        | "new"
        | "returning"
        | "mobile"
        | "desktop",
      startDate: "",
      endDate: "",
      startTime: "09:00",
      endTime: "18:00",
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleEditPopup = (popup: Popup) => {
    setEditingPopup(popup);
    setFormData({
      title: popup.title,
      content: popup.content,
      imageUrl: popup.imageUrl,
      linkUrl: popup.linkUrl,
      width: popup.width,
      height: popup.height,
      position: popup.position,
      displayType: popup.displayType,
      delaySeconds: popup.delaySeconds,
      scrollPercentage: popup.scrollPercentage,
      targetAudience: popup.targetAudience,
      startDate: popup.startDate,
      endDate: popup.endDate,
      startTime: popup.startTime,
      endTime: popup.endTime,
      isActive: popup.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSavePopup = () => {
    if (editingPopup) {
      // 수정
      const updatedPopups = popups.map((popup) =>
        popup.id === editingPopup.id
          ? { ...popup, ...formData, updatedAt: new Date().toISOString() }
          : popup
      );
      setPopups(updatedPopups);
      localStorage.setItem("popups", JSON.stringify(updatedPopups));

      // 같은 탭에서 localStorage 변경 알림을 위한 커스텀 이벤트 발생
      const event = new CustomEvent("localStorageChange", {
        detail: { key: "popups", newValue: JSON.stringify(updatedPopups) },
      });
      window.dispatchEvent(event);
    } else {
      // 추가
      const newPopup: Popup = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedPopups = [...popups, newPopup];
      setPopups(updatedPopups);
      localStorage.setItem("popups", JSON.stringify(updatedPopups));

      // 같은 탭에서 localStorage 변경 알림을 위한 커스텀 이벤트 발생
      const event = new CustomEvent("localStorageChange", {
        detail: { key: "popups", newValue: JSON.stringify(updatedPopups) },
      });
      window.dispatchEvent(event);
    }
    setIsDialogOpen(false);
  };

  const handleDeletePopup = (id: string) => {
    const updatedPopups = popups.filter((popup) => popup.id !== id);
    setPopups(updatedPopups);
    localStorage.setItem("popups", JSON.stringify(updatedPopups));

    // 같은 탭에서 localStorage 변경 알림을 위한 커스텀 이벤트 발생
    const event = new CustomEvent("localStorageChange", {
      detail: { key: "popups", newValue: JSON.stringify(updatedPopups) },
    });
    window.dispatchEvent(event);
  };

  const handleToggleStatus = (id: string) => {
    const updatedPopups = popups.map((popup) =>
      popup.id === id
        ? {
            ...popup,
            isActive: !popup.isActive,
            updatedAt: new Date().toISOString(),
          }
        : popup
    );
    setPopups(updatedPopups);
    localStorage.setItem("popups", JSON.stringify(updatedPopups));

    // 같은 탭에서 localStorage 변경 알림을 위한 커스텀 이벤트 발생
    const event = new CustomEvent("localStorageChange", {
      detail: { key: "popups", newValue: JSON.stringify(updatedPopups) },
    });
    window.dispatchEvent(event);
  };

  const getStatusBadge = (popup: Popup) => {
    const now = new Date();
    const startDate = new Date(popup.startDate);
    const endDate = new Date(popup.endDate);
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const startTime =
      parseInt(popup.startTime.split(":")[0]) * 60 +
      parseInt(popup.startTime.split(":")[1]);
    const endTime =
      parseInt(popup.endTime.split(":")[0]) * 60 +
      parseInt(popup.endTime.split(":")[1]);

    if (!popup.isActive) {
      return <Badge variant="secondary">비활성</Badge>;
    }

    if (now < startDate || now > endDate) {
      return <Badge variant="destructive">기간 만료</Badge>;
    }

    if (currentTime < startTime || currentTime > endTime) {
      return <Badge variant="outline">시간 외</Badge>;
    }

    return <Badge variant="default">활성</Badge>;
  };

  const getDisplayTypeText = (type: string) => {
    switch (type) {
      case "immediate":
        return "즉시 표시";
      case "delay":
        return "지연 표시";
      case "scroll":
        return "스크롤 시";
      default:
        return type;
    }
  };

  const getPositionText = (position: string) => {
    switch (position) {
      case "center":
        return "중앙";
      case "top-left":
        return "좌상단";
      case "top-right":
        return "우상단";
      case "bottom-left":
        return "좌하단";
      case "bottom-right":
        return "우하단";
      default:
        return position;
    }
  };

  const getTargetAudienceText = (audience: string) => {
    switch (audience) {
      case "all":
        return "전체";
      case "new":
        return "신규 사용자";
      case "returning":
        return "재방문자";
      case "mobile":
        return "모바일";
      case "desktop":
        return "데스크톱";
      default:
        return audience;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">팝업 관리</h2>
          <p className="text-muted-foreground">
            웹사이트에 표시되는 팝업을 관리합니다.
          </p>
        </div>
        <Button onClick={handleAddPopup}>
          <Plus className="w-4 h-4 mr-2" />새 팝업 추가
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>팝업 목록</CardTitle>
          <CardDescription>
            현재 등록된 팝업 목록입니다. 표시 조건과 상태를 관리할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead>크기</TableHead>
                <TableHead>위치</TableHead>
                <TableHead>표시 조건</TableHead>
                <TableHead>대상</TableHead>
                <TableHead>기간</TableHead>
                <TableHead>시간</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {popups.map((popup) => (
                <TableRow key={popup.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{popup.title}</div>
                      <div className="text-sm text-muted-foreground max-w-xs truncate">
                        {popup.content}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {popup.width} × {popup.height}
                  </TableCell>
                  <TableCell>{getPositionText(popup.position)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{getDisplayTypeText(popup.displayType)}</div>
                      {popup.displayType === "delay" && (
                        <div className="text-muted-foreground">
                          {popup.delaySeconds}초 후
                        </div>
                      )}
                      {popup.displayType === "scroll" && (
                        <div className="text-muted-foreground">
                          {popup.scrollPercentage}% 스크롤 시
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTargetAudienceText(popup.targetAudience)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{popup.startDate}</div>
                      <div className="text-muted-foreground">
                        ~ {popup.endDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{popup.startTime}</div>
                      <div className="text-muted-foreground">
                        ~ {popup.endTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(popup)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(popup.id)}
                      >
                        {popup.isActive ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPopup(popup)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePopup(popup.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPopup ? "팝업 수정" : "새 팝업 추가"}
            </DialogTitle>
            <DialogDescription>
              팝업의 정보와 표시 조건을 설정하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* 기본 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">기본 정보</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">제목</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="팝업 제목을 입력하세요"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkUrl">링크 URL</Label>
                  <Input
                    id="linkUrl"
                    value={formData.linkUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, linkUrl: e.target.value })
                    }
                    placeholder="클릭 시 이동할 URL을 입력하세요 (선택사항)"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="팝업에 표시할 내용을 입력하세요"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">이미지 URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="팝업 이미지 URL을 입력하세요 (선택사항)"
                />
              </div>
            </div>

            {/* 표시 설정 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">표시 설정</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">너비 (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={formData.width}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        width: parseInt(e.target.value),
                      })
                    }
                    min="200"
                    max="800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">높이 (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        height: parseInt(e.target.value),
                      })
                    }
                    min="200"
                    max="600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">위치</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, position: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="center">중앙</SelectItem>
                      <SelectItem value="top-left">좌상단</SelectItem>
                      <SelectItem value="top-right">우상단</SelectItem>
                      <SelectItem value="bottom-left">좌하단</SelectItem>
                      <SelectItem value="bottom-right">우하단</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 표시 조건 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">표시 조건</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayType">표시 방식</Label>
                  <Select
                    value={formData.displayType}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, displayType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">즉시 표시</SelectItem>
                      <SelectItem value="delay">지연 표시</SelectItem>
                      <SelectItem value="scroll">스크롤 시</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">대상 사용자</Label>
                  <Select
                    value={formData.targetAudience}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, targetAudience: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="new">신규 사용자</SelectItem>
                      <SelectItem value="returning">재방문자</SelectItem>
                      <SelectItem value="mobile">모바일</SelectItem>
                      <SelectItem value="desktop">데스크톱</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {(formData.displayType === "delay" ||
                formData.displayType === "immediate") && (
                <div className="space-y-2">
                  <Label htmlFor="delaySeconds">지연 시간 (초)</Label>
                  <Input
                    id="delaySeconds"
                    type="number"
                    value={formData.delaySeconds}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        delaySeconds: parseInt(e.target.value),
                      })
                    }
                    min="1"
                    max="60"
                  />
                </div>
              )}
              {formData.displayType === "scroll" && (
                <div className="space-y-2">
                  <Label htmlFor="scrollPercentage">스크롤 비율 (%)</Label>
                  <Input
                    id="scrollPercentage"
                    type="number"
                    value={formData.scrollPercentage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scrollPercentage: parseInt(e.target.value),
                      })
                    }
                    min="0"
                    max="100"
                  />
                </div>
              )}
            </div>

            {/* 기간 설정 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">기간 설정</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">시작일</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">종료일</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">시작 시간</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">종료 시간</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
              <Label htmlFor="isActive">활성화</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSavePopup}>
              {editingPopup ? "수정" : "추가"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
