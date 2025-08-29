"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ShippingAddress {
  id: string;
  name: string;
  recipient: string;
  phone: string;
  postcode: string;
  address: string;
  detailAddress: string;
  memo?: string;
  isDefault: boolean;
  type: "home" | "work" | "other";
  createdAt: string;
  updatedAt: string;
}

interface AddressStore {
  addresses: ShippingAddress[];

  // 액션들
  addAddress: (
    address: Omit<ShippingAddress, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateAddress: (id: string, address: Partial<ShippingAddress>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => ShippingAddress | null;
  getAddressById: (id: string) => ShippingAddress | null;

  // 초기 데이터 로딩
  initializeAddresses: () => void;
}

const initialAddresses: ShippingAddress[] = [
  {
    id: "addr-001",
    name: "집",
    recipient: "김미영",
    phone: "010-1234-5678",
    postcode: "06123",
    address: "서울시 강남구 테헤란로 123",
    detailAddress: "456호",
    memo: "문 앞에 놓아주세요",
    isDefault: true,
    type: "home",
    createdAt: "2023-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "addr-002",
    name: "회사",
    recipient: "김미영",
    phone: "010-1234-5678",
    postcode: "06142",
    address: "서울시 강남구 삼성로 456",
    detailAddress: "789호",
    memo: "경비실에 맡겨주세요",
    isDefault: false,
    type: "work",
    createdAt: "2023-03-10",
    updatedAt: "2024-01-15",
  },
];

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],

      addAddress: (addressData) => {
        const newAddress: ShippingAddress = {
          ...addressData,
          id: `addr-${Date.now()}`,
          createdAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
        };

        set((state) => {
          let updatedAddresses = [...state.addresses];

          // 기본 배송지로 설정하는 경우 기존 기본 배송지 해제
          if (newAddress.isDefault) {
            updatedAddresses = updatedAddresses.map((addr) => ({
              ...addr,
              isDefault: false,
            }));
          }

          return {
            addresses: [...updatedAddresses, newAddress],
          };
        });
      },

      updateAddress: (id, updates) => {
        set((state) => {
          let updatedAddresses = state.addresses.map((addr) =>
            addr.id === id
              ? {
                  ...addr,
                  ...updates,
                  updatedAt: new Date().toISOString().split("T")[0],
                }
              : addr
          );

          // 기본 배송지로 설정하는 경우 기존 기본 배송지 해제
          if (updates.isDefault) {
            updatedAddresses = updatedAddresses.map((addr) =>
              addr.id !== id ? { ...addr, isDefault: false } : addr
            );
          }

          return {
            addresses: updatedAddresses,
          };
        });
      },

      deleteAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((addr) => addr.id !== id),
        }));
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          })),
        }));
      },

      getDefaultAddress: () => {
        const { addresses } = get();
        return addresses.find((addr) => addr.isDefault) || null;
      },

      getAddressById: (id) => {
        const { addresses } = get();
        return addresses.find((addr) => addr.id === id) || null;
      },

      initializeAddresses: () => {
        const { addresses } = get();
        if (addresses.length === 0) {
          set({ addresses: initialAddresses });
        }
      },
    }),
    {
      name: "address-store",
      partialize: (state) => ({
        addresses: state.addresses,
      }),
    }
  )
);
