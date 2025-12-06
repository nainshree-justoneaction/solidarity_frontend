"use client"

interface StatCard {
  label: string
  value: number
  icon: string
  sdg: string
  sdgColor: string
}

const stats: StatCard[] = [
  { label: "Total Students Enrolled", value: 2847, icon: "👥", sdg: "4", sdgColor: "#c5192d" },
  { label: "Active Internships", value: 156, icon: "💼", sdg: "8", sdgColor: "#a21942" },
  { label: "Completed Training Modules", value: 1203, icon: "❤️", sdg: "3", sdgColor: "#4c9f38" },
  { label: "Pending Faculty Approvals", value: 28, icon: "🕊️", sdg: "16", sdgColor: "#0066cc" },
]

export default function QuickStats() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white border border-black border-opacity-20 p-5 rounded">
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-white"
              style={{ backgroundColor: stat.sdgColor }}
            >
              <span className="text-lg">{stat.icon}</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-black mb-2">{stat.value.toLocaleString()}</p>
          <p className="text-black text-xs opacity-60">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
