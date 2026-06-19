import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/types/product"

export function useCart() {
  const items      = useCartStore((s) => s.items)
  const addItem    = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQty  = useCartStore((s) => s.updateQty)
  const clearCart  = useCartStore((s) => s.clearCart)
  const totalItems = useCartStore((s) => s.totalItems())
  const totalPrice = useCartStore((s) => s.totalPrice())

  function isInCart(productId: string): boolean {
    return items.some((item) => item.product.id === productId)
  }

  function getQty(productId: string): number {
    return items.find((item) => item.product.id === productId)?.quantity ?? 0
  }

  return { items, totalItems, totalPrice, isInCart, getQty, addItem, removeItem, updateQty, clearCart }
}
