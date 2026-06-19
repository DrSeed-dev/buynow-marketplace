import { PageWrapper } from "@/components/common/PageWrapper"
import { Users, Store, ShoppingBag, Shield } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "About Us" }

const stats = [
  { value: "20,000+", label: "Happy Customers" },
  { value: "100+",     label: "Verified Vendors" },
  { value: "1,999+",  label: "Products Listed" },
  { value: "3.8/5",    label: "Average Rating" },
]

const values = [
  { icon: Users,       title: "Community First",    body: "We exist to support Nigerian vendors and give shoppers access to authentic local products they can trust." },
  { icon: Store,       title: "Empower Vendors",    body: "Every vendor on BuyNow is a real person building a real business. We give them the tools to grow." },
  { icon: ShoppingBag, title: "Quality Shopping",   body: "Every product is reviewed. Every vendor is vetted. Your shopping experience is our top priority." },
  { icon: Shield,      title: "Trust & Safety",     body: "Secure payments, buyer protection, and verified sellers. Your security is built into everything we do." },
]

export default function AboutPage() {
  return (
    <PageWrapper className="py-12">

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "var(--color-brand-600)" }}>Our Story</p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6"
          style={{ color: "var(--foreground)" }}>
          Built for Nigeria.<br />
          <span style={{ color: "var(--color-brand-600)" }}>Built for You.</span>
        </h1>
        <p className="text-lg leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}>
          BuyNow Marketplace was built with one mission, to connect Nigeria&apos;s best
          independent vendors with millions of everyday shoppers, making quality products
          accessible to everyone, everywhere.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat) => (
          <div key={stat.label}
            className="p-6 rounded-2xl border text-center"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-3xl font-black mb-1"
              style={{ color: "var(--color-brand-600)" }}>{stat.value}</p>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="p-8 rounded-3xl"
          style={{ backgroundColor: "var(--color-brand-600)" }}>
          <h2 className="text-2xl font-black text-white mb-4">Our Mission</h2>
          <p className="text-white/80 leading-relaxed">
            To democratize commerce in Nigeria by giving every vendor — from the Aba
            shoe maker to the Lagos fashion designer, a world-class platform to sell
            their products and grow their business.
          </p>
        </div>
        <div className="p-8 rounded-3xl border"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-2xl font-black mb-4" style={{ color: "var(--foreground)" }}>
            Our Vision
          </h2>
          <p className="leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            To become Africa&apos;s most trusted multi-vendor marketplace, where
            shoppers find everything they need and vendors build thriving businesses,
            all powered by technology built in Nigeria.
          </p>
        </div>
      </div>

      {/* Values */}
      <div>
        <h2 className="text-2xl font-black text-center mb-8"
          style={{ color: "var(--foreground)" }}>What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((val) => (
            <div key={val.title}
              className="flex gap-4 p-6 rounded-2xl border"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--color-brand-100)" }}>
                <val.icon size={22} style={{ color: "var(--color-brand-600)" }} />
              </div>
              <div>
                <h3 className="font-black mb-2" style={{ color: "var(--foreground)" }}>
                  {val.title}
                </h3>
                <p className="text-sm leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}>{val.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </PageWrapper>
  )
}
