"use client"

export default function StatsOverview() {
  const stats = [
    { title: "Total Students Assigned", value: "24", icon: "📓", sdg: 4, sdgColor: "#c5192d" },
    { title: "Pending Approvals", value: "5", icon: "⚙️", sdg: 8, sdgColor: "#a21942" },
    { title: "Active Internships", value: "18", icon: "❤️", sdg: 3, sdgColor: "#4c9f38" },
    { title: "Reports Submitted", value: "42", icon: "🕊️", sdg: 16, sdgColor: "#0066cc" },
  ]

  return (
    <div className="grid grid-cols-12 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="col-span-12 md:col-span-6 lg:col-span-3 bg-white border border-black border-opacity-100 p-6 flex flex-col justify-between min-h-[120px]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-black text-opacity-60 mb-2">{stat.title}</p>
              <p className="text-3xl font-bold text-black">{stat.value}</p>
            </div>
            {/* SDG icon - only color element */}
            <span className="text-lg" style={{ color: stat.sdgColor }}>
              {stat.icon}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
