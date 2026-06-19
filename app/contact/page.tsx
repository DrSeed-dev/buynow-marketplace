"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/common/PageWrapper"
import { Mail, Phone, MapPin, Clock, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Metadata } from "next"

const contactInfo = [
  { icon: Mail,    label: "Email Us",      value: "support@buynowmarketplace.com" },
  { icon: Phone,   label: "Call Us",       value: "+234 805 885 8082" },
  { icon: MapPin,  label: "Our Location",  value: "Abeokuta, Lagos, Nigeria" },
  { icon: Clock,   label: "Working Hours", value: "Mon – Sat: 8am – 8pm WAT" },
]

export default function ContactPage() {
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1800))
    setSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <PageWrapper className="py-12">

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--color-brand-600)" }}>Support</p>
          <h1 className="text-3xl md:text-4xl font-black"
            style={{ color: "var(--foreground)" }}>Get in Touch</h1>
          <p className="mt-3 text-base" style={{ color: "var(--muted-foreground)" }}>
            Our team is here to help. Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Contact info */}
          <div className="flex flex-col gap-4">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label}
                className="flex items-start gap-4 p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--color-brand-100)" }}>
                  <Icon size={20} style={{ color: "var(--color-brand-600)" }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: "var(--muted-foreground)" }}>{label}</p>
                  <p className="text-sm font-semibold"
                    style={{ color: "var(--foreground)" }}>{value}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border h-48 flex items-center
              justify-center"
              style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
              <div className="text-center">
                <MapPin size={32} style={{ color: "var(--color-brand-600)" }} className="mx-auto mb-2" />
                <p className="text-sm font-semibold" style={{ color: "var(--muted-foreground)" }}>
                  Abeokuta, Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit}
            className="p-6 rounded-2xl border flex flex-col gap-5"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <h2 className="font-black text-lg" style={{ color: "var(--foreground)" }}>
              Send us a message
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold mb-1.5 block"
                  style={{ color: "var(--foreground)" }}>First Name</Label>
                <Input placeholder="Olamide" className="h-12 rounded-xl" required />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-1.5 block"
                  style={{ color: "var(--foreground)" }}>Last Name</Label>
                <Input placeholder="Oluwatoyin" className="h-12 rounded-xl" required />
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold mb-1.5 block"
                style={{ color: "var(--foreground)" }}>Email Address</Label>
              <Input type="email" placeholder="you@example.com"
                className="h-12 rounded-xl" required />
            </div>

            <div>
              <Label className="text-sm font-semibold mb-1.5 block"
                style={{ color: "var(--foreground)" }}>Subject</Label>
              <Input placeholder="How can we help?" className="h-12 rounded-xl" required />
            </div>

            <div>
              <Label className="text-sm font-semibold mb-1.5 block"
                style={{ color: "var(--foreground)" }}>Message</Label>
              <Textarea placeholder="Tell us more about your issue or question..."
                className="rounded-xl min-h-[120px] resize-none" required />
            </div>

            <Button type="submit" disabled={sending}
              className="h-13 rounded-2xl font-bold text-base text-white
                shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all
                disabled:opacity-60"
              style={{ backgroundColor: sent ? "var(--color-success)" : "var(--color-brand-600)" }}>
              {sending ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </span>
              ) : sent ? (
                <span className="flex items-center gap-2">
                  <Check size={18} /> Message Sent!
                </span>
              ) : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  )
}
