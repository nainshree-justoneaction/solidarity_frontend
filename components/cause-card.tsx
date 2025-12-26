"use client"

import Link from "next/link"

interface CauseCardProps {
  id: string
  title: string
  description: string
  sdg: number
  sdgName: string
  sdgColor: string
  raised: number
  goal: number
  image: string
}

export function CauseCard({ id, title, description, sdg, sdgName, sdgColor, raised, goal, image }: CauseCardProps) {
  const progress = Math.min((raised / goal) * 100, 100)

  return (
    <Link href={`/public/donate/${id}`} className="group block">
      <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-foreground/30 hover:scale-[1.02]">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* SDG Badge */}
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: sdgColor }}
          >
            SDG {sdg}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground/80 transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

          {/* Progress */}
          <div className="space-y-2">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, backgroundColor: sdgColor }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">${raised.toLocaleString()} raised</span>
              <span className="text-muted-foreground">${goal.toLocaleString()} goal</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
