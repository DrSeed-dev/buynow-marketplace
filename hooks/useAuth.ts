import { useAuthStore } from "@/store/authStore"

export function useAuth() {
  const user       = useAuthStore((s) => s.user)
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const login      = useAuthStore((s) => s.login)
  const logout     = useAuthStore((s) => s.logout)

  const isVendor  = user?.role === "vendor"
  const isAdmin   = user?.role === "admin"
  const isShopper = user?.role === "shopper"

  const dashboardHref = isAdmin ? "/admin" : isVendor ? "/vendor" : "/dashboard"

  return { user, isLoggedIn, isVendor, isAdmin, isShopper, dashboardHref, login, logout }
}
