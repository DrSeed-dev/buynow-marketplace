import { PageWrapper } from "@/components/common/PageWrapper"
import type { Metadata } from "next"
import {
  HelpHeader,
  HelpCategories,
  HelpFAQHeader,
  HelpStillNeedHelp,
} from "@/components/home/HelpContent"

export const metadata: Metadata = { title: "Help Center" }

// FAQs stay as static data in the Server Component
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

      {/* Translated header */}
      <HelpHeader />

      {/* Translated category cards */}
      <HelpCategories />

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <HelpFAQHeader />
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

        {/* Translated "still need help" CTA */}
        <HelpStillNeedHelp />
      </div>

    </PageWrapper>
  )
}
