---
description: Next.js 16 App Router 페이지를 스캐폴딩합니다 (page.tsx + 선택적 layout/loading/error)
argument-hint: <경로> [--layout] [--loading] [--error] [--client]
---

# /add-page — App Router 페이지 스캐폴딩

당신은 Next.js 16.2.4 + React 19.2.4 App Router 페이지를 생성하는 작업을 수행합니다.
이 저장소는 `src/app/` 디렉터리를 사용하며, TypeScript, Tailwind v4, shadcn/ui (`@base-ui/react` 기반) 환경입니다.

## 사용자 입력

사용자가 전달한 인자: `$ARGUMENTS`

- 첫 번째 인자는 **라우트 경로** (예: `about`, `dashboard/settings`, `blog/[slug]`, `shop/[...filters]`)
- 선택적 플래그:
  - `--layout` : 해당 세그먼트에 `layout.tsx`도 생성
  - `--loading` : `loading.tsx` (Suspense 폴백) 생성
  - `--error` : `error.tsx` (에러 바운더리, Client Component) 생성
  - `--client` : `page.tsx`를 Client Component(`"use client"`)로 생성
- 인자가 비어 있으면 **사용자에게 경로를 물어본 뒤 진행**할 것

## 절차

1. **경로 파싱 및 검증**
   - 슬래시(`/`) 기준으로 세그먼트 분리
   - 동적 세그먼트(`[slug]`, `[...slug]`, `[[...slug]]`) 형식 검증
   - 최종 디렉터리 경로: `src/app/<경로>/`
   - **이미 `page.tsx`가 존재하면 덮어쓰지 말고 사용자에게 확인 요청**

2. **디렉터리 생성**
   - Bash로 `mkdir -p src/app/<경로>` 실행

3. **page.tsx 생성** (필수)
   - **정적 라우트**(동적 세그먼트 없음): 단순 컴포넌트
   - **동적 라우트**: `PageProps<'/경로'>` 전역 헬퍼 사용 + `async`/`await params`
   - **`--client` 플래그**: `"use client"` 지시문 + `use(params)` 사용 (Client Component는 async 불가)
   - 모든 파일은 **한국어 주석**으로 각 블록의 역할을 설명할 것
   - Tailwind v4 클래스로 최소한의 컨테이너(`<main className="container mx-auto px-4 py-8">`)와 제목 포함
   - `export const metadata` 도 함께 추가 (정적 라우트일 때, Client Component가 아닐 때만)

4. **선택적 파일 생성**
   - `--layout` → `layout.tsx` (`LayoutProps<'/경로'>` 헬퍼 사용, `children: React.ReactNode`)
   - `--loading` → `loading.tsx` (간단한 스켈레톤/스피너)
   - `--error` → `error.tsx` (반드시 `"use client"`, `error`/`reset` props)

5. **실행 후 보고**
   - 생성된 파일 목록을 절대경로로 출력
   - 접근 가능한 URL 경로 안내 (예: `localhost:3000/dashboard/settings`)
   - 동적 라우트라면 예시 URL도 함께 (예: `[slug]` → `/blog/hello-world`)

## 코드 템플릿 가이드

### 정적 라우트 page.tsx (Server Component, 기본)

```tsx
// <경로> 페이지 — 정적 라우트 (Server Component)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "<제목>",
};

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">제목</h1>
      {/* TODO: 페이지 내용 작성 */}
    </main>
  );
}
```

### 동적 라우트 page.tsx (Server Component)

```tsx
// <경로> 페이지 — 동적 라우트 (params는 Promise)
export default async function Page(props: PageProps<'/경로/[slug]'>) {
  // params는 Promise이므로 반드시 await 필요 (Next.js 15부터 변경된 사양)
  const { slug } = await props.params;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">슬러그: {slug}</h1>
    </main>
  );
}
```

### Client Component page.tsx (`--client`)

```tsx
"use client";

// <경로> 페이지 — Client Component (use 훅으로 params 읽기)
import { use } from "react";

export default function Page(props: PageProps<'/경로/[slug]'>) {
  // Client Component는 async 사용 불가 → React의 use() 훅으로 Promise 언래핑
  const { slug } = use(props.params);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">슬러그: {slug}</h1>
    </main>
  );
}
```

### layout.tsx (`--layout`)

```tsx
// <경로> 레이아웃 — 하위 모든 라우트를 감쌈
export default function Layout(props: LayoutProps<'/경로'>) {
  return (
    <section className="min-h-screen">
      {/* TODO: 공통 네비게이션이나 사이드바를 여기에 배치 */}
      {props.children}
    </section>
  );
}
```

### loading.tsx (`--loading`)

```tsx
// <경로> 로딩 폴백 — React Suspense 경계
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
    </div>
  );
}
```

### error.tsx (`--error`)

```tsx
"use client";

// <경로> 에러 바운더리 — error.tsx는 반드시 Client Component
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러를 로깅 서비스에 전송하는 자리
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold">문제가 발생했어요</h2>
      <Button onClick={reset} className="mt-4">
        다시 시도
      </Button>
    </div>
  );
}
```

## 중요 규칙

- **반드시 Write 도구로 파일을 생성**할 것 (Bash의 `echo >` 사용 금지)
- 동적 라우트는 `PageProps<'/실제/라우트/[slug]'>` 처럼 **루트부터의 전체 경로 리터럴**을 넘길 것
- 이 저장소는 `src/app/` 구조이며 `tsconfig.json`의 `@/*` → `src/*` 매핑을 사용
- shadcn 컴포넌트를 임포트할 때는 `@/components/ui/<name>`
- 생성된 파일은 `npm run dev` 또는 `npx tsc --noEmit`으로 사용자가 검증할 수 있도록 안내
- 작업 종료 시 한국어로 간결하게 보고
