import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 문의하기 데이터 타입
interface ContactForm {
  name: string;
  email: string;
  phone: string;
  category: string;
  subject: string;
  message: string;
}

// FAQ 데이터 타입
interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

// 사이즈 데이터 타입
interface SizeData {
  size: string;
  [key: string]: string;
}

interface SizeCategory {
  title: string;
  description: string;
  measurements: string[];
  sizes: SizeData[];
}

// 배송 데이터 타입
interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: string;
  freeThreshold: string;
  deliveryTime: string;
  features: string[];
}

interface DeliveryArea {
  region: string;
  standard: string;
  express: string;
  premium: string;
  note: string;
}

// 교환/반품 데이터 타입
interface ReturnPolicy {
  period: string;
  conditions: string[];
  exceptions: string[];
}

interface RefundMethod {
  method: string;
  time: string;
  note: string;
}

interface RefundFee {
  type: string;
  exchange: string;
  return: string;
  note: string;
}

// 메인 스토어 타입
interface AppStore {
  // 문의하기 관련
  contactForm: ContactForm;
  isContactSubmitted: boolean;
  setContactForm: (form: Partial<ContactForm>) => void;
  submitContact: () => void;
  resetContact: () => void;

  // FAQ 관련
  faqSearchTerm: string;
  faqSelectedCategory: string;
  setFaqSearchTerm: (term: string) => void;
  setFaqSelectedCategory: (category: string) => void;
  resetFaqFilters: () => void;

  // 사이즈 가이드 관련
  selectedSizeCategory: string;
  setSelectedSizeCategory: (category: string) => void;

  // 배송 관련
  selectedShippingTab: string;
  setSelectedShippingTab: (tab: string) => void;

  // 교환/반품 관련
  selectedReturnTab: string;
  setSelectedReturnTab: (tab: string) => void;

  // 데이터
  faqData: Record<string, FAQItem[]>;
  sizeData: Record<string, SizeCategory>;
  shippingMethods: ShippingMethod[];
  deliveryAreas: DeliveryArea[];
  returnPolicy: ReturnPolicy;
  refundMethods: RefundMethod[];
  refundFees: RefundFee[];
}

// 초기 문의하기 폼 데이터
const initialContactForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  category: "",
  subject: "",
  message: "",
};

// FAQ 데이터
const faqData: Record<string, FAQItem[]> = {
  order: [
    {
      question: "주문 후 주문내역을 확인할 수 있나요?",
      answer:
        "네, 로그인 후 '마이페이지 > 주문내역'에서 모든 주문 정보를 확인할 수 있습니다. 주문번호, 배송상태, 결제정보 등을 한눈에 볼 수 있어요.",
      category: "order",
    },
    {
      question: "주문 취소는 언제까지 가능한가요?",
      answer:
        "상품 출고 전까지 주문 취소가 가능합니다. 출고 후에는 교환/반품 신청을 통해 처리해주세요. 출고 상태는 주문내역에서 실시간으로 확인할 수 있습니다.",
      category: "order",
    },
    {
      question: "비회원으로도 주문할 수 있나요?",
      answer:
        "네, 비회원으로도 주문 가능합니다. 단, 주문조회와 배송추적을 위해서는 주문 시 입력한 이메일과 주문번호가 필요합니다.",
      category: "order",
    },
    {
      question: "주문 시 쿠폰을 여러 개 사용할 수 있나요?",
      answer:
        "아니요, 한 번의 주문에 하나의 쿠폰만 사용 가능합니다. 쿠폰 사용 조건과 할인 혜택을 확인 후 사용해주세요.",
      category: "order",
    },
  ],
  shipping: [
    {
      question: "배송은 얼마나 걸리나요?",
      answer:
        "일반 배송은 결제 완료 후 1-2일 내 출고, 2-3일 내 배송 완료됩니다. 제주도 및 도서산간 지역은 추가 1-2일이 소요될 수 있습니다.",
      category: "shipping",
    },
    {
      question: "배송비는 얼마인가요?",
      answer:
        "3만원 이상 구매 시 무료배송, 3만원 미만 구매 시 3,000원의 배송비가 발생합니다. 제주도 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.",
      category: "shipping",
    },
    {
      question: "배송 추적은 어떻게 하나요?",
      answer:
        "주문내역에서 '배송조회' 버튼을 클릭하거나, 배송업체에서 제공하는 송장번호로 직접 조회할 수 있습니다. 실시간 배송 현황을 확인할 수 있어요.",
      category: "shipping",
    },
    {
      question: "부재 시 택배는 어떻게 처리되나요?",
      answer:
        "1차 배송 실패 시 2회 재시도하며, 3회 모두 실패 시 고객센터로 연락드립니다. 편의점 보관이나 재배송 요청도 가능합니다.",
      category: "shipping",
    },
  ],
  return: [
    {
      question: "교환/반품 신청은 언제까지 가능한가요?",
      answer:
        "상품 수령 후 7일 이내에 교환/반품 신청이 가능합니다. 단, 상품의 상태가 초기 상태와 동일해야 하며, 세탁이나 사용 흔적이 없어야 합니다.",
      category: "return",
    },
    {
      question: "교환/반품 배송비는 누가 부담하나요?",
      answer:
        "상품 하자나 오배송의 경우 무료로 처리됩니다. 단순 변심의 경우 고객이 배송비를 부담하며, 교환 시 왕복 배송비, 반품 시 편도 배송비가 발생합니다.",
      category: "return",
    },
    {
      question: "교환/반품 신청은 어떻게 하나요?",
      answer:
        "마이페이지 > 주문내역에서 해당 주문의 '교환/반품 신청' 버튼을 클릭하여 신청할 수 있습니다. 사유와 함께 신청해주세요.",
      category: "return",
    },
    {
      question: "환불은 언제 처리되나요?",
      answer:
        "반품 상품 확인 후 3-5일 내에 환불 처리됩니다. 결제 수단에 따라 환불 시점이 다를 수 있으며, 카드 결제의 경우 카드사 정책에 따라 처리됩니다.",
      category: "return",
    },
  ],
  member: [
    {
      question: "회원가입은 어떻게 하나요?",
      answer:
        "홈페이지 우측 상단의 '회원가입' 버튼을 클릭하여 이메일, 비밀번호, 개인정보를 입력하면 가입이 완료됩니다. 이메일 인증 후 모든 서비스를 이용할 수 있습니다.",
      category: "member",
    },
    {
      question: "비밀번호를 잊어버렸어요.",
      answer:
        "로그인 페이지의 '비밀번호 찾기'를 통해 이메일로 임시 비밀번호를 발송받을 수 있습니다. 로그인 후 반드시 비밀번호를 변경해주세요.",
      category: "member",
    },
    {
      question: "회원 탈퇴는 어떻게 하나요?",
      answer:
        "마이페이지 > 회원정보에서 '회원탈퇴' 버튼을 클릭하여 탈퇴할 수 있습니다. 탈퇴 시 모든 개인정보가 삭제되며, 복구가 불가능합니다.",
      category: "member",
    },
    {
      question: "개인정보 변경은 어떻게 하나요?",
      answer:
        "마이페이지 > 회원정보에서 주소, 연락처 등 개인정보를 수정할 수 있습니다. 이메일 주소 변경은 고객센터로 문의해주세요.",
      category: "member",
    },
  ],
  payment: [
    {
      question: "어떤 결제 방법을 지원하나요?",
      answer:
        "신용카드, 체크카드, 계좌이체, 간편결제(카카오페이, 네이버페이, 페이코), 무통장입금을 지원합니다. 모든 결제는 안전한 SSL 암호화로 보호됩니다.",
      category: "payment",
    },
    {
      question: "무통장입금은 언제까지 해야 하나요?",
      answer:
        "주문 후 24시간 이내에 입금해주세요. 24시간이 지나면 주문이 자동 취소됩니다. 입금 확인 후 상품이 출고됩니다.",
      category: "payment",
    },
    {
      question: "결제 오류가 발생했어요.",
      answer:
        "결제 수단별로 오류 원인이 다를 수 있습니다. 카드사 한도 초과, 잔액 부족, 네트워크 오류 등을 확인해보시고, 지속적인 오류 시 고객센터로 문의해주세요.",
      category: "payment",
    },
    {
      question: "부분 취소가 가능한가요?",
      answer:
        "네, 주문 상품 중 일부만 취소할 수 있습니다. 주문내역에서 '부분 취소' 버튼을 클릭하여 원하는 상품만 선택하여 취소할 수 있습니다.",
      category: "payment",
    },
  ],
};

// 사이즈 데이터
const sizeData: Record<string, SizeCategory> = {
  top: {
    title: "상의 사이즈 가이드",
    description: "가슴둘레, 어깨너비, 소매길이를 기준으로 사이즈를 선택하세요.",
    measurements: ["가슴둘레", "어깨너비", "소매길이", "총장"],
    sizes: [
      {
        size: "XS",
        chest: "82-86",
        shoulder: "34-36",
        sleeve: "58-60",
        length: "58-62",
      },
      {
        size: "S",
        chest: "86-90",
        shoulder: "36-38",
        sleeve: "60-62",
        length: "60-64",
      },
      {
        size: "M",
        chest: "90-94",
        shoulder: "38-40",
        sleeve: "62-64",
        length: "62-66",
      },
      {
        size: "L",
        chest: "94-98",
        shoulder: "40-42",
        sleeve: "64-66",
        length: "64-68",
      },
      {
        size: "XL",
        chest: "98-102",
        shoulder: "42-44",
        sleeve: "66-68",
        length: "66-70",
      },
      {
        size: "XXL",
        chest: "102-106",
        shoulder: "44-46",
        sleeve: "68-70",
        length: "68-72",
      },
    ],
  },
  dress: {
    title: "원피스 사이즈 가이드",
    description: "가슴둘레, 허리둘레, 힙둘레를 기준으로 사이즈를 선택하세요.",
    measurements: ["가슴둘레", "허리둘레", "힙둘레", "총장"],
    sizes: [
      {
        size: "XS",
        chest: "82-86",
        waist: "62-66",
        hip: "86-90",
        length: "85-90",
      },
      {
        size: "S",
        chest: "86-90",
        waist: "66-70",
        hip: "90-94",
        length: "87-92",
      },
      {
        size: "M",
        chest: "90-94",
        waist: "70-74",
        hip: "94-98",
        length: "89-94",
      },
      {
        size: "L",
        chest: "94-98",
        waist: "74-78",
        hip: "98-102",
        length: "91-96",
      },
      {
        size: "XL",
        chest: "98-102",
        waist: "78-82",
        hip: "102-106",
        length: "93-98",
      },
      {
        size: "XXL",
        chest: "102-106",
        waist: "82-86",
        hip: "106-110",
        length: "95-100",
      },
    ],
  },
  bottom: {
    title: "하의 사이즈 가이드",
    description: "허리둘레, 힙둘레, 밑위길이를 기준으로 사이즈를 선택하세요.",
    measurements: ["허리둘레", "힙둘레", "밑위길이", "총장"],
    sizes: [
      {
        size: "XS",
        waist: "62-66",
        hip: "86-90",
        rise: "22-24",
        length: "95-100",
      },
      {
        size: "S",
        waist: "66-70",
        hip: "90-94",
        rise: "23-25",
        length: "97-102",
      },
      {
        size: "M",
        waist: "70-74",
        hip: "94-98",
        rise: "24-26",
        length: "99-104",
      },
      {
        size: "L",
        waist: "74-78",
        hip: "98-102",
        rise: "25-27",
        length: "101-106",
      },
      {
        size: "XL",
        waist: "78-82",
        hip: "102-106",
        rise: "26-28",
        length: "103-108",
      },
      {
        size: "XXL",
        waist: "82-86",
        hip: "106-110",
        rise: "27-29",
        length: "105-110",
      },
    ],
  },
  shoes: {
    title: "신발 사이즈 가이드",
    description: "발길이를 기준으로 사이즈를 선택하세요.",
    measurements: ["발길이", "발볼", "한국사이즈", "미국사이즈", "유럽사이즈"],
    sizes: [
      { size: "220", length: "220", width: "D", kr: "220", us: "5", eu: "36" },
      {
        size: "225",
        length: "225",
        width: "D",
        kr: "225",
        us: "5.5",
        eu: "37",
      },
      { size: "230", length: "230", width: "D", kr: "230", us: "6", eu: "38" },
      {
        size: "235",
        length: "235",
        width: "D",
        kr: "235",
        us: "6.5",
        eu: "39",
      },
      { size: "240", length: "240", width: "D", kr: "240", us: "7", eu: "40" },
      {
        size: "245",
        length: "245",
        width: "D",
        kr: "245",
        us: "7.5",
        eu: "41",
      },
      { size: "250", length: "250", width: "D", kr: "250", us: "8", eu: "42" },
    ],
  },
};

// 배송 데이터
const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "일반 배송",
    description: "가장 일반적인 배송 방법",
    price: "3,000원",
    freeThreshold: "30,000원",
    deliveryTime: "2-3일",
    features: [
      "결제 완료 후 1-2일 내 출고",
      "배송 완료까지 2-3일 소요",
      "제주도 및 도서산간 추가 1-2일",
      "부재 시 2회 재시도",
    ],
  },
  {
    id: "express",
    name: "빠른 배송",
    description: "다음날 배송 서비스",
    price: "5,000원",
    freeThreshold: "50,000원",
    deliveryTime: "1일",
    features: [
      "오후 2시 이전 주문 시 당일 출고",
      "다음날 오전 배송 완료",
      "서울/경기 지역 한정",
      "부재 시 편의점 보관",
    ],
  },
  {
    id: "premium",
    name: "프리미엄 배송",
    description: "특별한 서비스와 함께",
    price: "10,000원",
    freeThreshold: "100,000원",
    deliveryTime: "1일",
    features: [
      "전국 어디든 1일 배송",
      "전화 예약 배송",
      "부재 시 재방문 서비스",
      "포장 상태 확인 서비스",
    ],
  },
];

const deliveryAreas: DeliveryArea[] = [
  {
    region: "서울/경기",
    standard: "1-2일",
    express: "1일",
    premium: "1일",
    note: "가장 빠른 배송",
  },
  {
    region: "인천/강원",
    standard: "2-3일",
    express: "1-2일",
    premium: "1일",
    note: "일반적인 배송",
  },
  {
    region: "충청/전라",
    standard: "2-3일",
    express: "2일",
    premium: "1일",
    note: "안정적인 배송",
  },
  {
    region: "경상/부산",
    standard: "2-3일",
    express: "2일",
    premium: "1일",
    note: "안정적인 배송",
  },
  {
    region: "제주도",
    standard: "3-4일",
    express: "2-3일",
    premium: "1일",
    note: "추가 배송비 발생",
  },
  {
    region: "도서산간",
    standard: "3-5일",
    express: "2-3일",
    premium: "1일",
    note: "추가 배송비 발생",
  },
];

// 교환/반품 데이터
const returnPolicy: ReturnPolicy = {
  period: "7일",
  conditions: [
    "상품 수령 후 7일 이내",
    "상품의 초기 상태 유지",
    "세탁이나 사용 흔적 없음",
    "태그 및 포장재 보존",
    "교환/반품 신청서 작성",
  ],
  exceptions: [
    "세탁된 상품",
    "사용 흔적이 있는 상품",
    "태그가 제거된 상품",
    "포장재가 훼손된 상품",
    "개봉된 화장품/속옷류",
    "주문제작 상품",
  ],
};

const refundMethods: RefundMethod[] = [
  {
    method: "신용카드",
    time: "3-5일",
    note: "카드사 정책에 따라 처리",
  },
  {
    method: "체크카드",
    time: "3-5일",
    note: "카드사 정책에 따라 처리",
  },
  {
    method: "계좌이체",
    time: "1-2일",
    note: "입금 계좌 확인 필요",
  },
  {
    method: "간편결제",
    time: "1-3일",
    note: "결제 수단별 정책 적용",
  },
  {
    method: "무통장입금",
    time: "1-2일",
    note: "입금 계좌 확인 필요",
  },
];

const refundFees: RefundFee[] = [
  {
    type: "단순 변심",
    exchange: "왕복 배송비 고객 부담",
    return: "편도 배송비 고객 부담",
    note: "교환 시 6,000원, 반품 시 3,000원",
  },
  {
    type: "상품 하자",
    exchange: "무료",
    return: "무료",
    note: "모든 비용 회사 부담",
  },
  {
    type: "오배송",
    exchange: "무료",
    return: "무료",
    note: "모든 비용 회사 부담",
  },
];

// Zustand 스토어 생성
export const useStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      // 문의하기 관련
      contactForm: initialContactForm,
      isContactSubmitted: false,
      setContactForm: (form) =>
        set((state) => ({
          contactForm: { ...state.contactForm, ...form },
        })),
      submitContact: () => {
        const { contactForm } = get();
        console.log("문의 제출:", contactForm);
        set({ isContactSubmitted: true });
      },
      resetContact: () =>
        set({
          contactForm: initialContactForm,
          isContactSubmitted: false,
        }),

      // FAQ 관련
      faqSearchTerm: "",
      faqSelectedCategory: "all",
      setFaqSearchTerm: (term) => set({ faqSearchTerm: term }),
      setFaqSelectedCategory: (category) =>
        set({ faqSelectedCategory: category }),
      resetFaqFilters: () =>
        set({ faqSearchTerm: "", faqSelectedCategory: "all" }),

      // 사이즈 가이드 관련
      selectedSizeCategory: "top",
      setSelectedSizeCategory: (category) =>
        set({ selectedSizeCategory: category }),

      // 배송 관련
      selectedShippingTab: "standard",
      setSelectedShippingTab: (tab) => set({ selectedShippingTab: tab }),

      // 교환/반품 관련
      selectedReturnTab: "policy",
      setSelectedReturnTab: (tab) => set({ selectedReturnTab: tab }),

      // 데이터
      faqData,
      sizeData,
      shippingMethods,
      deliveryAreas,
      returnPolicy,
      refundMethods,
      refundFees,
    }),
    {
      name: "app-store",
    }
  )
);
