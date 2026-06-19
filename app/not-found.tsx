import Link from "next/link"
import { PageWrapper } from "@/components/common/PageWrapper"

export default function NotFound() {
  return (
    <PageWrapper className="flex flex-col items-center justify-center py-32 text-center gap-6">
      <p className="text-8xl font-black" style={{ color: "var(--color-brand-600)" }}>404</p>
      <h1 className="text-3xl font-black" style={{ color: "var(--foreground)" }}>
        Page Not Found
      </h1>
      <p className="text-base max-w-md" style={{ color: "var(--muted-foreground)" }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/"
        className="h-12 px-8 rounded-2xl font-bold text-white flex items-center
          shadow-md hover:-translate-y-0.5 transition-all duration-200"
        style={{ backgroundColor: "var(--color-brand-600)" }}>
        Back to Home
      </Link>
    </PageWrapper>
  )
}
