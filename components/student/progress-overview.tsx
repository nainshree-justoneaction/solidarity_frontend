"use client"

interface ProgressCard {
  label: string
  value: number
  sdgColor: string
}

const progressCards: ProgressCard[] = [
  { label: "Internships Completed", value: 3, sdgColor: "#e5243b" },
  { label: "Training Hours", value: 127, sdgColor: "#c5192d" },
  { label: "Modules In Progress", value: 4, sdgColor: "#4c9f38" },
  { label: "Certificates Earned", value: 8, sdgColor: "#0a4a99" },
]

export default function ProgressOverview() {
  return (
    <section className="animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-6">Your Progress Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {progressCards.map((card, index) => (
          <div
            key={card.label}
            className="bg-black border border-white/10 rounded p-6 hover:border-white/20 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Metric dot */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: card.sdgColor }} />
              <p className="text-cfcfcf text-sm">{card.label}</p>
            </div>

            {/* Value */}
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
