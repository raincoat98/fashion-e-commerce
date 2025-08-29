import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PointTransaction {
  id: string;
  type: "earn" | "use" | "expire";
  amount: number;
  description: string;
  orderId?: string;
  date: string;
}

interface PointState {
  // 포인트 현황
  totalPoints: number;
  usablePoints: number;
  expiringSoonPoints: number; // 30일 내 만료 예정

  // 포인트 내역
  transactions: PointTransaction[];

  // 액션
  addPoints: (amount: number, description: string, orderId?: string) => void;
  usePoints: (amount: number, description: string, orderId?: string) => void;
  getPointHistory: () => PointTransaction[];
  getPointsExpiringInDays: (days: number) => number;

  // 포인트 적립률 계산
  calculateEarnedPoints: (orderAmount: number) => number;

  // 최대 사용 가능 포인트 계산
  getMaxUsablePoints: (orderAmount: number) => number;
}

export const usePointStore = create<PointState>()(
  persist(
    (set, get) => ({
      // 초기 상태 (데모용)
      totalPoints: 15000,
      usablePoints: 15000,
      expiringSoonPoints: 2000,
      transactions: [
        {
          id: "1",
          type: "earn",
          amount: 500,
          description: "주문 완료 적립",
          orderId: "ORD-2024-001",
          date: "2024-01-10 14:30:00",
        },
        {
          id: "2",
          type: "earn",
          amount: 1000,
          description: "회원가입 보너스",
          date: "2024-01-05 10:00:00",
        },
        {
          id: "3",
          type: "use",
          amount: -3000,
          description: "주문 시 포인트 사용",
          orderId: "ORD-2024-002",
          date: "2024-01-08 16:20:00",
        },
        {
          id: "4",
          type: "earn",
          amount: 750,
          description: "리뷰 작성 적립",
          date: "2024-01-12 09:15:00",
        },
      ],

      // 포인트 적립
      addPoints: (amount: number, description: string, orderId?: string) => {
        const transaction: PointTransaction = {
          id: Date.now().toString(),
          type: "earn",
          amount,
          description,
          orderId,
          date: new Date().toISOString().replace("T", " ").substring(0, 19),
        };

        set((state) => ({
          totalPoints: state.totalPoints + amount,
          usablePoints: state.usablePoints + amount,
          transactions: [transaction, ...state.transactions],
        }));
      },

      // 포인트 사용
      usePoints: (amount: number, description: string, orderId?: string) => {
        const state = get();

        if (amount > state.usablePoints) {
          throw new Error("사용 가능한 포인트가 부족합니다.");
        }

        const transaction: PointTransaction = {
          id: Date.now().toString(),
          type: "use",
          amount: -amount,
          description,
          orderId,
          date: new Date().toISOString().replace("T", " ").substring(0, 19),
        };

        set((state) => ({
          usablePoints: state.usablePoints - amount,
          transactions: [transaction, ...state.transactions],
        }));
      },

      // 포인트 내역 조회
      getPointHistory: () => {
        return get().transactions;
      },

      // 특정 기간 내 만료 예정 포인트 조회
      getPointsExpiringInDays: (days: number) => {
        // 실제로는 각 포인트의 만료일을 확인해야 함
        // 여기서는 데모용으로 고정값 반환
        return get().expiringSoonPoints;
      },

      // 적립 포인트 계산 (결제 금액의 1%)
      calculateEarnedPoints: (orderAmount: number) => {
        return Math.floor(orderAmount * 0.01);
      },

      // 최대 사용 가능 포인트 계산 (주문 금액의 50% 또는 보유 포인트 중 작은 값)
      getMaxUsablePoints: (orderAmount: number) => {
        const state = get();
        return Math.min(Math.floor(orderAmount * 0.5), state.usablePoints);
      },
    }),
    {
      name: "point-store",
      partialize: (state) => ({
        totalPoints: state.totalPoints,
        usablePoints: state.usablePoints,
        expiringSoonPoints: state.expiringSoonPoints,
        transactions: state.transactions,
      }),
    }
  )
);

// 포인트 등급 시스템
export const getPointGrade = (totalPoints: number) => {
  if (totalPoints >= 100000)
    return { grade: "VIP", color: "text-purple-600", benefit: "3% 적립" };
  if (totalPoints >= 50000)
    return { grade: "GOLD", color: "text-yellow-600", benefit: "2% 적립" };
  if (totalPoints >= 20000)
    return { grade: "SILVER", color: "text-gray-600", benefit: "1.5% 적립" };
  return { grade: "BRONZE", color: "text-orange-600", benefit: "1% 적립" };
};

// 포인트 유틸리티 함수들
export const formatPoints = (points: number) => {
  return `${points.toLocaleString()}P`;
};

export const getPointExpiryDate = (
  earnedDate: string,
  validityDays: number = 365
) => {
  const date = new Date(earnedDate);
  date.setDate(date.getDate() + validityDays);
  return date.toISOString().substring(0, 10);
};
