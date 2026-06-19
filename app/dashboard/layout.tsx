"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingBag, User, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/dashboard",         label: "Overview",  icon: LayoutDashboard },
  { href: "/dashboard/orders",  label: "My Orders", icon: ShoppingBag },
  { href: "/dashboard/profile", label: "Profile",   icon: User },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6
      min-h-screen pb-24 md:pb-8">
      <div className="flex gap-8">

        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col gap-2 w-56 flex-shrink-0">
          <div className="p-4 rounded-2xl border mb-2"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center
                font-black text-white text-base"
                style={{ backgroundColor: "var(--color-brand-600)" }}>J</div>
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                  Oluwatoyin Olamide
                </p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Shopper</p>
              </div>
            </div>
          </div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}
                className={cn("flex items-center justify-between px-4 py-3 rounded-xl",
                  "text-sm font-semibold transition-all duration-150")}
                style={{
                  backgroundColor: isActive ? "var(--color-brand-100)" : "transparent",
                  color: isActive ? "var(--color-brand-600)" : "var(--muted-foreground)",
                }}>
                <div className="flex items-center gap-3">
                  <link.icon size={18} />{link.label}
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            )
          })}
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t
        flex items-center px-2 py-2"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link key={link.href} href={link.href}
              className="flex flex-col items-center gap-1 py-1 flex-1 rounded-xl"
              style={{ color: isActive ? "var(--color-brand-600)" : "var(--muted-foreground)" }}>
              <div className="w-10 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: isActive ? "var(--color-brand-100)" : "transparent" }}>
                <link.icon size={18} />
              </div>
              <span className="text-[10px] font-bold">{link.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
