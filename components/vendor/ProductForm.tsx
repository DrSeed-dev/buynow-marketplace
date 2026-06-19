// components/vendor/ProductForm.tsx
// Reusable form for adding or editing a product.
// Used in both vendor/products/new and vendor/products/[id]/edit

"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Upload, X, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CATEGORIES } from "@/lib/constants"

const productSchema = z.object({
  name:          z.string().min(3, "Product name is required"),
  description:   z.string().min(20, "Description must be at least 20 characters"),
  price:         z.string().min(1, "Price is required"),
  originalPrice: z.string().optional(),
  category:      z.string().min(1, "Category is required"),
  stock:         z.string().min(1, "Stock quantity is required"),
  tags:          z.string().optional(),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  // Pass existing product data to pre-fill the form for editing
  defaultValues?: Partial<ProductFormData>
  onSubmit: (data: ProductFormData, images: string[]) => Promise<void>
  submitLabel?: string
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="text-xs mt-1.5 font-medium" style={{ color: "var(--color-error)" }}>
      {message}
    </p>
  )
}

export function ProductForm({
  defaultValues,
  onSubmit,
  submitLabel = "Publish Product",
}: ProductFormProps) {
  const [isSaving,  setIsSaving]  = useState(false)
  const [saved,     setSaved]     = useState(false)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const { register, handleSubmit, formState: { errors } } =
    useForm<ProductFormData>({
      resolver: zodResolver(productSchema),
      defaultValues: { category: "", stock: "1", ...defaultValues },
    })

  async function handleFormSubmit(data: ProductFormData) {
    setIsSaving(true)
    await onSubmit(data, imagePreviews)
    setIsSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6">

      {/* Basic info */}
      <div className="p-6 rounded-2xl border flex flex-col gap-5"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <h2 className="font-black text-base" style={{ color: "var(--foreground)" }}>
          Product Details
        </h2>

        <div>
          <Label className="text-sm font-semibold mb-1.5 block"
            style={{ color: "var(--foreground)" }}>Product Name</Label>
          <Input {...register("name")} placeholder="e.g. Premium Ankara Fabric 6 Yards"
            className="h-12 rounded-xl"
            style={{ borderColor: errors.name ? "var(--color-error)" : "var(--input)" }} />
          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <Label className="text-sm font-semibold mb-1.5 block"
            style={{ color: "var(--foreground)" }}>Description</Label>
          <Textarea {...register("description")}
            placeholder="Describe your product clearly..."
            className="rounded-xl min-h-[120px] resize-none"
            style={{ borderColor: errors.description ? "var(--color-error)" : "var(--input)" }} />
          <FieldError message={errors.description?.message} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-semibold mb-1.5 block"
              style={{ color: "var(--foreground)" }}>Price (₦)</Label>
            <Input {...register("price")} type="number" placeholder="8500"
              className="h-12 rounded-xl"
              style={{ borderColor: errors.price ? "var(--color-error)" : "var(--input)" }} />
            <FieldError message={errors.price?.message} />
          </div>
          <div>
            <Label className="text-sm font-semibold mb-1.5 block"
              style={{ color: "var(--foreground)" }}>Original Price (₦)</Label>
            <Input {...register("originalPrice")} type="number" placeholder="Optional"
              className="h-12 rounded-xl" />
          </div>
          <div>
            <Label className="text-sm font-semibold mb-1.5 block"
              style={{ color: "var(--foreground)" }}>Stock Quantity</Label>
            <Input {...register("stock")} type="number" placeholder="50"
              className="h-12 rounded-xl"
              style={{ borderColor: errors.stock ? "var(--color-error)" : "var(--input)" }} />
            <FieldError message={errors.stock?.message} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold mb-1.5 block"
              style={{ color: "var(--foreground)" }}>Category</Label>
            <select {...register("category")}
              className="w-full h-12 px-3 rounded-xl border text-sm"
              style={{
                backgroundColor: "var(--card)",
                borderColor: errors.category ? "var(--color-error)" : "var(--input)",
                color: "var(--foreground)",
              }}>
              <option value="">Select a category</option>
              {CATEGORIES.filter((c) => c.value !== "all").map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <FieldError message={errors.category?.message} />
          </div>
          <div>
            <Label className="text-sm font-semibold mb-1.5 block"
              style={{ color: "var(--foreground)" }}>Tags</Label>
            <Input {...register("tags")}
              placeholder="ankara, fabric (comma separated)"
              className="h-12 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="p-6 rounded-2xl border flex flex-col gap-4"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <div>
          <h2 className="font-black text-base" style={{ color: "var(--foreground)" }}>
            Product Images
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Upload clear, well-lit photos. First image is the main display photo.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {imagePreviews.map((src, i) => (
            <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border"
              style={{ borderColor: "var(--border)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button type="button"
                onClick={() => setImagePreviews((prev) => prev.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 w-5 h-5 rounded-full
                  flex items-center justify-center text-white"
                style={{ backgroundColor: "var(--color-error)" }}>
                <X size={11} />
              </button>
            </div>
          ))}
          {imagePreviews.length < 5 && (
            <label className="w-24 h-24 rounded-xl border-2 border-dashed
              flex flex-col items-center justify-center gap-1 cursor-pointer hover:opacity-70"
              style={{ borderColor: "var(--color-brand-300)", color: "var(--color-brand-600)" }}>
              <Upload size={20} />
              <span className="text-xs font-semibold">Add Photo</span>
              <input type="file" accept="image/*" multiple className="hidden"
                onChange={handleImageChange} />
            </label>
          )}
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isSaving}
        className="h-14 rounded-2xl font-bold text-base text-white shadow-md
          hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60
          self-start px-12"
        style={{ backgroundColor: saved ? "var(--color-success)" : "var(--color-brand-600)" }}>
        {isSaving ? (
          <span className="flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" /> Publishing...
          </span>
        ) : saved ? (
          <span className="flex items-center gap-2">
            <Check size={18} /> Published!
          </span>
        ) : submitLabel}
      </Button>

    </form>
  )
}
