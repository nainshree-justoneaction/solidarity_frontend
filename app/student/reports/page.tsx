"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

/* ---------------- TYPES ---------------- */

interface ModuleData {
  id: string
  title: string
  completedCount?: number
  total?: number
}

interface ChartItem {
  name: string
  value: number
  fill: string
}

interface Activity {
  date: string // yyyy-mm-dd
  type: "Applied" | "Completed"
}

/* ---------------- PAGE ---------------- */

export default function ReportsPage() {
  const [chartData, setChartData] = useState<ChartItem[]>([])
  const [modulesInProgress, setModulesInProgress] = useState<ModuleData[]>([])
  const [activities, setActivities] = useState<Activity[]>([])

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    const applied = JSON.parse(
      sessionStorage.getItem("appliedInternships") || "[]"
    )

    const completedModules = JSON.parse(
      sessionStorage.getItem("completedModulesData") || "{}"
    )

    const inProgress = JSON.parse(
      sessionStorage.getItem("modulesInProgressData") || "[]"
    )

    setChartData([
      { name: "Applied", value: applied.length, fill: "#FACC15" },
      { name: "In Progress", value: inProgress.length, fill: "#60A5FA" },
      {
        name: "Completed",
        value: Object.keys(completedModules).length,
        fill: "#10B981",
      },
    ])

    setModulesInProgress(inProgress)

    /* Fake activity timeline (demo friendly) */
    const activityList: Activity[] = []
    applied.forEach((_: any, i: number) => {
      activityList.push({
        date: `2025-12-${String(5 + i).padStart(2, "0")}`,
        type: "Applied",
      })
    })

    Object.keys(completedModules).forEach((_, i) => {
      activityList.push({
        date: `2025-12-${String(15 + i).padStart(2, "0")}`,
        type: "Completed",
      })
    })

    setActivities(activityList)
  }, [])

  /* ---------------- HELPERS ---------------- */

  const daysInMonth = 31
  const getDayActivity = (day: number) => {
    const d = String(day).padStart(2, "0")
    return activities.filter((a) => a.date.endsWith(`-${d}`))
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-white">Reports & Progress</h1>
        <p className="text-white/60 mt-2">
          Your learning, consistency, and impact overview
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5
                       p-6 border border-white/10"
          >
            <p className="text-white/60 text-sm">{item.name}</p>
            <p className="text-4xl font-bold text-white mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* ANALYTICS + INSIGHT */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* BAR CHART */}
        <div className="lg:col-span-2 bg-white/5 p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Training Status Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" tick={{ fill: "#fff" }} />
              <YAxis tick={{ fill: "#fff" }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  borderRadius: 10,
                  border: "none",
                  color: "#fff",
                }}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* INSIGHTS */}
        <div className="bg-gradient-to-br from-[#00ADEF]/20 to-[#00ADEF]/5
                        border border-[#00ADEF]/30 rounded-3xl p-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            📌 Key Insights
          </h3>
          <ul className="space-y-3 text-white/80 text-sm">
            <li>• Consistent participation improves internship access</li>
            <li>• Fundraising unlocks certification eligibility</li>
            <li>• Completing modules increases credibility score</li>
          </ul>
        </div>
      </div>

      {/* ACTIVITY CALENDAR */}
      <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Learning Activity Calendar
        </h2>
        <p className="text-white/60 text-sm mb-6">
          Days you applied, studied, or completed training
        </p>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const acts = getDayActivity(day)

            let bg = "bg-white/10"
            if (acts.length === 1) bg = "bg-yellow-400/40"
            if (acts.length > 1) bg = "bg-green-500/60"

            return (
              <div
                key={day}
                className={`h-10 rounded-lg flex items-center justify-center
                            text-xs font-semibold text-white
                            transition hover:scale-110 ${bg}`}
                title={
                  acts.length
                    ? `${acts.length} activity(s)`
                    : "No activity"
                }
              >
                {day}
              </div>
            )
          })}
        </div>

        <div className="flex gap-6 mt-6 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-white/10" />
            No activity
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-yellow-400/40" />
            Applied / Started
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-green-500/60" />
            Completed
          </div>
        </div>
      </div>

      {/* MODULE PROGRESS */}
      <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Modules In Progress
        </h2>

        {modulesInProgress.length === 0 && (
          <p className="text-white/60">
            No modules currently in progress.
          </p>
        )}

        <div className="space-y-5">
          {modulesInProgress.map((mod) => {
            const percent =
              mod.total && mod.completedCount
                ? Math.round((mod.completedCount / mod.total) * 100)
                : 0

            return (
              <div key={mod.id} className="space-y-2">
                <div className="flex justify-between text-sm text-white">
                  <span>{mod.title}</span>
                  <span>{percent}%</span>
                </div>

                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00ADEF] transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
