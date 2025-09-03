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
import { Badge } from "@/components/ui/badge";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  Star,
  Home,
  Building,
  User,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAddressStore, ShippingAddress } from "@/stores/useAddressStore";

export default function AddressManager() {
  const {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddressStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] =
    useState<ShippingAddress | null>(null);
  const [newAddress, setNewAddress] = useState<Partial<ShippingAddress>>({
    name: "",
    recipient: "",
    phone: "",
    postcode: "",
    address: "",
    detailAddress: "",
    memo: "",
    type: "home",
    isDefault: false,
  });

  const addressTypes = [
    { value: "home", label: "집", icon: Home },
    { value: "work", label: "회사", icon: Building },
    { value: "other", label: "기타", icon: MapPin },
  ];

  const getTypeIcon = (type: string) => {
    const typeConfig = addressTypes.find((t) => t.value === type);
    return typeConfig ? typeConfig.icon : MapPin;
  };

  const getTypeLabel = (type: string) => {
    const typeConfig = addressTypes.find((t) => t.value === type);
    return typeConfig ? typeConfig.label : "기타";
  };

  const handleAddAddress = () => {
    if (
      !newAddress.name ||
      !newAddress.recipient ||
      !newAddress.phone ||
      !newAddress.address
    ) {
      alert("필수 정보를 입력해주세요.");
      return;
    }

    addAddress({
      name: newAddress.name!,
      recipient: newAddress.recipient!,
      phone: newAddress.phone!,
      postcode: newAddress.postcode || "",
      address: newAddress.address!,
      detailAddress: newAddress.detailAddress || "",
      memo: newAddress.memo || "",
      isDefault: newAddress.isDefault || false,
      type: newAddress.type || "home",
    });

    setNewAddress({
      name: "",
      recipient: "",
      phone: "",
      postcode: "",
      address: "",
      detailAddress: "",
      memo: "",
      type: "home",
      isDefault: false,
    });
    setIsAddDialogOpen(false);
  };

  const handleEditAddress = () => {
    if (!selectedAddress) return;

    if (
      !newAddress.name ||
      !newAddress.recipient ||
      !newAddress.phone ||
      !newAddress.address
    ) {
      alert("필수 정보를 입력해주세요.");
      return;
    }

    updateAddress(selectedAddress.id, {
      name: newAddress.name!,
      recipient: newAddress.recipient!,
      phone: newAddress.phone!,
      postcode: newAddress.postcode || "",
      address: newAddress.address!,
      detailAddress: newAddress.detailAddress || "",
      memo: newAddress.memo || "",
      isDefault: newAddress.isDefault || false,
      type: newAddress.type || "home",
    });

    setSelectedAddress(null);
    setNewAddress({
      name: "",
      recipient: "",
      phone: "",
      postcode: "",
      address: "",
      detailAddress: "",
      memo: "",
      type: "home",
      isDefault: false,
    });
    setIsEditDialogOpen(false);
  };

  const handleDeleteAddress = (addressId: string) => {
    if (confirm("정말로 이 배송지를 삭제하시겠습니까?")) {
      deleteAddress(addressId);
    }
  };

  const handleSetDefault = (addressId: string) => {
    setDefaultAddress(addressId);
  };

  const openEditDialog = (address: ShippingAddress) => {
    setSelectedAddress(address);
    setNewAddress({
      name: address.name,
      recipient: address.recipient,
      phone: address.phone,
      postcode: address.postcode,
      address: address.address,
      detailAddress: address.detailAddress,
      memo: address.memo,
      type: address.type,
      isDefault: address.isDefault,
    });
    setIsEditDialogOpen(true);
  };

  const openAddDialog = () => {
    setNewAddress({
      name: "",
      recipient: "",
      phone: "",
      postcode: "",
      address: "",
      detailAddress: "",
      memo: "",
      type: "home",
      isDefault: addresses.length === 0, // 첫 번째 배송지인 경우 기본으로 설정
    });
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            배송지 관리
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            배송지를 추가하고 관리하세요
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-2" />
          배송지 추가
        </Button>
      </div>

      {/* 배송지 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => {
          const TypeIcon = getTypeIcon(address.type);
          return (
            <Card
              key={address.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TypeIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                      {address.name}
                    </CardTitle>
                    {address.isDefault && (
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900">
                        <Star className="w-3 h-3 mr-1" />
                        기본
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(address)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {address.recipient}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {address.phone}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          [{address.postcode}] {address.address}
                        </p>
                        {address.detailAddress && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {address.detailAddress}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {address.memo && (
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-400">
                      📝 {address.memo}
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {getTypeLabel(address.type)} • {address.updatedAt}
                    </span>
                    {!address.isDefault && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        기본으로 설정
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 배송지가 없을 때 */}
      {addresses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              등록된 배송지가 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              배송지를 추가하여 편리하게 주문하세요
            </p>
            <Button onClick={openAddDialog}>
              <Plus className="w-4 h-4 mr-2" />첫 번째 배송지 추가
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 배송지 추가 다이얼로그 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>배송지 추가</DialogTitle>
            <DialogDescription>
              새로운 배송지 정보를 입력하세요
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">배송지명 *</Label>
                <Input
                  id="name"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                  placeholder="예: 집, 회사"
                />
              </div>
              <div>
                <Label htmlFor="type">배송지 유형</Label>
                <Select
                  value={newAddress.type}
                  onValueChange={(value) =>
                    setNewAddress({ ...newAddress, type: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {addressTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <type.icon className="w-4 h-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipient">수령인 *</Label>
                <Input
                  id="recipient"
                  value={newAddress.recipient}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, recipient: e.target.value })
                  }
                  placeholder="수령인 이름"
                />
              </div>
              <div>
                <Label htmlFor="phone">연락처 *</Label>
                <Input
                  id="phone"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  placeholder="010-0000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="postcode">우편번호</Label>
                <Input
                  id="postcode"
                  value={newAddress.postcode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, postcode: e.target.value })
                  }
                  placeholder="우편번호"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">기본주소 *</Label>
                <Input
                  id="address"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                  placeholder="기본주소"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="detailAddress">상세주소</Label>
              <Input
                id="detailAddress"
                value={newAddress.detailAddress}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    detailAddress: e.target.value,
                  })
                }
                placeholder="상세주소 (동, 호수 등)"
              />
            </div>

            <div>
              <Label htmlFor="memo">배송 메모</Label>
              <Textarea
                id="memo"
                value={newAddress.memo}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, memo: e.target.value })
                }
                placeholder="배송시 요청사항을 입력하세요"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDefault"
                checked={newAddress.isDefault}
                onCheckedChange={(checked) =>
                  setNewAddress({
                    ...newAddress,
                    isDefault: checked as boolean,
                  })
                }
              />
              <Label htmlFor="isDefault" className="text-sm">
                기본 배송지로 설정
              </Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                취소
              </Button>
              <Button onClick={handleAddAddress}>배송지 추가</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 배송지 수정 다이얼로그 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>배송지 수정</DialogTitle>
            <DialogDescription>배송지 정보를 수정하세요</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">배송지명 *</Label>
                <Input
                  id="edit-name"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                  placeholder="예: 집, 회사"
                />
              </div>
              <div>
                <Label htmlFor="edit-type">배송지 유형</Label>
                <Select
                  value={newAddress.type}
                  onValueChange={(value) =>
                    setNewAddress({ ...newAddress, type: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {addressTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <type.icon className="w-4 h-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-recipient">수령인 *</Label>
                <Input
                  id="edit-recipient"
                  value={newAddress.recipient}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, recipient: e.target.value })
                  }
                  placeholder="수령인 이름"
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">연락처 *</Label>
                <Input
                  id="edit-phone"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  placeholder="010-0000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-postcode">우편번호</Label>
                <Input
                  id="edit-postcode"
                  value={newAddress.postcode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, postcode: e.target.value })
                  }
                  placeholder="우편번호"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="edit-address">기본주소 *</Label>
                <Input
                  id="edit-address"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                  placeholder="기본주소"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-detailAddress">상세주소</Label>
              <Input
                id="edit-detailAddress"
                value={newAddress.detailAddress}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    detailAddress: e.target.value,
                  })
                }
                placeholder="상세주소 (동, 호수 등)"
              />
            </div>

            <div>
              <Label htmlFor="edit-memo">배송 메모</Label>
              <Textarea
                id="edit-memo"
                value={newAddress.memo}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, memo: e.target.value })
                }
                placeholder="배송시 요청사항을 입력하세요"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-isDefault"
                checked={newAddress.isDefault}
                onCheckedChange={(checked) =>
                  setNewAddress({
                    ...newAddress,
                    isDefault: checked as boolean,
                  })
                }
              />
              <Label htmlFor="edit-isDefault" className="text-sm">
                기본 배송지로 설정
              </Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                취소
              </Button>
              <Button onClick={handleEditAddress}>수정 완료</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
