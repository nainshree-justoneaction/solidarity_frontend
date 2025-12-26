"use client"

import { Phone, ArrowRight } from "lucide-react"

export function SOSAwarenessSection() {
  const scrollToSOS = () => {
    // The SOS button will be triggered by a global click
    const sosButton = document.querySelector('[aria-label="Emergency SOS"]') as HTMLButtonElement
    if (sosButton) {
      sosButton.click()
    }
  }

  return (
    <section className="bg-emergency/5 border border-emergency/20 rounded-xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emergency/20">
            <Phone className="h-6 w-6 text-emergency" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Emergency? Tap SOS anytime</h3>
            <p className="text-sm text-muted-foreground">
              The SOS button is always available at the bottom-right corner
            </p>
          </div>
        </div>
        <button
          onClick={scrollToSOS}
          className="flex items-center gap-2 text-sm font-medium text-emergency hover:text-emergency/80 transition-colors"
        >
          Learn more <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
