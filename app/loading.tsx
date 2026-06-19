// app/loading.tsx
// This file is a Next.js SPECIAL FILE.
// It automatically shows while any page is loading during navigation.
// Next.js detects it by filename — no imports needed elsewhere.
// Think of it as a "between pages" animation.

"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Spinning ring */}
      <div className="relative w-20 h-20 flex items-center justify-center">

        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 80 80"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
        >
          <circle
            cx="40" cy="40" r="34"
            stroke="url(#loadGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="60 154"
          />
          <defs>
            <linearGradient id="loadGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Logo in center */}
        <div className="w-10 h-10 rounded-xl overflow-hidden">
          <Image
            src="/buynow-logo.png"
            alt="Loading"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-5 text-sm font-semibold"
        style={{ color: "var(--muted-foreground)" }}
      >
        Loading...
      </motion.p>
    </div>
  )
}
