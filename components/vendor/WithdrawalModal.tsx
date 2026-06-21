"use client"

import { useState } from "react"
import { X, AlertCircle } from "lucide-react"
import { useLocale } from "@/providers/CurrencyLanguageContext"
import { cn } from "@/lib/utils"

interface WithdrawalModalProps {
  availableBalance: number
  onClose:    () => void
  onSubmit:   (amount: number, bank: string) => void
}

export function WithdrawalModal({
  availableBalance,
  onClose,
  onSubmit,
}: WithdrawalModalProps) {
  const { convertPrice, t } = useLocale()
  const [amount, setAmount] = useState("")
  const [bank,   setBank]   = useState("")
  const [error,  setError]  = useState("")

  function handleSubmit() {
    const num = Number(amount)
    if (!num || num <= 0) {
      setError(t("earnings.minError"))
      return
    }
    if (num > availableBalance) {
      setError(t("earnings.maxError"))
      return
    }
    onSubmit(num, bank)
    onClose()
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center
        justify-center p-0 sm:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      {/* Modal panel */}
      <div
        className="w-full max-w-md mx-4 rounded-3xl p-6
          flex flex-col gap-5"
        style={{ backgroundColor: "var(--card)" }}
        // Prevent backdrop click from closing when clicking inside modal
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black" style={{ color: "var(--foreground)" }}>
            {t("earnings.modalTitle")}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Available balance */}
        <div
          className="p-4 rounded-2xl flex items-center justify-between"
          style={{ backgroundColor: "var(--muted)" }}
        >
          <span className="text-sm font-semibold" style={{ color: "var(--muted-foreground)" }}>
            {t("earnings.modalSub")}
          </span>
          <span className="text-base font-black" style={{ color: "var(--color-brand-600)" }}>
            {convertPrice(availableBalance)}
          </span>
        </div>

        {/* Amount input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
            {t("earnings.amountLabel")}
          </label>
          <input
            type="number"
            min={1}
            max={availableBalance}
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setError("") }}
            placeholder={t("earnings.amountPlaceholder")}
            className="h-12 px-4 rounded-xl border text-sm font-medium"
            style={{
              backgroundColor: "var(--background)",
              borderColor: error ? "var(--color-error)" : "var(--border)",
              color: "var(--foreground)",
            }}
          />
          {error && (
            <p className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: "var(--color-error)" }}>
              <AlertCircle size={12} /> {error}
            </p>
          )}
        </div>

        {/* Bank input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
            {t("earnings.bankLabel")}
          </label>
          <input
            type="text"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            placeholder={t("earnings.bankPlaceholder")}
            className="h-12 px-4 rounded-xl border text-sm font-medium"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-2xl border text-sm font-bold"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            {t("earnings.cancel")}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!amount || !bank}
            className={cn(
              "flex-1 h-12 rounded-2xl text-sm font-bold text-white",
              "transition-all duration-200",
              (!amount || !bank) ? "opacity-40 cursor-not-allowed" : "hover:opacity-90"
            )}
            style={{ backgroundColor: "var(--color-brand-600)" }}
          >
            {t("earnings.submit")}
          </button>
        </div>
      </div>
    </div>
  )
}
