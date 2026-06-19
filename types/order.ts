export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
export type PaymentStatus = "unpaid" | "paid" | "refunded" | "failed"

export interface OrderItem {
  id:           string
  productId:    string
  productName:  string
  productImage: string
  vendorId:     string
  vendorName:   string
  price:        number
  quantity:     number
  subtotal:     number
}

export interface ShippingAddress {
  fullName: string
  phone:    string
  street:   string
  city:     string
  state:    string
}

export interface Order {
  id:              string
  userId:          string
  items:           OrderItem[]
  shippingAddress: ShippingAddress
  status:          OrderStatus
  paymentStatus:   PaymentStatus
  subtotal:        number
  shippingFee:     number
  total:           number
  createdAt:       string
  updatedAt:       string
  deliveredAt?:    string
}

export interface CreateOrderPayload {
  items: { productId: string; quantity: number }[]
  shippingAddress: ShippingAddress
  paymentMethod: "card" | "transfer" | "ussd"
}
