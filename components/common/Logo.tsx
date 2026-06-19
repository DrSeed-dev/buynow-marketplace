import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { siteConfig } from "@/config/site"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 font-bold text-xl tracking-tight
        hover:opacity-90 transition-opacity duration-200 ${className ?? ""}`}
    >
      {/* Icon container — indigo brand background */}
      <span
        className="flex items-center justify-center w-8 h-8 rounded-lg shadow-sm"
        style={{ backgroundColor: "var(--color-brand-600)" }}
      >
        <ShoppingBag size={17} strokeWidth={2.5} color="white" />
      </span>

      {/* Site name — hidden on very small screens */}
      <span
        className="hidden sm:inline"
        style={{ color: "var(--color-brand-600)" }}
      >
        {siteConfig.name}
      </span>
    </Link>
  )
}
