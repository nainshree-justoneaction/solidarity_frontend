"use client"

const milestones = [
  { target: 10, label: "actions", current: 23, reached: true },
  { target: 100, label: "actions", current: 23, reached: false },
  { target: 500, label: "donated", current: 175, reached: false },
  { target: 10, label: "volunteer hours", current: 12, reached: true },
  { target: 50, label: "volunteer hours", current: 12, reached: false },
]

export function ImpactMilestones() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-6">Next Milestones</h3>
      <div className="space-y-6">
        {milestones
          .filter((m) => !m.reached)
          .slice(0, 3)
          .map((milestone, index) => {
            const progress = Math.min((milestone.current / milestone.target) * 100, 100)
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">
                    {milestone.target} {milestone.label}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {milestone.current} / {milestone.target}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
