import { notFound } from "next/navigation"
import { MOCK_PRODUCTS } from "@/lib/constants"
import { ProductDetailClient } from "./ProductDetailClient"

// This is a SERVER COMPONENT — notFound() works correctly here.
// All interactive logic lives in ProductDetailClient (Client Component).
interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug)

  // notFound() in a Server Component triggers Next.js 404 page correctly
  if (!product) notFound()

  // Pass the matched product to the Client Component
  return <ProductDetailClient product={product} />
}

// Pre-generate all product slugs at build time
export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }))
}
