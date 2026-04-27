"use client"

import { Code2, Palette, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ModeToggle } from "@/components/mode-toggle"

// 기능 카드 데이터 목록
const features = [
  {
    icon: Zap,
    title: "빠른 개발",
    description:
      "Next.js 16 App Router + Tailwind CSS v4 + shadcn/ui로 구성된 최신 스택으로 바로 개발을 시작하세요.",
  },
  {
    icon: Palette,
    title: "다크 모드",
    description:
      "next-themes 기반 라이트 / 다크 / 시스템 테마 토글이 내장되어 있습니다.",
  },
  {
    icon: Code2,
    title: "TypeScript First",
    description:
      "모든 컴포넌트가 타입 안전(type-safe)하게 구성되어 개발 경험을 높입니다.",
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* ── 헤더 ── */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <span className="text-sm font-semibold tracking-tight">
            Claude Next.js Starter Kit
          </span>
          {/* 다크 모드 토글 버튼 */}
          <ModeToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center">
        {/* ── Hero 섹션 ── */}
        <section className="flex w-full flex-col items-center gap-6 px-6 py-20 text-center">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            웹 개발을 더 빠르게 시작하세요
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Next.js · TypeScript · Tailwind CSS v4 · shadcn/ui로 구성된 스타터 킷입니다.
            복제 후 바로 개발을 시작할 수 있습니다.
          </p>
          {/* CTA 버튼 영역 */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg">시작하기</Button>
            <Button variant="outline" size="lg">
              GitHub
            </Button>
          </div>
        </section>

        {/* ── 기능 카드 섹션 ── */}
        <section className="w-full max-w-5xl px-6 pb-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  {/* 기능 아이콘 */}
                  <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 컴포넌트 데모 섹션 ── */}
        <section className="w-full max-w-5xl px-6 pb-20">
          <Card>
            <CardHeader>
              <CardTitle>shadcn/ui 컴포넌트 데모</CardTitle>
              <CardDescription>
                아래 버튼을 클릭해 Dialog 컴포넌트가 정상 동작하는지 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger render={<Button variant="outline" />}>
                  Dialog 열기
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>스타터 킷이 준비됐습니다!</DialogTitle>
                    <DialogDescription>
                      이 Dialog는 shadcn/ui의 @base-ui/react 기반 컴포넌트입니다.
                      다크 모드에서도 올바르게 표시됩니다.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter showCloseButton>
                    <Button>확인</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* ── 푸터 ── */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © 2026 Claude Next.js Starter Kit. Built with Next.js &amp; shadcn/ui.
      </footer>
    </div>
  )
}
