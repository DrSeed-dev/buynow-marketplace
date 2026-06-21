"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import { X, ShoppingCart, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { formatNaira } from "@/lib/constants"
import { Button } from "@/components/ui/button"

export function CartDrawer() {
  const [isOpen,  setIsOpen]  = useState(false)
  const [mounted, setMounted] = useState(false)

  // ── FIX: Only mount portal + read localStorage after hydration ──
  // This prevents the hydration mismatch error because Zustand's
  // persist reads from localStorage which doesn't exist on the server
  useEffect(() => { setMounted(true) }, [])

  const items      = useCartStore((s) => s.items)
  const totalItems = useCartStore((s) => s.totalItems())
  const totalPrice = useCartStore((s) => s.totalPrice())
  const updateQty  = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)

  // Lock body scroll when drawer open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const drawerContent = (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          style={{ zIndex: 9998 }}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-md
          flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ zIndex: 9999, backgroundColor: "var(--card)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b flex-shrink-0"
          style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} style={{ color: "var(--color-brand-600)" }} />
            <h2 className="font-black text-lg" style={{ color: "var(--foreground)" }}>
              Your Cart
            </h2>
            {mounted && totalItems > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-black text-white"
                style={{ backgroundColor: "var(--color-brand-600)" }}>
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-xl flex items-center justify-center
              transition-colors duration-150 hover:opacity-70"
            style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}
            aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {/* Empty state */}
        {!mounted || items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ backgroundColor: "var(--muted)" }}>
              <ShoppingCart size={32} style={{ color: "var(--muted-foreground)" }} />
            </div>
            <div className="text-center">
              <p className="font-bold text-base" style={{ color: "var(--foreground)" }}>
                Your cart is empty
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
                Add items to your cart to get started
              </p>
            </div>
            <Button onClick={() => setIsOpen(false)}
              className="mt-2 rounded-2xl font-bold text-white px-8"
              style={{ backgroundColor: "var(--color-brand-600)" }}
              asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id}
                  className="flex gap-4 p-3 rounded-2xl border"
                  style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}>
                  <Link href={`/products/${product.slug}`}
                    onClick={() => setIsOpen(false)} className="flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                      <Image src={product.images[0]} alt={product.name}
                        fill className="object-cover" sizes="80px" />
                    </div>
                  </Link>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/products/${product.slug}`} onClick={() => setIsOpen(false)}>
                        <p className="text-sm font-bold leading-snug line-clamp-2
                          hover:opacity-70 transition-opacity"
                          style={{ color: "var(--foreground)" }}>
                          {product.name}
                        </p>
                      </Link>
                      <button onClick={() => removeItem(product.id)}
                        className="flex-shrink-0 p-1 rounded-lg transition-colors hover:opacity-70"
                        style={{ color: "var(--muted-foreground)" }}
                        aria-label="Remove item">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black"
                        style={{ color: "var(--color-brand-600)" }}>
                        {formatNaira(product.price * quantity)}
                      </span>
                      <div className="flex items-center rounded-xl border overflow-hidden"
                        style={{ borderColor: "var(--border)" }}>
                        <button onClick={() => updateQty(product.id, quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:opacity-70"
                          style={{ color: "var(--foreground)" }}>
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold"
                          style={{ color: "var(--foreground)" }}>
                          {quantity}
                        </span>
                        <button onClick={() => updateQty(product.id, quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:opacity-70"
                          style={{ color: "var(--foreground)" }}>
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t flex flex-col gap-4 flex-shrink-0"
              style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                  Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
                </span>
                <span className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                  {formatNaira(totalPrice)}
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Shipping and taxes calculated at checkout.
              </p>
              <Link href="/checkout" onClick={() => setIsOpen(false)}
                className="flex items-center justify-center h-14 rounded-2xl
                  font-bold text-base text-white shadow-md
                  hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                style={{ backgroundColor: "var(--color-brand-600)" }}>
                Proceed to Checkout
              </Link>
              <button onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-center transition-opacity hover:opacity-70"
                style={{ color: "var(--muted-foreground)" }}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center justify-center w-10 h-10
          rounded-full transition-colors duration-200"
        style={{ color: "var(--muted-foreground)" }}
        aria-label="Open cart"
      >
        <ShoppingCart size={20} />
        {/* ── FIX: Only show badge after mount to prevent hydration mismatch ── */}
        {mounted && totalItems > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 flex items-center
              justify-center w-4 h-4 text-[10px] font-black rounded-full text-white"
            style={{ backgroundColor: "var(--color-brand-600)" }}
          >
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </button>

      {/* Portal — renders outside Navbar DOM */}
      {mounted && createPortal(drawerContent, document.body)}
    </>
  )
}
