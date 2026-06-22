"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
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
  const [mounted,  setMounted]  = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const pathname                     = usePathname()
  const { isLoggedIn, user, logout } = useAuthStore()
  const { language, currency, setLanguage, setCurrency } = useLocale()

  // Portal needs the DOM to be ready
  useEffect(() => { setMounted(true) }, [])

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

  const drawer = (
    <>
      {/* Backdrop — rendered at body level via portal */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer — rendered at body level via portal, slides up from bottom */}
      <div
        ref={drawerRef}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          maxHeight: "88vh",
          backgroundColor: "var(--card)",
          borderRadius: "24px 24px 0 0",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 9999, backgroundColor: "var(--border)" }} />
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 20px 12px",
            borderBottom: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 900, color: "var(--foreground)" }}>Menu</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            style={{
              width: 36, height: 36, borderRadius: 9999,
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "var(--muted)", color: "var(--muted-foreground)",
              border: "none", cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", overscrollBehavior: "contain", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 4 }}>

          {/* Auth section */}
          {isLoggedIn && user ? (
            <div style={{ padding: 12, borderRadius: 16, marginBottom: 8, display: "flex", alignItems: "center", gap: 12, backgroundColor: "var(--color-brand-100)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 9999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-brand-600)", color: "white", fontWeight: 900, fontSize: 16, flexShrink: 0 }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 900, color: "var(--foreground)", margin: 0 }}>{user.name}</p>
                <p style={{ fontSize: 12, color: "var(--color-brand-600)", textTransform: "capitalize", margin: 0 }}>{user.role} account</p>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <Link href="/login" onClick={() => setIsOpen(false)}
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 44, borderRadius: 12, border: "1px solid var(--border)", fontSize: 14, fontWeight: 700, color: "var(--foreground)", textDecoration: "none" }}>
                <LogIn size={15} /> Sign In
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 44, borderRadius: 12, backgroundColor: "var(--color-brand-600)", fontSize: 14, fontWeight: 700, color: "white", textDecoration: "none" }}>
                <UserPlus size={15} /> Get Started
              </Link>
            </div>
          )}

          {/* Nav links */}
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", padding: "8px 8px 4px", color: "var(--muted-foreground)", margin: 0 }}>Navigation</p>

          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "0 16px", height: 48, borderRadius: 16,
                  fontSize: 14, fontWeight: 600, textDecoration: "none",
                  backgroundColor: isActive ? "var(--color-brand-100)" : "transparent",
                  color: isActive ? "var(--color-brand-600)" : "var(--foreground)",
                }}>
                <link.icon size={18} />
                {link.label}
                {isActive && <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: 9999, backgroundColor: "var(--color-brand-600)" }} />}
              </Link>
            )
          })}

          {/* Account links */}
          {isLoggedIn && user && (
            <>
              <div style={{ height: 1, backgroundColor: "var(--border)", margin: "8px 0" }} />
              <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 8px 4px", color: "var(--muted-foreground)", margin: 0 }}>Account</p>

              <Link href={user.role === "vendor" ? "/vendor" : "/dashboard"} onClick={() => setIsOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px", height: 48, borderRadius: 16, fontSize: 14, fontWeight: 600, color: "var(--foreground)", textDecoration: "none" }}>
                {user.role === "vendor" ? <Store size={18} /> : <LayoutDashboard size={18} />}
                {user.role === "vendor" ? "My Store" : "My Dashboard"}
                <ChevronRight size={14} style={{ marginLeft: "auto", color: "var(--muted-foreground)" }} />
              </Link>

              <Link href="/dashboard/profile" onClick={() => setIsOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px", height: 48, borderRadius: 16, fontSize: 14, fontWeight: 600, color: "var(--foreground)", textDecoration: "none" }}>
                <User size={18} /> My Profile
                <ChevronRight size={14} style={{ marginLeft: "auto", color: "var(--muted-foreground)" }} />
              </Link>

              <button onClick={() => { logout(); setIsOpen(false) }}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px", height: 48, borderRadius: 16, fontSize: 14, fontWeight: 600, color: "#ef4444", background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}>
                <LogOut size={18} /> Sign Out
              </button>
            </>
          )}

          {/* Preferences */}
          <div style={{ height: 1, backgroundColor: "var(--border)", margin: "8px 0" }} />
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 8px 4px", color: "var(--muted-foreground)", margin: 0 }}>Preferences</p>

          {/* Language */}
          <button type="button"
            onClick={() => { setShowLang(!showLang); setShowCur(false) }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 48, borderRadius: 16, fontSize: 14, fontWeight: 600, color: "var(--foreground)", background: "none", border: "none", cursor: "pointer", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Globe size={18} style={{ color: "var(--color-brand-600)" }} />
              <span>{language.flag} {language.label}</span>
            </div>
            <ChevronDown size={15} className={cn("transition-transform duration-200", showLang && "rotate-180")} style={{ color: "var(--muted-foreground)" }} />
          </button>

          {showLang && (
            <div style={{ margin: "0 8px", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden", backgroundColor: "var(--muted)" }}>
              <div style={{ maxHeight: 208, overflowY: "auto" }}>
                {LANGUAGES.map((lang) => (
                  <button key={lang.code} type="button"
                    onClick={() => { setLanguage(lang); setShowLang(false) }}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 16px", fontSize: 14, textAlign: "left",
                      borderBottom: "1px solid var(--border)", background: "none", border: "none",
                      cursor: "pointer",
                      color: language.code === lang.code ? "var(--color-brand-600)" : "var(--foreground)",
                      fontWeight: language.code === lang.code ? 700 : 400,
                      backgroundColor: language.code === lang.code ? "var(--color-brand-50)" : "transparent",
                    }}>
                    <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{lang.flag}</span>
                    <span style={{ flex: 1 }}>{lang.label}</span>
                    {language.code === lang.code && <span style={{ fontSize: 12, fontWeight: 900, color: "var(--color-brand-600)" }}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Currency */}
          <button type="button"
            onClick={() => { setShowCur(!showCur); setShowLang(false) }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 48, borderRadius: 16, fontSize: 14, fontWeight: 600, color: "var(--foreground)", background: "none", border: "none", cursor: "pointer", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 16 }}>{currency.flag}</span>
              <span>{currency.code} ({currency.symbol})</span>
            </div>
            <ChevronDown size={15} className={cn("transition-transform duration-200", showCur && "rotate-180")} style={{ color: "var(--muted-foreground)" }} />
          </button>

          {showCur && (
            <div style={{ margin: "0 8px", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden", backgroundColor: "var(--muted)" }}>
              <div style={{ maxHeight: 208, overflowY: "auto" }}>
                {CURRENCIES.map((cur) => (
                  <button key={cur.code} type="button"
                    onClick={() => { setCurrency(cur); setShowCur(false) }}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 16px", fontSize: 14, textAlign: "left",
                      borderBottom: "1px solid var(--border)", background: "none", border: "none",
                      cursor: "pointer",
                      color: currency.code === cur.code ? "var(--color-brand-600)" : "var(--foreground)",
                      fontWeight: currency.code === cur.code ? 700 : 400,
                      backgroundColor: currency.code === cur.code ? "var(--color-brand-50)" : "transparent",
                    }}>
                    <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{cur.flag}</span>
                    <span style={{ flex: 1, textAlign: "left" }}>{cur.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.4, marginRight: 4 }}>{cur.symbol}</span>
                    {currency.code === cur.code && <span style={{ fontSize: 12, fontWeight: 900, color: "var(--color-brand-600)" }}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ height: 32, flexShrink: 0 }} />
        </div>
      </div>
    </>
  )

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

      {/* Portal renders backdrop + drawer directly into <body>,
          escaping ALL ancestor stacking contexts and opacity wrappers */}
      {mounted && createPortal(drawer, document.body)}
    </div>
  )
}
