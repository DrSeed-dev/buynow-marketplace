import { PageWrapper } from "@/components/common/PageWrapper"
import { FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
}

const LAST_UPDATED = "June 20, 2026"

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using BuyNow Marketplace, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. We reserve the right to update these terms at any time, and your continued use constitutes acceptance of any changes.`,
  },
  {
    title: "2. User Accounts",
    content: `To use certain features of BuyNow Marketplace, you must create an account. You are responsible for:
• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Providing accurate and complete registration information
• Notifying us immediately of any unauthorized use of your account

You must be at least 18 years old to create an account.`,
  },
  {
    title: "3. Buyer Terms",
    content: `As a buyer on BuyNow Marketplace, you agree to:
• Provide accurate shipping and payment information
• Pay for items you purchase in full
• Not misuse the return or refund process
• Communicate respectfully with vendors
• Not attempt to complete transactions outside our platform

We do not guarantee the availability, quality, or accuracy of any product listing.`,
  },
  {
    title: "4. Vendor Terms",
    content: `As a vendor on BuyNow Marketplace, you agree to:
• Provide accurate product descriptions, images, and pricing
• Fulfill orders in a timely manner
• Maintain sufficient stock levels for listed products
• Respond to customer inquiries within 24 hours
• Comply with all applicable Nigerian laws and regulations
• Not list counterfeit, prohibited, or illegal products

Vendors are responsible for paying applicable taxes on their sales.`,
  },
  {
    title: "5. Prohibited Activities",
    content: `Users of BuyNow Marketplace must not:
• Post false, misleading, or fraudulent listings
• Violate intellectual property rights
• Harass, abuse, or harm other users
• Attempt to manipulate reviews or ratings
• Use the platform for money laundering or illegal activities
• Scrape, hack, or disrupt our platform
• Create multiple accounts to circumvent bans

Violation of these rules may result in account suspension or termination.`,
  },
  {
    title: "6. Payments and Fees",
    content: `BuyNow Marketplace processes payments securely. Vendors pay a commission on each sale. All prices displayed are in Nigerian Naira (₦) unless otherwise stated.

Refunds are processed within 5-7 business days. Payment disputes must be reported within 48 hours of delivery.`,
  },
  {
    title: "7. Intellectual Property",
    content: `All content on BuyNow Marketplace, including logos, graphics, text, and software, is owned by or licensed to us. You may not reproduce, distribute, or create derivative works without our written permission.

By uploading product images or content, you grant us a non-exclusive license to display that content on our platform.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `BuyNow Marketplace is a marketplace platform connecting buyers and vendors. We are not liable for:
• The quality or accuracy of products sold by vendors
• Disputes between buyers and vendors
• Losses arising from unauthorized account access
• Service interruptions or downtime

Our total liability to you shall not exceed the amount you paid for the transaction in question.`,
  },
  {
    title: "9. Dispute Resolution",
    content: `In the event of a dispute between a buyer and vendor, please contact our support team first. We will attempt to mediate disputes fairly.

These terms are governed by the laws of the Federal Republic of Nigeria. Any legal disputes shall be resolved in the courts of Lagos State, Nigeria.`,
  },
  {
    title: "10. Contact Information",
    content: `For questions about these Terms of Service, contact us at:

BuyNow Marketplace
Email: support@buynowmarketplace.com
Address: Abeokuta, Nigeria`,
  },
]

export default function TermsPage() {
  return (
    <PageWrapper className="py-12 max-w-4xl">

      {/* Header */}
      <div className="flex items-start gap-4 mb-10">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "var(--color-brand-100)" }}
        >
          <FileText size={24} style={{ color: "var(--color-brand-600)" }} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: "var(--color-brand-600)" }}>Legal</p>
          <h1 className="text-3xl font-black" style={{ color: "var(--foreground)" }}>
            Terms of Service
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
          Please read these Terms of Service carefully before using BuyNow Marketplace.
          These terms govern your use of our platform as both a buyer and a vendor.
          By creating an account or making a purchase, you accept these terms in full.
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

      {/* Full legal link */}
      <div
        className="mt-10 p-5 rounded-2xl border"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>
          Full Legal Document
        </p>
        <p className="text-sm mb-3" style={{ color: "var(--muted-foreground)" }}>
          For the complete legal terms document, please visit:
        </p>
        <a
          href="https://mart9ja.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold hover:opacity-80 transition-opacity"
          style={{ color: "var(--color-brand-600)" }}
        >
          https://mart9ja.vercel.app →
        </a>
      </div>

    </PageWrapper>
  )
}
