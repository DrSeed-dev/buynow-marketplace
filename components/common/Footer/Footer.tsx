"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Apple, Smartphone, ChevronUp } from "lucide-react"
import { Logo } from "@/components/common/Logo"
import { siteConfig } from "@/config/site"

const footerLinks = {
  Marketplace: [
    { label: "Browse Products",   href: "/products" },
    { label: "All Vendors",       href: "/vendors" },
    { label: "New Arrivals",      href: "/products?sort=newest" },
    { label: "Top Rated",         href: "/products?sort=rating" },
    { label: "Today's Deals",     href: "/deals" },
  ],
  "Customer Care": [
    { label: "Help Center",       href: "/help" },
    { label: "Track Your Order",  href: "/dashboard/orders" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Shipping Info",     href: "/shipping" },
    { label: "Contact Us",        href: "/contact" },
  ],
  "Sell on BuyNow": [
    { label: "Become a Vendor",   href: "/vendor" },
    { label: "Vendor Dashboard",  href: "/vendor" },
    { label: "Add Products",      href: "/vendor/products/new" },
    { label: "Vendor Guidelines", href: "/vendor-guide" },
    { label: "Vendor Support",    href: "/help" },
  ],
  Company: [
    { label: "About Us",          href: "/about" },
    { label: "Careers",           href: "/careers" },
    { label: "Blog",              href: "/blog" },
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms of Service",  href: "/terms" },
  ],
}

const socialLinks = [
  {
    label: "Instagram", href: "#",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
  },
  {
    label: "Facebook", href: "#",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    label: "Twitter/X", href: "#",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: "TikTok", href: "#",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.16 8.16 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z"/></svg>,
  },
  {
    label: "YouTube", href: "#",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>,
  },
  {
    label: "WhatsApp", href: "#",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  },
]

const paymentMethods = [
  { name: "Visa",        bg: "#1A1F71", text: "VISA",        size: 12 },
  { name: "Mastercard",  bg: "#252525", text: "MC",          size: 12, special: "mc" },
  { name: "Verve",       bg: "#0B6E4F", text: "VERVE",       size: 9  },
  { name: "PayStack",    bg: "#0BA4DB", text: "PAYSTACK",    size: 8  },
  { name: "Flutterwave", bg: "#F5A623", text: "FLUTTER",     size: 8  },
  { name: "OPay",        bg: "#1ACE37", text: "OPay",        size: 10 },
  { name: "USSD",        bg: "#6366F1", text: "USSD",        size: 10 },
  { name: "Transfer",    bg: "#374151", text: "TRANSFER",    size: 7  },
]

export function Footer() {
  const [email,       setEmail]       = useState("")
  const [showBackTop, setShowBackTop] = useState(false)

  // Only show back-to-top after user scrolls past the fold
  useEffect(() => {
    function handleScroll() {
      setShowBackTop(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <footer
        className="border-t mt-auto"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* Newsletter */}
        <div className="py-8 border-b"
          style={{
            backgroundColor: "var(--color-brand-600)",
            borderColor: "var(--color-brand-700)",
          }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-white font-black text-xl">
                  Get exclusive deals in your inbox
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  Join 50,000+ shoppers getting weekly deals and new arrivals.
                </p>
              </div>
              <div className="flex w-full md:w-auto gap-2 max-w-md">
                <input type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 h-11 px-4 rounded-xl text-sm font-medium
                    outline-none border-0 text-white placeholder:text-white/50"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                <button
                  className="h-11 px-5 rounded-xl font-bold text-sm
                    transition-all hover:opacity-90 flex-shrink-0"
                  style={{ backgroundColor: "white", color: "var(--color-brand-700)" }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">

            {/* Brand column */}
            <div className="col-span-2 lg:col-span-2 flex flex-col gap-5">
              <Logo />
              <p className="text-sm leading-relaxed max-w-xs"
                style={{ color: "var(--muted-foreground)" }}>
                Nigeria&apos;s fastest growing multi-vendor marketplace.
                Connecting buyers with trusted vendors across every category.
              </p>

              {/* Contact */}
              <div className="flex flex-col gap-2">
                {[
                  { icon: Mail,   text: "support@buynowmarketplace.com" },
                  { icon: Phone,  text: "+234 805 885 8082" },
                  { icon: MapPin, text: "Abeokuta, Nigeria" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon size={13} style={{ color: "var(--color-brand-600)" }} />
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: "var(--muted-foreground)" }}>Follow Us</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {socialLinks.map((s) => (
                    <Link key={s.label} href={s.href} aria-label={s.label}
                      className="w-9 h-9 rounded-xl border flex items-center
                        justify-center transition-all duration-200
                        hover:-translate-y-0.5 hover:shadow-md"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--muted-foreground)",
                        backgroundColor: "var(--background)",
                      }}>
                      {s.svg}
                    </Link>
                  ))}
                </div>
              </div>

              {/* App download — compact */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: "var(--muted-foreground)" }}>Download App</p>
                <div className="flex gap-2">
                  {[
                    { store: "App Store",   sub: "Download on the", icon: Apple },
                    { store: "Google Play", sub: "Get it on",        icon: Smartphone },
                  ].map(({ store, sub, icon: Icon }) => (
                    <button key={store}
                      className="flex items-center gap-2 h-11 px-3 rounded-xl
                        border transition-all hover:opacity-80 hover:-translate-y-0.5"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "var(--background)",
                      }}>
                      <Icon size={16} style={{ color: "var(--foreground)" }} />
                      <div className="text-left">
                        <p className="text-[9px] leading-none"
                          style={{ color: "var(--muted-foreground)" }}>{sub}</p>
                        <p className="text-xs font-bold leading-tight"
                          style={{ color: "var(--foreground)" }}>{store}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-sm font-black mb-4"
                  style={{ color: "var(--foreground)" }}>{group}</h3>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}
                        className="text-sm transition-colors duration-200
                          hover:text-[var(--color-brand-600)]"
                        style={{ color: "var(--muted-foreground)" }}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <div className="py-6 border-t border-b"
            style={{ borderColor: "var(--border)" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-xs font-bold uppercase tracking-wider flex-shrink-0"
                style={{ color: "var(--muted-foreground)" }}>We Accept</p>
              <div className="flex flex-wrap items-center gap-2">
                {paymentMethods.map((method) => (
                  <div key={method.name}
                    className="rounded-lg overflow-hidden border shadow-sm
                      transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ borderColor: "var(--border)" }} title={method.name}>
                    <svg viewBox="0 0 52 32" width="52" height="32">
                      <rect width="52" height="32" rx="4" fill={method.bg} />
                      {method.special === "mc" ? (
                        <>
                          <circle cx="20" cy="16" r="9" fill="#EB001B" />
                          <circle cx="32" cy="16" r="9" fill="#F79E1B" />
                          <path d="M26 9a9 9 0 0 1 0 14 9 9 0 0 1 0-14z" fill="#FF5F00" />
                        </>
                      ) : (
                        <text x="50%" y="50%" dominantBaseline="middle"
                          textAnchor="middle" fill="white"
                          fontSize={method.size} fontWeight="bold" fontFamily="Arial">
                          {method.text}
                        </text>
                      )}
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-center sm:text-left"
              style={{ color: "var(--muted-foreground)" }}>
              &copy; {new Date().getFullYear()} {siteConfig.name}.
              All rights reserved. Built in Nigeria 🇳🇬
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {[
                { label: "Privacy Policy",   href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy",    href: "/cookies" },
              ].map((link) => (
                <Link key={link.href} href={link.href}
                  className="text-xs transition-colors hover:text-[var(--color-brand-600)]"
                  style={{ color: "var(--muted-foreground)" }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top — only shows after scrolling 600px
          Subtle border style, not bold brand color */}
      {showBackTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full
            flex items-center justify-center shadow-md border
            transition-all duration-300 hover:-translate-y-1
            hover:shadow-lg"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--muted-foreground)",
          }}
          aria-label="Back to top"
        >
          <ChevronUp size={18} strokeWidth={2} />
        </button>
      )}
    </>
  )
}
