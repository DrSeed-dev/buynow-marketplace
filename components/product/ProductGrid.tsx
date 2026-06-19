import { ProductCard } from "./ProductCard"
import type { Product } from "@/types/product"

interface ProductGridProps {
  products: Product[]
  view:     "grid" | "list"
  loading?: boolean
}

// Skeleton card shown while products are loading
function SkeletonCard({ view }: { view: "grid" | "list" }) {
  if (view === "list") {
    return (
      <div
        className="flex gap-4 p-4 rounded-2xl border animate-pulse"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="w-28 h-28 rounded-xl flex-shrink-0"
          style={{ backgroundColor: "var(--muted)" }} />
        <div className="flex-1 flex flex-col gap-3 py-1">
          <div className="h-4 rounded-lg w-3/4" style={{ backgroundColor: "var(--muted)" }} />
          <div className="h-3 rounded-lg w-full"  style={{ backgroundColor: "var(--muted)" }} />
          <div className="h-3 rounded-lg w-2/3"   style={{ backgroundColor: "var(--muted)" }} />
          <div className="h-8 rounded-xl w-32 mt-auto" style={{ backgroundColor: "var(--muted)" }} />
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl border overflow-hidden animate-pulse"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Image placeholder */}
      <div className="aspect-square w-full" style={{ backgroundColor: "var(--muted)" }} />
      {/* Text placeholders */}
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 rounded w-1/2"  style={{ backgroundColor: "var(--muted)" }} />
        <div className="h-4 rounded w-full" style={{ backgroundColor: "var(--muted)" }} />
        <div className="h-4 rounded w-3/4" style={{ backgroundColor: "var(--muted)" }} />
        <div className="flex justify-between items-center mt-1">
          <div className="h-5 rounded w-20" style={{ backgroundColor: "var(--muted)" }} />
          <div className="w-9 h-9 rounded-xl" style={{ backgroundColor: "var(--muted)" }} />
        </div>
      </div>
    </div>
  )
}

export function ProductGrid({ products, view, loading = false }: ProductGridProps) {

  // Show 8 skeleton cards while loading
  if (loading) {
    return (
      <div className={
        view === "grid"
          ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
          : "flex flex-col gap-4"
      }>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} view={view} />
        ))}
      </div>
    )
  }

  // No results state
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{ backgroundColor: "var(--muted)" }}
        >
          🔍
        </div>
        <div className="text-center">
          <p className="font-bold text-lg" style={{ color: "var(--foreground)" }}>
            No products found
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={
      view === "grid"
        ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
        : "flex flex-col gap-4"
    }>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} view={view} />
      ))}
    </div>
  )
}
