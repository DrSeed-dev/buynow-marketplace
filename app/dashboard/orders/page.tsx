"use client"

import Link from "next/link"
import {
  ShoppingBag, Heart, Star, TrendingUp,
  Clock, CheckCircle, XCircle, Truck
} from "lucide-react"
import { useLocale } from "@/providers/CurrencyLanguageContext"

const recentOrders = [
  { id: "BN-20241201", date: "Dec 1, 2024",  items: "Ankara Fabric × 2",  total: 17000,  status: "delivered"  },
  { id: "BN-20241118", date: "Nov 18, 2024", items: "Tecno Camon 30 Pro", total: 189000, status: "shipped"    },
  { id: "BN-20241103", date: "Nov 3, 2024",  items: "JBL Flip 6 Speaker", total: 52000,  status: "processing" },
  { id: "BN-20241020", date: "Oct 20, 2024", items: "Shea Butter × 3",    total: 10500,  status: "delivered"  },
]

const statusConfig = {
  delivered:  { label: "Delivered",  icon: CheckCircle, color: "#22c55e", bg: "#f0fdf4" },
  shipped:    { label: "Shipped",    icon: Truck,       color: "#3b82f6", bg: "#eff6ff" },
  processing: { label: "Processing", icon: Clock,       color: "#f59e0b", bg: "#fffbeb" },
  cancelled:  { label: "Cancelled",  icon: XCircle,     color: "#ef4444", bg: "#fef2f2" },
}

export default function DashboardPage() {
  const { convertPrice, t } = useLocale()

  const stats = [
    { label: t("dashboard.totalOrders"), value: "12",                    icon: ShoppingBag, color: "#6366f1", bg: "#eef2ff" },
    { label: t("dashboard.wishlist"),    value: "8",                     icon: Heart,       color: "#ec4899", bg: "#fdf2f8" },
    { label: t("dashboard.totalSpent"),  value: convertPrice(284500),    icon: TrendingUp,  color: "#22c55e", bg: "#f0fdf4" },
    { label: t("dashboard.reviews"),     value: "5",                     icon: Star,        color: "#f59e0b", bg: "#fffbeb" },
  ]

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: "var(--color-brand-600)" }}>{t("dashboard.myAccount")}</p>
        <h1 className="text-2xl sm:text-3xl font-black"
          style={{ color: "var(--foreground)" }}>
          {t("dashboard.welcome")}, John
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div key={stat.label}
            className="p-4 rounded-2xl border flex flex-col gap-3"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: stat.bg }}>
              <stat.icon size={18} color={stat.color} />
            </div>
            <div>
              <p className="text-xl font-black" style={{ color: "var(--foreground)" }}>
                {stat.value}
              </p>
              <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl border overflow-hidden"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>

        <div className="flex items-center justify-between p-4 sm:p-5 border-b"
          style={{ borderColor: "var(--border)" }}>
          <h2 className="font-black text-base sm:text-lg"
            style={{ color: "var(--foreground)" }}>{t("dashboard.recentOrders")}</h2>
          <Link href="/dashboard/orders"
            className="text-sm font-semibold hover:opacity-70"
            style={{ color: "var(--color-brand-600)" }}>{t("dashboard.viewAll")}</Link>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col divide-y sm:hidden"
          style={{ borderColor: "var(--border)" }}>
          {recentOrders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig]
            return (
              <div key={order.id} className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black"
                    style={{ color: "var(--color-brand-600)" }}>{order.id}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5
                    rounded-full text-xs font-bold"
                    style={{ backgroundColor: status.bg, color: status.color }}>
                    <status.icon size={10} />
                    {status.label}
                  </span>
                </div>
                <p className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}>{order.items}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {order.date}
                  </span>
                  <span className="text-sm font-black" style={{ color: "var(--foreground)" }}>
                    {convertPrice(order.total)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "var(--muted)" }}>
                {[
                  t("orders.orderId"),
                  t("orders.date"),
                  t("orders.items"),
                  t("orders.total"),
                  t("orders.status"),
                ].map((h) => (
                  <th key={h}
                    className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig]
                return (
                  <tr key={order.id} className="border-t"
                    style={{ borderColor: "var(--border)" }}>
                    <td className="px-5 py-4">
                      <span className="text-sm font-black"
                        style={{ color: "var(--color-brand-600)" }}>{order.id}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                        {order.date}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium"
                        style={{ color: "var(--foreground)" }}>{order.items}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-black" style={{ color: "var(--foreground)" }}>
                        {convertPrice(order.total)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1
                        rounded-full text-xs font-bold"
                        style={{ backgroundColor: status.bg, color: status.color }}>
                        <status.icon size={11} />
                        {status.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
