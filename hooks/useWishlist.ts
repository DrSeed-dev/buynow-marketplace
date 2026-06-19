import { useWishlistStore } from "@/store/wishlistStore"

export function useWishlist() {
  const items        = useWishlistStore((s) => s.items)
  const addItem      = useWishlistStore((s) => s.addItem)
  const removeItem   = useWishlistStore((s) => s.removeItem)
  const toggle       = useWishlistStore((s) => s.toggle)
  const isWishlisted = useWishlistStore((s) => s.isWishlisted)
  const clear        = useWishlistStore((s) => s.clear)

  return { items, totalWishlisted: items.length, isWishlisted, toggle, addItem, removeItem, clear }
}
