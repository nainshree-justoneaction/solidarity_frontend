"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

interface ThoughtSuccessProps {
  onClose: () => void
}

export function ThoughtSuccess({ onClose }: ThoughtSuccessProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-foreground">
            <Check className="w-10 h-10 text-background" strokeWidth={3} />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold mb-2">You just took 1 action!</h2>
        <p className="text-muted-foreground mb-6">
          Your thought has been submitted for review and will appear in the feed once verified.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button asChild className="h-12">
            <Link href="/impact">
              View Your Impact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" onClick={onClose} className="h-12 bg-transparent">
            Back to Feed
          </Button>
        </div>
      </div>
    </div>
  )
}
