import Link from "next/link"
import { Package, TrendingUp, ShoppingBag, Star, PlusCircle, Eye } from "lucide-react"
import { formatNaira } from "@/lib/constants"

const stats = [
  { label: "Total Products",  value: "24",         icon: Package,     color: "#6366f1", bg: "#eef2ff" },
  { label: "Total Revenue",   value: "₦1,240,000", icon: TrendingUp,  color: "#22c55e", bg: "#f0fdf4" },
  { label: "Orders Received", value: "87",         icon: ShoppingBag, color: "#f59e0b", bg: "#fffbeb" },
  { label: "Avg. Rating",     value: "4.7",        icon: Star,        color: "#ec4899", bg: "#fdf2f8" },
]

const recentProducts = [
  { id: "1",  name: "Premium Ankara Fabric (6 Yards)",  slug: "ankara-fabric-6-yards",   price: 8500,  stock: 45,  sales: 214, status: "active"        },
  { id: "5",  name: "Aba-Made Men Leather Shoes",       slug: "aba-leather-shoes-men",    price: 15500, stock: 60,  sales: 445, status: "active"        },
  { id: "12", name: "Pure Unrefined Shea Butter 500g",  slug: "shea-butter-pure-500g",    price: 3500,  stock: 300, sales: 521, status: "active"        },
  { id: "9",  name: "JBL Flip 6 Bluetooth Speaker",     slug: "jbl-flip-6-speaker",       price: 52000, stock: 0,   sales: 267, status: "out_of_stock"  },
]

export default function VendorPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* Header — stacked on mobile, row on desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: "var(--color-brand-600)" }}>Vendor Dashboard</p>
          <h1 className="text-2xl sm:text-3xl font-black"
            style={{ color: "var(--foreground)" }}>Store Overview</h1>
        </div>
        {/* Add Product button — full width on mobile */}
        <Link
          href="/vendor/products/new"
          className="flex items-center justify-center gap-2 h-11 px-5 rounded-2xl
            font-bold text-sm text-white shadow-md w-full sm:w-auto
            hover:-translate-y-0.5 transition-all duration-200"
          style={{ backgroundColor: "var(--color-brand-600)" }}
        >
          <PlusCircle size={16} />
          Add Product
        </Link>
      </div>

      {/* Stats — 2 col on mobile, 4 col on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div key={stat.label}
            className="p-4 rounded-2xl border flex flex-col gap-3"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: stat.bg }}>
              <stat.icon size={18} color={stat.color} />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-black"
                style={{ color: "var(--foreground)" }}>{stat.value}</p>
              <p className="text-xs font-medium"
                style={{ color: "var(--muted-foreground)" }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Products table */}
      <div className="rounded-2xl border overflow-hidden"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>

        <div className="flex items-center justify-between p-4 sm:p-5 border-b"
          style={{ borderColor: "var(--border)" }}>
          <h2 className="font-black text-base sm:text-lg"
            style={{ color: "var(--foreground)" }}>Your Products</h2>
          <Link href="/vendor/products"
            className="text-sm font-semibold hover:opacity-70"
            style={{ color: "var(--color-brand-600)" }}>Manage all →</Link>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col divide-y sm:hidden"
          style={{ borderColor: "var(--border)" }}>
          {recentProducts.map((product) => (
            <div key={product.id} className="p-4 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate"
                  style={{ color: "var(--foreground)" }}>{product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-black"
                    style={{ color: "var(--color-brand-600)" }}>
                    {formatNaira(product.price)}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: product.status === "active" ? "#f0fdf4" : "#fef2f2",
                    color: product.status === "active" ? "#22c55e" : "#ef4444",
                  }}>
                  {product.status === "active" ? "Active" : "Out of Stock"}
                </span>
                <Link href={`/products/${product.slug}`}
                  className="p-1.5 rounded-lg"
                  style={{ color: "var(--color-brand-600)" }}>
                  <Eye size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "var(--muted)" }}>
                {["Product", "Price", "Stock", "Sales", "Status", ""].map((h) => (
                  <th key={h}
                    className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product) => (
                <tr key={product.id} className="border-t"
                  style={{ borderColor: "var(--border)" }}>
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold"
                      style={{ color: "var(--foreground)" }}>{product.name}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-black"
                      style={{ color: "var(--color-brand-600)" }}>
                      {formatNaira(product.price)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium"
                      style={{ color: product.stock === 0 ? "var(--color-error)" : "var(--foreground)" }}>
                      {product.stock === 0 ? "Out of stock" : product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      {product.sales}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: product.status === "active" ? "#f0fdf4" : "#fef2f2",
                        color: product.status === "active" ? "#22c55e" : "#ef4444",
                      }}>
                      {product.status === "active" ? "Active" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/products/${product.slug}`}
                      className="flex items-center gap-1 text-xs font-semibold hover:opacity-70"
                      style={{ color: "var(--color-brand-600)" }}>
                      <Eye size={13} /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
