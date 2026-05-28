"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// 라이트 / 다크 / 시스템 테마를 전환하는 드롭다운 토글 버튼
export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      {/* DropdownMenuTrigger는 @base-ui/react 기반으로 렌더됨 */}
      <DropdownMenuTrigger className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg border border-input bg-background transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {/* 라이트 모드일 때 보이는 태양 아이콘 */}
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        {/* 다크 모드일 때 보이는 달 아이콘 (절대 위치로 겹쳐서 표시) */}
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">테마 변경</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          라이트
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          다크
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          시스템
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
