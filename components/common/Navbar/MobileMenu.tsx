"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu, X, LogIn, UserPlus, LayoutDashboard,
  LogOut, Store, Globe, ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { useAuthStore } from "@/store/authStore"
import { useLocale, LANGUAGES, CURRENCIES } from "@/providers/CurrencyLanguageContext"
import { cn } from "@/lib/utils"

export function MobileMenu() {
  const [isOpen,      setIsOpen]      = useState(false)
  const [showLang,    setShowLang]    = useState(false)
  const [showCur,     setShowCur]     = useState(false)
  const pathname                      = usePathname()
  const { isLoggedIn, user, logout }  = useAuthStore()
  const { language, currency, setLanguage, setCurrency } = useLocale()

  function closeMenu() {
    setIsOpen(false)
    setShowLang(false)
    setShowCur(false)
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu" className="rounded-full">
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={closeMenu} />
      )}

      {/* Drawer */}
      {isOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-50 border-b shadow-lg
            px-4 py-4 flex flex-col gap-1 max-h-[85vh] overflow-y-auto"
          style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
        >
          {/* Nav links */}
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href} onClick={closeMenu}
                className={cn("px-4 py-3 rounded-xl text-sm font-semibold")}
                style={{
                  backgroundColor: isActive ? "var(--color-brand-100)" : "transparent",
                  color: isActive ? "var(--color-brand-600)" : "var(--muted-foreground)",
                }}>
                {link.label}
              </Link>
            )
          })}

          <div className="my-2 h-px" style={{ backgroundColor: "var(--border)" }} />

          {/* Auth section */}
          {isLoggedIn && user ? (
            <>
              <div className="px-4 py-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center
                  text-white text-sm font-black"
                  style={{ backgroundColor: "var(--color-brand-600)" }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                    {user.name}
                  </p>
                  <p className="text-xs capitalize"
                    style={{ color: "var(--muted-foreground)" }}>{user.role}</p>
                </div>
              </div>

              <Link
                href={user.role === "vendor" ? "/vendor" : "/dashboard"}
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold"
                style={{ color: "var(--muted-foreground)" }}>
                {user.role === "vendor" ? <Store size={16} /> : <LayoutDashboard size={16} />}
                {user.role === "vendor" ? "My Store" : "My Dashboard"}
              </Link>

              <button
                onClick={() => { logout(); closeMenu() }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl
                  text-sm font-semibold w-full text-left"
                style={{ color: "#ef4444" }}>
                <LogOut size={16} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl
                  text-sm font-semibold"
                style={{ color: "var(--muted-foreground)" }}>
                <LogIn size={16} /> Sign In
              </Link>
              <Link href="/register" onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl
                  text-sm font-bold text-white"
                style={{ backgroundColor: "var(--color-brand-600)" }}>
                <UserPlus size={16} /> Get Started — It&apos;s Free
              </Link>
            </>
          )}

          <div className="my-2 h-px" style={{ backgroundColor: "var(--border)" }} />

          {/* ── LANGUAGE SECTION ── */}
          <button
            onClick={() => { setShowLang(!showLang); setShowCur(false) }}
            className="flex items-center justify-between px-4 py-3 rounded-xl
              text-sm font-semibold w-full"
            style={{ color: "var(--muted-foreground)" }}>
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>{language.flag} {language.label}</span>
            </div>
            <ChevronDown size={14}
              className={`transition-transform ${showLang ? "rotate-180" : ""}`} />
          </button>

          {showLang && (
            <div className="mx-2 rounded-xl border overflow-hidden"
              style={{ borderColor: "var(--border)" }}>
              {LANGUAGES.map((lang) => (
                <button key={lang.code}
                  onClick={() => { setLanguage(lang); setShowLang(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm
                    transition-colors hover:bg-[var(--accent)] text-left"
                  style={{
                    color: language.code === lang.code
                      ? "var(--color-brand-600)" : "var(--foreground)",
                    fontWeight: language.code === lang.code ? 700 : 400,
                  }}>
                  <span>{lang.flag}</span>
                  {lang.label}
                  {language.code === lang.code && (
                    <span className="ml-auto text-xs font-bold"
                      style={{ color: "var(--color-brand-600)" }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* ── CURRENCY SECTION ── */}
          <button
            onClick={() => { setShowCur(!showCur); setShowLang(false) }}
            className="flex items-center justify-between px-4 py-3 rounded-xl
              text-sm font-semibold w-full"
            style={{ color: "var(--muted-foreground)" }}>
            <div className="flex items-center gap-2">
              <span>{currency.flag}</span>
              <span>{currency.code} ({currency.symbol})</span>
            </div>
            <ChevronDown size={14}
              className={`transition-transform ${showCur ? "rotate-180" : ""}`} />
          </button>

          {showCur && (
            <div className="mx-2 rounded-xl border overflow-hidden"
              style={{ borderColor: "var(--border)" }}>
              {CURRENCIES.map((cur) => (
                <button key={cur.code}
                  onClick={() => { setCurrency(cur); setShowCur(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm
                    transition-colors hover:bg-[var(--accent)] text-left"
                  style={{
                    color: currency.code === cur.code
                      ? "var(--color-brand-600)" : "var(--foreground)",
                    fontWeight: currency.code === cur.code ? 700 : 400,
                  }}>
                  <span>{cur.flag}</span>
                  <span className="flex-1">{cur.label}</span>
                  <span className="text-xs opacity-60">{cur.symbol}</span>
                  {currency.code === cur.code && (
                    <span className="text-xs font-bold"
                      style={{ color: "var(--color-brand-600)" }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
