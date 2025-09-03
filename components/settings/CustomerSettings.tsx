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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Settings,
  Bell,
  Mail,
  MessageSquare,
  Shield,
  User,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  AlertTriangle,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Key,
  Smartphone,
  CreditCard,
  Heart,
  Star,
  Award,
  LogOut,
} from "lucide-react";

interface CustomerSettings {
  id: string;
  email: string;
  name: string;
  phone: string;
  birthDate: string;
  gender: "male" | "female" | "other";
  address: string;
  joinDate: string;
  lastLogin: string;
  membershipLevel: "bronze" | "silver" | "gold" | "platinum";
  points: number;
  totalOrders: number;
  totalSpent: number;
  totalReviews: number;
  averageRating: number;

  // 알림 설정
  emailNotifications: {
    orderUpdates: boolean;
    promotions: boolean;
    newsletters: boolean;
    reviews: boolean;
  };
  smsNotifications: {
    orderUpdates: boolean;
    promotions: boolean;
    deliveryUpdates: boolean;
  };
  pushNotifications: {
    orderUpdates: boolean;
    promotions: boolean;
    newProducts: boolean;
  };

  // 마케팅 동의
  marketingConsent: {
    email: boolean;
    sms: boolean;
    push: boolean;
    thirdParty: boolean;
  };

  // 개인정보 설정
  privacySettings: {
    profileVisibility: "public" | "private" | "friends";
    showOrderHistory: boolean;
    showReviews: boolean;
    showWishlist: boolean;
  };

  // 보안 설정
  securitySettings: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    deviceManagement: boolean;
  };
}

const mockSettings: CustomerSettings = {
  id: "CUST-001",
  email: "kim@email.com",
  name: "김미영",
  phone: "010-1234-5678",
  birthDate: "1995-03-15",
  gender: "female",
  address: "서울시 강남구 테헤란로 123, 456호",
  joinDate: "2023-01-15",
  lastLogin: "2024-01-20 14:30:00",
  membershipLevel: "gold",
  points: 1250,
  totalOrders: 12,
  totalSpent: 850000,
  totalReviews: 8,
  averageRating: 4.5,

  emailNotifications: {
    orderUpdates: true,
    promotions: true,
    newsletters: false,
    reviews: true,
  },
  smsNotifications: {
    orderUpdates: true,
    promotions: false,
    deliveryUpdates: true,
  },
  pushNotifications: {
    orderUpdates: true,
    promotions: true,
    newProducts: false,
  },

  marketingConsent: {
    email: true,
    sms: false,
    push: true,
    thirdParty: false,
  },

  privacySettings: {
    profileVisibility: "private",
    showOrderHistory: true,
    showReviews: true,
    showWishlist: false,
  },

  securitySettings: {
    twoFactorAuth: false,
    loginAlerts: true,
    deviceManagement: true,
  },
};

export default function CustomerSettings() {
  const [settings, setSettings] = useState<CustomerSettings>(mockSettings);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: settings.name,
    phone: settings.phone,
    birthDate: settings.birthDate,
    gender: settings.gender,
    address: settings.address,
  });
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [withdrawReason, setWithdrawReason] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    setSettings({
      ...settings,
      ...editForm,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: settings.name,
      phone: settings.phone,
      birthDate: settings.birthDate,
      gender: settings.gender,
      address: settings.address,
    });
    setIsEditing(false);
  };

  const updateNotificationSettings = (
    type: "email" | "sms" | "push",
    category: string,
    value: boolean
  ) => {
    setSettings((prev) => {
      const notificationKey = `${type}Notifications` as keyof typeof prev;
      const currentNotifications = prev[notificationKey] as Record<
        string,
        boolean
      >;

      return {
        ...prev,
        [notificationKey]: {
          ...currentNotifications,
          [category]: value,
        },
      };
    });
  };

  const updateMarketingConsent = (type: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      marketingConsent: {
        ...prev.marketingConsent,
        [type]: value,
      },
    }));
  };

  const updatePrivacySettings = (setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [setting]: value,
      },
    }));
  };

  const updateSecuritySettings = (setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      securitySettings: {
        ...prev.securitySettings,
        [setting]: value,
      },
    }));
  };

  const handleWithdraw = () => {
    if (!withdrawReason.trim()) {
      alert("탈퇴 사유를 입력해주세요.");
      return;
    }

    // 실제 탈퇴 처리 로직
    console.log("탈퇴 사유:", withdrawReason);
    alert("탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.");
    setIsWithdrawDialogOpen(false);
    setWithdrawReason("");
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

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            계정 설정
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            프로필 정보와 알림 설정을 관리하세요
          </p>
        </div>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? "취소" : "프로필 수정"}
        </Button>
      </div>

      {/* 계정 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>계정 정보</span>
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
                  <p className="text-gray-900 dark:text-gray-100">
                    {settings.name}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">이메일</Label>
                <p className="text-gray-900 dark:text-gray-100">
                  {settings.email}
                </p>
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
                  <p className="text-gray-900 dark:text-gray-100">
                    {settings.phone}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="birthDate">생년월일</Label>
                {isEditing ? (
                  <Input
                    id="birthDate"
                    type="date"
                    value={editForm.birthDate}
                    onChange={(e) =>
                      setEditForm({ ...editForm, birthDate: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-900 dark:text-gray-100">
                    {settings.birthDate}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="gender">성별</Label>
                {isEditing ? (
                  <Select
                    value={editForm.gender}
                    onValueChange={(value) =>
                      setEditForm({ ...editForm, gender: value as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">여성</SelectItem>
                      <SelectItem value="male">남성</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-gray-900 dark:text-gray-100">
                    {settings.gender === "female"
                      ? "여성"
                      : settings.gender === "male"
                      ? "남성"
                      : "기타"}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-4">
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
                  <p className="text-gray-900 dark:text-gray-100">
                    {settings.address}
                  </p>
                )}
              </div>
              <div>
                <Label>멤버십 레벨</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge
                    className={getMembershipColor(settings.membershipLevel)}
                  >
                    {getMembershipLabel(settings.membershipLevel)}
                  </Badge>
                  <Award className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
              <div>
                <Label>포인트</Label>
                <p className="text-gray-900 dark:text-gray-100">
                  {settings.points.toLocaleString()}P
                </p>
              </div>
              <div>
                <Label>가입일</Label>
                <p className="text-gray-900 dark:text-gray-100">
                  {settings.joinDate}
                </p>
              </div>
              <div>
                <Label>마지막 로그인</Label>
                <p className="text-gray-900 dark:text-gray-100">
                  {settings.lastLogin}
                </p>
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

      {/* 알림 설정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>알림 설정</span>
          </CardTitle>
          <CardDescription>받고 싶은 알림을 선택하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 이메일 알림 */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>이메일 알림</span>
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-order">주문 상태 업데이트</Label>
                <Switch
                  id="email-order"
                  checked={settings.emailNotifications.orderUpdates}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings("email", "orderUpdates", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-promo">프로모션 및 할인</Label>
                <Switch
                  id="email-promo"
                  checked={settings.emailNotifications.promotions}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings("email", "promotions", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-news">뉴스레터</Label>
                <Switch
                  id="email-news"
                  checked={settings.emailNotifications.newsletters}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings("email", "newsletters", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-review">리뷰 관련 알림</Label>
                <Switch
                  id="email-review"
                  checked={settings.emailNotifications.reviews}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings("email", "reviews", checked)
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* SMS 알림 */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>SMS 알림</span>
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-order">주문 상태 업데이트</Label>
                <Switch
                  id="sms-order"
                  checked={settings.smsNotifications.orderUpdates}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings("sms", "orderUpdates", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-promo">프로모션 및 할인</Label>
                <Switch
                  id="sms-promo"
                  checked={settings.smsNotifications.promotions}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings("sms", "promotions", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-delivery">배송 업데이트</Label>
                <Switch
                  id="sms-delivery"
                  checked={settings.smsNotifications.deliveryUpdates}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings(
                      "sms",
                      "deliveryUpdates",
                      checked
                    )
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* 푸시 알림 */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>푸시 알림</span>
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-order">주문 상태 업데이트</Label>
                <Switch
                  id="push-order"
                  checked={settings.pushNotifications.orderUpdates}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings("push", "orderUpdates", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-promo">프로모션 및 할인</Label>
                <Switch
                  id="push-promo"
                  checked={settings.pushNotifications.promotions}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings("push", "promotions", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-products">신상품 알림</Label>
                <Switch
                  id="push-products"
                  checked={settings.pushNotifications.newProducts}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings("push", "newProducts", checked)
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 마케팅 동의 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>마케팅 정보 수신 동의</span>
          </CardTitle>
          <CardDescription>
            마케팅 정보 수신에 대한 동의를 관리하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing-email">이메일 마케팅</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                이메일을 통한 마케팅 정보 수신
              </p>
            </div>
            <Switch
              id="marketing-email"
              checked={settings.marketingConsent.email}
              onCheckedChange={(checked) =>
                updateMarketingConsent("email", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing-sms">SMS 마케팅</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                문자메시지를 통한 마케팅 정보 수신
              </p>
            </div>
            <Switch
              id="marketing-sms"
              checked={settings.marketingConsent.sms}
              onCheckedChange={(checked) =>
                updateMarketingConsent("sms", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing-push">푸시 마케팅</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                앱 푸시를 통한 마케팅 정보 수신
              </p>
            </div>
            <Switch
              id="marketing-push"
              checked={settings.marketingConsent.push}
              onCheckedChange={(checked) =>
                updateMarketingConsent("push", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing-third">제3자 정보 제공</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                제3자에게 개인정보 제공 동의
              </p>
            </div>
            <Switch
              id="marketing-sms"
              checked={settings.marketingConsent.thirdParty}
              onCheckedChange={(checked) =>
                updateMarketingConsent("thirdParty", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* 개인정보 설정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>개인정보 설정</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="profile-visibility">프로필 공개 설정</Label>
            <Select
              value={settings.privacySettings.profileVisibility}
              onValueChange={(value) =>
                updatePrivacySettings("profileVisibility", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">전체 공개</SelectItem>
                <SelectItem value="friends">친구만</SelectItem>
                <SelectItem value="private">비공개</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-orders">주문 내역 공개</Label>
            <Switch
              id="show-orders"
              checked={settings.privacySettings.showOrderHistory}
              onCheckedChange={(checked) =>
                updatePrivacySettings("showOrderHistory", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-reviews">리뷰 공개</Label>
            <Switch
              id="show-reviews"
              checked={settings.privacySettings.showReviews}
              onCheckedChange={(checked) =>
                updatePrivacySettings("showReviews", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-wishlist">위시리스트 공개</Label>
            <Switch
              id="show-wishlist"
              checked={settings.privacySettings.showWishlist}
              onCheckedChange={(checked) =>
                updatePrivacySettings("showWishlist", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* 보안 설정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>보안 설정</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="2fa">2단계 인증</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                로그인 시 추가 보안 인증
              </p>
            </div>
            <Switch
              id="2fa"
              checked={settings.securitySettings.twoFactorAuth}
              onCheckedChange={(checked) =>
                updateSecuritySettings("twoFactorAuth", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="login-alerts">로그인 알림</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                새로운 기기 로그인 시 알림
              </p>
            </div>
            <Switch
              id="login-alerts"
              checked={settings.securitySettings.loginAlerts}
              onCheckedChange={(checked) =>
                updateSecuritySettings("loginAlerts", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="device-management">기기 관리</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                로그인된 기기 관리
              </p>
            </div>
            <Switch
              id="device-management"
              checked={settings.securitySettings.deviceManagement}
              onCheckedChange={(checked) =>
                updateSecuritySettings("deviceManagement", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* 계정 삭제 */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <span>계정 탈퇴</span>
          </CardTitle>
          <CardDescription>
            계정을 탈퇴하면 모든 데이터가 영구적으로 삭제됩니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              탈퇴 시 다음 정보가 모두 삭제됩니다:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 개인정보 및 프로필</li>
              <li>• 주문 내역 및 구매 기록</li>
              <li>• 리뷰 및 평점</li>
              <li>• 위시리스트 및 관심 상품</li>
              <li>• 포인트 및 적립금</li>
              <li>• 배송지 정보</li>
            </ul>
            <Button
              variant="destructive"
              onClick={() => setIsWithdrawDialogOpen(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              계정 탈퇴
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 탈퇴 확인 다이얼로그 */}
      <AlertDialog
        open={isWithdrawDialogOpen}
        onOpenChange={setIsWithdrawDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>계정 탈퇴 확인</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              정말로 계정을 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="withdraw-reason">탈퇴 사유 (선택사항)</Label>
              <Textarea
                id="withdraw-reason"
                value={withdrawReason}
                onChange={(e) => setWithdrawReason(e.target.value)}
                placeholder="탈퇴 사유를 입력해주세요..."
                rows={3}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleWithdraw}
              className="bg-red-600 hover:bg-red-700"
            >
              탈퇴 확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
