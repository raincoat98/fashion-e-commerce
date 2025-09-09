# 테스트 가이드

이 프로젝트는 Vitest를 사용하여 테스트를 실행합니다.

## 설치된 패키지

- `vitest`: 테스트 프레임워크
- `@vitest/ui`: 테스트 UI 인터페이스
- `@vitest/expect`: Vitest expect 확장
- `jsdom`: DOM 환경 시뮬레이션
- `@testing-library/react`: React 컴포넌트 테스트
- `@testing-library/jest-dom`: DOM 매처 확장
- `@testing-library/user-event`: 사용자 이벤트 시뮬레이션
- `@vitejs/plugin-react`: React 플러그인

## 테스트 스크립트

```bash
# 모든 테스트 실행
npm test

# 테스트 UI 실행
npm run test:ui

# 커버리지와 함께 테스트 실행
npm run test:coverage

# 테스트 한 번만 실행 (CI/CD용)
npm run test:run
```

## 테스트 파일 구조

```
├── test/
│   └── setup.ts                 # 테스트 설정 파일
├── lib/__tests__/
│   └── utils.test.ts           # 유틸리티 함수 테스트
├── components/
│   ├── ui/__tests__/
│   │   └── button.test.tsx     # UI 컴포넌트 테스트
│   └── product/__tests__/
│       └── ProductCard.test.tsx # 상품 카드 컴포넌트 테스트
├── contexts/__tests__/
│   └── CartContext.test.tsx    # 컨텍스트 테스트
└── hooks/__tests__/
    ├── useBanners.test.ts      # 배너 훅 테스트
    ├── useProducts.test.ts     # 상품 훅 테스트
    └── useLoading.test.ts      # 로딩 훅 테스트
```

## 작성된 테스트

### 1. 유틸리티 함수 테스트 (`lib/__tests__/utils.test.ts`)

- `cn` 함수의 클래스명 병합 기능 테스트
- 조건부 클래스, 배열, 객체 처리 테스트
- Tailwind CSS 클래스 충돌 해결 테스트

### 2. UI 컴포넌트 테스트 (`components/ui/__tests__/button.test.tsx`)

- Button 컴포넌트의 다양한 variant와 size 테스트
- 클릭 이벤트, 키보드 이벤트 처리 테스트
- disabled 상태, ref 전달 테스트
- asChild prop을 통한 컴포넌트 렌더링 테스트

### 3. 컨텍스트 테스트 (`contexts/__tests__/CartContext.test.tsx`)

- 장바구니 상태 관리 테스트
- 아이템 추가, 제거, 수량 변경 테스트
- localStorage 연동 테스트
- 에러 처리 테스트

### 4. 커스텀 훅 테스트

#### `hooks/__tests__/useBanners.test.ts`

- 배너 데이터 로딩 및 관리 테스트
- CRUD 작업 테스트
- 정렬 및 상태 토글 테스트

#### `hooks/__tests__/useProducts.test.ts`

- 상품 데이터 변환 및 필터링 테스트
- 카테고리별, 신상품, 할인상품 필터링 테스트
- 검색 기능 테스트
- 할인율 계산 테스트

#### `hooks/__tests__/useLoading.test.ts`

- 로딩 상태 관리 테스트
- 비동기 함수 실행 테스트
- 에러 처리 및 콜백 테스트
- 다중 로딩 상태 관리 테스트
- 조건부 로딩 테스트

### 5. 상품 카드 컴포넌트 테스트 (`components/product/__tests__/ProductCard.test.tsx`)

- 상품 정보 렌더링 테스트
- 호버 효과 및 이미지 변경 테스트
- 사이즈 선택 및 장바구니 추가 테스트
- 위시리스트 토글 테스트
- 할인율 계산 및 표시 테스트

## 테스트 실행 방법

### 1. 전체 테스트 실행

```bash
npm test
```

### 2. 특정 테스트 파일 실행

```bash
npx vitest run lib/__tests__/utils.test.ts
```

### 3. 테스트 UI 실행

```bash
npm run test:ui
```

### 4. 커버리지 확인

```bash
npm run test:coverage
```

## 테스트 작성 가이드

### 1. 파일 명명 규칙

- 테스트 파일은 `*.test.ts` 또는 `*.test.tsx` 확장자 사용
- 테스트 파일은 `__tests__` 폴더에 위치

### 2. 테스트 구조

```typescript
import { describe, it, expect, vi } from "vitest";

describe("컴포넌트/함수명", () => {
  it("should do something", () => {
    // 테스트 코드
    expect(result).toBe(expected);
  });
});
```

### 3. Mock 사용

```typescript
// 함수 Mock
const mockFn = vi.fn();

// 모듈 Mock
vi.mock("@/hooks/useToast", () => ({
  useToast: () => ({ toast: mockFn }),
}));
```

### 4. 비동기 테스트

```typescript
it("should handle async operations", async () => {
  await act(async () => {
    await result.current.someAsyncFunction();
  });

  expect(result.current.data).toBeDefined();
});
```

## 주요 테스트 패턴

### 1. 컴포넌트 테스트

- 렌더링 확인
- Props 전달 확인
- 이벤트 핸들링 확인
- 상태 변경 확인

### 2. 훅 테스트

- 초기 상태 확인
- 상태 변경 확인
- 사이드 이펙트 확인
- 에러 처리 확인

### 3. 유틸리티 함수 테스트

- 입력값에 따른 출력값 확인
- 엣지 케이스 처리 확인
- 에러 상황 처리 확인

## 테스트 커버리지

현재 작성된 테스트는 다음 영역을 커버합니다:

- ✅ 유틸리티 함수 (100%)
- ✅ UI 컴포넌트 (Button, ProductCard)
- ✅ 컨텍스트 (CartContext)
- ✅ 커스텀 훅 (useBanners, useProducts, useLoading)

## 추가 테스트 권장사항

1. **페이지 컴포넌트 테스트**

   - 홈페이지, 상품 목록, 상품 상세 페이지
   - 라우팅 및 네비게이션 테스트

2. **통합 테스트**

   - 전체 사용자 플로우 테스트
   - API 연동 테스트

3. **접근성 테스트**

   - 키보드 네비게이션
   - 스크린 리더 호환성

4. **성능 테스트**
   - 렌더링 성능
   - 메모리 누수 확인

## 문제 해결

### 1. 의존성 충돌 오류 (ERESOLVE)

`@types/node` 버전 충돌로 인한 오류가 발생할 수 있습니다.

**해결 방법:**

```bash
# 방법 1: legacy-peer-deps 플래그 사용
npm install --save-dev @vitejs/plugin-react --legacy-peer-deps

# 방법 2: React 플러그인 없이 테스트 실행 (현재 설정)
# vitest.config.ts에서 React 플러그인을 제거하고 테스트 실행
```

### 2. @testing-library/dom 모듈을 찾을 수 없는 오류

```bash
npm install --save-dev @testing-library/dom
```

### 3. 모듈을 찾을 수 없는 오류

```bash
npm install --save-dev @vitejs/plugin-react
```

### 4. 테스트 환경 설정 오류

`vitest.config.ts` 파일의 설정을 확인하세요.

### 5. Mock이 작동하지 않는 경우

Mock이 실제 import보다 먼저 정의되어야 합니다.

### 6. React is not defined 오류

JSX를 사용하는 테스트에서 React가 정의되지 않았다는 오류가 발생할 수 있습니다.

**해결 방법:**

```bash
# 1. vitest.config.ts에 esbuild 설정 추가
export default defineConfig({
  esbuild: {
    jsx: "automatic",
  },
})

# 2. 테스트 파일에 React import 추가
import React from "react";
```

### 7. Node.js 버전 호환성 문제

현재 프로젝트는 Node.js 20.6.2를 사용하고 있습니다. 최신 버전의 vitest와 호환성을 위해 다음을 시도해보세요:

```bash
# Node.js 버전 확인
node --version

# npm 캐시 정리
npm cache clean --force

# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

## 참고 자료

- [Vitest 공식 문서](https://vitest.dev/)
- [Testing Library 문서](https://testing-library.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
