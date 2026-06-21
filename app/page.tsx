import { PageWrapper } from "@/components/common/PageWrapper"
import { AnimatedCounter } from "@/components/common/AnimatedCounter"
import {
  Shield, Truck, Star, BadgeCheck, TrendingUp, Users,
  Smartphone, Shirt, Dumbbell, BookOpen, Headphones,
  Utensils, Sparkles, Home as HomeIcon, Baby, Leaf,
} from "lucide-react"
import Link from "next/link"
import { HeroSection } from "@/components/home/HeroSection"
import {
  CategorySectionHeader,
  ShoppersSectionHeader,
  ShoppersCTA,
  VendorsSectionHeader,
  VendorsCTA,
  FinalCTASection,
  FinalCTAButtons,
} from "@/components/home/HomeSectionLabels"

// Categories and static data stay here in the Server Component
const categories = [
  { label: "Phones",      icon: Smartphone, color: "#6366f1", bg: "#eef2ff", href: "/products?category=phones" },
  { label: "Fashion",     icon: Shirt,      color: "#ec4899", bg: "#fdf2f8", href: "/products?category=fashion" },
  { label: "Food",        icon: Utensils,   color: "#f59e0b", bg: "#fffbeb", href: "/products?category=food" },
  { label: "Beauty",      icon: Sparkles,   color: "#8b5cf6", bg: "#f5f3ff", href: "/products?category=beauty" },
  { label: "Home",        icon: HomeIcon,   color: "#f97316", bg: "#fff7ed", href: "/products?category=home" },
  { label: "Sports",      icon: Dumbbell,   color: "#22c55e", bg: "#f0fdf4", href: "/products?category=sports" },
  { label: "Books",       icon: BookOpen,   color: "#3b82f6", bg: "#eff6ff", href: "/products?category=books" },
  { label: "Audio",       icon: Headphones, color: "#06b6d4", bg: "#ecfeff", href: "/products?category=audio" },
  { label: "Health",      icon: Leaf,       color: "#10b981", bg: "#ecfdf5", href: "/products?category=health" },
  { label: "Babies",      icon: Baby,       color: "#f43f5e", bg: "#fff1f2", href: "/products?category=babies" },
  { label: "Agriculture", icon: Leaf,       color: "#65a30d", bg: "#f7fee7", href: "/products?category=agriculture" },
  { label: "Antiques",    icon: BadgeCheck, color: "#64748b", bg: "#f8fafc", href: "/products?category=antiques" },
]

const howItWorksCustomer = [
  { step: "01", title: "Browse & Discover",  body: "Search thousands of products from hundreds of verified vendors across every category." },
  { step: "02", title: "Add to Cart",         body: "Pick your items, compare prices from multiple vendors, and build your order." },
  { step: "03", title: "Checkout Securely",   body: "Pay with confidence. Your data is encrypted and your order is tracked end to end." },
]

const howItWorksVendor = [
  { step: "01", title: "Create Your Store",  body: "Sign up as a vendor in minutes. No technical skills needed to get started." },
  { step: "02", title: "List Your Products", body: "Upload products with images, descriptions, and pricing. Go live instantly." },
  { step: "03", title: "Grow Your Revenue",  body: "Reach thousands of shoppers daily. Track orders and earnings in your dashboard." },
]

const trustBadges = [
  { icon: Shield,     label: "Secure Payments",  sub: "256-bit SSL encryption on every transaction" },
  { icon: Truck,      label: "Fast Delivery",     sub: "Nationwide same-week delivery available" },
  { icon: BadgeCheck, label: "Verified Vendors",  sub: "Every seller is manually vetted by our team" },
  { icon: Star,       label: "Buyer Protection",  sub: "Full refund guarantee on every order" },
]

export default function Home() {
  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative" style={{ backgroundColor: "var(--background)" }}>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-brand-600) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-brand-600) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full
          opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--color-brand-500), transparent 70%)" }} />

        <PageWrapper className="relative py-24 md:py-36">
          {/* Client component — uses t() for all hero text */}
          <HeroSection />
        </PageWrapper>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y"
        style={{ backgroundColor: "var(--color-brand-600)", borderColor: "var(--color-brand-700)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { end: 1999,  suffix: "+",  label: "Products Listed",  decimals: 0 },
              { end: 100,   suffix: "+",  label: "Verified Vendors",  decimals: 0 },
              { end: 20000, suffix: "+",  label: "Happy Customers",   decimals: 0 },
              { end: 3.8,   suffix: "/5", label: "Average Rating",    decimals: 1 },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-1">
                <span className="text-2xl md:text-3xl font-black text-white">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix}
                    decimals={stat.decimals} duration={2000} />
                </span>
                <span className="text-xs font-medium text-white/70 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section style={{ backgroundColor: "var(--background)" }}>
        <PageWrapper className="py-20">
          <CategorySectionHeader />
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="group flex flex-col items-center gap-2 sm:gap-3
                  p-3 sm:p-5 rounded-2xl border text-center transition-all
                  duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center
                  transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: cat.bg }}>
                  <cat.icon size={24} color={cat.color} strokeWidth={1.8} />
                </div>
                <span className="text-xs sm:text-sm font-semibold leading-tight"
                  style={{ color: "var(--foreground)" }}>{cat.label}</span>
              </Link>
            ))}
          </div>
        </PageWrapper>
      </section>

      {/* ── TRUST BADGES ── */}
      <section style={{ backgroundColor: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.label}
                className="flex items-start gap-4 p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-brand-100)", color: "var(--color-brand-600)" }}>
                  <badge.icon size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                    {badge.label}
                  </p>
                  <p className="text-xs mt-0.5 leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}>{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — SHOPPERS ── */}
      <section style={{ backgroundColor: "var(--background)" }}>
        <PageWrapper className="py-20">
          <ShoppersSectionHeader />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {howItWorksCustomer.map((item, i) => (
              <div key={item.step} className="relative flex flex-col gap-4">
                {i < howItWorksCustomer.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+2.5rem)]
                    w-[calc(100%-5rem)] h-px"
                    style={{ backgroundColor: "var(--color-brand-200)" }} />
                )}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center
                  text-xl font-black text-white"
                  style={{ backgroundColor: "var(--color-brand-600)" }}>
                  {item.step}
                </div>
                <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}>{item.body}</p>
              </div>
            ))}
          </div>
          <ShoppersCTA />
        </PageWrapper>
      </section>

      {/* ── HOW IT WORKS — VENDORS ── */}
      <section className="relative overflow-hidden"
        style={{ backgroundColor: "var(--color-brand-900)" }}>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(var(--color-brand-400) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }} />
        <PageWrapper className="relative py-20">
          <VendorsSectionHeader />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorksVendor.map((item) => (
              <div key={item.step}
                className="flex flex-col gap-4 p-8 rounded-2xl border"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
                <span className="text-4xl font-black"
                  style={{ color: "var(--color-brand-400)" }}>{item.step}</span>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{item.body}</p>
              </div>
            ))}
          </div>
          <VendorsCTA />
        </PageWrapper>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ backgroundColor: "var(--background)" }}>
        <PageWrapper className="py-20">
          <div className="relative overflow-hidden rounded-3xl p-10 md:p-16
            flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ backgroundColor: "var(--color-brand-600)" }}>
            <div className="absolute right-0 top-0 w-72 h-72 rounded-full
              opacity-20 blur-2xl pointer-events-none"
              style={{ backgroundColor: "var(--color-brand-400)" }} />
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Users size={16} color="white" opacity={0.6} />
              <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
                Join our community
              </span>
            </div>
            <FinalCTASection />
            <FinalCTAButtons />
          </div>
        </PageWrapper>
      </section>

    </div>
  )
}
