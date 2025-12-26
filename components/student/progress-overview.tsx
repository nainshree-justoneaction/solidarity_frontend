"use client"

import { useEffect, useState } from "react"

interface ProgressCard {
  label: string
  value: number
  hint: string
}

export default function ProgressOverview() {
  const [cards, setCards] = useState<ProgressCard[]>([])

  useEffect(() => {
    const completedModules = JSON.parse(
      sessionStorage.getItem("completedModulesData") || "{}"
    )

    const fundraising = JSON.parse(
      localStorage.getItem("fundraising_completed") || "{}"
    )

    const appliedInternships = JSON.parse(
      sessionStorage.getItem("appliedInternships") || "[]"
    )

    const inProgress = JSON.parse(
      sessionStorage.getItem("modulesInProgressData") || "[]"
    )

    const trainingHours = Object.values(completedModules).reduce(
      (acc: number, mod: any) => acc + (mod.hours || 4),
      0
    )

    const certificatesEarned = Object.values(fundraising).filter(Boolean).length

    setCards([
      {
        label: "Internships Applied",
        value: appliedInternships.length,
        hint: "Opportunities you've applied for",
      },
      {
        label: "Training Hours",
        value: trainingHours,
        hint: "Total learning time invested",
      },
      {
        label: "Modules In Progress",
        value: inProgress.length,
        hint: "Ongoing training modules",
      },
      {
        label: "Certificates Earned",
        value: certificatesEarned,
        hint: "Unlocked after completion & fundraising",
      },
    ])
  }, [])

  if (cards.length === 0) {
    return (
      <p className="text-white/60 text-center mt-10">
        No progress recorded yet.
      </p>
    )
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-white">
        Your Progress Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.label}
            className="
              bg-black border border-white/10 rounded-xl p-6
              hover:border-white/20 transition-colors
            "
          >
            <p className="text-white/60 text-sm">{card.label}</p>

            <p className="text-3xl font-bold text-white mt-2">
              {card.value}
            </p>

            <p className="text-white/40 text-xs mt-1">
              {card.hint}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
