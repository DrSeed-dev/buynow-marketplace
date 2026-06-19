import { PageWrapper } from "@/components/common/PageWrapper"
import { ShoppingBag, Store, CreditCard, Truck, RotateCcw, Shield, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Help Center" }

const helpCategories = [
  { icon: ShoppingBag, title: "Orders & Purchases",    desc: "Track orders, cancel orders, order issues",      href: "#orders" },
  { icon: Truck,       title: "Shipping & Delivery",   desc: "Delivery times, tracking, shipping costs",       href: "#shipping" },
  { icon: RotateCcw,   title: "Returns & Refunds",     desc: "How to return items and get your money back",    href: "#returns" },
  { icon: CreditCard,  title: "Payments & Billing",    desc: "Payment methods, failed payments, receipts",     href: "#payments" },
  { icon: Store,       title: "Vendor Support",        desc: "Setting up your store, listing products",        href: "#vendors" },
  { icon: Shield,      title: "Account & Security",    desc: "Password, account access, privacy settings",     href: "#account" },
]

const faqs = [
  { q: "How do I track my order?",           a: "Go to Dashboard → My Orders and click on your order to see real-time tracking information." },
  { q: "How long does delivery take?",       a: "Delivery typically takes 2-5 business days within Lagos and 3-7 business days for other states." },
  { q: "Can I return a product?",            a: "Yes! You have 7 days after delivery to return a product. The item must be unused and in original packaging." },
  { q: "How do I become a vendor?",          a: "Click 'Become a Vendor' and fill out the vendor application. Our team reviews all applications within 24 hours." },
  { q: "Is my payment information secure?",  a: "Yes. We use 256-bit SSL encryption and never store your card details on our servers." },
  { q: "What payment methods do you accept?",a: "We accept Visa, Mastercard, Verve, PayStack, Flutterwave, USSD, Bank Transfer, and OPay." },
]

export default function HelpPage() {
  return (
    <PageWrapper className="py-12">

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: "var(--color-brand-600)" }}>Support</p>
        <h1 className="text-3xl md:text-4xl font-black mb-4"
          style={{ color: "var(--foreground)" }}>Help Center</h1>
        <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
          Find answers to common questions or contact our support team.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {helpCategories.map((cat) => (
          <Link key={cat.title} href={cat.href}
            className="flex items-start gap-4 p-5 rounded-2xl border
              transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--color-brand-100)" }}>
              <cat.icon size={20} style={{ color: "var(--color-brand-600)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm mb-1" style={{ color: "var(--foreground)" }}>
                {cat.title}
              </p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {cat.desc}
              </p>
            </div>
            <ChevronRight size={16} style={{ color: "var(--muted-foreground)" }} className="flex-shrink-0 mt-1" />
          </Link>
        ))}
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-black text-center mb-8"
          style={{ color: "var(--foreground)" }}>
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <div key={faq.q}
              className="p-5 rounded-2xl border"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-bold text-sm mb-2" style={{ color: "var(--foreground)" }}>
                {faq.q}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div className="mt-10 p-6 rounded-2xl text-center"
          style={{ backgroundColor: "var(--color-brand-50)", borderColor: "var(--color-brand-200)" }}>
          <p className="font-black text-lg mb-2" style={{ color: "var(--foreground)" }}>
            Still need help?
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
            Our support team is available Mon–Sat, 8am–8pm WAT
          </p>
          <Link href="/contact"
            className="inline-flex items-center h-11 px-6 rounded-2xl
              font-bold text-sm text-white transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--color-brand-600)" }}>
            Contact Support
          </Link>
        </div>
      </div>

    </PageWrapper>
  )
}
