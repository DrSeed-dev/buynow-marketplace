"use client"

import { Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react"
import { useLocale } from "@/providers/CurrencyLanguageContext"
import type { Order } from "@/types/order"

interface OrderHistoryTableProps {
  orders: Order[]
}

const statusConfig = {
  pending:    { label: "Pending",    icon: Clock,        color: "#f59e0b", bg: "#fffbeb" },
  processing: { label: "Processing", icon: Clock,        color: "#f59e0b", bg: "#fffbeb" },
  shipped:    { label: "Shipped",    icon: Truck,        color: "#3b82f6", bg: "#eff6ff" },
  delivered:  { label: "Delivered",  icon: CheckCircle,  color: "#22c55e", bg: "#f0fdf4" },
  cancelled:  { label: "Cancelled",  icon: XCircle,      color: "#ef4444", bg: "#fef2f2" },
  refunded:   { label: "Refunded",   icon: XCircle,      color: "#8b5cf6", bg: "#f5f3ff" },
}

export function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
  // convertPrice replaces formatNaira — updates when currency changes globally
  const { convertPrice, t } = useLocale()

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "var(--muted)" }}>
          <Package size={28} style={{ color: "var(--muted-foreground)" }} />
        </div>
        <div className="text-center">
          <p className="font-bold" style={{ color: "var(--foreground)" }}>
            {t("orders.noOrders")}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            {t("orders.noOrdersSub")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border overflow-hidden"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>

      {/* Mobile — card list */}
      <div className="flex flex-col divide-y sm:hidden"
        style={{ borderColor: "var(--border)" }}>
        {orders.map((order) => {
          const status = statusConfig[order.status]
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
              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {order.items.map((i) => i.productName).join(", ")}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {new Date(order.createdAt).toLocaleDateString("en-NG", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </span>
                <span className="text-sm font-black" style={{ color: "var(--foreground)" }}>
                  {convertPrice(order.total)}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop — table */}
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
            {orders.map((order) => {
              const status = statusConfig[order.status]
              return (
                <tr key={order.id} className="border-t"
                  style={{ borderColor: "var(--border)" }}>
                  <td className="px-5 py-4">
                    <span className="text-sm font-black"
                      style={{ color: "var(--color-brand-600)" }}>{order.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      {new Date(order.createdAt).toLocaleDateString("en-NG", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                      {order.items.map((i) => i.productName).join(", ")}
                    </span>
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
  )
}
