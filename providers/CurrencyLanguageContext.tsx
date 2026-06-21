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
  t:            (key: string, params?: Record<string, string | number>) => string
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
  { code: "AUD", symbol: "A$",  label: "Australian Dollar",  flag: "🇦🇺", rate: 0.00095 },
]

// ─── TRANSLATIONS ─────────────────────────────────────────────
// Keys map to human-readable strings per language.
// Only the most UI-critical strings are translated for now.
// Backend integration in Phase 3 can replace this with a real i18n library.
const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.home":              "Home",
    "nav.products":          "Products",
    "nav.deals":             "Deals",
    "nav.vendors":           "Vendors",

    "products.browse":       "Browse",
    "products.allProducts":  "All Products",
    "products.noResults":    "No products found",
    "products.noResultsSub": "Try adjusting your search or filters",
    "products.filters":      "Filters",
    "products.clearAll":     "Clear all",
    "products.found":        "{count} product{plural} found",
    "products.search":       "Search products, brands, categories...",
    "products.sortBy":       "Sort by",

    "product.addToCart":     "Add to Cart",
    "product.outOfStock":    "Out of Stock",
    "product.added":         "Added!",
    "product.backToProducts":"Back to Products",
    "product.reviews":       "reviews",
    "product.inStock":       "In Stock",
    "product.lowStock":      "Only {count} left",
    "product.quantity":      "Quantity",
    "product.relatedProducts":"Related Products",
    "product.viewAll":       "View all",
    "product.save":          "Save {percent}%",
    "product.new":           "NEW",
    "product.fastDelivery":  "Fast Delivery",
    "product.securePayment": "Secure Payment",
    "product.easyReturns":   "Easy Returns",

    "cart.yourCart":         "Your Cart",
    "cart.empty":            "Your cart is empty",
    "cart.emptySub":         "Add items to your cart to get started",
    "cart.browse":           "Browse Products",
    "cart.subtotal":         "Subtotal ({count} item{plural})",
    "cart.checkout":         "Proceed to Checkout",
    "cart.continueShopping": "Continue Shopping",
    "cart.shippingNote":     "Shipping and taxes calculated at checkout.",

    "dashboard.myAccount":   "My Account",
    "dashboard.welcome":     "Welcome back",
    "dashboard.totalOrders": "Total Orders",
    "dashboard.wishlist":    "Wishlist Items",
    "dashboard.totalSpent":  "Total Spent",
    "dashboard.reviews":     "Reviews Given",
    "dashboard.recentOrders":"Recent Orders",
    "dashboard.viewAll":     "View all →",
    "dashboard.overview":    "Overview",
    "dashboard.myOrders":    "My Orders",
    "dashboard.profile":     "Profile",

    "orders.title":          "My Orders",
    "orders.orderId":        "Order ID",
    "orders.date":           "Date",
    "orders.items":          "Items",
    "orders.total":          "Total",
    "orders.status":         "Status",
    "orders.shippedTo":      "Shipped to:",
    "orders.qty":            "Qty:",
    "orders.noOrders":       "No orders yet",
    "orders.noOrdersSub":    "Your order history will appear here",

    "vendor.overview":       "Overview",
    "vendor.products":       "Products",
    "vendor.addProduct":     "Add Product",
    "vendor.analytics":      "Analytics",
    "vendor.earnings":       "Earnings",
    "vendor.storeOverview":  "Store Overview",
    "vendor.dashboard":      "Vendor Dashboard",
    "vendor.myStore":        "My Store",
    "vendor.active":         "Active",
    "vendor.myProducts":     "My Products",
    "vendor.totalRevenue":   "Total Revenue",
    "vendor.totalProducts":  "Total Products",
    "vendor.ordersReceived": "Orders Received",
    "vendor.avgRating":      "Avg. Rating",

    "earnings.title":        "Earnings & Withdrawals",
    "earnings.totalRevenue": "Total Revenue",
    "earnings.available":    "Available Balance",
    "earnings.pending":      "Pending",
    "earnings.withdrawn":    "Withdrawn",
    "earnings.requestWithdrawal": "Request Withdrawal",
    "earnings.transactions": "Transaction History",
    "earnings.withdrawHistory": "Withdrawal History",
    "earnings.noTransactions": "No transactions yet",
    "earnings.amount":       "Amount",
    "earnings.type":         "Type",
    "earnings.statusLabel":  "Status",
    "earnings.dateLabel":    "Date",
    "earnings.sale":         "Sale",
    "earnings.withdrawal":   "Withdrawal",
    "earnings.approved":     "Approved",
    "earnings.pending_w":    "Pending",
    "earnings.rejected":     "Rejected",
    "earnings.modalTitle":   "Request Withdrawal",
    "earnings.modalSub":     "Available balance:",
    "earnings.amountLabel":  "Withdrawal Amount (₦)",
    "earnings.amountPlaceholder": "Enter amount",
    "earnings.bankLabel":    "Bank Account",
    "earnings.bankPlaceholder": "e.g. Access Bank — 0123456789",
    "earnings.submit":       "Submit Request",
    "earnings.cancel":       "Cancel",
    "earnings.minError":     "Amount must be greater than zero",
    "earnings.maxError":     "Amount exceeds available balance",

    "help.support":          "Support",
    "help.title":            "Help Center",
    "help.subtitle":         "Find answers to common questions or contact our support team.",
    "help.stillNeedHelp":    "Still need help?",
    "help.availability":     "Our support team is available Mon–Sat, 8am–8pm WAT",
    "help.contactSupport":   "Contact Support",

    "footer.tagline":        "Nigeria's fastest growing multi-vendor marketplace.",
    "footer.followUs":       "Follow Us",
    "footer.downloadApp":    "Download App",
    "footer.downloadOn":     "Download on the",
    "footer.getItOn":        "Get it on",
    "footer.weAccept":       "We Accept",
    "footer.newsletter":     "Get exclusive deals in your inbox",
    "footer.newsletterSub":  "Join 50,000+ shoppers getting weekly deals and new arrivals.",
    "footer.subscribe":      "Subscribe",
    "footer.emailPlaceholder": "Enter your email address",
    "footer.rights":         "All rights reserved. Built in Nigeria 🇳🇬",


    "hero.eyebrow":          "Multi-Vendor Marketplace",
    "hero.headline1":        "Shop Smarter.",
    "hero.headline2":        "Sell Bigger.",
    "hero.subtitle":         "BuyNow connects thousands of independent vendors with millions of shoppers. Discover unique products, support real businesses, and shop with total confidence.",
    "hero.cta1":             "Start Shopping",
    "hero.cta2":             "Open Your Store",
    "hero.socialProof":      "customers trust BuyNow",

    "home.categoriesEyebrow": "What are you looking for?",
    "home.categoriesTitle":   "Shop by Category",
    "home.shoppersEyebrow":   "For Shoppers",
    "home.shoppersTitle":     "Shopping Made Simple",
    "home.browseAll":         "Browse All Products",
    "home.vendorsEyebrow":    "For Vendors",
    "home.vendorsTitle":      "Your Store. Your Rules.",
    "home.vendorsSubtitle":   "Join 800+ vendors already growing their business on BuyNow.",
    "home.startSelling":      "Start Selling Free",
    "home.learnMore":         "Learn More",
    "home.finalCtaTitle":     "Ready to find your next favourite product?",
    "home.finalCtaSubtitle":  "Create a free account, discover unique products, and support independent vendors building real businesses.",
    "home.createAccount":     "Create Free Account",
    "home.browseFirst":       "Browse First",

    "help.ordersTitle":       "Orders & Purchases",
    "help.ordersDesc":        "Track orders, cancel orders, order issues",
    "help.shippingTitle":     "Shipping & Delivery",
    "help.shippingDesc":      "Delivery times, tracking, shipping costs",
    "help.returnsTitle":      "Returns & Refunds",
    "help.returnsDesc":       "How to return items and get your money back",
    "help.paymentsTitle":     "Payments & Billing",
    "help.paymentsDesc":      "Payment methods, failed payments, receipts",
    "help.vendorSupportTitle":"Vendor Support",
    "help.vendorSupportDesc": "Setting up your store, listing products",
    "help.accountTitle":      "Account & Security",
    "help.accountDesc":       "Password, account access, privacy settings",
    "help.faqTitle":          "Frequently Asked Questions",
    "help.contactBtn":        "Contact Support",

    "status.delivered":      "Delivered",
    "status.shipped":        "Shipped",
    "status.processing":     "Processing",
    "status.pending":        "Pending",
    "status.cancelled":      "Cancelled",
    "status.refunded":       "Refunded",

    "common.back":           "Back",
    "common.viewAll":        "View all →",
    "common.loading":        "Loading...",
    "common.save":           "Save",
    "common.cancel":         "Cancel",
    "common.active":         "Active",
    "common.outOfStock":     "Out of Stock",
    "common.stock":          "Stock",
    "common.sales":          "Sales",
    "common.edit":           "Edit",
    "common.view":           "View",
    "common.delete":         "Delete",
    "common.manageAll":      "Manage all →",
    "common.yourProducts":   "Your Products",
    "common.price":          "Price",
  },

  yo: {
    "products.allProducts":  "Gbogbo Ọja",
    "products.noResults":    "Ko si ọja ti a ri",
    "products.search":       "Wa ọja, ami iyasọtọ, ẹka...",
    "product.addToCart":     "Fi si Agbọn",
    "product.outOfStock":    "Ti Pari",
    "product.backToProducts":"Pada si Ọja",
    "dashboard.welcome":     "E kaabọ",
    "cart.yourCart":         "Agbọn Rẹ",
    "cart.checkout":         "Lọ si Isanwo",
    "vendor.earnings":       "Ere ati Yiyọ",
    "earnings.title":        "Ere ati Yiyọ",
    "common.back":           "Pada",
    "common.active":         "Ṣiṣẹ",
    "common.outOfStock":     "Ti Pari",
    "hero.headline1":        "Ra Ni Ọgbọn.",
    "hero.headline2":        "Ta Ni Agbara.",
    "hero.cta1":             "Bẹrẹ Rira",
    "hero.cta2":             "Ṣii Ile-itaja Rẹ",
    "home.categoriesTitle":  "Ra nipasẹ Ẹka",
    "home.shoppersTitle":    "Rira Ti Rọrun",
    "home.browseAll":        "Wo Gbogbo Ọja",
    "home.vendorsTitle":     "Ile-itaja Rẹ. Ofin Rẹ.",
    "home.startSelling":     "Bẹrẹ Titaja Lọfẹ",
    "home.createAccount":    "Ṣẹda Akọọlẹ Lọfẹ",
    "help.faqTitle":         "Awọn Ibeere Ti A Saba Beere",
    "help.contactBtn":       "Kan si Atilẹyin",
  },

  ha: {
    "products.allProducts":  "Dukan Kaya",
    "products.noResults":    "Ba a sami kaya ba",
    "product.addToCart":     "Ƙara zuwa Kwandon",
    "product.outOfStock":    "An Kare",
    "product.backToProducts":"Koma ga Kayayyaki",
    "dashboard.welcome":     "Barka da zuwa",
    "cart.yourCart":         "Kwandon Ka",
    "cart.checkout":         "Ci gaba zuwa Biyan Kuɗi",
    "vendor.earnings":       "Kuɗaɗen Shiga",
    "earnings.title":        "Kuɗaɗen Shiga da Cirewa",
    "common.back":           "Komawa",
    "common.active":         "Aiki",
    "common.outOfStock":     "An Kare",
    "hero.headline1":        "Sayo Da Hankali.",
    "hero.headline2":        "Sayar Da Girma.",
    "hero.cta1":             "Fara Saya",
    "hero.cta2":             "Bude Kantin Ka",
    "home.categoriesTitle":  "Saya ta Rukunin",
    "home.shoppersTitle":    "Sayan da Ya Sauƙaƙa",
    "home.browseAll":        "Duba Dukan Kaya",
    "home.vendorsTitle":     "Kantin Ka. Ka Yi Mulki.",
    "home.startSelling":     "Fara Sayarwa Kyauta",
    "home.createAccount":    "Ƙirƙiri Asusun Kyauta",
    "help.faqTitle":         "Tambayoyin Da Ake Yawan Yi",
    "help.contactBtn":       "Tuntuɓi Taimako",
  },

  ig: {
    "products.allProducts":  "Ngwaahịa Niile",
    "products.noResults":    "Achọtabeghị ngwaahịa",
    "product.addToCart":     "Tinye na Ogbo",
    "product.outOfStock":    "Afọ Emechara",
    "product.backToProducts":"Laghachi na Ngwaahịa",
    "dashboard.welcome":     "Nnọọ ọzọ",
    "cart.yourCart":         "Ogbo Gị",
    "cart.checkout":         "Gaa na Ikwu Ụgwọ",
    "vendor.earnings":       "Ọ Nwetara",
    "earnings.title":        "Ego Nwetara na Iwepụ",
    "common.back":           "Laghachi",
    "common.active":         "Na-arụ ọrụ",
    "common.outOfStock":     "Afọ Emechara",
    "hero.headline1":        "Zụọ Ihe Ọzụzụ.",
    "hero.headline2":        "Ree Ihe Ukwu.",
    "hero.cta1":             "Bido Ịzụ",
    "hero.cta2":             "Mepee Ụlọ Ahịa Gị",
    "home.categoriesTitle":  "Zụọ site n'Udi",
    "home.shoppersTitle":    "Ịzụ Ahịa Dị Mfe",
    "home.browseAll":        "Lee Ngwaahịa Niile",
    "home.vendorsTitle":     "Ụlọ Ahịa Gị. Iwu Gị.",
    "home.startSelling":     "Bido Ire Ahịa N'efu",
    "home.createAccount":    "Mepụta Akaụntụ N'efu",
    "help.faqTitle":         "Ajụjụ A na-ajụkarị",
    "help.contactBtn":       "Kpọtụrụ Nkwado",
  },

  fr: {
    "products.allProducts":  "Tous les Produits",
    "products.noResults":    "Aucun produit trouvé",
    "products.search":       "Rechercher produits, marques, catégories...",
    "product.addToCart":     "Ajouter au Panier",
    "product.outOfStock":    "Rupture de stock",
    "product.backToProducts":"Retour aux Produits",
    "dashboard.welcome":     "Bon retour",
    "cart.yourCart":         "Votre Panier",
    "cart.empty":            "Votre panier est vide",
    "cart.checkout":         "Passer à la Caisse",
    "vendor.earnings":       "Revenus",
    "earnings.title":        "Revenus et Retraits",
    "common.back":           "Retour",
    "common.active":         "Actif",
    "common.outOfStock":     "Rupture de stock",
    "hero.headline1":        "Achetez Plus Intelligemment.",
    "hero.headline2":        "Vendez Plus Grand.",
    "hero.cta1":             "Commencer les achats",
    "hero.cta2":             "Ouvrir votre boutique",
    "home.categoriesTitle":  "Acheter par Catégorie",
    "home.shoppersTitle":    "Des achats simplifiés",
    "home.browseAll":        "Parcourir tous les produits",
    "home.vendorsTitle":     "Votre Boutique. Vos Règles.",
    "home.startSelling":     "Commencer à vendre gratuitement",
    "home.createAccount":    "Créer un compte gratuit",
    "help.faqTitle":         "Questions Fréquemment Posées",
    "help.contactBtn":       "Contacter le support",
  },
}

// Resolve a translation key for the given language code,
// falling back to English if the key isn't translated yet.
function resolveTranslation(
  langCode: string,
  key: string,
  params?: Record<string, string | number>
): string {
  const langMap   = translations[langCode] ?? {}
  const fallback  = translations["en"] ?? {}
  let result      = langMap[key] ?? fallback[key] ?? key

  // Simple param interpolation: replace {param} with values
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      result = result.replace(new RegExp(`\\{${k}\\}`, "g"), String(v))
    })
  }

  return result
}

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

  function t(key: string, params?: Record<string, string | number>): string {
    return resolveTranslation(language.code, key, params)
  }

  return (
    <LocaleContext.Provider value={{ language, currency, setLanguage, setCurrency, convertPrice, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider")
  return ctx
}
