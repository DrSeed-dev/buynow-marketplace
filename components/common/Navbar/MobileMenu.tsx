"use client"

import { useState, useEffect, useRef } from "react"
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
  const drawerRef = useRef<HTMLDivElement>(null)

  const pathname                     = usePathname()
  const { isLoggedIn, user, logout } = useAuthStore()
  const { language, currency, setLanguage, setCurrency } = useLocale()

  // Close on route change
  useEffect(() => {
    setIsOpen(false)
    setShowLang(false)
    setShowCur(false)
  }, [pathname])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    function handleClick(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [isOpen])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <div className="md:hidden">

      {/* Hamburger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open menu"
        className="rounded-full"
      >
        <Menu size={20} />
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60]"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer — always in DOM, moved with bottom position */}
      <div
        ref={drawerRef}
        className="fixed left-0 right-0 z-[70] flex flex-col rounded-t-3xl shadow-2xl"
        style={{
          backgroundColor: "var(--card)",
          maxHeight: "88vh",
          // When open: sits at bottom of screen. When closed: hidden below viewport.
          bottom: isOpen ? "0" : "-100vh",
          transition: "bottom 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full"
            style={{ backgroundColor: "var(--border)" }} />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-base font-black" style={{ color: "var(--foreground)" }}>
            Menu
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 flex flex-col gap-1">

          {/* User section */}
          {isLoggedIn && user ? (
            <div className="p-3 rounded-2xl mb-2 flex items-center gap-3"
              style={{ backgroundColor: "var(--color-brand-100)" }}>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center
                  text-white text-base font-black flex-shrink-0"
                style={{ backgroundColor: "var(--color-brand-600)" }}
              >
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
              <Link href="/login" onClick={() => setIsOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 h-11
                  rounded-xl border text-sm font-bold"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                <LogIn size={15} /> Sign In
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 h-11
                  rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: "var(--color-brand-600)" }}>
                <UserPlus size={15} /> Get Started
              </Link>
            </div>
          )}

          {/* Nav links */}
          <p className="text-[10px] font-black uppercase tracking-widest px-2 mt-2 mb-1"
            style={{ color: "var(--muted-foreground)" }}>Navigation</p>

          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
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

          {/* Account links */}
          {isLoggedIn && user && (
            <>
              <div className="my-2 h-px" style={{ backgroundColor: "var(--border)" }} />
              <p className="text-[10px] font-black uppercase tracking-widest px-2 mb-1"
                style={{ color: "var(--muted-foreground)" }}>Account</p>

              <Link
                href={user.role === "vendor" ? "/vendor" : "/dashboard"}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 h-12 rounded-2xl text-sm font-semibold"
                style={{ color: "var(--foreground)" }}>
                {user.role === "vendor" ? <Store size={18} /> : <LayoutDashboard size={18} />}
                {user.role === "vendor" ? "My Store" : "My Dashboard"}
                <ChevronRight size={14} className="ml-auto"
                  style={{ color: "var(--muted-foreground)" }} />
              </Link>

              <Link href="/dashboard/profile" onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 h-12 rounded-2xl text-sm font-semibold"
                style={{ color: "var(--foreground)" }}>
                <User size={18} />
                My Profile
                <ChevronRight size={14} className="ml-auto"
                  style={{ color: "var(--muted-foreground)" }} />
              </Link>

              <button
                onClick={() => { logout(); setIsOpen(false) }}
                className="flex items-center gap-3 px-4 h-12 rounded-2xl
                  text-sm font-semibold w-full text-left"
                style={{ color: "#ef4444" }}>
                <LogOut size={18} /> Sign Out
              </button>
            </>
          )}

          {/* Preferences */}
          <div className="my-2 h-px" style={{ backgroundColor: "var(--border)" }} />
          <p className="text-[10px] font-black uppercase tracking-widest px-2 mb-1"
            style={{ color: "var(--muted-foreground)" }}>Preferences</p>

          {/* Language */}
          <button type="button"
            onClick={() => { setShowLang(!showLang); setShowCur(false) }}
            className="flex items-center justify-between px-4 h-12 rounded-2xl
              text-sm font-semibold w-full"
            style={{ color: "var(--foreground)" }}>
            <div className="flex items-center gap-3">
              <Globe size={18} style={{ color: "var(--color-brand-600)" }} />
              <span>{language.flag} {language.label}</span>
            </div>
            <ChevronDown size={15}
              className={cn("transition-transform duration-200", showLang && "rotate-180")}
              style={{ color: "var(--muted-foreground)" }} />
          </button>

          {showLang && (
            <div className="mx-2 rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
              <div className="max-h-52 overflow-y-auto overscroll-contain">
                {LANGUAGES.map((lang) => (
                  <button key={lang.code} type="button"
                    onClick={() => { setLanguage(lang); setShowLang(false) }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-sm
                      text-left border-b last:border-0"
                    style={{
                      borderColor: "var(--border)",
                      color: language.code === lang.code
                        ? "var(--color-brand-600)" : "var(--foreground)",
                      fontWeight: language.code === lang.code ? 700 : 400,
                      backgroundColor: language.code === lang.code
                        ? "var(--color-brand-50)" : "transparent",
                    }}>
                    <span className="text-base w-6 text-center">{lang.flag}</span>
                    <span className="flex-1">{lang.label}</span>
                    {language.code === lang.code && (
                      <span className="text-xs font-black"
                        style={{ color: "var(--color-brand-600)" }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Currency */}
          <button type="button"
            onClick={() => { setShowCur(!showCur); setShowLang(false) }}
            className="flex items-center justify-between px-4 h-12 rounded-2xl
              text-sm font-semibold w-full"
            style={{ color: "var(--foreground)" }}>
            <div className="flex items-center gap-3">
              <span className="text-base">{currency.flag}</span>
              <span>{currency.code} ({currency.symbol})</span>
            </div>
            <ChevronDown size={15}
              className={cn("transition-transform duration-200", showCur && "rotate-180")}
              style={{ color: "var(--muted-foreground)" }} />
          </button>

          {showCur && (
            <div className="mx-2 rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
              <div className="max-h-52 overflow-y-auto overscroll-contain">
                {CURRENCIES.map((cur) => (
                  <button key={cur.code} type="button"
                    onClick={() => { setCurrency(cur); setShowCur(false) }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-sm
                      text-left border-b last:border-0"
                    style={{
                      borderColor: "var(--border)",
                      color: currency.code === cur.code
                        ? "var(--color-brand-600)" : "var(--foreground)",
                      fontWeight: currency.code === cur.code ? 700 : 400,
                      backgroundColor: currency.code === cur.code
                        ? "var(--color-brand-50)" : "transparent",
                    }}>
                    <span className="text-base w-6 text-center">{cur.flag}</span>
                    <span className="flex-1 text-left">{cur.label}</span>
                    <span className="text-xs font-bold opacity-40 mr-1">{cur.symbol}</span>
                    {currency.code === cur.code && (
                      <span className="text-xs font-black"
                        style={{ color: "var(--color-brand-600)" }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="h-8 flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}