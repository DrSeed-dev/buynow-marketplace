"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { MOCK_PRODUCTS } from "@/lib/constants"
import { PageWrapper } from "@/components/common/PageWrapper"
import { ProductGrid } from "@/components/product/ProductGrid"
import { ProductFilters } from "@/components/product/ProductFilters"
import type { ProductFilters as ProductFiltersType } from "@/types/product"

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFiltersType>({
    search: "",
    category: "all",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
    view: "grid",
  })

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = MOCK_PRODUCTS

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      products = products.filter((p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    }

    // Filter by category
    if (filters.category !== "all") {
      products = products.filter((p) => p.category === filters.category)
    }

    // Filter by price range
    if (filters.minPrice !== "") {
      const minPrice = typeof filters.minPrice === "number" ? filters.minPrice : parseFloat(filters.minPrice)
      products = products.filter((p) => p.price >= minPrice)
    }
    if (filters.maxPrice !== "") {
      const maxPrice = typeof filters.maxPrice === "number" ? filters.maxPrice : parseFloat(filters.maxPrice)
      products = products.filter((p) => p.price <= maxPrice)
    }

    // Sort products
    const sorted = [...products]
    switch (filters.sort) {
      case "newest":
        return sorted
      case "popular":
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price)
      default:
        return sorted
    }
  }, [filters])

  const handleFilterChange = (newFilters: Partial<ProductFiltersType>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleReset = () => {
    setFilters({
      search: "",
      category: "all",
      minPrice: "",
      maxPrice: "",
      sort: "newest",
      view: "grid",
    })
  }

  return (
    <PageWrapper className="py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link href="/" className="hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted-foreground)" }}>Home</Link>
        <span style={{ color: "var(--border)" }}>/</span>
        <span className="font-semibold" style={{ color: "var(--foreground)" }}>Products</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: "var(--color-brand-600)" }}>Browse</p>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black"
              style={{ color: "var(--foreground)" }}>
              All Products
            </h1>
            <p className="mt-2 text-base" style={{ color: "var(--muted-foreground)" }}>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className="w-full h-12 px-4 rounded-xl border text-sm"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Sidebar filters — hidden on mobile */}
        <div className="hidden lg:block">
          <ProductFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleReset}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* Products grid */}
        <div className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            view={filters.view}
            loading={false}
          />
        </div>
      </div>

    </PageWrapper>
  )
}
