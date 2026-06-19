"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-1">
      {siteConfig.navLinks.map((link) => {
        const isActive = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              isActive
                ? "text-[var(--color-brand-600)] bg-[var(--color-brand-100)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
