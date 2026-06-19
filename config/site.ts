export const siteConfig = {
  name: "BuyNow Marketplace",
  description: "A modern multi-vendor e-commerce marketplace",
  version: "2.0.0",
  url: "https://buynow-marketplace.vercel.app",

  navLinks: [
    { label: "Home",     href: "/" },
    { label: "Products", href: "/products" },
    { label: "Deals",    href: "/deals" },
  ],

  social: {
    github:    "https://github.com/yourusername/buynow-marketplace",
    instagram: "#",
    facebook:  "#",
    twitter:   "#",
  },
}

export type SiteConfig = typeof siteConfig
