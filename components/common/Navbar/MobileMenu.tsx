"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu, X, LogIn, UserPlus, LayoutDashboard,
  LogOut, Store, Globe, ChevronDown, ChevronRight,
  Home, ShoppingBag, Tag, User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useLocale, LANGUAGES, CURRENCIES } from "@/providers/CurrencyLanguageContext"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Home",     href: "/",        icon: Home },
  { label: "Products", href: "/products", icon: ShoppingBag },
  { label: "Deals",    href: "/deals",    icon: Tag },
]

export function MobileMenu() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [showLang, setShowLang] = useState(false)
  const [showCur,  setShowCur]  = useState(false)

  const pathname                         = usePathname()
  const { isLoggedIn, user, logout }     = useAuthStore()
  const { language, currency, setLanguage, setCurrency } = useLocale()

  function closeMenu() {
    setIsOpen(false)
    setShowLang(false)
    setShowCur(false)
  }

  return (
    <div className="md:hidden">
      {/* Hamburger / close toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="rounded-full"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={closeMenu}
        />
      )}

      {/* ── BOTTOM SHEET DRAWER ── */}
      <div
        className={cn(
          "fixed left-0 right-0 bottom-0 z-50 rounded-t-3xl shadow-2xl",
          "flex flex-col transition-transform duration-300 ease-out",
          "max-h-[92dvh]",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        style={{ backgroundColor: "var(--card)" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full"
            style={{ backgroundColor: "var(--border)" }} />
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between px-5 py-3 flex-shrink-0 border-b"
          style={{ borderColor: "var(--border)" }}>
          <span className="text-base font-black"
            style={{ color: "var(--foreground)" }}>Menu</span>
          <button
            onClick={closeMenu}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-1">

          {/* User section */}
          {isLoggedIn && user ? (
            <div className="p-3 rounded-2xl mb-2 flex items-center gap-3"
              style={{ backgroundColor: "var(--color-brand-100)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center
                text-white text-base font-black flex-shrink-0"
                style={{ backgroundColor: "var(--color-brand-600)" }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black truncate"
                  style={{ color: "var(--foreground)" }}>{user.name}</p>
                <p className="text-xs capitalize"
                  style={{ color: "var(--color-brand-600)" }}>{user.role} account</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 mb-2">
              <Link href="/login" onClick={closeMenu}
                className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl
                  border text-sm font-bold"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                <LogIn size={15} /> Sign In
              </Link>
              <Link href="/register" onClick={closeMenu}
                className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl
                  text-sm font-bold text-white"
                style={{ backgroundColor: "var(--color-brand-600)" }}>
                <UserPlus size={15} /> Get Started
              </Link>
            </div>
          )}

          {/* ── NAV LINKS ── */}
          <p className="text-[10px] font-black uppercase tracking-widest px-2 mt-1 mb-1"
            style={{ color: "var(--muted-foreground)" }}>Navigation</p>

          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href} onClick={closeMenu}
                className="flex items-center gap-3 px-4 h-12 rounded-2xl text-sm font-semibold"
                style={{
                  backgroundColor: isActive ? "var(--color-brand-100)" : "transparent",
                  color: isActive ? "var(--color-brand-600)" : "var(--foreground)",
                }}>
                <link.icon size={18} />
                {link.label}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--color-brand-600)" }} />
                )}
              </Link>
            )
          })}

          {/* Dashboard / store link for logged-in users */}
          {isLoggedIn && user && (
            <>
              <div className="my-2 h-px" style={{ backgroundColor: "var(--border)" }} />
              <p className="text-[10px] font-black uppercase tracking-widest px-2 mb-1"
                style={{ color: "var(--muted-foreground)" }}>Account</p>

              <Link
                href={user.role === "vendor" ? "/vendor" : "/dashboard"}
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 h-12 rounded-2xl text-sm font-semibold"
                style={{ color: "var(--foreground)" }}>
                {user.role === "vendor" ? <Store size={18} /> : <LayoutDashboard size={18} />}
                {user.role === "vendor" ? "My Store" : "My Dashboard"}
                <ChevronRight size={14} className="ml-auto"
                  style={{ color: "var(--muted-foreground)" }} />
              </Link>

              <Link href="/dashboard/profile" onClick={closeMenu}
                className="flex items-center gap-3 px-4 h-12 rounded-2xl text-sm font-semibold"
                style={{ color: "var(--foreground)" }}>
                <User size={18} />
                My Profile
                <ChevronRight size={14} className="ml-auto"
                  style={{ color: "var(--muted-foreground)" }} />
              </Link>

              <button
                onClick={() => { logout(); closeMenu() }}
                className="flex items-center gap-3 px-4 h-12 rounded-2xl
                  text-sm font-semibold w-full text-left"
                style={{ color: "#ef4444" }}>
                <LogOut size={18} /> Sign Out
              </button>
            </>
          )}

          {/* ── LANGUAGE & CURRENCY ── */}
          <div className="my-2 h-px" style={{ backgroundColor: "var(--border)" }} />
          <p className="text-[10px] font-black uppercase tracking-widest px-2 mb-1"
            style={{ color: "var(--muted-foreground)" }}>Preferences</p>

          {/* Language picker */}
          <button
            onClick={() => { setShowLang(!showLang); setShowCur(false) }}
            className="flex items-center justify-between px-4 h-12 rounded-2xl
              text-sm font-semibold w-full"
            style={{ color: "var(--foreground)" }}>
            <div className="flex items-center gap-3">
              <Globe size={18} style={{ color: "var(--color-brand-600)" }} />
              <span>{language.flag} {language.label}</span>
            </div>
            <ChevronDown size={15}
              className={cn("transition-transform duration-200",
                showLang && "rotate-180")}
              style={{ color: "var(--muted-foreground)" }} />
          </button>

          {showLang && (
            <div className="mx-2 rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
              {/* Fixed height with scroll — fixes the can't scroll issue */}
              <div className="max-h-48 overflow-y-auto overscroll-contain">
                {LANGUAGES.map((lang) => (
                  <button key={lang.code}
                    onClick={() => { setLanguage(lang); setShowLang(false) }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm
                      transition-colors active:bg-[var(--accent)] text-left border-b last:border-0"
                    style={{
                      borderColor: "var(--border)",
                      color: language.code === lang.code
                        ? "var(--color-brand-600)" : "var(--foreground)",
                      fontWeight: language.code === lang.code ? 700 : 400,
                    }}>
                    <span className="text-base w-6 text-center">{lang.flag}</span>
                    {lang.label}
                    {language.code === lang.code && (
                      <span className="ml-auto text-xs font-black"
                        style={{ color: "var(--color-brand-600)" }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Currency picker */}
          <button
            onClick={() => { setShowCur(!showCur); setShowLang(false) }}
            className="flex items-center justify-between px-4 h-12 rounded-2xl
              text-sm font-semibold w-full"
            style={{ color: "var(--foreground)" }}>
            <div className="flex items-center gap-3">
              <span className="text-base">{currency.flag}</span>
              <span>{currency.code} ({currency.symbol})</span>
            </div>
            <ChevronDown size={15}
              className={cn("transition-transform duration-200",
                showCur && "rotate-180")}
              style={{ color: "var(--muted-foreground)" }} />
          </button>

          {showCur && (
            <div className="mx-2 rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
              {/* Fixed height with scroll — fixes the can't scroll issue */}
              <div className="max-h-48 overflow-y-auto overscroll-contain">
                {CURRENCIES.map((cur) => (
                  <button key={cur.code}
                    onClick={() => { setCurrency(cur); setShowCur(false) }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm
                      transition-colors active:bg-[var(--accent)] text-left border-b last:border-0"
                    style={{
                      borderColor: "var(--border)",
                      color: currency.code === cur.code
                        ? "var(--color-brand-600)" : "var(--foreground)",
                      fontWeight: currency.code === cur.code ? 700 : 400,
                    }}>
                    <span className="text-base w-6 text-center">{cur.flag}</span>
                    <span className="flex-1 text-left">{cur.label}</span>
                    <span className="text-xs font-bold opacity-50">{cur.symbol}</span>
                    {currency.code === cur.code && (
                      <span className="text-xs font-black"
                        style={{ color: "var(--color-brand-600)" }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom padding so last item isn't hidden behind phone nav */}
          <div className="h-6 flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}
