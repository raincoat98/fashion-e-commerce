# LUMINA - 프리미엄 패션 이커머스 플랫폼

![LUMINA Logo](https://img.shields.io/badge/LUMINA-빛나는%20당신을%20위한%20스타일-blue?style=for-the-badge)

LUMINA는 당신의 개성과 아름다움을 빛나게 하는 프리미엄 의류 브랜드입니다.
세련된 디자인과 최고급 소재로 완성된 스타일을 만나보세요.

## ✨ 주요 기능

### 🛍️ 쇼핑 경험

- **상품 브라우징**: 카테고리별 상품 탐색 (상의, 하의, 원피스, 아우터)
- **상품 상세**: 고품질 이미지 갤러리, 사이즈 가이드, 리뷰 시스템
- **장바구니**: 실시간 장바구니 관리 및 수량 조절
- **위시리스트**: 관심 상품 저장 및 관리
- **검색**: 상품명, 브랜드 기반 검색 기능

### 🎨 사용자 경험

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **다크/라이트 모드**: 사용자 선호에 따른 테마 전환
- **드래그 슬라이드**: 직관적인 상품 탐색
- **로딩 애니메이션**: 부드러운 사용자 경험
- **최근 본 상품**: 개인화된 추천 시스템

### 🛒 주문 및 결제

- **체크아웃**: 간편한 주문 프로세스
- **쿠폰 시스템**: 할인 쿠폰 적용
- **포인트 시스템**: 적립 및 사용 기능
- **주문 추적**: 실시간 배송 상태 확인
- **주문 완료**: 주문 확인 및 이메일 알림

### 👤 사용자 관리

- **회원가입/로그인**: 안전한 인증 시스템
- **프로필 관리**: 개인정보 및 배송지 관리
- **주문 내역**: 과거 주문 조회
- **반품/교환**: 간편한 반품 신청

### 🔧 관리자 기능

- **상품 관리**: 상품 등록, 수정, 삭제
- **주문 관리**: 주문 상태 관리 및 처리
- **고객 관리**: 고객 정보 및 주문 내역 관리
- **배너 관리**: 메인 배너 및 프로모션 배너 관리
- **쿠폰 관리**: 할인 쿠폰 생성 및 관리
- **알림 관리**: 팝업 및 공지사항 관리

## 🚀 기술 스택

### Frontend

- **Next.js 13.5.1** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성 보장
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Radix UI** - 접근성이 뛰어난 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리

### State Management

- **Zustand** - 경량 상태 관리 라이브러리
- **React Context** - 전역 상태 관리

### Styling & Animation

- **Tailwind CSS** - 유틸리티 퍼스트 CSS
- **GSAP** - 고성능 애니메이션 라이브러리
- **Framer Motion** - React 애니메이션 라이브러리
- **next-themes** - 다크/라이트 모드 지원

### Form & Validation

- **React Hook Form** - 성능 최적화된 폼 관리
- **Zod** - 스키마 기반 유효성 검사
- **@hookform/resolvers** - 폼 리졸버 통합

### UI Components

- **Radix UI** - 접근성 우선 UI 프리미티브
- **Class Variance Authority** - 컴포넌트 변형 관리
- **Sonner** - 토스트 알림 시스템

## 📁 프로젝트 구조

```
fashion-e-commerce/
├── app/                    # Next.js App Router
│   ├── admin/             # 관리자 페이지
│   ├── cart/              # 장바구니
│   ├── categories/        # 카테고리별 상품
│   ├── checkout/          # 결제
│   ├── products/          # 상품 상세
│   └── ...
├── components/            # 재사용 가능한 컴포넌트
│   ├── admin/            # 관리자 컴포넌트
│   ├── home/             # 홈페이지 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── product/          # 상품 관련 컴포넌트
│   └── ui/               # 기본 UI 컴포넌트
├── contexts/             # React Context
├── hooks/                # 커스텀 훅
├── lib/                  # 유틸리티 함수
├── stores/               # Zustand 스토어
└── ...
```

## 🛠️ 설치 및 실행

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/fashion-e-commerce.git

# 프로젝트 디렉토리로 이동
cd fashion-e-commerce

# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm run start
```

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: LUMINA 브랜드 컬러
- **Secondary**: 보조 색상
- **Accent**: 강조 색상
- **Neutral**: 중성 색상 (다크/라이트 모드 지원)

### 타이포그래피

- **Primary Font**: Inter (영문)
- **Korean Font**: Noto Sans KR (한글)
- **Font Weights**: 300, 400, 500, 700

### 컴포넌트

- **Button**: 다양한 변형과 크기 지원
- **Card**: 상품 카드, 정보 카드
- **Modal**: 다이얼로그, 팝업
- **Form**: 입력 필드, 검증 메시지
- **Navigation**: 헤더, 사이드바, 브레드크럼

## 📱 반응형 디자인

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px 이상

모든 컴포넌트는 모바일 퍼스트 접근 방식으로 설계되었습니다.

## 🔧 환경 설정

### Next.js 설정

- **App Router**: 최신 Next.js 라우팅 시스템
- **Image Optimization**: 자동 이미지 최적화
- **Font Optimization**: 웹폰트 최적화

### Tailwind CSS 설정

- **Custom Colors**: 브랜드 컬러 시스템
- **Custom Animations**: 브랜드 애니메이션
- **Dark Mode**: 클래스 기반 다크 모드

## 🚀 성능 최적화

- **Code Splitting**: 자동 코드 분할
- **Image Optimization**: Next.js 이미지 최적화
- **Lazy Loading**: 지연 로딩 구현
- **Bundle Analysis**: 번들 크기 최적화

## 🧪 테스트

```bash
# 테스트 실행
npm run test

# 테스트 커버리지
npm run test:coverage
```

## 📦 배포

### Vercel (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Docker

```bash
# Docker 이미지 빌드
docker build -t lumina-ecommerce .

# 컨테이너 실행
docker run -p 3000:3000 lumina-ecommerce
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

- **프로젝트 링크**: [https://github.com/your-username/fashion-e-commerce](https://github.com/your-username/fashion-e-commerce)
- **이메일**: contact@lumina-fashion.com
- **웹사이트**: [https://lumina-fashion.com](https://lumina-fashion.com)

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - 풀스택 React 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 퍼스트 CSS
- [Radix UI](https://www.radix-ui.com/) - 접근성 우선 UI 컴포넌트
- [Lucide](https://lucide.dev/) - 아이콘 라이브러리

---

**LUMINA** - 빛나는 당신을 위한 스타일 ✨
