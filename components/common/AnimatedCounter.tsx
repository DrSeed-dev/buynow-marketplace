"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

// This hook detects when an element enters the viewport
// so we only start counting when the user can actually see it
function useInView() {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          // Once triggered, stop observing
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

export function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (!inView) return

    let startTime: number
    const startValue = 0

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Ease out — starts fast, slows down at the end
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (end - startValue) * eased

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0
        ? count.toFixed(decimals)
        : Math.floor(count).toLocaleString("en-NG")}
      {suffix}
    </span>
  )
}
