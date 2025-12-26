"use client"

import { Award, Star, Zap, Heart, Globe, Users, TreeDeciduous, Droplets } from "lucide-react"

const badges = [
  {
    id: "first-action",
    name: "First Step",
    description: "Completed your first action",
    icon: Star,
    color: "#FCC30B",
    earned: true,
    date: "Jan 15, 2025",
  },
  {
    id: "donor",
    name: "Generous Heart",
    description: "Made your first donation",
    icon: Heart,
    color: "#E5243B",
    earned: true,
    date: "Jan 20, 2025",
  },
  {
    id: "volunteer",
    name: "Helping Hand",
    description: "Volunteered for a cause",
    icon: Users,
    color: "#4C9F38",
    earned: true,
    date: "Feb 5, 2025",
  },
  {
    id: "climate-champion",
    name: "Climate Champion",
    description: "10 actions for Climate Action",
    icon: TreeDeciduous,
    color: "#3F7E44",
    earned: true,
    date: "Feb 28, 2025",
  },
  {
    id: "ocean-guardian",
    name: "Ocean Guardian",
    description: "Support Life Below Water",
    icon: Droplets,
    color: "#0A97D9",
    earned: false,
    date: null,
  },
  {
    id: "global-citizen",
    name: "Global Citizen",
    description: "Actions in 5+ SDG categories",
    icon: Globe,
    color: "#DD1367",
    earned: false,
    date: null,
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "7-day action streak",
    icon: Zap,
    color: "#FD6925",
    earned: false,
    date: null,
  },
  {
    id: "top-contributor",
    name: "Top Contributor",
    description: "Top 10% of contributors",
    icon: Award,
    color: "#19486A",
    earned: false,
    date: null,
  },
]

export function BadgesSection() {
  const earnedCount = badges.filter((b) => b.earned).length

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Badges & Milestones</h3>
        <span className="text-sm text-muted-foreground">
          {earnedCount} / {badges.length} earned
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => {
          const Icon = badge.icon
          return (
            <div
              key={badge.id}
              className={`relative rounded-lg p-4 text-center transition-all ${
                badge.earned ? "bg-secondary" : "bg-secondary/30 opacity-50"
              }`}
            >
              <div
                className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${
                  badge.earned ? "" : "grayscale"
                }`}
                style={{ backgroundColor: badge.earned ? badge.color : "var(--muted)" }}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium mb-1">{badge.name}</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
              {badge.earned && badge.date && <p className="text-xs text-muted-foreground mt-2">Earned {badge.date}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
