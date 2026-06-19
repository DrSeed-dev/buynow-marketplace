"use client"

import { CATEGORIES, PRICE_RANGES } from "@/lib/constants"
import { SORT_OPTIONS } from "@/lib/constants"
import type { ProductFilters } from "@/types/product"
import { SlidersHorizontal, X } from "lucide-react"

interface ProductFiltersProps {
  filters:   ProductFilters
  onChange:  (filters: Partial<ProductFilters>) => void
  onReset:   () => void
  totalResults: number
}

export function ProductFilters({
  filters,
  onChange,
  onReset,
  totalResults,
}: ProductFiltersProps) {

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.search !== ""

  return (
    <aside className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} style={{ color: "var(--color-brand-600)" }} />
          <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>
            Filters
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold
              transition-colors duration-200 hover:opacity-70"
            style={{ color: "var(--color-brand-600)" }}
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
        {totalResults} product{totalResults !== 1 ? "s" : ""} found
      </p>

      {/* Sort — mobile visible */}
      <div className="md:hidden">
        <p className="text-xs font-bold uppercase tracking-wider mb-2"
          style={{ color: "var(--muted-foreground)" }}>
          Sort By
        </p>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value as ProductFilters["sort"] })}
          className="w-full h-10 px-3 rounded-xl border text-sm font-medium"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

      {/* Categories */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider mb-3"
          style={{ color: "var(--muted-foreground)" }}>
          Category
        </p>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onChange({ category: cat.value })}
              className="flex items-center justify-between px-3 py-2 rounded-xl
                text-sm font-medium transition-all duration-150 text-left"
              style={{
                backgroundColor: filters.category === cat.value
                  ? "var(--color-brand-100)"
                  : "transparent",
                color: filters.category === cat.value
                  ? "var(--color-brand-600)"
                  : "var(--muted-foreground)",
                fontWeight: filters.category === cat.value ? 700 : 500,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

      {/* Price Range — quick picks */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider mb-3"
          style={{ color: "var(--muted-foreground)" }}>
          Price Range
        </p>
        <div className="flex flex-col gap-1">
          {PRICE_RANGES.map((range) => {
            const isActive =
              filters.minPrice === range.min &&
              filters.maxPrice === range.max

            return (
              <button
                key={range.label}
                onClick={() =>
                  isActive
                    ? onChange({ minPrice: "", maxPrice: "" })
                    : onChange({ minPrice: range.min, maxPrice: range.max })
                }
                className="flex items-center px-3 py-2 rounded-xl
                  text-sm transition-all duration-150 text-left"
                style={{
                  backgroundColor: isActive ? "var(--color-brand-100)" : "transparent",
                  color: isActive ? "var(--color-brand-600)" : "var(--muted-foreground)",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {range.label}
              </button>
            )
          })}
        </div>

        {/* Custom price input */}
        <div className="flex items-center gap-2 mt-3">
          <input
            type="number"
            placeholder="Min ₦"
            value={filters.minPrice}
            onChange={(e) =>
              onChange({ minPrice: e.target.value ? Number(e.target.value) : "" })
            }
            className="w-full h-9 px-3 rounded-xl border text-xs"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
          <span className="text-xs flex-shrink-0" style={{ color: "var(--muted-foreground)" }}>
            to
          </span>
          <input
            type="number"
            placeholder="Max ₦"
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({ maxPrice: e.target.value ? Number(e.target.value) : "" })
            }
            className="w-full h-9 px-3 rounded-xl border text-xs"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>
      </div>

    </aside>
  )
}
