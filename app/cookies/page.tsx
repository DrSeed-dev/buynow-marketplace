import { PageWrapper } from "@/components/common/PageWrapper"
import { Cookie } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy",
}

const cookieTypes = [
  {
    name: "Essential Cookies",
    required: true,
    description: "These cookies are necessary for the website to function. They enable core features like user authentication, cart functionality, and security. You cannot opt out of these.",
    examples: ["Session authentication", "Cart contents", "Security tokens"],
  },
  {
    name: "Performance Cookies",
    required: false,
    description: "These cookies help us understand how visitors interact with our website by collecting anonymous information. This helps us improve our platform.",
    examples: ["Page load times", "Error tracking", "Most visited pages"],
  },
  {
    name: "Functional Cookies",
    required: false,
    description: "These cookies remember your preferences to provide a more personalized experience, such as your preferred language or theme.",
    examples: ["Dark/light mode preference", "Language settings", "Recently viewed products"],
  },
  {
    name: "Marketing Cookies",
    required: false,
    description: "These cookies track your browsing habits to show you relevant advertisements and promotions both on and off our platform.",
    examples: ["Ad targeting", "Promotional offers", "Retargeting"],
  },
]

export default function CookiesPage() {
  return (
    <PageWrapper className="py-12 max-w-4xl">

      {/* Header */}
      <div className="flex items-start gap-4 mb-10">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "var(--color-brand-100)" }}
        >
          <Cookie size={24} style={{ color: "var(--color-brand-600)" }} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: "var(--color-brand-600)" }}>Legal</p>
          <h1 className="text-3xl font-black" style={{ color: "var(--foreground)" }}>
            Cookie Policy
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Last updated: June 20, 2026
          </p>
        </div>
      </div>

      {/* Intro */}
      <div
        className="p-5 rounded-2xl border mb-8"
        style={{ backgroundColor: "var(--color-brand-50)", borderColor: "var(--color-brand-200)" }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-700)" }}>
          BuyNow Marketplace uses cookies and similar technologies to provide, improve,
          and protect our services. This policy explains what cookies are, how we use them,
          and how you can manage your preferences.
        </p>
      </div>

      {/* What are cookies */}
      <div className="mb-8">
        <h2 className="text-lg font-black mb-3" style={{ color: "var(--foreground)" }}>
          What Are Cookies?
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          Cookies are small text files stored on your device when you visit a website.
          They help websites remember your preferences, keep you logged in, and understand
          how you use the site. Cookies do not contain personally identifiable information
          unless you have provided that information to us.
        </p>
      </div>

      {/* Cookie types */}
      <div className="mb-8">
        <h2 className="text-lg font-black mb-5" style={{ color: "var(--foreground)" }}>
          Types of Cookies We Use
        </h2>
        <div className="flex flex-col gap-4">
          {cookieTypes.map((cookie) => (
            <div
              key={cookie.name}
              className="p-5 rounded-2xl border"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-base"
                  style={{ color: "var(--foreground)" }}>
                  {cookie.name}
                </h3>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: cookie.required ? "var(--color-brand-100)" : "var(--muted)",
                    color: cookie.required ? "var(--color-brand-600)" : "var(--muted-foreground)",
                  }}
                >
                  {cookie.required ? "Always Active" : "Optional"}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-3"
                style={{ color: "var(--muted-foreground)" }}>
                {cookie.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {cookie.examples.map((example) => (
                  <span
                    key={example}
                    className="px-2 py-1 rounded-lg text-xs border"
                    style={{
                      backgroundColor: "var(--muted)",
                      borderColor: "var(--border)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Managing cookies */}
      <div id="manage" className="mb-8">
        <h2 className="text-lg font-black mb-3" style={{ color: "var(--foreground)" }}>
          Managing Your Cookie Preferences
        </h2>
        <p className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--muted-foreground)" }}>
          You can manage your cookie preferences at any time. Essential cookies cannot
          be disabled as they are required for the platform to function. For all other
          cookies, you have full control.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="h-11 px-6 rounded-2xl font-bold text-sm text-white
              transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--color-brand-600)" }}
          >
            Accept All Cookies
          </button>
          <button
            className="h-11 px-6 rounded-2xl font-bold text-sm border-2
              transition-all hover:-translate-y-0.5"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            Essential Only
          </button>
        </div>
      </div>

      {/* Contact */}
      <div
        className="p-5 rounded-2xl border"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>
          Questions about cookies?
        </p>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Contact us at{" "}
          <a href="mailto:privacy@buynowmarketplace.com"
            className="font-semibold hover:opacity-80"
            style={{ color: "var(--color-brand-600)" }}>
            support@buynowmarketplace.com
          </a>
        </p>
      </div>

    </PageWrapper>
  )
}
