"use client"

import Link from "next/link"
import { ArrowRight, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/providers/CurrencyLanguageContext"

export function HeroSection() {
  const { t } = useLocale()

  return (
    <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">

      {/* Eyebrow */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-px" style={{ backgroundColor: "var(--color-brand-300)" }} />
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--color-brand-500)" }} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: "var(--color-brand-600)" }}>
            {t("hero.eyebrow")}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-black tracking-wider text-white"
            style={{ backgroundColor: "var(--color-brand-600)" }}>v2.0</span>
        </div>
        <div className="w-8 h-px" style={{ backgroundColor: "var(--color-brand-300)" }} />
      </div>

      {/* Headline */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]"
        style={{ color: "var(--foreground)" }}>
        {t("hero.headline1")}{" "}
        <br className="hidden sm:block" />
        <span className="relative inline-block" style={{ color: "var(--color-brand-600)" }}>
          {t("hero.headline2")}
          <svg className="absolute -bottom-2 left-0 w-full"
            viewBox="0 0 300 12" fill="none" aria-hidden="true">
            <path d="M2 9 C60 3, 120 3, 180 6 S240 10, 298 4"
              stroke="var(--color-brand-400)" strokeWidth="3"
              strokeLinecap="round" fill="none" />
          </svg>
        </span>
      </h1>

      <p className="text-lg md:text-xl max-w-2xl leading-relaxed"
        style={{ color: "var(--muted-foreground)" }}>
        {t("hero.subtitle")}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <Button size="lg"
          className="px-8 h-14 rounded-2xl text-white font-bold text-base
            shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          style={{ backgroundColor: "var(--color-brand-600)" }}>
          <Link href="/products" className="flex items-center gap-2">
            {t("hero.cta1")} <ArrowRight size={18} />
          </Link>
        </Button>
        <Button variant="outline" size="lg"
          className="px-8 h-14 rounded-2xl font-bold text-base hover:-translate-y-0.5 transition-all"
          style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
          <Link href="/vendor" className="flex items-center gap-2">
            <Store size={18} /> {t("hero.cta2")}
          </Link>
        </Button>
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-3 text-sm"
        style={{ color: "var(--muted-foreground)" }}>
        <div className="flex -space-x-2">
          {["#6366f1","#ec4899","#f59e0b","#22c55e","#d6d31f"].map((c, i) => (
            <div key={i} className="w-7 h-7 rounded-full border-2"
              style={{ backgroundColor: c, borderColor: "var(--background)" }} />
          ))}
        </div>
        <span>
          <strong style={{ color: "var(--foreground)" }}>20,000+</strong>{" "}
          {t("hero.socialProof")}
        </span>
      </div>
    </div>
  )
}
