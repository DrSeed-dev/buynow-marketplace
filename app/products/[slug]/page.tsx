import { notFound } from "next/navigation"
import { MOCK_PRODUCTS } from "@/lib/constants"
import { ProductDetailClient } from "./ProductDetailClient"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()
  return <ProductDetailClient product={product} />
}