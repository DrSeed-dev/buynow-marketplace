export type UserRole = "shopper" | "vendor" | "admin"

export interface User {
  id:        string
  fullName:  string
  email:     string
  phone?:    string
  avatar?:   string
  role:      UserRole
  createdAt: string
  isActive:  boolean
}

export interface Address {
  id:        string
  label:     string
  street:    string
  city:      string
  state:     string
  isDefault: boolean
}

export interface UserProfile extends User {
  addresses:   Address[]
  totalOrders: number
  totalSpent:  number
}

export interface AuthResponse {
  user:         User
  accessToken:  string
  refreshToken: string
}

export interface LoginPayload {
  email:    string
  password: string
}

export interface RegisterPayload {
  fullName: string
  email:    string
  password: string
  role:     UserRole
}
