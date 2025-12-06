// app/dashboard/internships/page.tsx
"use client"

import { useEffect, useState } from "react"

interface Internship {
  id: number
  title: string
  organization: string
  status: "Applied" | "In Progress" | "Completed"
}

const mockInternships: Internship[] = [
  { id: 1, title: "Community Survey", organization: "NGO A", status: "Completed" },
  { id: 2, title: "Plantation Drive", organization: "NGO B", status: "In Progress" },
  { id: 3, title: "Health Camp Volunteering", organization: "NGO C", status: "Applied" },
  { id: 4, title: "Digital Awareness Program", organization: "NGO D", status: "Applied" },
]

export default function InternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([])

  useEffect(() => {
    setInternships(mockInternships)
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Internships</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship) => (
          <div
            key={internship.id}
            className="bg-white/5 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-white/10 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{internship.title}</h2>
              <p className="text-white/60 text-sm">{internship.organization}</p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  internship.status === "Completed"
                    ? "bg-green-600"
                    : internship.status === "In Progress"
                    ? "bg-yellow-600"
                    : "bg-gray-600"
                }`}
              >
                {internship.status}
              </span>

              <button
                className="text-sm font-medium px-3 py-1 rounded-lg bg-[#00ADEF] text-black hover:bg-[#00c7ff] transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
