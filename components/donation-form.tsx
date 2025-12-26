"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DonationFormProps {
  causeTitle: string
  sdgColor: string
  onSuccess: () => void
}

const presetAmounts = [10, 25, 50, 100]

export function DonationForm({ causeTitle, sdgColor, onSuccess }: DonationFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25)
  const [customAmount, setCustomAmount] = useState("")
  const [isCustom, setIsCustom] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount)
    setIsCustom(false)
    setCustomAmount("")
  }

  const handleCustomChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, "")
    setCustomAmount(numValue)
    setSelectedAmount(Number(numValue) || null)
    setIsCustom(true)
  }

  const handleDonate = async () => {
    if (!selectedAmount) return

    setIsProcessing(true)
    // Simulate donation processing
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsProcessing(false)
    onSuccess()
  }

  const finalAmount = isCustom ? Number(customAmount) : selectedAmount

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-3">Select amount</p>
        <div className="grid grid-cols-4 gap-3">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handlePresetClick(amount)}
              className={`py-3 rounded-lg border font-semibold transition-all ${
                selectedAmount === amount && !isCustom
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/50"
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Or enter custom amount</p>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            type="text"
            placeholder="Enter amount"
            value={customAmount}
            onChange={(e) => handleCustomChange(e.target.value)}
            className="pl-8 h-12"
          />
        </div>
      </div>

      <Button
        onClick={handleDonate}
        disabled={!finalAmount || finalAmount <= 0 || isProcessing}
        className="w-full h-14 text-lg font-semibold"
        style={{ backgroundColor: sdgColor }}
      >
        {isProcessing ? "Processing..." : `Donate $${finalAmount || 0}`}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Your donation supports {causeTitle} and contributes to the Sustainable Development Goals.
      </p>
    </div>
  )
}
