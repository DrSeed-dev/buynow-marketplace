// components/checkout/CheckoutStepper.tsx
// Reusable step indicator for the checkout flow.
// Shows which step you're on with icons and connecting lines.

import { Check, MapPin, CreditCard, PackageCheck } from "lucide-react"

const STEPS = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Payment",  icon: CreditCard },
  { id: 3, label: "Confirm",  icon: PackageCheck },
]

interface CheckoutStepperProps {
  currentStep: number
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1.5">
            {/* Step circle */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center
                font-black text-sm transition-all duration-300"
              style={{
                backgroundColor:
                  currentStep > step.id
                    ? "var(--color-success)"
                    : currentStep === step.id
                    ? "var(--color-brand-600)"
                    : "var(--muted)",
                color:
                  currentStep >= step.id ? "white" : "var(--muted-foreground)",
              }}
            >
              {currentStep > step.id
                ? <Check size={18} strokeWidth={3} />
                : <step.icon size={16} />}
            </div>
            {/* Step label */}
            <span
              className="text-xs font-bold hidden sm:block"
              style={{
                color: currentStep >= step.id
                  ? "var(--foreground)"
                  : "var(--muted-foreground)",
              }}
            >
              {step.label}
            </span>
          </div>
          {/* Connector line between steps */}
          {i < STEPS.length - 1 && (
            <div
              className="flex-1 h-0.5 mx-2 transition-colors duration-300"
              style={{
                backgroundColor: currentStep > step.id
                  ? "var(--color-success)"
                  : "var(--border)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
