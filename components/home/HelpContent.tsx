"use client"

import Link from "next/link"
import { ChevronRight, ShoppingBag, Store, CreditCard, Truck, RotateCcw, Shield } from "lucide-react"
import { useLocale } from "@/providers/CurrencyLanguageContext"

export function HelpHeader() {
  const { t } = useLocale()
  return (
    <div className="text-center mb-12">
      <p className="text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: "var(--color-brand-600)" }}>
        {t("help.support")}
      </p>
      <h1 className="text-3xl md:text-4xl font-black mb-4"
        style={{ color: "var(--foreground)" }}>
        {t("help.title")}
      </h1>
      <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
        {t("help.subtitle")}
      </p>
    </div>
  )
}

export function HelpCategories() {
  const { t } = useLocale()

  const helpCategories = [
    { icon: ShoppingBag, titleKey: "help.ordersTitle",        descKey: "help.ordersDesc",        href: "#orders" },
    { icon: Truck,       titleKey: "help.shippingTitle",      descKey: "help.shippingDesc",      href: "#shipping" },
    { icon: RotateCcw,   titleKey: "help.returnsTitle",       descKey: "help.returnsDesc",       href: "#returns" },
    { icon: CreditCard,  titleKey: "help.paymentsTitle",      descKey: "help.paymentsDesc",      href: "#payments" },
    { icon: Store,       titleKey: "help.vendorSupportTitle", descKey: "help.vendorSupportDesc", href: "#vendors" },
    { icon: Shield,      titleKey: "help.accountTitle",       descKey: "help.accountDesc",       href: "#account" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
      {helpCategories.map((cat) => (
        <Link key={cat.href} href={cat.href}
          className="flex items-start gap-4 p-5 rounded-2xl border
            transition-all hover:-translate-y-0.5 hover:shadow-md"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "var(--color-brand-100)" }}>
            <cat.icon size={20} style={{ color: "var(--color-brand-600)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm mb-1" style={{ color: "var(--foreground)" }}>
              {t(cat.titleKey)}
            </p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              {t(cat.descKey)}
            </p>
          </div>
          <ChevronRight size={16} style={{ color: "var(--muted-foreground)" }}
            className="flex-shrink-0 mt-1" />
        </Link>
      ))}
    </div>
  )
}

export function HelpFAQHeader() {
  const { t } = useLocale()
  return (
    <h2 className="text-2xl font-black text-center mb-8"
      style={{ color: "var(--foreground)" }}>
      {t("help.faqTitle")}
    </h2>
  )
}

export function HelpStillNeedHelp() {
  const { t } = useLocale()
  return (
    <div className="mt-10 p-6 rounded-2xl text-center border"
      style={{ backgroundColor: "var(--color-brand-50)", borderColor: "var(--color-brand-200)" }}>
      <p className="font-black text-lg mb-2" style={{ color: "var(--foreground)" }}>
        {t("help.stillNeedHelp")}
      </p>
      <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
        {t("help.availability")}
      </p>
      <Link href="/contact"
        className="inline-flex items-center h-11 px-6 rounded-2xl
          font-bold text-sm text-white transition-all hover:-translate-y-0.5"
        style={{ backgroundColor: "var(--color-brand-600)" }}>
        {t("help.contactBtn")}
      </Link>
    </div>
  )
}
