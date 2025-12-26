"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThoughtSuccess } from "@/components/thought-success"

const sdgOptions = [
  { sdg: 1, name: "No Poverty", color: "#E5243B" },
  { sdg: 2, name: "Zero Hunger", color: "#DDA63A" },
  { sdg: 3, name: "Good Health", color: "#4C9F38" },
  { sdg: 4, name: "Quality Education", color: "#C5192D" },
  { sdg: 5, name: "Gender Equality", color: "#FF3A21" },
  { sdg: 6, name: "Clean Water", color: "#26BDE2" },
  { sdg: 7, name: "Clean Energy", color: "#FCC30B" },
  { sdg: 13, name: "Climate Action", color: "#3F7E44" },
  { sdg: 14, name: "Life Below Water", color: "#0A97D9" },
  { sdg: 15, name: "Life on Land", color: "#56C02B" },
]

export default function SharePage() {
  const [thought, setThought] = useState("")
  const [selectedSDG, setSelectedSDG] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!thought.trim() || !selectedSDG) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
                Share a Thought
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Your voice.
                <br />
                <span className="text-muted-foreground">Your impact.</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Share your perspective on social issues, sustainability, or your recent actions. Inspire others to take
                action through your words.
              </p>
            </div>

            {/* Form */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Your Thought</label>
                <Textarea
                  placeholder="Share your perspective on social impact, sustainability, or your recent actions..."
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  className="min-h-[200px] resize-none text-base"
                  maxLength={500}
                />
                <div className="flex justify-end mt-2">
                  <span className="text-sm text-muted-foreground">{thought.length}/500</span>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium mb-3">Tag an SDG</label>
                <p className="text-sm text-muted-foreground mb-4">
                  Which Sustainable Development Goal does your thought relate to?
                </p>
                <div className="flex flex-wrap gap-2">
                  {sdgOptions.map((sdg) => (
                    <button
                      key={sdg.sdg}
                      onClick={() => setSelectedSDG(sdg.sdg)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5`}
                      style={
                        selectedSDG === sdg.sdg
                          ? { backgroundColor: sdg.color, color: "white" }
                          : { backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }
                      }
                    >
                      <span className="text-xs font-bold">{sdg.sdg}</span>
                      {sdg.name}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!thought.trim() || !selectedSDG || isSubmitting}
                className="w-full h-14 text-lg"
              >
                {isSubmitting ? "Sharing..." : "Share Your Thought"}
              </Button>

              <p className="text-sm text-center text-muted-foreground mt-6">
                All thoughts are reviewed before appearing in the public feed to ensure quality and authenticity.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {showSuccess && <ThoughtSuccess onClose={() => setShowSuccess(false)} />}
    </div>
  )
}
