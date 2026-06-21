"use client"

import { useState } from "react"
import {
  TrendingUp, Wallet, Clock, ArrowDownLeft,
  ArrowUpRight, CheckCircle, XCircle
} from "lucide-react"
import { useLocale } from "@/providers/CurrencyLanguageContext"
import { WithdrawalModal } from "@/components/vendor/WithdrawalModal"

// Mock data — replace with real API in backend phase
const EARNINGS_SUMMARY = {
  totalRevenue:    1240000,
  availableBalance: 487500,
  pendingBalance:    64000,
  withdrawn:        688500,
}

type TxType   = "sale" | "withdrawal"
type TxStatus = "approved" | "pending" | "rejected"

interface Transaction {
  id:     string
  type:   TxType
  label:  string
  amount: number
  date:   string
  status: TxStatus
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "TX001", type: "sale",       label: "Ankara Fabric × 2",         amount:  17000, date: "Jun 18, 2026", status: "approved" },
  { id: "TX002", type: "withdrawal", label: "GTBank — 0123456789",        amount: 100000, date: "Jun 15, 2026", status: "approved" },
  { id: "TX003", type: "sale",       label: "Senator Agbada (Custom)",    amount:  65000, date: "Jun 14, 2026", status: "approved" },
  { id: "TX004", type: "withdrawal", label: "Access Bank — 9876543210",   amount:  50000, date: "Jun 12, 2026", status: "pending"  },
  { id: "TX005", type: "sale",       label: "Leather Palm Slippers × 3",  amount:  22500, date: "Jun 10, 2026", status: "approved" },
  { id: "TX006", type: "withdrawal", label: "First Bank — 1122334455",    amount:  25000, date: "Jun 8, 2026",  status: "rejected" },
  { id: "TX007", type: "sale",       label: "Nigeria Food Bundle",        amount:   8500, date: "Jun 6, 2026",  status: "approved" },
  { id: "TX008", type: "sale",       label: "Aba Leather Shoes",          amount:  15500, date: "Jun 3, 2026",  status: "approved" },
]

const statusMeta: Record<TxStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  approved: { label: "Approved", color: "#22c55e", bg: "#f0fdf4", icon: CheckCircle },
  pending:  { label: "Pending",  color: "#f59e0b", bg: "#fffbeb", icon: Clock       },
  rejected: { label: "Rejected", color: "#ef4444", bg: "#fef2f2", icon: XCircle     },
}

export default function EarningsPage() {
  const { convertPrice, t } = useLocale()
  const [showModal,      setShowModal]      = useState(false)
  const [transactions,   setTransactions]   = useState<Transaction[]>(MOCK_TRANSACTIONS)
  const [availableBalance, setAvailableBalance] = useState(EARNINGS_SUMMARY.availableBalance)

  const overviewCards = [
    {
      label: t("earnings.totalRevenue"),
      value: convertPrice(EARNINGS_SUMMARY.totalRevenue),
      icon: TrendingUp,
      color: "#22c55e", bg: "#f0fdf4",
    },
    {
      label: t("earnings.available"),
      value: convertPrice(availableBalance),
      icon: Wallet,
      color: "#6366f1", bg: "#eef2ff",
    },
    {
      label: t("earnings.pending"),
      value: convertPrice(EARNINGS_SUMMARY.pendingBalance),
      icon: Clock,
      color: "#f59e0b", bg: "#fffbeb",
    },
    {
      label: t("earnings.withdrawn"),
      value: convertPrice(EARNINGS_SUMMARY.withdrawn),
      icon: ArrowUpRight,
      color: "#ec4899", bg: "#fdf2f8",
    },
  ]

  function handleWithdrawalSubmit(amount: number, bank: string) {
    const newTx: Transaction = {
      id:     `TX${String(transactions.length + 1).padStart(3, "0")}`,
      type:   "withdrawal",
      label:  bank,
      amount,
      date:   new Date().toLocaleDateString("en-NG", {
        day: "numeric", month: "short", year: "numeric"
      }),
      status: "pending",
    }
    setTransactions([newTx, ...transactions])
    setAvailableBalance((prev) => prev - amount)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: "var(--color-brand-600)" }}>
            {t("vendor.earnings")}
          </p>
          <h1 className="text-2xl sm:text-3xl font-black"
            style={{ color: "var(--foreground)" }}>
            {t("earnings.title")}
          </h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 h-11 px-5 rounded-2xl
            font-bold text-sm text-white shadow-md w-full sm:w-auto
            hover:-translate-y-0.5 transition-all duration-200"
          style={{ backgroundColor: "var(--color-brand-600)" }}
        >
          <ArrowDownLeft size={16} />
          {t("earnings.requestWithdrawal")}
        </button>
      </div>

      {/* Overview cards — 2 col mobile, 4 col desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {overviewCards.map((card) => (
          <div key={card.label}
            className="p-4 rounded-2xl border flex flex-col gap-3"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: card.bg }}>
              <card.icon size={18} color={card.color} />
            </div>
            <div>
              <p className="text-base sm:text-xl font-black"
                style={{ color: "var(--foreground)" }}>{card.value}</p>
              <p className="text-xs font-medium"
                style={{ color: "var(--muted-foreground)" }}>{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction history */}
      <div className="rounded-2xl border overflow-hidden"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>

        <div className="p-4 sm:p-5 border-b"
          style={{ borderColor: "var(--border)" }}>
          <h2 className="font-black text-base sm:text-lg"
            style={{ color: "var(--foreground)" }}>{t("earnings.transactions")}</h2>
        </div>

        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Wallet size={32} style={{ color: "var(--muted-foreground)" }} />
            <p className="font-bold text-sm" style={{ color: "var(--muted-foreground)" }}>
              {t("earnings.noTransactions")}
            </p>
          </div>
        ) : (
          <>
            {/* Mobile card list */}
            <div className="flex flex-col divide-y sm:hidden"
              style={{ borderColor: "var(--border)" }}>
              {transactions.map((tx) => {
                const meta  = statusMeta[tx.status]
                const isSale = tx.type === "sale"
                return (
                  <div key={tx.id} className="p-4 flex items-center gap-3">
                    {/* Type icon */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: isSale ? "#f0fdf4" : "#eef2ff" }}>
                      {isSale
                        ? <ArrowDownLeft size={18} color="#22c55e" />
                        : <ArrowUpRight  size={18} color="#6366f1" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate"
                        style={{ color: "var(--foreground)" }}>{tx.label}</p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        {tx.date}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`text-sm font-black ${isSale ? "" : ""}`}
                        style={{ color: isSale ? "#22c55e" : "#ef4444" }}>
                        {isSale ? "+" : "-"}{convertPrice(tx.amount)}
                      </span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5
                        rounded-full text-[10px] font-bold"
                        style={{ backgroundColor: meta.bg, color: meta.color }}>
                        <meta.icon size={9} />
                        {meta.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "var(--muted)" }}>
                    {[
                      t("earnings.type"),
                      t("earnings.amount"),
                      t("earnings.dateLabel"),
                      t("earnings.statusLabel"),
                    ].map((h) => (
                      <th key={h}
                        className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider"
                        style={{ color: "var(--muted-foreground)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => {
                    const meta   = statusMeta[tx.status]
                    const isSale = tx.type === "sale"
                    return (
                      <tr key={tx.id} className="border-t"
                        style={{ borderColor: "var(--border)" }}>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: isSale ? "#f0fdf4" : "#eef2ff" }}>
                              {isSale
                                ? <ArrowDownLeft size={15} color="#22c55e" />
                                : <ArrowUpRight  size={15} color="#6366f1" />}
                            </div>
                            <div>
                              <p className="text-sm font-bold"
                                style={{ color: "var(--foreground)" }}>{tx.label}</p>
                              <p className="text-xs"
                                style={{ color: "var(--muted-foreground)" }}>
                                {isSale ? t("earnings.sale") : t("earnings.withdrawal")}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm font-black"
                            style={{ color: isSale ? "#22c55e" : "#ef4444" }}>
                            {isSale ? "+" : "-"}{convertPrice(tx.amount)}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                            {tx.date}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1
                            rounded-full text-xs font-bold"
                            style={{ backgroundColor: meta.bg, color: meta.color }}>
                            <meta.icon size={11} />
                            {meta.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Withdrawal modal — rendered in-tree, no portal needed */}
      {showModal && (
        <WithdrawalModal
          availableBalance={availableBalance}
          onClose={() => setShowModal(false)}
          onSubmit={handleWithdrawalSubmit}
        />
      )}
    </div>
  )
}
