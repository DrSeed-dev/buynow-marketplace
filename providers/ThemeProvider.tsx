"use client"

// We import the ThemeProvider from next-themes
// This library handles dark/light mode switching automatically
import { ThemeProvider as NextThemesProvider } from "next-themes"

// ComponentProps lets us grab the exact props NextThemesProvider accepts
// so we don't have to manually define them — TypeScript does it for us
import type { ComponentProps } from "react"

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      // "class" means it toggles the .dark class on <html>
      // which is exactly what our globals.css .dark{} block responds to
      attribute="class"
      // Default to system preference (respects OS dark/light setting)
      defaultTheme="system"
      // Also allow it to detect system theme changes automatically
      enableSystem
      // Prevent flash of wrong theme on page load
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}