// app/dashboard/reports/page.tsx
"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts"

interface Internship {
  id: number
  title: string
  status: "Applied" | "In Progress" | "Completed"
}

const mockInternships: Internship[] = [
  { id: 1, title: "Community Survey", status: "Completed" },
  { id: 2, title: "Plantation Drive", status: "In Progress" },
  { id: 3, title: "Health Camp", status: "Applied" },
  { id: 4, title: "Digital Awareness", status: "Applied" },
  { id: 5, title: "Tree Plantation", status: "In Progress" },
  { id: 6, title: " Plantation", status: "In Progress" },
  { id: 7, title: "37 Plantation", status: "In Progress" },
  { id: 8, title: "Women Empowerment", status: "Completed" },
]

const statusColors: Record<string, string> = {
  Applied: "#6B7280", // gray
  "In Progress": "#FACC15", // yellow
  Completed: "#10B981", // green
}

export default function ReportsPage() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [chartData, setChartData] = useState<{ status: string; count: number }[]>([])

  useEffect(() => {
    setInternships(mockInternships)

    const statusCount: Record<string, number> = {}
    mockInternships.forEach((i) => {
      statusCount[i.status] = (statusCount[i.status] || 0) + 1
    })

    setChartData(
      Object.entries(statusCount).map(([status, count]) => ({ status, count }))
    )
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Reports</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {["Applied", "In Progress", "Completed"].map((status) => (
          <div
            key={status}
            className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 flex flex-col items-center justify-center transition transform hover:scale-105"
          >
            <p className="text-white/60">{status}</p>
            <p className="text-2xl font-bold mt-2">
              {internships.filter((i) => i.status === status).length}
            </p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Internship Status Distribution</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            barCategoryGap="30%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis
              dataKey="status"
              stroke="#ffffff80"
              tick={{ fill: "#ffffffcc", fontSize: 14 }}
            />
            <YAxis
              stroke="#ffffff80"
              tick={{ fill: "#ffffffcc", fontSize: 14 }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "none", borderRadius: 8 }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
            <Bar
              dataKey="count"
              radius={[8, 8, 0, 0]}
              barSize={40}
              isAnimationActive={true}
            >
              {chartData.map((entry) => (
                <Cell key={entry.status} fill={statusColors[entry.status]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
