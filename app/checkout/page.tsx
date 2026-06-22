"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  ChevronRight, ChevronLeft, Check,
  MapPin, CreditCard, PackageCheck, Loader2
} from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { formatNaira } from "@/lib/constants"
import { PageWrapper } from "@/components/common/PageWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ─── SCHEMAS ──────────────────────────────────────────────────
const shippingSchema = z.object({
  fullName:  z.string().min(2, "Full name is required"),
  email:     z.string().email("Valid email required"),
  phone:     z.string().min(11, "Valid Nigerian phone number required"),
  address:   z.string().min(5, "Street address is required"),
  city:      z.string().min(2, "City is required"),
  state:     z.string().min(2, "State is required"),
})

const paymentSchema = z.object({
  cardName:   z.string().min(2, "Name on card is required"),
  cardNumber: z.string().min(16, "Valid card number required").max(19),
  expiry:     z.string().min(5, "Expiry date required"),
  cvv:        z.string().min(3, "CVV required").max(4),
})

type ShippingData = z.infer<typeof shippingSchema>
type PaymentData  = z.infer<typeof paymentSchema>

// ─── STEPS CONFIG ─────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Shipping",  icon: MapPin },
  { id: 2, label: "Payment",   icon: CreditCard },
  { id: 3, label: "Confirm",   icon: PackageCheck },
]

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue",
  "Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT",
  "Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi",
  "Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo",
  "Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
]

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="text-xs mt-1.5 font-medium" style={{ color: "var(--color-error)" }}>
      {message}
    </p>
  )
}

export default function CheckoutPage() {
  const [step,         setStep]         = useState(1)
  const [shippingData, setShippingData] = useState<ShippingData | null>(null)
  const [isPlacing,    setIsPlacing]    = useState(false)
  const [orderPlaced,  setOrderPlaced]  = useState(false)
  const [orderNumber,  setOrderNumber]  = useState("")

  const items      = useCartStore((s) => s.items)
  const totalPrice = useCartStore((s) => s.totalPrice())
  const totalItems = useCartStore((s) => s.totalItems())
  const clearCart  = useCartStore((s) => s.clearCart)

  const shippingFee = totalPrice > 50000 ? 0 : 2500
  const grandTotal  = totalPrice + shippingFee

  const shippingForm = useForm<ShippingData>({
    resolver: zodResolver(shippingSchema),
  })

  const paymentForm = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
  })

  async function handlePlaceOrder() {
    setIsPlacing(true)
    await new Promise((r) => setTimeout(r, 2000))
    const num = `BN-${Date.now().toString().slice(-8)}`
    setOrderNumber(num)
    clearCart()
    setOrderPlaced(true)
    setIsPlacing(false)
  }

  // ── ORDER SUCCESS ────────────────────────────────────────
  if (orderPlaced) {
    return (
      <PageWrapper className="py-20">
        <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: "var(--color-success)" }}
          >
            <Check size={44} color="white" strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-3xl font-black" style={{ color: "var(--foreground)" }}>
              Order Placed!
            </h1>
            <p className="mt-2 text-base" style={{ color: "var(--muted-foreground)" }}>
              Thank you for shopping on BuyNow Marketplace.
            </p>
          </div>
          <div
            className="w-full p-6 rounded-2xl border text-left flex flex-col gap-3"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--muted-foreground)" }}>Order number</span>
              <span className="font-black" style={{ color: "var(--color-brand-600)" }}>
                {orderNumber}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--muted-foreground)" }}>Amount paid</span>
              <span className="font-bold" style={{ color: "var(--foreground)" }}>
                {formatNaira(grandTotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--muted-foreground)" }}>Estimated delivery</span>
              <span className="font-bold" style={{ color: "var(--foreground)" }}>
                3 – 5 business days
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link href="/dashboard/orders"
              className="flex-1 inline-flex items-center justify-center h-12 rounded-2xl font-bold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--color-brand-600)" }}>Track Order</Link>
            <Link href="/products"
              className="flex-1 inline-flex items-center justify-center h-12 rounded-2xl font-bold border-2 transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>Continue Shopping</Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  // ── EMPTY CART ───────────────────────────────────────────
  if (items.length === 0) {
    return (
      <PageWrapper className="py-20 text-center">
        <h1 className="text-2xl font-black mb-4" style={{ color: "var(--foreground)" }}>
          Your cart is empty
        </h1>
        <Link href="/products"
          className="inline-flex items-center justify-center rounded-2xl font-bold text-white px-8 h-12 transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--color-brand-600)" }}>Browse Products</Link>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper className="py-8">

      {/* Page title */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: "var(--color-brand-600)" }}>Checkout</p>
        <h1 className="text-3xl font-black" style={{ color: "var(--foreground)" }}>
          Complete Your Order
        </h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center
                  font-black text-sm transition-all duration-300"
                style={{
                  backgroundColor: step > s.id
                    ? "var(--color-success)"
                    : step === s.id
                    ? "var(--color-brand-600)"
                    : "var(--muted)",
                  color: step >= s.id ? "white" : "var(--muted-foreground)",
                }}
              >
                {step > s.id ? <Check size={18} strokeWidth={3} /> : <s.icon size={16} />}
              </div>
              <span
                className="text-xs font-bold hidden sm:block"
                style={{
                  color: step >= s.id ? "var(--foreground)" : "var(--muted-foreground)",
                }}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 h-0.5 mx-2 transition-colors duration-300"
                style={{
                  backgroundColor: step > s.id
                    ? "var(--color-success)"
                    : "var(--border)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — Form area */}
        <div className="lg:col-span-2">

          {/* ── STEP 1: SHIPPING ── */}
          {step === 1 && (
            <form
              onSubmit={shippingForm.handleSubmit((data) => {
                setShippingData(data)
                setStep(2)
              })}
              className="flex flex-col gap-5"
            >
              <div
                className="p-6 rounded-2xl border"
                style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
              >
                <h2 className="font-black text-lg mb-5" style={{ color: "var(--foreground)" }}>
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "var(--foreground)" }}>Full Name</Label>
                    <Input {...shippingForm.register("fullName")}
                      placeholder="Oluwatoyin Olamide" className="h-12 rounded-xl"
                      style={{ borderColor: shippingForm.formState.errors.fullName ? "var(--color-error)" : "var(--input)" }} />
                    <FieldError message={shippingForm.formState.errors.fullName?.message} />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "var(--foreground)" }}>Email</Label>
                    <Input {...shippingForm.register("email")}
                      type="email" placeholder="you@example.com" className="h-12 rounded-xl"
                      style={{ borderColor: shippingForm.formState.errors.email ? "var(--color-error)" : "var(--input)" }} />
                    <FieldError message={shippingForm.formState.errors.email?.message} />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "var(--foreground)" }}>Phone Number</Label>
                    <Input {...shippingForm.register("phone")}
                      placeholder="08058858082" className="h-12 rounded-xl"
                      style={{ borderColor: shippingForm.formState.errors.phone ? "var(--color-error)" : "var(--input)" }} />
                    <FieldError message={shippingForm.formState.errors.phone?.message} />
                  </div>

                  <div className="sm:col-span-2">
                    <Label className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "var(--foreground)" }}>Street Address</Label>
                    <Input {...shippingForm.register("address")}
                      placeholder="12 Ibara Adeola CT Street" className="h-12 rounded-xl"
                      style={{ borderColor: shippingForm.formState.errors.address ? "var(--color-error)" : "var(--input)" }} />
                    <FieldError message={shippingForm.formState.errors.address?.message} />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "var(--foreground)" }}>City</Label>
                    <Input {...shippingForm.register("city")}
                      placeholder="Abeokuta" className="h-12 rounded-xl"
                      style={{ borderColor: shippingForm.formState.errors.city ? "var(--color-error)" : "var(--input)" }} />
                    <FieldError message={shippingForm.formState.errors.city?.message} />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "var(--foreground)" }}>State</Label>
                    <select {...shippingForm.register("state")}
                      className="w-full h-12 px-3 rounded-xl border text-sm"
                      style={{
                        backgroundColor: "var(--card)",
                        borderColor: shippingForm.formState.errors.state ? "var(--color-error)" : "var(--input)",
                        color: "var(--foreground)",
                      }}>
                      <option value="">Select state</option>
                      {NIGERIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <FieldError message={shippingForm.formState.errors.state?.message} />
                  </div>
                </div>
              </div>

              <Button type="submit"
                className="h-14 rounded-2xl font-bold text-base text-white
                  shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                style={{ backgroundColor: "var(--color-brand-600)" }}>
                Continue to Payment
                <ChevronRight size={18} className="ml-2" />
              </Button>
            </form>
          )}

          {/* ── STEP 2: PAYMENT ── */}
          {step === 2 && (
            <form
              onSubmit={paymentForm.handleSubmit(() => setStep(3))}
              className="flex flex-col gap-5"
            >
              <div
                className="p-6 rounded-2xl border"
                style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
              >
                <h2 className="font-black text-lg mb-5" style={{ color: "var(--foreground)" }}>
                  Payment Details
                </h2>

                {/* Card preview */}
                <div
                  className="relative h-44 rounded-2xl p-6 mb-6 overflow-hidden"
                  style={{ background: "linear-gradient(135deg, var(--color-brand-700), var(--color-brand-500))" }}
                >
                  <div className="absolute top-4 right-5 opacity-30 text-white font-black text-2xl">
                    VISA
                  </div>
                  <div className="flex flex-col justify-end h-full gap-2">
                    <p className="text-white/60 text-xs font-bold tracking-widest uppercase">
                      Card Number
                    </p>
                    <p className="text-white font-black text-xl tracking-widest">
                      •••• •••• •••• 0000
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-[10px] uppercase tracking-wider">
                          Card Holder
                        </p>
                        <p className="text-white font-bold text-sm">
                          {paymentForm.watch("cardName") || "YOUR NAME"}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/60 text-[10px] uppercase tracking-wider">
                          Expires
                        </p>
                        <p className="text-white font-bold text-sm">
                          {paymentForm.watch("expiry") || "MM/YY"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "var(--foreground)" }}>Name on Card</Label>
                    <Input {...paymentForm.register("cardName")}
                      placeholder="Oluwatoyin Olamide" className="h-12 rounded-xl"
                      style={{ borderColor: paymentForm.formState.errors.cardName ? "var(--color-error)" : "var(--input)" }} />
                    <FieldError message={paymentForm.formState.errors.cardName?.message} />
                  </div>

                  <div className="sm:col-span-2">
                    <Label className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "var(--foreground)" }}>Card Number</Label>
                    <Input {...paymentForm.register("cardNumber")}
                      placeholder="0000 0000 0000 0000" className="h-12 rounded-xl"
                      style={{ borderColor: paymentForm.formState.errors.cardNumber ? "var(--color-error)" : "var(--input)" }} />
                    <FieldError message={paymentForm.formState.errors.cardNumber?.message} />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "var(--foreground)" }}>Expiry Date</Label>
                    <Input {...paymentForm.register("expiry")}
                      placeholder="MM/YY" className="h-12 rounded-xl"
                      style={{ borderColor: paymentForm.formState.errors.expiry ? "var(--color-error)" : "var(--input)" }} />
                    <FieldError message={paymentForm.formState.errors.expiry?.message} />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "var(--foreground)" }}>CVV</Label>
                    <Input {...paymentForm.register("cvv")}
                      placeholder="123" type="password" className="h-12 rounded-xl"
                      style={{ borderColor: paymentForm.formState.errors.cvv ? "var(--color-error)" : "var(--input)" }} />
                    <FieldError message={paymentForm.formState.errors.cvv?.message} />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline"
                  onClick={() => setStep(1)}
                  className="h-14 px-6 rounded-2xl font-bold border-2">
                  <ChevronLeft size={18} className="mr-1" /> Back
                </Button>
                <Button type="submit"
                  className="flex-1 h-14 rounded-2xl font-bold text-base text-white
                    shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  style={{ backgroundColor: "var(--color-brand-600)" }}>
                  Review Order <ChevronRight size={18} className="ml-2" />
                </Button>
              </div>
            </form>
          )}

          {/* ── STEP 3: CONFIRM ── */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div
                className="p-6 rounded-2xl border"
                style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
              >
                <h2 className="font-black text-lg mb-5" style={{ color: "var(--foreground)" }}>
                  Review Your Order
                </h2>

                {/* Shipping summary */}
                {shippingData && (
                  <div className="mb-6 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                        Shipping To
                      </p>
                      <button onClick={() => setStep(1)}
                        className="text-xs font-semibold hover:opacity-70"
                        style={{ color: "var(--color-brand-600)" }}>
                        Edit
                      </button>
                    </div>
                    <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      {shippingData.fullName} · {shippingData.phone}
                    </p>
                    <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      {shippingData.address}, {shippingData.city}, {shippingData.state}
                    </p>
                  </div>
                )}

                {/* Items */}
                <div className="flex flex-col gap-4">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3 items-center">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={product.images[0]} alt={product.name}
                          fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate"
                          style={{ color: "var(--foreground)" }}>{product.name}</p>
                        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                          Qty: {quantity}
                        </p>
                      </div>
                      <p className="text-sm font-black flex-shrink-0"
                        style={{ color: "var(--color-brand-600)" }}>
                        {formatNaira(product.price * quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline"
                  onClick={() => setStep(2)}
                  className="h-14 px-6 rounded-2xl font-bold border-2">
                  <ChevronLeft size={18} className="mr-1" /> Back
                </Button>
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isPlacing}
                  className="flex-1 h-14 rounded-2xl font-bold text-base text-white
                    shadow-md hover:shadow-lg transition-all disabled:opacity-60"
                  style={{ backgroundColor: "var(--color-brand-600)" }}>
                  {isPlacing ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" />
                      Placing Order...
                    </span>
                  ) : (
                    <>Place Order · {formatNaira(grandTotal)}</>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right — Order summary */}
        <div>
          <div
            className="p-5 rounded-2xl border sticky top-24"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
          >
            <h3 className="font-black mb-4" style={{ color: "var(--foreground)" }}>
              Order Summary
            </h3>

            <div className="flex flex-col gap-3 mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="truncate mr-2" style={{ color: "var(--muted-foreground)" }}>
                    {product.name} × {quantity}
                  </span>
                  <span className="font-bold flex-shrink-0"
                    style={{ color: "var(--foreground)" }}>
                    {formatNaira(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex flex-col gap-2"
              style={{ borderColor: "var(--border)" }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--muted-foreground)" }}>
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-bold" style={{ color: "var(--foreground)" }}>
                  {formatNaira(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--muted-foreground)" }}>Shipping</span>
                <span className="font-bold"
                  style={{ color: shippingFee === 0 ? "var(--color-success)" : "var(--foreground)" }}>
                  {shippingFee === 0 ? "FREE" : formatNaira(shippingFee)}
                </span>
              </div>
              {shippingFee === 0 && (
                <p className="text-xs" style={{ color: "var(--color-success)" }}>
                  Free delivery on orders above ₦50,000
                </p>
              )}
              <div className="border-t pt-3 mt-1 flex justify-between"
                style={{ borderColor: "var(--border)" }}>
                <span className="font-black" style={{ color: "var(--foreground)" }}>Total</span>
                <span className="font-black text-lg"
                  style={{ color: "var(--color-brand-600)" }}>
                  {formatNaira(grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
