"use client"

import { useState } from "react"
import { Topbar } from "@/components/institute/Topbar"

const reports = [
  { title: "Annual Report", date: new Date(2024, 11, 1) }, // Dec 1, 2024
  { title: "Quarterly Summary", date: new Date(2024, 11, 5) }, // Dec 5
  { title: "Student Performance", date: new Date(2024, 11, 10) }, // Dec 10
]

export default function InstituteReportsCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const month = 11 // December
  const year = 2024

  // get number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // generate array for days
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const reportsMap = reports.reduce((acc, r) => {
    const day = r.date.getDate()
    acc[day] = r
    return acc
  }, {} as Record<number, typeof reports[0]>)

  return (
    <div className="min-h-screen bg-black text-white">
      <Topbar title="Reports" />
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="font-bold text-lg mb-4">December 2024</h2>
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center font-semibold">{d}</div>
          ))}

          {calendarDays.map((day) => {
            const report = reportsMap[day]
            return (
              <div
                key={day}
                className={`h-16 flex flex-col items-center justify-center rounded-lg cursor-pointer transition ${report ? "bg-gray-800 border-l-4 border-green-500 hover:bg-gray-700" : "bg-[#111111] hover:bg-gray-900"
                  }`}
                onClick={() => setSelectedDate(report ? report.date : null)}
              >
                <span className="font-bold">{day}</span>
                {report && <span className="text-xs mt-1 bg-green-500 px-2 py-0.5 rounded-full">Report</span>}
              </div>
            )
          })}
        </div>

        {selectedDate && (
          <div className="mt-6 p-4 bg-gray-900 rounded-2xl">
            <h3 className="font-bold text-lg">
              {reports.find(r => r.date.getTime() === selectedDate.getTime())?.title}
            </h3>
            <p className="text-gray-300 mt-1">
              Last updated: {selectedDate.toDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
