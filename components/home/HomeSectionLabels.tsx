"use client"

// Thin client component that provides translated section labels
// for the Server Component home page sections.
import { useLocale } from "@/providers/CurrencyLanguageContext"
import Link from "next/link"
import { ChevronRight, ShoppingBag, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CategorySectionHeader() {
  const { t } = useLocale()
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: "var(--color-brand-600)" }}>
          {t("home.categoriesEyebrow")}
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight"
          style={{ color: "var(--foreground)" }}>
          {t("home.categoriesTitle")}
        </h2>
      </div>
      <Link href="/products"
        className="hidden sm:flex items-center gap-1 text-sm font-semibold
          hover:opacity-70 transition-opacity"
        style={{ color: "var(--color-brand-600)" }}>
        {t("product.viewAll")} <ChevronRight size={16} />
      </Link>
    </div>
  )
}

export function ShoppersSectionHeader() {
  const { t } = useLocale()
  return (
    <div className="text-center mb-14">
      <p className="text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: "var(--color-brand-600)" }}>
        {t("home.shoppersEyebrow")}
      </p>
      <h2 className="text-3xl md:text-4xl font-black tracking-tight"
        style={{ color: "var(--foreground)" }}>
        {t("home.shoppersTitle")}
      </h2>
    </div>
  )
}

export function ShoppersCTA() {
  const { t } = useLocale()
  return (
    <div className="flex justify-center mt-12">
      <Button size="lg"
        className="h-14 px-10 rounded-2xl text-white font-bold shadow-md
          hover:shadow-lg hover:-translate-y-0.5 transition-all"
        style={{ backgroundColor: "var(--color-brand-600)" }}>
        <Link href="/products" className="flex items-center gap-2">
          <ShoppingBag size={18} /> {t("home.browseAll")}
        </Link>
      </Button>
    </div>
  )
}

export function VendorsSectionHeader() {
  const { t } = useLocale()
  return (
    <div className="text-center mb-14">
      <p className="text-xs font-bold uppercase tracking-widest mb-2 text-white/50">
        {t("home.vendorsEyebrow")}
      </p>
      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
        {t("home.vendorsTitle")}
      </h2>
      <p className="mt-4 text-white/60 max-w-xl mx-auto text-base leading-relaxed">
        {t("home.vendorsSubtitle")}
      </p>
    </div>
  )
}

export function VendorsCTA() {
  const { t } = useLocale()
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
      <Button size="lg"
        className="px-10 rounded-2xl font-bold text-base hover:-translate-y-0.5 transition-all shadow-lg"
        style={{ backgroundColor: "white", color: "var(--color-brand-700)" }}>
        <Link href="/vendor" className="flex items-center gap-2">
          <TrendingUp size={18} /> {t("home.startSelling")}
        </Link>
      </Button>
      <Button variant="ghost" size="lg"
        className="px-10 rounded-2xl font-bold text-base text-white/80
          hover:text-white hover:bg-white/10 transition-all">
        <Link href="/about" className="flex items-center gap-2">
          {t("home.learnMore")} <ArrowRight size={16} />
        </Link>
      </Button>
    </div>
  )
}

export function FinalCTASection() {
  const { t } = useLocale()
  return (
    <div className="relative flex flex-col gap-3 text-center md:text-left">
      <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
        {t("home.finalCtaTitle")}
      </h2>
      <p className="text-white/70 text-base max-w-md leading-relaxed">
        {t("home.finalCtaSubtitle")}
      </p>
    </div>
  )
}

export function FinalCTAButtons() {
  const { t } = useLocale()
  return (
    <div className="relative flex flex-col sm:flex-row gap-3 flex-shrink-0">
      <Button size="lg"
        className="h-14 px-8 rounded-2xl font-bold text-base hover:-translate-y-0.5 transition-all shadow-lg"
        style={{ backgroundColor: "white", color: "var(--color-brand-700)" }}>
        <Link href="/register">{t("home.createAccount")}</Link>
      </Button>
      <Button variant="ghost" size="lg"
        className="h-14 px-8 rounded-2xl font-bold text-base text-white/90
          hover:text-white hover:bg-white/15 transition-all">
        <Link href="/products">{t("home.browseFirst")}</Link>
      </Button>
    </div>
  )
}
