"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

interface DonationSuccessProps {
  amount: number
  causeTitle: string
  sdg: number
  sdgName: string
  sdgColor: string
}

export function DonationSuccess({ amount, causeTitle, sdg, sdgName, sdgColor }: DonationSuccessProps) {
  return (
    <div className="text-center space-y-8">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: sdgColor }}>
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">You just took 1 action!</h2>
        <p className="text-muted-foreground text-lg">
          Thank you for your ${amount} donation to {causeTitle}.
        </p>
      </div>

      {/* Impact Preview */}
      <div className="bg-card border border-border rounded-xl p-6 max-w-sm mx-auto">
        <p className="text-sm font-medium text-muted-foreground mb-4">Your contribution supports</p>
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: sdgColor }}
          >
            {sdg}
          </div>
          <div className="text-left">
            <p className="font-semibold">{sdgName}</p>
            <p className="text-sm text-muted-foreground">UN Sustainable Development Goal</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline" className="h-12 px-6 bg-transparent">
          <Link href="/public/impact">View Your Impact</Link>
        </Button>
        <Button asChild className="h-12 px-6">
          <Link href="/public/take-action">
            Take Another Action
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
