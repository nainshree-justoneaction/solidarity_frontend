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
  Cell,
} from "recharts"
import TooltipLib from "rc-tooltip"
import "rc-tooltip/assets/bootstrap.css"

interface ModuleData {
  id: string
  title: string
  completedCount?: number
  total?: number
  certified?: boolean
  hours?: number
}

interface Training {
  id: string
  title: string
  status: "Applied" | "Completed"
  date: string 
}

export default function ReportsPage() {
  const [appliedTrainings, setAppliedTrainings] = useState<string[]>([])
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [modulesInProgress, setModulesInProgress] = useState<ModuleData[]>([])
  const [chartData, setChartData] = useState<{ status: string; count: number }[]>([])
  const [trainings, setTrainings] = useState<Training[]>([])

  const statusColors: Record<string, string> = {
    Applied: "#FACC15",
    "In Progress": "#FBBF24",
    Completed: "#10B981",
  }

  useEffect(() => {
    const applied = JSON.parse(sessionStorage.getItem("appliedInternships") || "[]")
    const completed = JSON.parse(sessionStorage.getItem("completedModules") || "[]")
    const inProgress = JSON.parse(sessionStorage.getItem("modulesInProgressData") || "[]")

    setAppliedTrainings(applied)
    setCompletedModules(completed)
    setModulesInProgress(inProgress)

    setChartData([
      { status: "Applied", count: applied.length },
      { status: "In Progress", count: inProgress.length },
      { status: "Completed", count: completed.length },
    ])

    const allTrainings: Training[] = []

    applied.forEach((id, idx) => {
      allTrainings.push({
        id,
        title: `Training #${id}`,
        status: "Applied",
        date: `2025-12-${String(5 + idx).padStart(2, "0")}`,
      })
    })

    completed.forEach((id, idx) => {
      allTrainings.push({
        id,
        title: `Training #${id}`,
        status: "Completed",
        date: `2025-12-${String(10 + idx).padStart(2, "0")}`,
      })
    })

    setTrainings(allTrainings)
  }, [])

  const daysInMonth = 31
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const getTrainingsByDay = (day: number) => {
    const dayStr = String(day).padStart(2, "0")
    return trainings.filter(t => t.date.endsWith(`-${dayStr}`))
  }

  return (
    <div className="space-y-10 p-4 sm:p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Reports</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {chartData.map((item) => (
          <div
            key={item.status}
            className="bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-2xl shadow-lg border border-white/10 flex flex-col items-center justify-center hover:scale-105 transform transition"
          >
            <p className="text-white/70">{item.status}</p>
            <p className="text-3xl font-bold mt-2">{item.count}</p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-2xl font-semibold mb-4 text-white">Training Status Distribution</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="status" stroke="#ffffff80" tick={{ fill: "#ffffffcc", fontSize: 14 }} />
            <YAxis stroke="#ffffff80" tick={{ fill: "#ffffffcc", fontSize: 14 }} allowDecimals={false} />
            <Tooltip contentStyle={{ backgroundColor: "#111", border: "none", borderRadius: 8 }} itemStyle={{ color: "#fff" }} />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40} isAnimationActive>
              {chartData.map((entry) => (
                <Cell key={entry.status} fill={statusColors[entry.status]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Premium Calendar */}
      <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-2xl font-semibold mb-4 text-white">Your Training Timeline</h2>
        <div className="grid grid-cols-7 gap-1 text-white/70 font-semibold text-center mb-2">
          {weekdays.map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1
            const dayTrainings = getTrainingsByDay(dayNum)
            return (
              <div
                key={dayNum}
                className="h-24 p-2 border border-white/10 rounded-lg flex flex-col justify-start hover:shadow-lg hover:scale-105 transform transition relative bg-white/5"
              >
                <div className="text-white/80 font-semibold mb-1">{dayNum}</div>
                <div className="flex flex-col gap-1">
                  {dayTrainings.map((t) => (
                    <TooltipLib key={t.id} placement="top" overlay={t.title}>
                      <span
                        className={`text-xs px-1 rounded cursor-pointer ${
                          t.status === "Applied" ? "bg-yellow-400 text-black" : "bg-green-500 text-white"
                        }`}
                      >
                        {t.status}
                      </span>
                    </TooltipLib>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-white/60 mt-2 text-sm">
          Yellow: Applied &nbsp; | &nbsp; Green: Completed
        </p>
      </div>

      {/* Modules in Progress */}
      <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-2xl font-semibold mb-4 text-white">Modules In Progress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {modulesInProgress.map((module) => (
            <div key={module.id} className="bg-white/10 p-4 rounded-xl flex flex-col justify-between border border-white/10">
              <p className="text-white font-semibold">{module.title}</p>
              <p className="text-white/70 text-sm">
                Progress: {module.completedCount || 0}/{module.total || 0} modules
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
