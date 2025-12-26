"use client"

import { Sparkles } from "lucide-react"

interface FeedCardProps {
  type: "thought" | "event" | "impact"
  author: {
    name: string
    avatar: string
  }
  content: string
  sdg: number
  sdgName: string
  sdgColor: string
  actionsInspired: number
  timestamp: string
  image?: string
  verified: boolean
}

export function FeedCard({
  type,
  author,
  content,
  sdg,
  sdgName,
  sdgColor,
  actionsInspired,
  timestamp,
  image,
  verified,
}: FeedCardProps) {
  const typeLabels = {
    thought: "Shared a Thought",
    event: "Event Highlight",
    impact: "Impact Story",
  }

  return (
    <article className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{author.name}</span>
                {verified && (
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">Verified</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{typeLabels[type]}</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: sdgColor }}>
            SDG {sdg}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        <p className="text-foreground leading-relaxed">{content}</p>
      </div>

      {/* Image (if exists) */}
      {image && (
        <div className="px-6 pb-4">
          <img src={image || "/placeholder.svg"} alt="Post image" className="w-full rounded-lg object-cover max-h-80" />
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" style={{ color: sdgColor }} />
          <span>
            <span className="font-medium text-foreground">{actionsInspired}</span> Actions Inspired
          </span>
        </div>
        <span className="text-sm text-muted-foreground">{timestamp}</span>
      </div>
    </article>
  )
}
