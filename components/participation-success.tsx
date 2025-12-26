"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Calendar, ArrowRight } from "lucide-react"

interface ParticipationSuccessProps {
  eventTitle: string
  eventDate: string
  sdg: number
  sdgName: string
  sdgColor: string
  onClose: () => void
}

export function ParticipationSuccess({
  eventTitle,
  eventDate,
  sdg,
  sdgName,
  sdgColor,
  onClose,
}: ParticipationSuccessProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: sdgColor }}
          >
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold mb-2">You just took 1 action!</h2>
        <p className="text-muted-foreground mb-6">You're participating in {eventTitle}.</p>

        {/* Event Details */}
        <div className="bg-secondary rounded-lg p-4 mb-6 flex items-center gap-3 justify-center">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">{eventDate}</span>
        </div>

        {/* SDG Badge */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: sdgColor }}
          >
            {sdg}
          </div>
          <span className="text-sm text-muted-foreground">Supporting {sdgName}</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button asChild className="h-12">
            <Link href="/impact">
              View Your Impact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" onClick={onClose} className="h-12 bg-transparent">
            Back to Events
          </Button>
        </div>
      </div>
    </div>
  )
}
