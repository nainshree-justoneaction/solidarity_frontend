"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ActionCard } from "@/components/action-card"
import {
  DollarSign,
  Package,
  Users,
  Calendar,
  PenLine,
} from "lucide-react"

const actionTypes = [
  {
    title: "Donate Money",
    description:
      "Support verified causes financially. One-time or recurring — contribute as you’re comfortable.",
    icon: DollarSign,
    href: "/public/donate",
    color: "#4C9F38",
  },
  {
    title: "Donate Essentials",
    description:
      "Books, clothes, food, devices, stationery — material support can change lives just as powerfully.",
    icon: Package,
    href: "/public/donate-essentials",
    color: "#00ADEF",
    highlight: true,
  },
  {
    title: "Volunteer",
    description:
      "Give your time and skills to NGOs and community initiatives working on real problems.",
    icon: Users,
    href: "/public/volunteer",
    color: "#FCC30B",
  },
  {
    title: "Join an Event",
    description:
      "Participate in online or on-ground events focused on awareness, action, and impact.",
    icon: Calendar,
    href: "/public/events",
    color: "#26BDE2",
  },
  {
    title: "Share a Thought",
    description:
      "Express your views on social issues and inspire others through ideas and conversations.",
    icon: PenLine,
    href: "/public/share",
    color: "#DD1367",
  },
]

export default function TakeActionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">

          {/* HEADER */}
          <div className="max-w-3xl mb-20">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Take Action
            </p>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Action isn’t always money.
              <br />
              <span className="text-muted-foreground">
                Impact has many forms.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl">
              Whether it’s resources, time, skills, or ideas — choose how you
              want to contribute today. Every action here creates measurable
              social impact.
            </p>
          </div>

          {/* ACTION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {actionTypes.map((action) => (
              <ActionCard
                key={action.title}
                title={action.title}
                description={action.description}
                icon={action.icon}
                href={action.href}
                color={action.color}
                highlight={action.highlight}
              />
            ))}
          </div>

          {/* FOOTNOTE */}
          <div className="mt-20 max-w-2xl">
            <p className="text-sm text-muted-foreground">
              Not sure where to start? Begin with what feels easiest today.
              You can explore other actions anytime — impact is a journey, not
              a one-time decision.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
