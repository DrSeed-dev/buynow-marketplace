"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface Language { code: string; label: string; flag: string }
interface Currency { code: string; symbol: string; label: string; flag: string; rate: number }

interface LocaleContextType {
  language:     Language
  currency:     Currency
  setLanguage:  (lang: Language) => void
  setCurrency:  (cur: Currency) => void
  convertPrice: (nairaAmount: number) => string
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English",   flag: "🇬🇧" },
  { code: "fr", label: "Français",  flag: "🇫🇷" },
  { code: "ar", label: "العربية",   flag: "🇸🇦" },
  { code: "zh", label: "中文",       flag: "🇨🇳" },
  { code: "yo", label: "Yorùbá",    flag: "🇳🇬" },
  { code: "ha", label: "Hausa",     flag: "🇳🇬" },
  { code: "ig", label: "Igbo",      flag: "🇳🇬" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "es", label: "Español",   flag: "🇪🇸" },
  { code: "de", label: "Deutsch",   flag: "🇩🇪" },
]

export const CURRENCIES: Currency[] = [
  { code: "NGN", symbol: "₦",   label: "Nigerian Naira",    flag: "🇳🇬", rate: 1       },
  { code: "USD", symbol: "$",   label: "US Dollar",          flag: "🇺🇸", rate: 0.00065 },
  { code: "GBP", symbol: "£",   label: "British Pound",      flag: "🇬🇧", rate: 0.00052 },
  { code: "EUR", symbol: "€",   label: "Euro",               flag: "🇪🇺", rate: 0.00060 },
  { code: "GHS", symbol: "₵",   label: "Ghanaian Cedi",      flag: "🇬🇭", rate: 0.0098  },
  { code: "KES", symbol: "KSh", label: "Kenyan Shilling",    flag: "🇰🇪", rate: 0.084   },
  { code: "ZAR", symbol: "R",   label: "South African Rand", flag: "🇿🇦", rate: 0.012   },
  { code: "CAD", symbol: "C$",  label: "Canadian Dollar",    flag: "🇨🇦", rate: 0.00088 },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham",         flag: "🇦🇪", rate: 0.0024  },
  { code: "CNY", symbol: "¥",   label: "Chinese Yuan",       flag: "🇨🇳", rate: 0.0047  },
  { code: "AUD", symbol: "A$",  label: "Australian Dollar",  flag: "🇦🇺", rate: 0.00095 }
]

const LocaleContext = createContext<LocaleContextType | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(LANGUAGES[0])
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0])

  useEffect(() => {
    const savedLang = localStorage.getItem("buynow-language")
    const savedCur  = localStorage.getItem("buynow-currency")
    if (savedLang) { const f = LANGUAGES.find((l) => l.code === savedLang); if (f) setLanguageState(f) }
    if (savedCur)  { const f = CURRENCIES.find((c) => c.code === savedCur);  if (f) setCurrencyState(f) }
  }, [])

  function setLanguage(lang: Language) {
    setLanguageState(lang)
    localStorage.setItem("buynow-language", lang.code)
  }

  function setCurrency(cur: Currency) {
    setCurrencyState(cur)
    localStorage.setItem("buynow-currency", cur.code)
  }

  function convertPrice(nairaAmount: number): string {
    if (currency.code === "NGN") return `₦${nairaAmount.toLocaleString("en-NG")}`
    const converted = nairaAmount * currency.rate
    return `${currency.symbol}${converted.toFixed(2)}`
  }

  return (
    <LocaleContext.Provider value={{ language, currency, setLanguage, setCurrency, convertPrice }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider")
  return ctx
}
