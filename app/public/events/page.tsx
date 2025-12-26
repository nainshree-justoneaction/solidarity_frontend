"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventCard } from "@/components/event-card"
import { EventFilters } from "@/components/event-filters"
import { ParticipationSuccess } from "@/components/participation-success"

const eventsData = [
  {
    id: "beach-cleanup",
    title: "Global Beach Cleanup Day",
    description: "Join thousands worldwide in cleaning up beaches and coastlines to protect marine life.",
    date: "March 15, 2025",
    time: "9:00 AM",
    location: "Local Beach (Multiple Locations)",
    type: "in-person" as const,
    sdg: 14,
    sdgName: "Life Below Water",
    sdgColor: "#0A97D9",
    attendees: 1247,
    maxAttendees: 2000,
    image: "/beach-cleanup-volunteers-ocean-conservation.jpg",
  },
  {
    id: "climate-webinar",
    title: "Climate Action Workshop",
    description: "Learn practical steps to reduce your carbon footprint and advocate for climate policies.",
    date: "March 20, 2025",
    time: "2:00 PM EST",
    location: "Online (Zoom)",
    type: "online" as const,
    sdg: 13,
    sdgName: "Climate Action",
    sdgColor: "#3F7E44",
    attendees: 892,
    maxAttendees: 1000,
    image: "/climate-action-workshop-environmental-sustainabili.jpg",
  },
  {
    id: "education-drive",
    title: "Books for Schools Drive",
    description: "Help collect and donate books to underprivileged schools in your community.",
    date: "March 25, 2025",
    time: "10:00 AM",
    location: "Community Center, New York",
    type: "in-person" as const,
    sdg: 4,
    sdgName: "Quality Education",
    sdgColor: "#C5192D",
    attendees: 156,
    maxAttendees: 200,
    image: "/books-donation-education-children-library.jpg",
  },
  {
    id: "water-conservation",
    title: "Water Conservation Seminar",
    description: "Expert panel discussion on water conservation techniques and community initiatives.",
    date: "April 2, 2025",
    time: "6:00 PM EST",
    location: "Online (Teams)",
    type: "online" as const,
    sdg: 6,
    sdgName: "Clean Water & Sanitation",
    sdgColor: "#26BDE2",
    attendees: 445,
    maxAttendees: 500,
    image: "/water-conservation-seminar-environment.jpg",
  },
  {
    id: "health-fair",
    title: "Community Health Fair",
    description: "Free health screenings, wellness workshops, and information on healthy living.",
    date: "April 10, 2025",
    time: "11:00 AM",
    location: "City Park, Los Angeles",
    type: "in-person" as const,
    sdg: 3,
    sdgName: "Good Health & Well-being",
    sdgColor: "#4C9F38",
    attendees: 678,
    maxAttendees: 1000,
    image: "/community-health-fair-wellness-event-outdoor.jpg",
  },
  {
    id: "tree-planting",
    title: "Urban Tree Planting Day",
    description: "Help green your city by planting trees in urban areas. Tools and guidance provided.",
    date: "April 22, 2025",
    time: "8:00 AM",
    location: "Central Park, Chicago",
    type: "in-person" as const,
    sdg: 13,
    sdgName: "Climate Action",
    sdgColor: "#3F7E44",
    attendees: 312,
    maxAttendees: 500,
    image: "/tree-planting-urban-volunteers-environment.jpg",
  },
]

export default function EventsPage() {
  const [typeFilter, setTypeFilter] = useState("all")
  const [sdgFilter, setSDGFilter] = useState<number | null>(null)
  const [participating, setParticipating] = useState<string[]>([])
  const [successEvent, setSuccessEvent] = useState<(typeof eventsData)[0] | null>(null)

  const filteredEvents = eventsData.filter((event) => {
    const matchesType = typeFilter === "all" || event.type === typeFilter
    const matchesSDG = sdgFilter === null || event.sdg === sdgFilter
    return matchesType && matchesSDG
  })

  const handleParticipate = (id: string) => {
    const event = eventsData.find((e) => e.id === id)
    if (event) {
      setParticipating([...participating, id])
      setSuccessEvent(event)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">Events</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Join an event.
              <br />
              <span className="text-muted-foreground">Make an impact.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Connect with changemakers at online and in-person events. Every participation is an action that counts.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <EventFilters
              activeType={typeFilter}
              activeSDG={sdgFilter}
              onTypeChange={setTypeFilter}
              onSDGChange={setSDGFilter}
            />
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                onParticipate={handleParticipate}
                isParticipating={participating.includes(event.id)}
              />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No events match your filters. Try adjusting your selection.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Success Modal */}
      {successEvent && (
        <ParticipationSuccess
          eventTitle={successEvent.title}
          eventDate={successEvent.date}
          sdg={successEvent.sdg}
          sdgName={successEvent.sdgName}
          sdgColor={successEvent.sdgColor}
          onClose={() => setSuccessEvent(null)}
        />
      )}
    </div>
  )
}
