"use client"

import { DollarSign, Calendar, Users, PenLine } from "lucide-react"

const recentActions = [
  {
    type: "donate",
    title: "Donated to Clean Water for Rural Africa",
    amount: "$50",
    date: "2 hours ago",
    sdg: 6,
    sdgColor: "#26BDE2",
  },
  {
    type: "event",
    title: "Joined Beach Cleanup Day",
    date: "Yesterday",
    sdg: 14,
    sdgColor: "#0A97D9",
  },
  {
    type: "volunteer",
    title: "Volunteered at Local Food Bank",
    hours: "4 hours",
    date: "3 days ago",
    sdg: 2,
    sdgColor: "#DDA63A",
  },
  {
    type: "thought",
    title: "Shared thoughts on Climate Action",
    inspired: 12,
    date: "1 week ago",
    sdg: 13,
    sdgColor: "#3F7E44",
  },
  {
    type: "donate",
    title: "Donated to Education for Girls",
    amount: "$25",
    date: "2 weeks ago",
    sdg: 4,
    sdgColor: "#C5192D",
  },
]

const iconMap = {
  donate: DollarSign,
  event: Calendar,
  volunteer: Users,
  thought: PenLine,
}

export function RecentActions() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-6">Recent Actions</h3>
      <div className="space-y-4">
        {recentActions.map((action, index) => {
          const Icon = iconMap[action.type as keyof typeof iconMap]
          return (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: action.sdgColor }}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{action.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  {action.amount && <span className="text-xs text-muted-foreground">{action.amount}</span>}
                  {action.hours && <span className="text-xs text-muted-foreground">{action.hours}</span>}
                  {action.inspired && <span className="text-xs text-muted-foreground">{action.inspired} inspired</span>}
                  <span className="text-xs text-muted-foreground">{action.date}</span>
                </div>
              </div>
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: action.sdgColor }}
              >
                {action.sdg}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
