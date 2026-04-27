# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠ This is NOT the Next.js you know

This project uses **Next.js 16.2.4** + **React 19.2.4**. APIs, conventions, and file structure may differ from training data. Read `node_modules/next/dist/docs/` before writing any Next.js-specific code. Heed deprecation notices.

## 명령어

```bash
npm run dev        # 개발 서버 실행 (localhost:3000)
npm run build      # 프로덕션 빌드
npm run lint       # ESLint 검사
npx tsc --noEmit   # 타입 체크 (빌드 없이)

# shadcn 컴포넌트 추가 (수동으로 ui/ 파일을 작성하지 말 것)
npx shadcn@latest add <컴포넌트명>
```

## 아키텍처 결정사항

### shadcn/ui — @base-ui/react 기반

이 저장소의 shadcn/ui는 **Radix UI가 아닌 `@base-ui/react`** 를 사용하는 최신 버전 (`style: "base-nova"`, `components.json`). 다음 차이점에 주의:

- `asChild` prop **없음** → `render` prop 사용
  ```tsx
  // ❌ 기존 shadcn 패턴
  <DialogTrigger asChild><Button>열기</Button></DialogTrigger>

  // ✅ 이 프로젝트의 패턴
  <DialogTrigger render={<Button />}>열기</DialogTrigger>
  ```
- `DropdownMenuTrigger`, `DialogTrigger` 등 모든 트리거 컴포넌트에 동일하게 적용.

### form.tsx — CLI로 생성되지 않는 컴포넌트

`src/components/ui/form.tsx`는 shadcn CLI가 자동 생성하지 못해 **수동으로 작성된 파일**이다. react-hook-form의 `Controller` + React Context 패턴으로 구현됨. `npx shadcn@latest add form`으로 덮어쓰면 @base-ui/react와 충돌한다.

### Tailwind CSS v4 — CSS-first 설정

`tailwind.config.{js,ts}` 파일이 **존재하지 않는다**. 모든 테마 색상과 CSS 변수는 `src/app/globals.css`에서 관리:

- `@theme inline { }` — Tailwind 유틸리티 클래스로 쓸 CSS 변수 매핑
- `:root { }` — 라이트 모드 색상 (oklch 형식)
- `.dark { }` — 다크 모드 색상

색상 추가/수정 시 `globals.css`만 편집하면 된다.

### Path alias

`tsconfig.json`의 `@/*` → `src/*` 매핑. `components.json`에 정의된 주요 alias:

| alias | 실제 경로 |
|-------|----------|
| `@/components/ui` | `src/components/ui` |
| `@/lib/utils` | `src/lib/utils.ts` (`cn()` 함수) |
| `@/hooks` | `src/hooks` |

## 다크 모드

- `src/components/theme-provider.tsx`: next-themes `ThemeProvider` 클라이언트 래퍼
- `src/components/mode-toggle.tsx`: 라이트 / 다크 / 시스템 토글 버튼
- `src/app/layout.tsx`의 `<html suppressHydrationWarning>` — 서버/클라이언트 테마 불일치 경고 억제를 위해 **반드시 유지**할 것

## 코드 컨벤션

- **주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **변수명·함수명**: 영어 (코드 표준)
