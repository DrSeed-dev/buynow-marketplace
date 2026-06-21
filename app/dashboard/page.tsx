"use client"

import { Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react"
import { useLocale } from "@/providers/CurrencyLanguageContext"

const orders = [
  {
    id: "BN-20241201", date: "Jan 5, 2026",
    items: [{ name: "Premium Ankara Fabric (6 Yards)", qty: 2, price: 8500 }],
    total: 17000, status: "delivered",
    address: "12 Adeola Odeku, Victoria Island, Lagos",
  },
  {
    id: "BN-20241118", date: "Jan 18, 2026",
    items: [{ name: "Tecno Camon 30 Pro 5G", qty: 1, price: 189000 }],
    total: 189000, status: "shipped",
    address: "5 Wuse Zone 6, Abuja",
  },
  {
    id: "BN-20241103", date: "Jan 3, 2026",
    items: [{ name: "JBL Flip 6 Bluetooth Speaker", qty: 1, price: 52000 }],
    total: 52000, status: "processing",
    address: "23 Trans Amadi Road, Port Harcourt",
  },
  {
    id: "BN-20241020", date: "Jan 20, 2026",
    items: [{ name: "Pure Unrefined Shea Butter 500g", qty: 3, price: 3500 }],
    total: 10500, status: "delivered",
    address: "8 Ring Road, Ibadan",
  },
]

const statusConfig = {
  delivered:  { label: "Delivered",  icon: CheckCircle, color: "#22c55e", bg: "#f0fdf4" },
  shipped:    { label: "Shipped",    icon: Truck,       color: "#3b82f6", bg: "#eff6ff" },
  processing: { label: "Processing", icon: Clock,       color: "#f59e0b", bg: "#fffbeb" },
  cancelled:  { label: "Cancelled",  icon: XCircle,     color: "#ef4444", bg: "#fef2f2" },
}

export default function OrdersPage() {
  // convertPrice replaces formatNaira — updates instantly when currency changes
  const { convertPrice, t } = useLocale()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: "var(--color-brand-600)" }}>
          {t("dashboard.myAccount")}
        </p>
        <h1 className="text-3xl font-black" style={{ color: "var(--foreground)" }}>
          {t("orders.title")}
        </h1>
      </div>

      {orders.map((order) => {
        const status = statusConfig[order.status as keyof typeof statusConfig]
        return (
          <div key={order.id}
            className="rounded-2xl border overflow-hidden"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>

            {/* Order header */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: "var(--muted-foreground)" }}>{t("orders.orderId")}</p>
                  <p className="text-sm font-black" style={{ color: "var(--color-brand-600)" }}>
                    {order.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: "var(--muted-foreground)" }}>{t("orders.date")}</p>
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {order.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: "var(--muted-foreground)" }}>{t("orders.total")}</p>
                  <p className="text-sm font-black" style={{ color: "var(--foreground)" }}>
                    {convertPrice(order.total)}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5
                rounded-full text-xs font-bold"
                style={{ backgroundColor: status.bg, color: status.color }}>
                <status.icon size={12} />
                {status.label}
              </span>
            </div>

            {/* Order items */}
            <div className="p-5 flex flex-col gap-4">
              {order.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-brand-100)" }}>
                      <Package size={18} style={{ color: "var(--color-brand-600)" }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                        {item.name}
                      </p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        {t("orders.qty")} {item.qty}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-black flex-shrink-0"
                    style={{ color: "var(--color-brand-600)" }}>
                    {convertPrice(item.price * item.qty)}
                  </p>
                </div>
              ))}

              <div className="pt-3 border-t text-sm"
                style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                {t("orders.shippedTo")} {order.address}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
