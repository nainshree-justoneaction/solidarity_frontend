"use client"

const sdgContributions = [
  { sdg: 1, name: "No Poverty", color: "#E5243B", actions: 245 },
  { sdg: 2, name: "Zero Hunger", color: "#DDA63A", actions: 189 },
  { sdg: 3, name: "Good Health", color: "#4C9F38", actions: 412 },
  { sdg: 4, name: "Quality Education", color: "#C5192D", actions: 356 },
  { sdg: 6, name: "Clean Water", color: "#26BDE2", actions: 278 },
  { sdg: 7, name: "Clean Energy", color: "#FCC30B", actions: 134 },
  { sdg: 13, name: "Climate Action", color: "#3F7E44", actions: 523 },
  { sdg: 14, name: "Life Below Water", color: "#0A97D9", actions: 298 },
  { sdg: 15, name: "Life on Land", color: "#56C02B", actions: 187 },
]

export function SDGContributionChart() {
  const maxActions = Math.max(...sdgContributions.map((s) => s.actions))

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-6">SDGs Contributed</h3>
      <div className="space-y-4">
        {sdgContributions.map((sdg) => {
          const width = (sdg.actions / maxActions) * 100
          return (
            <div key={sdg.sdg} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: sdg.color }}
                  >
                    {sdg.sdg}
                  </div>
                  <span className="text-sm">{sdg.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{sdg.actions}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${width}%`, backgroundColor: sdg.color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
