"use client"

export default function StudentProgressVisuals() {
  const weeks = Array.from({ length: 8 }, (_, i) => ({
    week: `W${i + 1}`,
    activity: Math.floor(Math.random() * 100) + 20,
  }))

  const programs = [
    { name: "SDG 4 Program", completion: 85 },
    { name: "SDG 8 Program", completion: 72 },
    { name: "SDG 3 Program", completion: 60 },
  ]

  return (
    <div className="bg-white border border-black border-opacity-100">
      {/* Header with SDG icon */}
      <div className="px-6 py-4 border-b border-black border-opacity-100 flex items-center gap-2">
        <span className="text-sm" style={{ color: "#4c9f38" }}>
          ❤️
        </span>
        <h3 className="text-sm font-bold text-black">Student Progress</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Weekly Activity Chart - Black bars only */}
        <div>
          <h4 className="text-xs font-bold text-black mb-3">Weekly Activity</h4>
          <div className="flex items-end justify-between h-24 gap-1">
            {weeks.map((w) => (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-black" style={{ height: `${w.activity}%` }}></div>
                <span className="text-xs text-black text-opacity-60">{w.week}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Bars - Black only */}
        <div>
          <h4 className="text-xs font-bold text-black mb-3">Program Completion</h4>
          <div className="space-y-3">
            {programs.map((prog) => (
              <div key={prog.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-black">{prog.name}</span>
                  <span className="text-xs text-black font-bold">{prog.completion}%</span>
                </div>
                <div className="w-full h-1.5 bg-black bg-opacity-10 overflow-hidden">
                  <div className="h-full bg-black" style={{ width: `${prog.completion}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
