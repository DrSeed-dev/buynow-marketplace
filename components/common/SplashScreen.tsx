"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface SplashScreenProps {
  children: React.ReactNode
}

export function SplashScreen({ children }: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOut,    setFadeOut]    = useState(false)

  useEffect(() => {
    // Show splash for 2.2 seconds then start fade out
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200)
    // Remove splash completely after fade finishes (0.6s)
    const hideTimer = setTimeout(() => setShowSplash(false), 2800)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <>
      {/* ── ACTUAL APP CONTENT ── */}
      {/* Renders behind splash, becomes visible when splash fades */}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          transition: "opacity 0.4s ease-in-out",
        }}
      >
        {children}
      </div>

      {/* ── SPLASH SCREEN ── */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            animate={{ opacity: fadeOut ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center
              justify-center"
            style={{ backgroundColor: "#0f0f13" }}
          >

            {/* ── LOGO + SPINNING RINGS CONTAINER ── */}
            <div className="relative flex items-center justify-center w-40 h-40">

              {/* Outer spinning ring — full circle, gaps via dasharray */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 160 160"
                fill="none"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                <circle
                  cx="80" cy="80" r="72"
                  stroke="url(#gradOuter)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="120 332"
                />
                <defs>
                  <linearGradient id="gradOuter" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Inner spinning ring — rotates opposite direction */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 160 160"
                fill="none"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 1.5,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                <circle
                  cx="80" cy="80" r="58"
                  stroke="url(#gradInner)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="60 304"
                />
                <defs>
                  <linearGradient id="gradInner" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* ── BuyNow LOGO ── */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1], // spring bounce
                }}
                className="relative z-10 w-20 h-20 rounded-2xl overflow-hidden
                  flex items-center justify-center shadow-2xl"
              >
                <Image
                  src="/buynow-logo.png"
                  alt="BuyNow Marketplace"
                  width={80}
                  height={80}
                  className="object-contain"
                  priority
                />
              </motion.div>

            </div>

            {/* ── APP NAME ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 flex flex-col items-center gap-1"
            >
              <p className="text-white font-black text-2xl tracking-tight">
                BuyNow
              </p>
              <p className="text-sm font-medium tracking-widest uppercase"
                style={{ color: "#6366f1" }}>
                Marketplace
              </p>
            </motion.div>

            {/* ── LOADING DOTS ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-2 mt-10"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#6366f1" }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale:   [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            {/* ── TAGLINE ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 text-xs font-medium tracking-wider"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Shop Smarter. Sell Bigger.
            </motion.p>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
