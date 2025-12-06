"use client"

export default function OverviewStats() {
  const stats = [
    {
      title: "Active Internships",
      value: "24",
      sdg: 4,
      color: "bg-[#c5192d]",
    },
    {
      title: "Total Applications",
      value: "156",
      sdg: 1,
      color: "bg-[#e5243b]",
    },
    {
      title: "Students Assigned",
      value: "89",
      sdg: 3,
      color: "bg-[#4c9f38]",
    },
    {
      title: "Completed Programs",
      value: "42",
      sdg: 13,
      color: "bg-[#407f3d]",
    },
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="border border-white/10 rounded p-6 hover:border-white/20 transition-colors group bg-black/30 hover:bg-black/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-secondary text-sm mb-1">{stat.title}</p>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`w-8 h-8 rounded ${stat.color}`} />
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full ${stat.color} w-3/4 group-hover:w-full transition-all duration-500`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
