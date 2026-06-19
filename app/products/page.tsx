"use client"

import { useState, useMemo } from "react"
import { Search, LayoutGrid, List, ChevronDown } from "lucide-react"
import { ProductGrid } from "@/components/product/ProductGrid"
import { ProductFilters } from "@/components/product/ProductFilters"
import { PageWrapper } from "@/components/common/PageWrapper"
import { MOCK_PRODUCTS, SORT_OPTIONS } from "@/lib/constants"
import { useDebounce } from "@/hooks/useDebounce"
import type { ProductFilters as IFilters } from "@/types/product"

const DEFAULT_FILTERS: IFilters = {
  search:   "",
  category: "all",
  minPrice: "",
  maxPrice: "",
  sort:     "newest",
  view:     "grid",
}

export default function ProductsPage() {
  const [filters,       setFilters]       = useState<IFilters>(DEFAULT_FILTERS)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Debounce the search — only filter after user stops typing 400ms
  const debouncedSearch = useDebounce(filters.search, 400)

  function updateFilter(partial: Partial<IFilters>) {
    setFilters((prev) => ({ ...prev, ...partial }))
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
  }

  // ── CLIENT-SIDE FILTERING ────────────────────────────────
  // In Phase 3 backend this will be replaced with a real API call.
  // For now we filter the mock data in memory.
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS]

    // Search filter
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      )
    }

    // Category filter
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category)
    }

    // Price filter
    if (filters.minPrice !== "") {
      result = result.filter((p) => p.price >= Number(filters.minPrice))
    }
    if (filters.maxPrice !== "") {
      result = result.filter((p) => p.price <= Number(filters.maxPrice))
    }

    // Sort
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        // "newest" — keep original order
        break
    }

    return result
  }, [debouncedSearch, filters.category, filters.minPrice, filters.maxPrice, filters.sort])

  return (
    <PageWrapper className="py-8">

      {/* ── PAGE HEADER ── */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: "var(--color-brand-600)" }}>
          Browse
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight"
          style={{ color: "var(--foreground)" }}>
          All Products
        </h1>
      </div>

      {/* ── TOOLBAR ── */}
      <div
        className="flex flex-col sm:flex-row items-stretch sm:items-center
          gap-3 mb-8 p-4 rounded-2xl border"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* Search input */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--muted-foreground)" }}
          />
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={filters.search}
            onChange={(e) => updateFilter({ search: e.target.value })}
            className="w-full h-10 pl-10 pr-4 rounded-xl border text-sm"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>

        {/* Sort select — desktop */}
        <div className="relative hidden md:block">
          <select
            value={filters.sort}
            onChange={(e) =>
              updateFilter({ sort: e.target.value as IFilters["sort"] })
            }
            className="h-10 pl-3 pr-8 rounded-xl border text-sm font-medium
              appearance-none cursor-pointer"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--muted-foreground)" }}
          />
        </div>

        {/* View toggle */}
        <div
          className="flex items-center rounded-xl border overflow-hidden"
          style={{ borderColor: "var(--border)" }}
        >
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => updateFilter({ view: v })}
              className="flex items-center justify-center w-10 h-10 transition-colors duration-150"
              style={{
                backgroundColor:
                  filters.view === v
                    ? "var(--color-brand-600)"
                    : "var(--background)",
                color:
                  filters.view === v
                    ? "white"
                    : "var(--muted-foreground)",
              }}
              aria-label={`${v} view`}
            >
              {v === "grid" ? <LayoutGrid size={16} /> : <List size={16} />}
            </button>
          ))}
        </div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden flex items-center justify-center gap-2
            h-10 px-4 rounded-xl border text-sm font-semibold"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        >
          Filters
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              showMobileFilters ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* ── LAYOUT: FILTERS SIDEBAR + PRODUCT GRID ── */}
      <div className="flex gap-8">

        {/* Filters sidebar — hidden on mobile unless toggled */}
        <div
          className={`
            md:block md:w-56 flex-shrink-0
            ${showMobileFilters ? "block w-full mb-6" : "hidden"}
          `}
        >
          <div
            className="p-4 rounded-2xl border sticky top-24"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <ProductFilters
              filters={filters}
              onChange={updateFilter}
              onReset={resetFilters}
              totalResults={filteredProducts.length}
            />
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <ProductGrid
            products={filteredProducts}
            view={filters.view}
          />
        </div>

      </div>
    </PageWrapper>
  )
}
