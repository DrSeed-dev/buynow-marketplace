import { PageWrapper } from "@/components/common/PageWrapper"
import { Shield } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

// Last updated date
const LAST_UPDATED = "June 20, 2026"

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us when you create an account, make a purchase, or contact us for support. This includes your name, email address, phone number, delivery address, and payment information.

We also automatically collect certain information when you use our platform, including your IP address, browser type, device information, pages visited, and the date and time of your visits.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:
• Process and fulfill your orders
• Send you order confirmations and updates
• Communicate with you about products, services, and promotions
• Improve our platform and develop new features
• Prevent fraud and ensure the security of our platform
• Comply with legal obligations`,
  },
  {
    title: "3. Sharing Your Information",
    content: `We do not sell your personal information to third parties. We may share your information with:
• Vendors on our marketplace to fulfill your orders
• Logistics and delivery partners to ship your orders
• Payment processors to complete transactions
• Service providers who assist in our operations
• Law enforcement when required by law`,
  },
  {
    title: "4. Data Security",
    content: `We implement industry-standard security measures to protect your personal information, including SSL encryption for all data transmission, secure storage of payment information, and regular security audits. However, no method of transmission over the internet is 100% secure.`,
  },
  {
    title: "5. Cookies",
    content: `We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser. For more details, please read our Cookie Policy.`,
  },
  {
    title: "6. Your Rights",
    content: `You have the right to:
• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your personal data
• Opt out of marketing communications
• Lodge a complaint with a supervisory authority

To exercise these rights, contact us at privacy@buynowmarketplace.com`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete or anonymize your personal data within 30 days, except where retention is required by law.`,
  },
  {
    title: "8. Children's Privacy",
    content: `BuyNow Marketplace is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a prominent notice on our platform. Your continued use of our services after such changes constitutes your acceptance of the updated policy.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have any questions about this Privacy Policy, please contact us at:

BuyNow Marketplace
Email: support@buynowmarketplace.com
Address: Abeokuta, Nigeria`,
  },
]

export default function PrivacyPage() {
  return (
    <PageWrapper className="py-12 max-w-4xl">

      {/* Header */}
      <div className="flex items-start gap-4 mb-10">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "var(--color-brand-100)" }}
        >
          <Shield size={24} style={{ color: "var(--color-brand-600)" }} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: "var(--color-brand-600)" }}>Legal</p>
          <h1 className="text-3xl font-black" style={{ color: "var(--foreground)" }}>
            Privacy Policy
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* Intro */}
      <div
        className="p-5 rounded-2xl border mb-8"
        style={{ backgroundColor: "var(--color-brand-50)", borderColor: "var(--color-brand-200)" }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-700)" }}>
          At BuyNow Marketplace, we take your privacy seriously. This policy explains how we
          collect, use, and protect your personal information when you use our platform.
          By using BuyNow Marketplace, you agree to the collection and use of information
          in accordance with this policy.
        </p>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2
              className="text-lg font-black mb-3"
              style={{ color: "var(--foreground)" }}
            >
              {section.title}
            </h2>
            <div
              className="text-sm leading-relaxed whitespace-pre-line"
              style={{ color: "var(--muted-foreground)" }}
            >
              {section.content}
            </div>
          </div>
        ))}
      </div>

      {/* Full policy link */}
      <div
        className="mt-10 p-5 rounded-2xl border"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>
          Full Legal Policy Document
        </p>
        <p className="text-sm mb-3" style={{ color: "var(--muted-foreground)" }}>
          For the complete legal privacy policy document, please visit:
        </p>
        <a
          href="https://mart9ja.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold hover:opacity-80 transition-opacity"
          style={{ color: "var(--color-brand-600)" }}
        >
          https://mart9ja.vercel.app/ →
        </a>
      </div>

    </PageWrapper>
  )
}
