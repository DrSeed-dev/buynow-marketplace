"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Camera, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const profileSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email:    z.string().email("Valid email required"),
  phone:    z.string().min(11, "Valid phone number required"),
  address:  z.string().optional(),
  city:     z.string().optional(),
  state:    z.string().optional(),
})

type ProfileData = z.infer<typeof profileSchema>

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="text-xs mt-1.5 font-medium" style={{ color: "var(--color-error)" }}>
      {message}
    </p>
  )
}

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saved,    setSaved]    = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Oluwatoyin Olamide",
      email:    "olamiden@example.com",
      phone:    "08058858082",
      address:  "12 Ibara Adeola CT Street",
      city:     "Abeokuta",
      state:    "Ogun",
    },
  })

  async function onSubmit(data: ProfileData) {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1500))
    console.log("Profile saved:", data)
    setIsSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex flex-col gap-8">

      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: "var(--color-brand-600)" }}>Dashboard</p>
        <h1 className="text-3xl font-black" style={{ color: "var(--foreground)" }}>
          My Profile
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

        {/* Avatar */}
        <div
          className="p-6 rounded-2xl border flex items-center gap-6"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center
                font-black text-3xl text-white"
              style={{ backgroundColor: "var(--color-brand-600)" }}>
              J
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full
                border-2 flex items-center justify-center"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                color: "var(--muted-foreground)",
              }}>
              <Camera size={13} />
            </button>
          </div>
          <div>
            <p className="font-black text-lg" style={{ color: "var(--foreground)" }}>
              Oluwatoyin Olamide 
            </p>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Member since January 2024
            </p>
          </div>
        </div>

        {/* Personal info */}
        <div
          className="p-6 rounded-2xl border"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="font-black text-base mb-5" style={{ color: "var(--foreground)" }}>
            Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label className="text-sm font-semibold mb-1.5 block"
                style={{ color: "var(--foreground)" }}>Full Name</Label>
              <Input {...register("fullName")} className="h-12 rounded-xl"
                style={{ borderColor: errors.fullName ? "var(--color-error)" : "var(--input)" }} />
              <FieldError message={errors.fullName?.message} />
            </div>

            <div>
              <Label className="text-sm font-semibold mb-1.5 block"
                style={{ color: "var(--foreground)" }}>Email Address</Label>
              <Input {...register("email")} type="email" className="h-12 rounded-xl"
                style={{ borderColor: errors.email ? "var(--color-error)" : "var(--input)" }} />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <Label className="text-sm font-semibold mb-1.5 block"
                style={{ color: "var(--foreground)" }}>Phone Number</Label>
              <Input {...register("phone")} className="h-12 rounded-xl"
                style={{ borderColor: errors.phone ? "var(--color-error)" : "var(--input)" }} />
              <FieldError message={errors.phone?.message} />
            </div>

            <div className="sm:col-span-2">
              <Label className="text-sm font-semibold mb-1.5 block"
                style={{ color: "var(--foreground)" }}>Street Address</Label>
              <Input {...register("address")} className="h-12 rounded-xl" />
            </div>

            <div>
              <Label className="text-sm font-semibold mb-1.5 block"
                style={{ color: "var(--foreground)" }}>City</Label>
              <Input {...register("city")} className="h-12 rounded-xl" />
            </div>

            <div>
              <Label className="text-sm font-semibold mb-1.5 block"
                style={{ color: "var(--foreground)" }}>State</Label>
              <Input {...register("state")} className="h-12 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Save button */}
        <Button
          type="submit"
          disabled={isSaving}
          className="h-13 rounded-2xl font-bold text-base text-white
            shadow-md hover:shadow-lg hover:-translate-y-0.5
            transition-all duration-200 disabled:opacity-60 self-start px-10"
          style={{ backgroundColor: saved ? "var(--color-success)" : "var(--color-brand-600)" }}>
          {isSaving ? (
            <span className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" /> Saving...
            </span>
          ) : saved ? (
            <span className="flex items-center gap-2">
              <Check size={18} /> Saved!
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>

      </form>
    </div>
  )
}
