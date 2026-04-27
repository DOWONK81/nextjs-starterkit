# Claude Next.js Starter Kit

Next.js + TypeScript + Tailwind CSS v4 + shadcn/ui 기반의 웹 개발 스타터 킷입니다. 새 프로젝트를 시작할 때 이 저장소를 복제하면 별도 설정 없이 바로 개발을 시작할 수 있습니다.

---

## 기술 스택

| 도구 | 버전 | 역할 |
|------|------|------|
| [Next.js](https://nextjs.org) | ^16 (App Router) | 풀스택 React 프레임워크 |
| [TypeScript](https://www.typescriptlang.org) | ^5 | 타입 안전성 |
| [Tailwind CSS](https://tailwindcss.com) | v4 (CSS-first, config 파일 없음) | 유틸리티 CSS |
| [shadcn/ui](https://ui.shadcn.com) | latest | 복사 가능한 UI 컴포넌트 |
| [lucide-react](https://lucide.dev) | latest | 아이콘 라이브러리 |
| [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4 | 다크 모드 토글 |
| [react-hook-form](https://react-hook-form.com) | ^7 | 폼 상태 관리 |
| [zod](https://zod.dev) | ^4 | 스키마 유효성 검사 |

---

## 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 랜딩 페이지가 표시됩니다.

---

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx       # 루트 레이아웃 (ThemeProvider, Toaster 포함)
│   ├── page.tsx         # 샘플 랜딩 페이지
│   └── globals.css      # Tailwind + shadcn CSS 변수
├── components/
│   ├── ui/              # shadcn CLI로 추가한 UI 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── sheet.tsx
│   │   └── sonner.tsx
│   ├── theme-provider.tsx   # next-themes 래퍼 컴포넌트
│   └── mode-toggle.tsx      # 라이트/다크/시스템 토글 버튼
└── lib/
    └── utils.ts         # cn() 유틸 함수 (Tailwind 클래스 병합)
```

---

## shadcn/ui 컴포넌트 추가하기

```bash
npx shadcn@latest add <컴포넌트명>
```

예시:
```bash
# 뱃지 컴포넌트 추가
npx shadcn@latest add badge

# 여러 컴포넌트 한 번에 추가
npx shadcn@latest add avatar badge tooltip
```

추가된 컴포넌트는 `src/components/ui/` 폴더에 생성됩니다.

---

## 다크 모드 사용법

`useTheme()` 훅으로 테마를 프로그래밍 방식으로 변경할 수 있습니다.

```tsx
"use client"

import { useTheme } from "next-themes"

export function MyComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      현재 테마: {theme}
    </button>
  )
}
```

헤더 우측의 토글 버튼(라이트 / 다크 / 시스템)을 클릭해도 테마를 변경할 수 있습니다.

---

## react-hook-form + zod 폼 예시

```tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// 유효성 검사 스키마 정의
const schema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
})

export function EmailForm() {
  const form = useForm({ resolver: zodResolver(schema) })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="hello@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">제출</Button>
      </form>
    </Form>
  )
}
```

---

## 유용한 명령어

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 빌드된 앱 실행
npm run lint     # ESLint 검사
```

---

## 주요 설계 결정

- **Tailwind v4**: `tailwind.config.js` 파일을 사용하지 않습니다. 모든 테마 설정은 `globals.css`의 `@theme inline { }` 블록에서 CSS 변수로 관리됩니다.
- **shadcn/ui**: 컴포넌트 코드가 `src/components/ui/`에 직접 복사되므로 자유롭게 수정할 수 있습니다.
- **@base-ui/react**: 최신 shadcn/ui는 Radix UI 대신 Base UI(`@base-ui/react`)를 사용합니다.
