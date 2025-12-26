"use client"

import { Calendar, MapPin, Users, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: "online" | "in-person"
  sdg: number
  sdgName: string
  sdgColor: string
  attendees: number
  maxAttendees: number
  image: string
  onParticipate: (id: string) => void
  isParticipating: boolean
}

export function EventCard({
  id,
  title,
  description,
  date,
  time,
  location,
  type,
  sdg,
  sdgName,
  sdgColor,
  attendees,
  maxAttendees,
  image,
  onParticipate,
  isParticipating,
}: EventCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden group hover:border-foreground/30 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div
            className="px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1"
            style={{ backgroundColor: sdgColor }}
          >
            SDG {sdg}
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground flex items-center gap-1">
            {type === "online" ? <Monitor className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
            {type === "online" ? "Online" : "In-Person"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {date} at {time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {attendees} / {maxAttendees} attending
            </span>
          </div>
        </div>

        {/* Action */}
        <Button
          onClick={() => onParticipate(id)}
          disabled={isParticipating}
          className="w-full"
          style={isParticipating ? {} : { backgroundColor: sdgColor }}
          variant={isParticipating ? "outline" : "default"}
        >
          {isParticipating ? "You're Participating!" : "I'll Participate"}
        </Button>
      </div>
    </div>
  )
}
