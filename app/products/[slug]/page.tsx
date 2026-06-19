"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Star, Heart, ShoppingCart, BadgeCheck,
  Truck, Shield, RotateCcw, ChevronLeft,
  Minus, Plus, Share2,
} from "lucide-react"
import { MOCK_PRODUCTS, formatNaira, getDiscountPercent } from "@/lib/constants"
import { useCartStore } from "@/store/cartStore"
import { useWishlistStore } from "@/store/wishlistStore"
import { PageWrapper } from "@/components/common/PageWrapper"
import { ProductCard } from "@/components/product/ProductCard"
import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ slug: string }>
}

export default function ProductDetailPage({ params }: Props) {
  // Next.js 15 — params is a Promise, unwrap with use()
  const { slug } = use(params)

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  return <ProductDetail product={product} />
}

function ProductDetail({ product }: { product: NonNullable<ReturnType<typeof MOCK_PRODUCTS.find>> }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity,       setQuantity]      = useState(1)
  const [addedToCart,    setAddedToCart]   = useState(false)

  const addToCart    = useCartStore((s) => s.addItem)
  const toggleWish   = useWishlistStore((s) => s.toggle)
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id))

  const discount = product.originalPrice
    ? getDiscountPercent(product.price, product.originalPrice)
    : null

  const relatedProducts = MOCK_PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  function handleAddToCart() {
    addToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <PageWrapper className="py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link href="/" className="hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted-foreground)" }}>Home</Link>
        <span style={{ color: "var(--border)" }}>/</span>
        <Link href="/products" className="hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted-foreground)" }}>Products</Link>
        <span style={{ color: "var(--border)" }}>/</span>
        <span className="font-semibold truncate max-w-[200px]"
          style={{ color: "var(--foreground)" }}>{product.name}</span>
      </nav>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden border"
            style={{ borderColor: "var(--border)" }}>
            <Image
              src={product.images[selectedImage] ?? product.images[0]}
              alt={product.name}
              fill className="object-cover" priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {discount && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-xl
                text-sm font-black text-white"
                style={{ backgroundColor: "var(--color-error)" }}>
                -{discount}% OFF
              </div>
            )}
            {product.isNew && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-xl
                text-sm font-black text-white"
                style={{ backgroundColor: "var(--color-brand-600)" }}>
                NEW
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                    selectedImage === i
                      ? "border-[var(--color-brand-600)]"
                      : "border-[var(--border)] opacity-60 hover:opacity-100"
                  )}>
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold"
              style={{ color: "var(--muted-foreground)" }}>
              {product.vendor.name}
            </span>
            {product.vendor.isVerified && (
              <BadgeCheck size={16} style={{ color: "var(--color-brand-600)" }} />
            )}
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}>
              {product.vendor.location}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black leading-tight"
            style={{ color: "var(--foreground)" }}>
            {product.name}
          </h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={16}
                  fill={s <= Math.round(product.rating) ? "#f59e0b" : "none"}
                  color={s <= Math.round(product.rating) ? "#f59e0b" : "var(--border)"} />
              ))}
            </div>
            <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>
              {product.rating}
            </span>
            <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black" style={{ color: "var(--color-brand-600)" }}>
              {formatNaira(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg line-through"
                  style={{ color: "var(--muted-foreground)" }}>
                  {formatNaira(product.originalPrice)}
                </span>
                <span className="text-sm font-black px-2 py-0.5 rounded-lg text-white"
                  style={{ backgroundColor: "var(--color-error)" }}>
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            {product.description}
          </p>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{
              backgroundColor:
                product.stock > 10 ? "var(--color-success)"
                : product.stock > 0 ? "var(--color-warning)"
                : "var(--color-error)",
            }} />
            <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              {product.stock > 10 ? "In Stock"
                : product.stock > 0 ? `Only ${product.stock} left`
                : "Out of Stock"}
            </span>
          </div>

          {product.stock > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                Quantity:
              </span>
              <div className="flex items-center rounded-xl border overflow-hidden"
                style={{ borderColor: "var(--border)" }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:opacity-70"
                  style={{ color: "var(--foreground)" }}>
                  <Minus size={15} />
                </button>
                <span className="w-12 text-center text-sm font-bold"
                  style={{ color: "var(--foreground)" }}>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:opacity-70"
                  style={{ color: "var(--foreground)" }}>
                  <Plus size={15} />
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className={cn(
                "flex-1 flex items-center justify-center gap-2",
                "h-14 rounded-2xl font-bold text-base text-white shadow-md transition-all duration-200",
                product.stock === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:shadow-lg hover:-translate-y-0.5",
                addedToCart && "scale-95"
              )}
              style={{ backgroundColor: "var(--color-brand-600)" }}>
              <ShoppingCart size={20} />
              {addedToCart ? "Added!" : "Add to Cart"}
            </button>

            <button onClick={() => toggleWish(product)}
              className="w-14 h-14 rounded-2xl border-2 flex items-center
                justify-center transition-all duration-200 hover:scale-105"
              style={{
                borderColor: isWishlisted ? "#ef4444" : "var(--border)",
                color: isWishlisted ? "#ef4444" : "var(--muted-foreground)",
              }}
              aria-label="Toggle wishlist">
              <Heart size={20} fill={isWishlisted ? "#ef4444" : "none"} />
            </button>

            <button className="w-14 h-14 rounded-2xl border-2 flex items-center
              justify-center transition-all duration-200 hover:scale-105"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
              aria-label="Share">
              <Share2 size={18} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl border"
            style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
            {[
              { icon: Truck,     label: "Fast Delivery" },
              { icon: Shield,    label: "Secure Payment" },
              { icon: RotateCcw, label: "Easy Returns" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon size={18} style={{ color: "var(--color-brand-600)" }} />
                <span className="text-xs font-semibold"
                  style={{ color: "var(--foreground)" }}>{label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold border"
                style={{
                  backgroundColor: "var(--muted)",
                  borderColor: "var(--border)",
                  color: "var(--muted-foreground)",
                }}>
                #{tag}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black" style={{ color: "var(--foreground)" }}>
              Related Products
            </h2>
            <Link href={`/products?category=${product.category}`}
              className="text-sm font-semibold hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-brand-600)" }}>
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} view="grid" />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <Link href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold
            hover:opacity-70 transition-opacity"
          style={{ color: "var(--color-brand-600)" }}>
          <ChevronLeft size={16} /> Back to Products
        </Link>
      </div>

    </PageWrapper>
  )
}
