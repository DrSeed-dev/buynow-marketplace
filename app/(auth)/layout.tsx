import type { Metadata } from "next"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Account",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Full screen height, centered content, subtle background
    <div
      className="min-h-screen flex flex-col items-center justify-center
        px-4 py-12"
      style={{ backgroundColor: "var(--muted)" }}
    >
      {/* Brand mark at top */}
      <Link
        href="/"
        className="flex items-center gap-2.5 mb-8 group"
      >
        <span
          className="flex items-center justify-center w-10 h-10
            rounded-xl shadow-md transition-transform duration-200
            group-hover:scale-95"
          style={{ backgroundColor: "var(--color-brand-600)" }}
        >
          <ShoppingBag size={20} strokeWidth={2.5} color="white" />
        </span>
        <span
          className="text-xl font-black tracking-tight"
          style={{ color: "var(--color-brand-600)" }}
        >
          {siteConfig.name}
        </span>
      </Link>

      {/* Auth card */}
      <div
        className="w-full max-w-md rounded-3xl border shadow-xl p-8"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {children}
      </div>

      {/* Footer note */}
      <p
        className="mt-6 text-xs text-center"
        style={{ color: "var(--muted-foreground)" }}
      >
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
    </div>
  )
}
