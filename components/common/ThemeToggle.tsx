"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative rounded-full"
      style={{ color: "var(--muted-foreground)" }}
    >
      {/* Sun icon — visible in light mode, rotates away in dark mode */}
      <Sun
        size={18}
        className="rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
      />
      {/* Moon icon — hidden in light mode, rotates in during dark mode */}
      <Moon
        size={18}
        className="absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
      />
    </Button>
  )
}
