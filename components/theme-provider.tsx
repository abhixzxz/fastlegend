"use client"

import type React from "react"

import { useEffect } from "react"
import { useThemeStore } from "@/lib/store"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, colorMode } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement

    // Apply theme
    root.setAttribute("data-theme", theme)

    // Determine actual color mode
    let actualMode = colorMode
    if (colorMode === "auto") {
      actualMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }

    // Ensure only one mode class is present at a time
    root.classList.remove("dark", "light")
    if (actualMode === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.add("light")
    }
  }, [theme, colorMode])

  return <>{children}</>
}
