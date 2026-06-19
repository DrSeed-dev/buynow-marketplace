export type VendorStatus = "pending" | "active" | "suspended"

export interface VendorProfile {
  id:            string
  userId:        string
  storeName:     string
  description:   string
  logo?:         string
  banner?:       string
  location:      string
  status:        VendorStatus
  isVerified:    boolean
  rating:        number
  totalProducts: number
  totalSales:    number
  totalRevenue:  number
  createdAt:     string
}

export interface VendorStats {
  totalProducts: number
  totalOrders:   number
  totalRevenue:  number
  avgRating:     number
  pendingOrders: number
  lowStockItems: number
}
