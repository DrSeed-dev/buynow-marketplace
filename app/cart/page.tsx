"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { useWishlistStore } from "@/store/wishlistStore"
import { formatNaira } from "@/lib/constants"
import { PageWrapper } from "@/components/common/PageWrapper"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const items      = useCartStore((s) => s.items)
  const totalItems = useCartStore((s) => s.totalItems())
  const totalPrice = useCartStore((s) => s.totalPrice())
  const updateQty  = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart  = useCartStore((s) => s.clearCart)
  const toggleWish = useWishlistStore((s) => s.toggle)

  const shippingFee = totalPrice > 50000 ? 0 : 2500
  const grandTotal  = totalPrice + shippingFee

  // ── EMPTY CART ──────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <PageWrapper className="flex flex-col items-center justify-center py-32 gap-6 text-center">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{ backgroundColor: "var(--muted)" }}>
          <ShoppingBag size={40} style={{ color: "var(--muted-foreground)" }} />
        </div>
        <div>
          <h1 className="text-2xl font-black" style={{ color: "var(--foreground)" }}>
            Your cart is empty
          </h1>
          <p className="mt-2 text-base" style={{ color: "var(--muted-foreground)" }}>
            You haven&apos;t added anything yet. Start shopping!
          </p>
        </div>
        <Button asChild className="h-12 px-8 rounded-2xl font-bold text-white"
          style={{ backgroundColor: "var(--color-brand-600)" }}>
          <Link href="/products">Browse Products</Link>
        </Button>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper className="py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: "var(--color-brand-600)" }}>Shopping</p>
          <h1 className="text-2xl sm:text-3xl font-black"
            style={{ color: "var(--foreground)" }}>
            Your Cart
            <span className="ml-3 text-lg font-bold"
              style={{ color: "var(--muted-foreground)" }}>
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>
        <button onClick={clearCart}
          className="text-sm font-semibold hover:opacity-70 transition-opacity"
          style={{ color: "var(--color-error)" }}>
          Clear cart
        </button>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id}
              className="flex gap-4 p-4 rounded-2xl border transition-all hover:shadow-md"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>

              {/* Product image */}
              <Link href={`/products/${product.slug}`} className="flex-shrink-0">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden">
                  <Image src={product.images[0]} alt={product.name}
                    fill className="object-cover" sizes="112px" />
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-bold text-sm sm:text-base leading-snug
                      line-clamp-2 hover:opacity-70 transition-opacity"
                      style={{ color: "var(--foreground)" }}>
                      {product.name}
                    </h3>
                  </Link>
                  <button onClick={() => removeItem(product.id)}
                    className="flex-shrink-0 p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                    style={{ color: "var(--muted-foreground)" }}
                    aria-label="Remove item">
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                  {product.vendor.name}
                </p>

                <div className="flex items-center justify-between mt-3">
                  {/* Price */}
                  <div>
                    <p className="text-base sm:text-lg font-black"
                      style={{ color: "var(--color-brand-600)" }}>
                      {formatNaira(product.price * quantity)}
                    </p>
                    {quantity > 1 && (
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        {formatNaira(product.price)} each
                      </p>
                    )}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center rounded-xl border overflow-hidden"
                    style={{ borderColor: "var(--border)" }}>
                    <button onClick={() => updateQty(product.id, quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:opacity-70"
                      style={{ color: "var(--foreground)" }}>
                      <Minus size={13} />
                    </button>
                    <span className="w-9 text-center text-sm font-bold"
                      style={{ color: "var(--foreground)" }}>
                      {quantity}
                    </span>
                    <button onClick={() => updateQty(product.id, quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:opacity-70"
                      style={{ color: "var(--foreground)" }}>
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Continue shopping */}
          <Link href="/products"
            className="flex items-center gap-2 text-sm font-semibold
              hover:opacity-70 transition-opacity mt-2 self-start"
            style={{ color: "var(--color-brand-600)" }}>
            ← Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <div>
          <div className="p-5 rounded-2xl border sticky top-24 flex flex-col gap-4"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>

            <h2 className="font-black text-lg"
              style={{ color: "var(--foreground)" }}>Order Summary</h2>

            {/* Line items */}
            <div className="flex flex-col gap-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="truncate mr-2"
                    style={{ color: "var(--muted-foreground)" }}>
                    {product.name} × {quantity}
                  </span>
                  <span className="font-bold flex-shrink-0"
                    style={{ color: "var(--foreground)" }}>
                    {formatNaira(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

            {/* Totals */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--muted-foreground)" }}>
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-bold" style={{ color: "var(--foreground)" }}>
                  {formatNaira(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--muted-foreground)" }}>Shipping</span>
                <span className="font-bold"
                  style={{ color: shippingFee === 0 ? "var(--color-success)" : "var(--foreground)" }}>
                  {shippingFee === 0 ? "FREE" : formatNaira(shippingFee)}
                </span>
              </div>
              {shippingFee === 0 && (
                <p className="text-xs" style={{ color: "var(--color-success)" }}>
                  Free delivery on orders above ₦50,000
                </p>
              )}
            </div>

            {/* Grand total */}
            <div className="flex justify-between pt-3 border-t"
              style={{ borderColor: "var(--border)" }}>
              <span className="font-black" style={{ color: "var(--foreground)" }}>Total</span>
              <span className="font-black text-xl"
                style={{ color: "var(--color-brand-600)" }}>
                {formatNaira(grandTotal)}
              </span>
            </div>

            {/* Checkout button */}
            <Link href="/checkout"
              className="flex items-center justify-center gap-2 h-14 rounded-2xl
                font-bold text-base text-white shadow-md
                hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              style={{ backgroundColor: "var(--color-brand-600)" }}>
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>

            {/* Trust note */}
            <p className="text-xs text-center" style={{ color: "var(--muted-foreground)" }}>
              Secure checkout · SSL encrypted
            </p>
          </div>
        </div>

      </div>
    </PageWrapper>
  )
}
