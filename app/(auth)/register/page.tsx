"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2, ShoppingBag, Store } from "lucide-react"
import { registerSchema, type RegisterFormData } from "@/lib/validations"
import { useAuthStore } from "@/store/authStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="text-xs mt-1.5 font-medium" style={{ color: "var(--color-error)" }}>
      {message}
    </p>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

export default function RegisterPage() {
  const router = useRouter()
  const login  = useAuthStore((s) => s.login)

  const [showPassword,  setShowPassword]  = useState(false)
  const [showConfirm,   setShowConfirm]   = useState(false)
  const [isSubmitting,  setIsSubmitting]  = useState(false)
  const [serverError,   setServerError]   = useState<string | null>(null)
  const [socialLoading, setSocialLoading] = useState<"google"|"facebook"|null>(null)

  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        fullName: "", email: "", password: "",
        confirmPassword: "", role: "shopper", terms: false,
      },
    })

  const selectedRole = watch("role")

  async function onSubmit(data: RegisterFormData) {
    try {
      setIsSubmitting(true)
      setServerError(null)
      await new Promise((r) => setTimeout(r, 1500))
      login({ id: "user-new", name: data.fullName, email: data.email, role: data.role as "shopper" | "vendor" })
      router.push(data.role === "vendor" ? "/vendor" : "/dashboard")
    } catch {
      setServerError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSocialLogin(provider: "google" | "facebook") {
    setSocialLoading(provider)
    await new Promise((r) => setTimeout(r, 1500))
    login({
      id: `${provider}-user`,
      name: provider === "google" ? "Google User" : "Facebook User",
      email: `user@${provider}.com`,
      role: "shopper",
    })
    router.push("/dashboard")
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight"
          style={{ color: "var(--foreground)" }}>Create your account</h1>
        <p className="mt-1.5 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold hover:opacity-80"
            style={{ color: "var(--color-brand-600)" }}>Sign in</Link>
        </p>
      </div>

      {/* Social login */}
      <div className="flex flex-col gap-3 mb-6">
        <button onClick={() => handleSocialLogin("google")}
          disabled={!!socialLoading}
          className="flex items-center justify-center gap-3 h-12 rounded-2xl
            border-2 font-semibold text-sm transition-all hover:opacity-80
            disabled:opacity-60"
          style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
          {socialLoading === "google"
            ? <Loader2 size={18} className="animate-spin" />
            : <GoogleIcon />}
          Continue with Google
        </button>
        <button onClick={() => handleSocialLogin("facebook")}
          disabled={!!socialLoading}
          className="flex items-center justify-center gap-3 h-12 rounded-2xl
            border-2 font-semibold text-sm transition-all hover:opacity-80
            disabled:opacity-60"
          style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
          {socialLoading === "facebook"
            ? <Loader2 size={18} className="animate-spin" />
            : <FacebookIcon />}
          Continue with Facebook
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
        <span className="text-xs font-bold px-2"
          style={{ color: "var(--muted-foreground)" }}>or sign up with email</span>
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
      </div>

      {/* Role selector */}
      <div className="mb-5">
        <Label className="text-sm font-semibold mb-3 block"
          style={{ color: "var(--foreground)" }}>I want to</Label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "shopper", icon: ShoppingBag, label: "Shop",  sub: "Browse & buy" },
            { value: "vendor",  icon: Store,       label: "Sell",  sub: "Open a store" },
          ].map((opt) => (
            <button key={opt.value} type="button"
              onClick={() => setValue("role", opt.value as "shopper" | "vendor")}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2
                transition-all duration-200"
              style={{
                borderColor: selectedRole === opt.value
                  ? "var(--color-brand-600)" : "var(--border)",
                backgroundColor: selectedRole === opt.value
                  ? "var(--color-brand-50)" : "var(--card)",
              }}>
              <opt.icon size={22} style={{
                color: selectedRole === opt.value
                  ? "var(--color-brand-600)" : "var(--muted-foreground)",
              }} />
              <span className="text-sm font-bold" style={{
                color: selectedRole === opt.value
                  ? "var(--color-brand-600)" : "var(--foreground)",
              }}>{opt.label}</span>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {opt.sub}
              </span>
            </button>
          ))}
        </div>
        <FieldError message={errors.role?.message} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="fullName" className="text-sm font-semibold mb-1.5 block"
            style={{ color: "var(--foreground)" }}>Full Name</Label>
          <Input id="fullName" placeholder="Oluwatoyin Olamide"
            {...register("fullName")} className="h-12 rounded-xl"
            style={{ borderColor: errors.fullName ? "var(--color-error)" : "var(--input)" }} />
          <FieldError message={errors.fullName?.message} />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-semibold mb-1.5 block"
            style={{ color: "var(--foreground)" }}>Email Address</Label>
          <Input id="email" type="email" placeholder="you@example.com"
            {...register("email")} className="h-12 rounded-xl"
            style={{ borderColor: errors.email ? "var(--color-error)" : "var(--input)" }} />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <Label htmlFor="password" className="text-sm font-semibold mb-1.5 block"
            style={{ color: "var(--foreground)" }}>Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"}
              placeholder="Min 8 characters"
              {...register("password")} className="h-12 rounded-xl pr-12"
              style={{ borderColor: errors.password ? "var(--color-error)" : "var(--input)" }} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--muted-foreground)" }}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <FieldError message={errors.password?.message} />
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-sm font-semibold mb-1.5 block"
            style={{ color: "var(--foreground)" }}>Confirm Password</Label>
          <div className="relative">
            <Input id="confirmPassword" type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              {...register("confirmPassword")} className="h-12 rounded-xl pr-12"
              style={{ borderColor: errors.confirmPassword ? "var(--color-error)" : "var(--input)" }} />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--muted-foreground)" }}>
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <FieldError message={errors.confirmPassword?.message} />
        </div>

        <div className="flex items-start gap-3">
          <input id="terms" type="checkbox" {...register("terms")}
            className="mt-0.5 w-4 h-4 rounded cursor-pointer accent-[var(--color-brand-600)]" />
          <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer"
            style={{ color: "var(--muted-foreground)" }}>
            I agree to the{" "}
            <Link href="/terms" className="font-semibold hover:opacity-80"
              style={{ color: "var(--color-brand-600)" }}>Terms</Link>
            {" "}&{" "}
            <Link href="/privacy" className="font-semibold hover:opacity-80"
              style={{ color: "var(--color-brand-600)" }}>Privacy Policy</Link>
          </label>
        </div>
        <FieldError message={errors.terms?.message} />

        {serverError && (
          <div className="px-4 py-3 rounded-xl text-sm font-medium border"
            style={{
              backgroundColor: "color-mix(in oklch, var(--color-error) 10%, transparent)",
              borderColor: "color-mix(in oklch, var(--color-error) 30%, transparent)",
              color: "var(--color-error)",
            }}>
            {serverError}
          </div>
        )}

        <Button type="submit" disabled={isSubmitting}
          className="h-13 rounded-2xl font-bold text-base text-white shadow-md
            hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60"
          style={{ backgroundColor: "var(--color-brand-600)" }}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" /> Creating account...
            </span>
          ) : "Create Account"}
        </Button>
      </form>
    </>
  )
}
