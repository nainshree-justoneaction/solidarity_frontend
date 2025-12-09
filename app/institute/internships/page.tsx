"use client"

import { Topbar } from "@/components/institute/Topbar"
import { InternshipCard } from "@/components/institute/InternshipCard"
import { mockInternships } from "@/lib/mock-data"

// SDG Colors array
const SDG_COLORS = [
  "#E5243B","#DDA63A","#4C9F38","#C5192D","#FF3A21",
  "#26BDE2","#FCC30B","#A21942","#FD6925","#DD1367",
  "#FD9D24","#BF8B2E","#3F7E44","#0A97D9","#56C02B",
  "#00689D","#19486A"
]

export default function InstituteInternships() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Topbar title="Internships" />
      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockInternships.map((internship, i) => (
            <InternshipCard
              key={internship.id}
              icon={internship.icon}
              title={internship.title}
              organization={internship.organization}
              description={internship.description}
              duration={internship.duration}
              mode={internship.mode}
              seats={internship.seats}
              sdgColor={SDG_COLORS[i % SDG_COLORS.length]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
