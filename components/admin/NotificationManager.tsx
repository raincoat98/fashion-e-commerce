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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  CheckCircle,
  X,
  Search,
  Filter,
  Trash2,
  Eye,
  Clock,
  AlertCircle,
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
} from "lucide-react";

// 알림 타입 정의
interface Notification {
  id: string;
  type: "order" | "inventory" | "customer" | "system" | "payment";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: "low" | "medium" | "high";
  actionUrl?: string;
}

// Mock 알림 데이터
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "새로운 주문",
    message: "ORD-2025-003 주문이 접수되었습니다. (총 189,000원)",
    timestamp: "2025-01-15T14:30:00",
    isRead: false,
    priority: "high",
    actionUrl: "/admin/orders/ORD-2025-003",
  },
  {
    id: "2",
    type: "inventory",
    title: "재고 부족 알림",
    message: "LUMINA 시그니처 티셔츠 재고가 5개 미만입니다.",
    timestamp: "2025-01-15T13:45:00",
    isRead: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "customer",
    title: "고객 문의",
    message: "새로운 고객 문의가 등록되었습니다. (배송 관련)",
    timestamp: "2025-01-15T12:20:00",
    isRead: true,
    priority: "medium",
  },
  {
    id: "4",
    type: "payment",
    title: "결제 오류",
    message: "ORD-2025-002 주문의 결제 처리 중 오류가 발생했습니다.",
    timestamp: "2025-01-15T11:15:00",
    isRead: false,
    priority: "high",
  },
  {
    id: "5",
    type: "system",
    title: "시스템 업데이트",
    message: "관리자 패널이 성공적으로 업데이트되었습니다.",
    timestamp: "2025-01-15T10:00:00",
    isRead: true,
    priority: "low",
  },
  {
    id: "6",
    type: "order",
    title: "배송 완료",
    message: "ORD-2025-001 주문이 성공적으로 배송 완료되었습니다.",
    timestamp: "2025-01-15T09:30:00",
    isRead: true,
    priority: "low",
  },
];

const NotificationManager: React.FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterRead, setFilterRead] = useState<string>("all");

  // 알림 읽음 처리
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // 모든 알림 읽음 처리
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  // 알림 삭제
  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  // 알림 타입별 아이콘
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="w-4 h-4" />;
      case "inventory":
        return <Package className="w-4 h-4" />;
      case "customer":
        return <Users className="w-4 h-4" />;
      case "payment":
        return <DollarSign className="w-4 h-4" />;
      case "system":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  // 우선순위별 배지 색상
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            높음
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="secondary" className="text-xs">
            보통
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="text-xs">
            낮음
          </Badge>
        );
      default:
        return null;
    }
  };

  // 필터링된 알림
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" || notification.type === filterType;
    const matchesPriority =
      filterPriority === "all" || notification.priority === filterPriority;
    const matchesRead =
      filterRead === "all" ||
      (filterRead === "read" && notification.isRead) ||
      (filterRead === "unread" && !notification.isRead);

    return matchesSearch && matchesType && matchesPriority && matchesRead;
  });

  // 읽지 않은 알림 개수
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            알림 관리
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            총 {notifications.length}개의 알림, {unreadCount}개 읽지 않음
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            모두 읽음 처리
          </Button>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
            필터 및 검색
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                검색
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                <Input
                  placeholder="알림 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                타입
              </label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="모든 타입" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 타입</SelectItem>
                  <SelectItem value="order">주문</SelectItem>
                  <SelectItem value="inventory">재고</SelectItem>
                  <SelectItem value="customer">고객</SelectItem>
                  <SelectItem value="payment">결제</SelectItem>
                  <SelectItem value="system">시스템</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                우선순위
              </label>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="모든 우선순위" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 우선순위</SelectItem>
                  <SelectItem value="high">높음</SelectItem>
                  <SelectItem value="medium">보통</SelectItem>
                  <SelectItem value="low">낮음</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                읽음 상태
              </label>
              <Select value={filterRead} onValueChange={setFilterRead}>
                <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="모든 상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="unread">읽지 않음</SelectItem>
                  <SelectItem value="read">읽음</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 알림 목록 */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
            알림 목록 ({filteredNotifications.length}개)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-500" />
                <p>표시할 알림이 없습니다.</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    notification.isRead
                      ? "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      : "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-600 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div
                        className={`mt-1 ${
                          notification.isRead
                            ? "text-gray-400 dark:text-gray-500"
                            : "text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4
                            className={`font-medium ${
                              notification.isRead
                                ? "text-gray-600 dark:text-gray-400"
                                : "text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          {getPriorityBadge(notification.priority)}
                          {!notification.isRead && (
                            <Badge
                              variant="default"
                              className="bg-blue-600 dark:bg-blue-700 text-xs"
                            >
                              NEW
                            </Badge>
                          )}
                        </div>
                        <p
                          className={`text-sm ${
                            notification.isRead
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400 dark:text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {new Date(notification.timestamp).toLocaleString(
                                "ko-KR"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          title="읽음 처리"
                          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      {notification.actionUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            window.open(notification.actionUrl, "_blank")
                          }
                          title="상세 보기"
                          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        title="삭제"
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationManager;
