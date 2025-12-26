"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeedCard } from "@/components/feed-card"
import { FeedFilters } from "@/components/feed-filters"
import { ShareThoughtForm } from "@/components/share-thought-form"
import { ThoughtSuccess } from "@/components/thought-success"

const feedItems = [
  {
    type: "thought" as const,
    author: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah-chen-professional-woman.jpg",
    },
    content:
      "Just completed my first beach cleanup today. It's incredible how much plastic washes up in just one week. Small actions add up — if everyone picked up 10 pieces of trash a day, we'd clean up billions of pieces annually.",
    sdg: 14,
    sdgName: "Life Below Water",
    sdgColor: "#0A97D9",
    actionsInspired: 47,
    timestamp: "2 hours ago",
    verified: true,
  },
  {
    type: "impact" as const,
    author: {
      name: "Clean Water Initiative",
      avatar: "/avatars/clean-water-org-logo.jpg",
    },
    content:
      "Thanks to 234 donors this month, we've installed 3 new wells in rural Kenya, providing clean water to over 1,500 people. Each well serves approximately 500 community members and reduces waterborne diseases by 80%.",
    sdg: 6,
    sdgName: "Clean Water & Sanitation",
    sdgColor: "#26BDE2",
    actionsInspired: 89,
    timestamp: "5 hours ago",
    image: "/impact-story-water-well-community-kenya.jpg",
    verified: true,
  },
  {
    type: "thought" as const,
    author: {
      name: "Marcus Johnson",
      avatar: "/avatars/marcus-johnson-man.jpg",
    },
    content:
      "Education changed my life, and now I volunteer to tutor students every weekend. Seeing a child's face light up when they finally understand a concept — that's the real impact we're talking about.",
    sdg: 4,
    sdgName: "Quality Education",
    sdgColor: "#C5192D",
    actionsInspired: 32,
    timestamp: "1 day ago",
    verified: true,
  },
  {
    type: "event" as const,
    author: {
      name: "Climate Action Network",
      avatar: "/avatars/climate-action-network-logo.jpg",
    },
    content:
      "Our urban tree planting event last weekend was a huge success! 312 volunteers planted over 1,000 trees across Chicago. These trees will absorb an estimated 48 tons of CO2 per year.",
    sdg: 13,
    sdgName: "Climate Action",
    sdgColor: "#3F7E44",
    actionsInspired: 156,
    timestamp: "2 days ago",
    image: "/event-tree-planting-volunteers-urban-park.jpg",
    verified: true,
  },
  {
    type: "thought" as const,
    author: {
      name: "Priya Patel",
      avatar: "/avatars/priya-patel-woman.jpg",
    },
    content:
      "Climate anxiety is real, but taking action helps. I've reduced my carbon footprint by 40% this year through simple changes: public transit, plant-based meals twice a week, and supporting renewable energy initiatives.",
    sdg: 13,
    sdgName: "Climate Action",
    sdgColor: "#3F7E44",
    actionsInspired: 28,
    timestamp: "3 days ago",
    verified: true,
  },
  {
    type: "impact" as const,
    author: {
      name: "Health for All Foundation",
      avatar: "/avatars/health-foundation-logo.jpg",
    },
    content:
      "Our mobile health clinic program has now reached 10,000 patients in remote areas. This month alone, we provided 2,400 health screenings, 890 vaccinations, and connected 156 patients to specialists via telemedicine.",
    sdg: 3,
    sdgName: "Good Health & Well-being",
    sdgColor: "#4C9F38",
    actionsInspired: 203,
    timestamp: "4 days ago",
    image: "/impact-mobile-health-clinic-community.jpg",
    verified: true,
  },
]

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [showSuccess, setShowSuccess] = useState(false)

  const filteredItems = feedItems.filter((item) => activeFilter === "all" || item.type === activeFilter)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">Public Feed</p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Impact stories.
                  <br />
                  <span className="text-muted-foreground">Not noise.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Verified thoughts, events, and impact stories from our community. No algorithms, no ads — just real
                  actions inspiring more actions.
                </p>
              </div>

              {/* Filters */}
              <div className="mb-6">
                <FeedFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
              </div>

              {/* Feed Items */}
              <div className="space-y-6">
                {filteredItems.map((item, index) => (
                  <FeedCard key={index} {...item} />
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No posts match your filter. Try selecting a different one.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Share Thought Form */}
                <ShareThoughtForm onSuccess={() => setShowSuccess(true)} />

                {/* Stats */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Feed Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Verified posts</span>
                      <span className="font-medium">2,341</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Actions inspired</span>
                      <span className="font-medium">8,923</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Contributors</span>
                      <span className="font-medium">1,247</span>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="bg-secondary rounded-xl p-6">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">No likes. No vanity metrics.</strong> We measure success by
                    Actions Inspired — real people taking real action because of what you shared.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Success Modal */}
      {showSuccess && <ThoughtSuccess onClose={() => setShowSuccess(false)} />}
    </div>
  )
}
