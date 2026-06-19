export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: ProductCategory
  vendor: Vendor
  rating: number
  reviewCount: number
  stock: number
  tags: string[]
  isFeatured?: boolean
  isNew?: boolean
}

export interface Vendor {
  id: string
  name: string
  avatar?: string
  rating: number
  location: string
  isVerified: boolean
}

export type ProductCategory =
  | "electronics" | "fashion" | "home" | "sports"
  | "books" | "audio" | "food" | "beauty"
  | "automotive" | "phones" | "computers"
  | "babies" | "agriculture" | "arts"
  | "furniture" | "jewelry" | "health"
  | "travel" | "other"

export interface ProductFilters {
  search:   string
  category: string
  minPrice: number | ""
  maxPrice: number | ""
  sort:     SortOption
  view:     "grid" | "list"
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "rating" | "popular"

export interface CartItem {
  product:  Product
  quantity: number
}

export interface WishlistItem {
  product: Product
  addedAt: string
}
