"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// next-themes의 ThemeProvider를 클라이언트 컴포넌트로 래핑
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
