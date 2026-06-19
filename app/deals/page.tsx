import { PageWrapper } from "@/components/common/PageWrapper"
import { ProductCard } from "@/components/product/ProductCard"
import { MOCK_PRODUCTS, formatNaira } from "@/lib/constants"
import { Tag, Clock, Zap, TrendingDown } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Today's Deals" }

// Products with discounts
const dealProducts = MOCK_PRODUCTS.filter((p) => p.originalPrice)

const dealCategories = [
  { icon: Zap,          label: "Flash Deals",     color: "#ef4444", bg: "#fef2f2",  desc: "Limited time only" },
  { icon: TrendingDown, label: "Price Drop",       color: "#6366f1", bg: "#eef2ff",  desc: "Recently reduced" },
  { icon: Tag,          label: "Clearance",        color: "#f59e0b", bg: "#fffbeb",  desc: "While stock lasts" },
  { icon: Clock,        label: "Daily Deals",      color: "#22c55e", bg: "#f0fdf4",  desc: "Refreshed every day" },
]

export default function DealsPage() {
  return (
    <PageWrapper className="py-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: "var(--color-brand-600)" }}>Limited Time</p>
        <h1 className="text-3xl md:text-4xl font-black"
          style={{ color: "var(--foreground)" }}>
          Today&apos;s Deals
        </h1>
        <p className="mt-2 text-base" style={{ color: "var(--muted-foreground)" }}>
          Best prices on top products. Updated daily.
        </p>
      </div>

      {/* Deal type cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {dealCategories.map((cat) => (
          <div key={cat.label}
            className="flex items-center gap-3 p-4 rounded-2xl border
              transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: cat.bg }}>
              <cat.icon size={20} color={cat.color} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                {cat.label}
              </p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {cat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Savings banner */}
      <div className="rounded-2xl p-6 mb-10 flex flex-col sm:flex-row
        items-center justify-between gap-4"
        style={{ backgroundColor: "var(--color-brand-600)" }}>
        <div>
          <p className="text-white font-black text-xl">
            Save up to 30% today
          </p>
          <p className="text-white/70 text-sm mt-1">
            On hundreds of products from verified vendors
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} color="white" opacity={0.7} />
          <span className="text-white font-bold text-sm">Deals refresh daily at midnight</span>
        </div>
      </div>

      {/* Deal products */}
      <div>
        <h2 className="text-xl font-black mb-6"
          style={{ color: "var(--foreground)" }}>
          {dealProducts.length} Products On Sale
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} view="grid" />
          ))}
        </div>
      </div>

    </PageWrapper>
  )
}
