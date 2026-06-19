"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Users, Store, Package,
  ShoppingBag, Flag, Shield, Menu, X,
  TrendingUp, CheckCircle
} from "lucide-react"
import { formatNaira } from "@/lib/constants"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { href: "/admin",          label: "Overview",  icon: LayoutDashboard },
  { href: "/admin/users",    label: "Users",     icon: Users },
  { href: "/admin/vendors",  label: "Vendors",   icon: Store },
  { href: "/admin/products", label: "Products",  icon: Package },
  { href: "/admin/orders",   label: "Orders",    icon: ShoppingBag },
  { href: "/admin/reports",  label: "Reports",   icon: Flag },
]

const stats = [
  { label: "Total Users",     value: "12,840",     icon: Users,      color: "#6366f1", bg: "#eef2ff", change: "+12%" },
  { label: "Active Vendors",  value: "824",        icon: Store,      color: "#22c55e", bg: "#f0fdf4", change: "+8%"  },
  { label: "Total Products",  value: "24,310",     icon: Package,    color: "#f59e0b", bg: "#fffbeb", change: "+5%"  },
  { label: "Monthly Revenue", value: "₦8,240,000", icon: TrendingUp, color: "#ec4899", bg: "#fdf2f8", change: "+23%" },
]

const recentActivity = [
  { type: "vendor",  message: "Lagos Fabrics Hub applied for vendor approval", time: "2 min ago" },
  { type: "order",   message: "Order BN-20241210 worth ₦189,000 was placed",   time: "8 min ago" },
  { type: "user",    message: "New user registered: adaeze@gmail.com",          time: "15 min ago" },
  { type: "report",  message: "Product reported for incorrect pricing",         time: "1 hr ago" },
  { type: "vendor",  message: "NaturalGlow NG store was verified and approved", time: "2 hrs ago" },
  { type: "order",   message: "Order BN-20241209 delivered successfully",       time: "3 hrs ago" },
]

const activityColors: Record<string, { color: string }> = {
  vendor: { color: "#6366f1" },
  order:  { color: "#22c55e" },
  user:   { color: "#3b82f6" },
  report: { color: "#ef4444" },
}

const quickActions = [
  { label: "Approve Vendors",  icon: Store,      color: "#6366f1", bg: "#eef2ff", count: "4 pending" },
  { label: "Review Reports",   icon: Flag,       color: "#ef4444", bg: "#fef2f2", count: "2 new"     },
  { label: "Manage Products",  icon: Package,    color: "#f59e0b", bg: "#fffbeb", count: "24,310"     },
  { label: "View All Orders",  icon: ShoppingBag,color: "#22c55e", bg: "#f0fdf4", count: "87 today"   },
]

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--background)" }}>

      {/* ── MOBILE SIDEBAR BACKDROP ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r",
          "transition-transform duration-300 ease-in-out",
          "md:static md:translate-x-0 md:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* Sidebar header */}
        <div className="p-6 border-b flex items-center justify-between"
          style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--color-brand-600)" }}>
              <Shield size={18} color="white" />
            </div>
            <div>
              <p className="font-black text-sm" style={{ color: "var(--foreground)" }}>
                Admin Panel
              </p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                BuyNow v2.0
              </p>
            </div>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg"
            style={{ color: "var(--muted-foreground)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl",
                  "text-sm font-semibold transition-all duration-150"
                )}
                style={{
                  backgroundColor: isActive ? "var(--color-brand-100)" : "transparent",
                  color: isActive ? "var(--color-brand-600)" : "var(--muted-foreground)",
                }}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
          <Link href="/"
            className="flex items-center gap-2 text-xs font-semibold
              hover:opacity-70 transition-opacity"
            style={{ color: "var(--muted-foreground)" }}>
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div
          className="border-b px-4 sm:px-8 py-4 flex items-center justify-between
            sticky top-0 z-30"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
        >
          <div className="flex items-center gap-4">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl transition-colors"
              style={{
                backgroundColor: "var(--muted)",
                color: "var(--foreground)",
              }}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest hidden sm:block"
                style={{ color: "var(--color-brand-600)" }}>Admin</p>
              <h1 className="text-xl sm:text-2xl font-black"
                style={{ color: "var(--foreground)" }}>
                Platform Overview
              </h1>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center
            font-black text-white text-sm"
            style={{ backgroundColor: "var(--color-brand-600)" }}>
            A
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-4 sm:p-8 flex flex-col gap-6 sm:gap-8 overflow-auto">

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 sm:p-5 rounded-2xl border flex flex-col gap-3"
                style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: stat.bg }}>
                    <stat.icon size={20} color={stat.color} />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ backgroundColor: "#f0fdf4", color: "#22c55e" }}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black"
                    style={{ color: "var(--foreground)" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium"
                    style={{ color: "var(--muted-foreground)" }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Recent activity */}
            <div className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
                <h2 className="font-black" style={{ color: "var(--foreground)" }}>
                  Recent Activity
                </h2>
              </div>
              <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                {recentActivity.map((item, i) => {
                  const colors = activityColors[item.type] ?? activityColors.user
                  return (
                    <div key={i} className="flex items-start gap-4 p-4">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: colors.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm" style={{ color: "var(--foreground)" }}>
                          {item.message}
                        </p>
                        <p className="text-xs mt-0.5"
                          style={{ color: "var(--muted-foreground)" }}>
                          {item.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
                <h2 className="font-black" style={{ color: "var(--foreground)" }}>
                  Quick Actions
                </h2>
              </div>
              <div className="p-5 grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-col items-start gap-3 p-4 rounded-2xl
                      text-left transition-all duration-150
                      hover:-translate-y-0.5 hover:shadow-md"
                    style={{ backgroundColor: action.bg }}
                  >
                    <action.icon size={20} color={action.color} />
                    <div>
                      <p className="text-sm font-bold"
                        style={{ color: "var(--foreground)" }}>
                        {action.label}
                      </p>
                      <p className="text-xs"
                        style={{ color: "var(--muted-foreground)" }}>
                        {action.count}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
