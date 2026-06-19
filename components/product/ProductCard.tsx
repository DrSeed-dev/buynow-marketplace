"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Star, BadgeCheck } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { useWishlistStore } from "@/store/wishlistStore"
import { formatNaira, getDiscountPercent } from "@/lib/constants"
import type { Product } from "@/types/product"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  view?: "grid" | "list"
}

export function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const addToCart     = useCartStore((s) => s.addItem)
  const toggleWish    = useWishlistStore((s) => s.toggle)
  const isWishlisted  = useWishlistStore((s) => s.isWishlisted(product.id))

  const discount = product.originalPrice
    ? getDiscountPercent(product.price, product.originalPrice)
    : null

  const isOutOfStock = product.stock === 0

  // ── LIST VIEW ──────────────────────────────────────────────
  if (view === "list") {
    return (
      <div
        className="flex gap-4 p-4 rounded-2xl border transition-all duration-200
          hover:shadow-md"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Image */}
        <Link href={`/products/${product.slug}`} className="flex-shrink-0">
          <div className="relative w-28 h-28 rounded-xl overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="112px"
            />
            {discount && (
              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5
                rounded-md text-[10px] font-black text-white"
                style={{ backgroundColor: "var(--color-error)" }}>
                -{discount}%
              </span>
            )}
          </div>
        </Link>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <Link href={`/products/${product.slug}`}>
                <h3
                  className="font-bold text-base leading-tight hover:opacity-70
                    transition-opacity line-clamp-2"
                  style={{ color: "var(--foreground)" }}
                >
                  {product.name}
                </h3>
              </Link>
              <button
                onClick={() => toggleWish(product)}
                aria-label="Toggle wishlist"
                className="flex-shrink-0 p-1.5 rounded-full transition-colors duration-200"
                style={{ color: isWishlisted ? "#ef4444" : "var(--muted-foreground)" }}
              >
                <Heart size={18} fill={isWishlisted ? "#ef4444" : "none"} />
              </button>
            </div>

            <p className="text-sm mt-1 line-clamp-2" style={{ color: "var(--muted-foreground)" }}>
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={12}
                    fill={s <= Math.round(product.rating) ? "#f59e0b" : "none"}
                    color={s <= Math.round(product.rating) ? "#f59e0b" : "var(--border)"}
                  />
                ))}
              </div>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                ({product.reviewCount})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black" style={{ color: "var(--color-brand-600)" }}>
                {formatNaira(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through" style={{ color: "var(--muted-foreground)" }}>
                  {formatNaira(product.originalPrice)}
                </span>
              )}
            </div>
            <button
              onClick={() => !isOutOfStock && addToCart(product)}
              disabled={isOutOfStock}
              className={cn(
                "flex items-center gap-2 h-9 px-4 rounded-xl text-sm font-bold",
                "text-white transition-all duration-200",
                isOutOfStock
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:opacity-90 hover:-translate-y-0.5"
              )}
              style={{ backgroundColor: "var(--color-brand-600)" }}
            >
              <ShoppingCart size={15} />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── GRID VIEW (default) ────────────────────────────────────
  return (
    <div
      className="group relative flex flex-col rounded-2xl border overflow-hidden
        transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Image container */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {discount && (
            <span className="px-2 py-0.5 rounded-lg text-[11px] font-black text-white"
              style={{ backgroundColor: "var(--color-error)" }}>
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 rounded-lg text-[11px] font-black text-white"
              style={{ backgroundColor: "var(--color-brand-600)" }}>
              NEW
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <span className="text-white font-bold text-sm">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Wishlist button */}
      <button
        onClick={() => toggleWish(product)}
        aria-label="Toggle wishlist"
        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full
          flex items-center justify-center shadow-md
          transition-all duration-200 hover:scale-110"
        style={{
          backgroundColor: "var(--card)",
          color: isWishlisted ? "#ef4444" : "var(--muted-foreground)",
        }}
      >
        <Heart size={15} fill={isWishlisted ? "#ef4444" : "none"} />
      </button>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Vendor */}
        <div className="flex items-center gap-1">
          <span className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>
            {product.vendor.name}
          </span>
          {product.vendor.isVerified && (
            <BadgeCheck size={12} style={{ color: "var(--color-brand-600)" }} />
          )}
        </div>

        {/* Product name */}
        <Link href={`/products/${product.slug}`}>
          <h3
            className="font-bold text-sm leading-snug line-clamp-2
              hover:opacity-70 transition-opacity"
            style={{ color: "var(--foreground)" }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={11}
                fill={s <= Math.round(product.rating) ? "#f59e0b" : "none"}
                color={s <= Math.round(product.rating) ? "#f59e0b" : "var(--border)"}
              />
            ))}
          </div>
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price + Cart button */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div>
            <p className="text-base font-black" style={{ color: "var(--color-brand-600)" }}>
              {formatNaira(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-xs line-through" style={{ color: "var(--muted-foreground)" }}>
                {formatNaira(product.originalPrice)}
              </p>
            )}
          </div>

          <button
            onClick={() => !isOutOfStock && addToCart(product)}
            disabled={isOutOfStock}
            aria-label="Add to cart"
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center",
              "text-white transition-all duration-200",
              isOutOfStock
                ? "opacity-40 cursor-not-allowed"
                : "hover:opacity-90 hover:scale-105"
            )}
            style={{ backgroundColor: "var(--color-brand-600)" }}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
