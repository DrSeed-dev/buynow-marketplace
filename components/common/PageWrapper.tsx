import { cn } from "@/lib/utils"

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

// PageWrapper gives every page a consistent max-width, padding, and min-height.
// Usage: wrap any page's content with <PageWrapper>...</PageWrapper>
export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main
      className={cn(
        // max-w-7xl caps the content width on large screens
        // px-* adds responsive horizontal padding
        // min-h ensures the page always fills the viewport height minus navbar (4rem = 64px)
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]",
        className
      )}
    >
      {children}
    </main>
  )
}
