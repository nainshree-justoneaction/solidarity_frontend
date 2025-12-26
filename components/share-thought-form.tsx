"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const sdgOptions = [
  { sdg: 1, name: "No Poverty", color: "#E5243B" },
  { sdg: 3, name: "Good Health", color: "#4C9F38" },
  { sdg: 4, name: "Quality Education", color: "#C5192D" },
  { sdg: 6, name: "Clean Water", color: "#26BDE2" },
  { sdg: 13, name: "Climate Action", color: "#3F7E44" },
  { sdg: 14, name: "Life Below Water", color: "#0A97D9" },
]

interface ShareThoughtFormProps {
  onSuccess: () => void
}

export function ShareThoughtForm({ onSuccess }: ShareThoughtFormProps) {
  const [thought, setThought] = useState("")
  const [selectedSDG, setSelectedSDG] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!thought.trim() || !selectedSDG) return

    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    onSuccess()
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Share a Thought</h3>

      <Textarea
        placeholder="Share your perspective on social impact, sustainability, or your recent actions..."
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        className="min-h-[120px] mb-4 resize-none"
        maxLength={500}
      />

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-muted-foreground">{thought.length}/500</span>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium mb-3">Tag an SDG</p>
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
              <span className="text-xs">{sdg.sdg}</span>
              {sdg.name}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={!thought.trim() || !selectedSDG || isSubmitting} className="w-full h-12">
        {isSubmitting ? "Sharing..." : "Share Thought"}
      </Button>

      <p className="text-xs text-center text-muted-foreground mt-4">
        All thoughts are reviewed before appearing in the public feed.
      </p>
    </div>
  )
}
