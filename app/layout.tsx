import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import { ThemeProvider }    from "@/providers/ThemeProvider"
import { QueryProvider }    from "@/providers/QueryProvider"
import { LocaleProvider }   from "@/providers/CurrencyLanguageContext"
import { Navbar }           from "@/components/common/Navbar/Navbar"
import { Footer }           from "@/components/common/Footer/Footer"
import { SplashScreen }     from "@/components/common/SplashScreen"
import { CookieBanner }     from "@/components/common/CookieBanner"
import { siteConfig }       from "@/config/site"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <ThemeProvider>
            {/* LocaleProvider wraps everything so language/currency
                is accessible from ANY component in the app */}
            <LocaleProvider>
              <SplashScreen>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
                <CookieBanner />
              </SplashScreen>
            </LocaleProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
