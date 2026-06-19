"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { Logo } from "@/components/common/Logo"
import { NavLinks } from "./NavLinks"
import { MobileMenu } from "./MobileMenu"
import { ThemeToggle } from "@/components/common/ThemeToggle"
import { CartDrawer } from "@/components/cart/CartDrawer"
import { useAuthStore } from "@/store/authStore"
import { useLocale, LANGUAGES, CURRENCIES } from "@/providers/CurrencyLanguageContext"
import {
  User, LogOut, LayoutDashboard, Store,
  ChevronDown, Globe, LogIn, UserPlus
} from "lucide-react"

// ─── REUSABLE DROPDOWN ────────────────────────────────────────
function Dropdown({ trigger, children }: {
  trigger: React.ReactNode
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div
          className="absolute top-full right-0 mt-2 rounded-2xl border
            shadow-xl overflow-hidden z-50 min-w-[220px]"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const { isLoggedIn, user, logout } = useAuthStore()
  const { language, currency, setLanguage, setCurrency } = useLocale()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
      style={{
        backgroundColor: "color-mix(in oklch, var(--background) 85%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      {/* ── TOP BAR — Language & Currency only (desktop) ── */}
      <div
        className="hidden md:flex items-center justify-end gap-4 px-4 sm:px-6
          lg:px-8 py-1.5 border-b text-xs max-w-7xl mx-auto w-full"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Language picker */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-1.5 font-medium
              hover:opacity-70 transition-opacity py-1"
              style={{ color: "var(--muted-foreground)" }}>
              <Globe size={13} />
              {language.flag} {language.label}
              <ChevronDown size={11} />
            </button>
          }
        >
          <div className="p-2 max-h-72 overflow-y-auto">
            <p className="text-xs font-bold uppercase tracking-wider px-3 py-2"
              style={{ color: "var(--muted-foreground)" }}>Language</p>
            {LANGUAGES.map((lang) => (
              <button key={lang.code}
                onClick={() => setLanguage(lang)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-sm font-medium transition-colors hover:bg-[var(--accent)]"
                style={{
                  color: language.code === lang.code
                    ? "var(--color-brand-600)" : "var(--foreground)",
                  fontWeight: language.code === lang.code ? 700 : 500,
                }}>
                <span className="text-base">{lang.flag}</span>
                {lang.label}
                {language.code === lang.code && (
                  <span className="ml-auto text-xs font-bold"
                    style={{ color: "var(--color-brand-600)" }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </Dropdown>

        <div className="w-px h-3" style={{ backgroundColor: "var(--border)" }} />

        {/* Currency picker */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-1.5 font-medium
              hover:opacity-70 transition-opacity py-1"
              style={{ color: "var(--muted-foreground)" }}>
              {currency.flag} {currency.code} ({currency.symbol})
              <ChevronDown size={11} />
            </button>
          }
        >
          <div className="p-2 max-h-72 overflow-y-auto">
            <p className="text-xs font-bold uppercase tracking-wider px-3 py-2"
              style={{ color: "var(--muted-foreground)" }}>Currency</p>
            {CURRENCIES.map((cur) => (
              <button key={cur.code}
                onClick={() => setCurrency(cur)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-sm transition-colors hover:bg-[var(--accent)]"
                style={{
                  color: currency.code === cur.code
                    ? "var(--color-brand-600)" : "var(--foreground)",
                  fontWeight: currency.code === cur.code ? 700 : 500,
                }}>
                <span className="text-base">{cur.flag}</span>
                <span className="flex-1 text-left">{cur.label}</span>
                <span className="text-xs font-bold opacity-60">{cur.symbol}</span>
                {currency.code === cur.code && (
                  <span className="text-xs font-bold"
                    style={{ color: "var(--color-brand-600)" }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </Dropdown>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Logo />
          <NavLinks />

          <div className="flex items-center gap-1.5">
            <CartDrawer />

            {mounted && (
              <>
                {isLoggedIn && user ? (
                  <div className="hidden sm:flex items-center gap-1.5">
                    <Dropdown
                      trigger={
                        <button className="flex items-center gap-2 h-9 px-3
                          rounded-xl border transition-all hover:opacity-80"
                          style={{ borderColor: "var(--border)" }}>
                          <div className="w-6 h-6 rounded-full flex items-center
                            justify-center text-white text-xs font-black"
                            style={{ backgroundColor: "var(--color-brand-600)" }}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-semibold max-w-[80px] truncate"
                            style={{ color: "var(--foreground)" }}>
                            {user.name.split(" ")[0]}
                          </span>
                          <ChevronDown size={13}
                            style={{ color: "var(--muted-foreground)" }} />
                        </button>
                      }
                    >
                      <div className="p-2">
                        <div className="px-3 py-3 border-b mb-2"
                          style={{ borderColor: "var(--border)" }}>
                          <p className="text-sm font-black"
                            style={{ color: "var(--foreground)" }}>{user.name}</p>
                          <p className="text-xs capitalize mt-0.5"
                            style={{ color: "var(--muted-foreground)" }}>
                            {user.role} account
                          </p>
                        </div>

                        {/* Smart dashboard link based on role */}
                        <Link
                          href={user.role === "vendor" ? "/vendor"
                            : user.role === "admin" ? "/admin" : "/dashboard"}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                            text-sm font-semibold transition-colors
                            hover:bg-[var(--accent)] w-full"
                          style={{ color: "var(--foreground)" }}>
                          {user.role === "vendor"
                            ? <Store size={16} />
                            : <LayoutDashboard size={16} />}
                          {user.role === "vendor" ? "My Store" : "Dashboard"}
                        </Link>

                        <Link href="/dashboard/profile"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                            text-sm font-semibold transition-colors
                            hover:bg-[var(--accent)] w-full"
                          style={{ color: "var(--foreground)" }}>
                          <User size={16} /> My Profile
                        </Link>

                        <div className="border-t my-2"
                          style={{ borderColor: "var(--border)" }} />

                        <button onClick={logout}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                            text-sm font-semibold transition-colors
                            hover:bg-[#fef2f2] w-full"
                          style={{ color: "#ef4444" }}>
                          <LogOut size={16} /> Sign Out
                        </button>
                      </div>
                    </Dropdown>
                  </div>
                ) : (
                  <div className="hidden sm:flex items-center gap-1.5">
                    <Dropdown
                      trigger={
                        <button className="flex items-center gap-2 h-9 px-4
                          rounded-xl text-sm font-semibold border transition-all
                          hover:opacity-80"
                          style={{ color: "var(--foreground)", borderColor: "var(--border)" }}>
                          <User size={15} />
                          Account
                          <ChevronDown size={13}
                            style={{ color: "var(--muted-foreground)" }} />
                        </button>
                      }
                    >
                      <div className="p-3 flex flex-col gap-2">
                        <p className="text-xs font-bold uppercase tracking-wider px-2 pb-1"
                          style={{ color: "var(--muted-foreground)" }}>My Account</p>

                        <Link href="/login"
                          className="flex items-center gap-3 h-11 px-4 rounded-xl
                            font-semibold text-sm border-2 transition-all
                            hover:border-[var(--color-brand-600)]"
                          style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                          <LogIn size={16} /> Sign In
                        </Link>

                        <Link href="/register"
                          className="flex items-center gap-3 h-11 px-4 rounded-xl
                            font-bold text-sm text-white transition-all hover:opacity-90"
                          style={{ backgroundColor: "var(--color-brand-600)" }}>
                          <UserPlus size={16} /> Create Account
                        </Link>

                        <p className="text-xs text-center px-2 pt-1"
                          style={{ color: "var(--muted-foreground)" }}>
                          New? Get ₦500 off your first order!
                        </p>
                      </div>
                    </Dropdown>
                  </div>
                )}
              </>
            )}

            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
