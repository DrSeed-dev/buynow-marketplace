"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Cookie, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Only show if user hasn't already made a choice
    const choice = localStorage.getItem("buynow-cookie-consent")
    if (!choice) {
      // Small delay so it doesn't pop up instantly on load
      const timer = setTimeout(() => setShow(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  function acceptAll() {
    localStorage.setItem("buynow-cookie-consent", "all")
    setShow(false)
  }

  function acceptEssential() {
    localStorage.setItem("buynow-cookie-consent", "essential")
    setShow(false)
  }

  function dismiss() {
    localStorage.setItem("buynow-cookie-consent", "dismissed")
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-[9990]
            sm:left-auto sm:right-4 sm:max-w-sm md:max-w-md"
        >
          <div
            className="rounded-2xl border shadow-2xl p-5 flex flex-col gap-4"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--color-brand-100)" }}
                >
                  <Cookie size={18} style={{ color: "var(--color-brand-600)" }} />
                </div>
                <p className="font-black text-base"
                  style={{ color: "var(--foreground)" }}>
                  We use cookies
                </p>
              </div>
              <button
                onClick={dismiss}
                className="p-1 rounded-lg hover:opacity-70 transition-opacity flex-shrink-0"
                style={{ color: "var(--muted-foreground)" }}
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message */}
            <p className="text-sm leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}>
              We use cookies to enhance your shopping experience, personalise content,
              and analyse site traffic. By clicking &quot;Accept All&quot;, you consent
              to our use of cookies.{" "}
              <Link href="/cookies"
                className="font-semibold hover:opacity-80"
                style={{ color: "var(--color-brand-600)" }}>
                Learn more
              </Link>
            </p>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={acceptEssential}
                className="flex-1 h-10 rounded-xl text-sm font-bold border-2
                  transition-all hover:opacity-80"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                Essential Only
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 h-10 rounded-xl text-sm font-bold text-white
                  transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--color-brand-600)" }}
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
