import Link from "next/link"
import { PlusCircle, Eye, Pencil, Trash2 } from "lucide-react"
import { MOCK_PRODUCTS, formatNaira } from "@/lib/constants"

// Filter to only show products from one vendor for demo
const vendorProducts = MOCK_PRODUCTS.slice(0, 6)

export default function VendorProductsPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: "var(--color-brand-600)" }}>Vendor</p>
          <h1 className="text-3xl font-black" style={{ color: "var(--foreground)" }}>
            My Products
          </h1>
        </div>
        <Link
          href="/vendor/products/new"
          className="flex items-center gap-2 h-11 px-5 rounded-2xl
            font-bold text-sm text-white shadow-md
            hover:-translate-y-0.5 transition-all duration-200"
          style={{ backgroundColor: "var(--color-brand-600)" }}
        >
          <PlusCircle size={16} />
          Add Product
        </Link>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 gap-4">
        {vendorProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col sm:flex-row items-start sm:items-center
              gap-4 p-5 rounded-2xl border transition-all duration-200 hover:shadow-md"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
          >
            {/* Product image */}
            <div
              className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border"
              style={{ borderColor: "var(--border)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate"
                style={{ color: "var(--foreground)" }}>
                {product.name}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <span className="text-sm font-black"
                  style={{ color: "var(--color-brand-600)" }}>
                  {formatNaira(product.price)}
                </span>
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  Stock: {product.stock}
                </span>
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  Sales: {product.reviewCount}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: product.stock > 0 ? "#f0fdf4" : "#fef2f2",
                    color: product.stock > 0 ? "#22c55e" : "#ef4444",
                  }}
                >
                  {product.stock > 0 ? "Active" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                href={`/products/${product.slug}`}
                className="flex items-center gap-1.5 h-9 px-3 rounded-xl
                  text-xs font-semibold border transition-all hover:opacity-70"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--muted-foreground)",
                }}
              >
                <Eye size={14} /> View
              </Link>
              <button
                className="flex items-center gap-1.5 h-9 px-3 rounded-xl
                  text-xs font-semibold border transition-all hover:opacity-70"
                style={{
                  borderColor: "var(--color-brand-200)",
                  color: "var(--color-brand-600)",
                }}
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                className="flex items-center gap-1.5 h-9 px-3 rounded-xl
                  text-xs font-semibold border transition-all hover:opacity-70"
                style={{
                  borderColor: "#fecaca",
                  color: "#ef4444",
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
