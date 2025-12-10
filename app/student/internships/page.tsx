"use client"

import { useEffect, useState } from "react"
import { internships as allInternships } from "@/data/internships"
import Link from "next/link"

interface Internship {
  id: string
  title: string
  ngo: string
  sdgIcon: string
  description: string
  color: string
  domain: string
}

export default function InternshipsPage() {
  const [appliedInternships, setAppliedInternships] = useState<Internship[]>([])
  const [suggestedInternships, setSuggestedInternships] = useState<Internship[]>([])

  useEffect(() => {
    // Get applied internship IDs from sessionStorage
    const appliedIds: string[] = JSON.parse(sessionStorage.getItem("appliedInternships") || "[]")
    const applied = allInternships.filter((i) => appliedIds.includes(i.id))
    setAppliedInternships(applied)

    // Suggest other internships (same domain as applied ones)
    const domains = applied.map((i) => i.domain)
    const suggested = allInternships.filter((i) => !appliedIds.includes(i.id) && domains.includes(i.domain))
    setSuggestedInternships(suggested)
  }, [])

  return (
    <div className="space-y-10 px-4 sm:px-8 py-8 max-w-6xl mx-auto">
      {/* Applied Internships */}
      <div>
        <h1 className="text-3xl font-bold mb-6">Your Applied Internships</h1>
        {appliedInternships.length === 0 ? (
          <p className="text-white/60">You haven't applied for any internships yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliedInternships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white/5 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-white/10 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{internship.title}</h2>
                  <p className="text-white/60 text-sm">{internship.ngo}</p>
                  <div className="text-3xl">{internship.sdgIcon}</div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <Link
                    href={`/student/internships/${internship.id}`}
                    className="text-sm font-medium px-3 py-1 rounded-lg bg-[#00ADEF] text-black hover:bg-[#00c7ff] transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Internships */}
      {suggestedInternships.length > 0 && (
        <div>
          <h1 className="text-3xl font-bold mb-6">Suggested Internships for You</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedInternships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white/5 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-white/10 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{internship.title}</h2>
                  <p className="text-white/60 text-sm">{internship.ngo}</p>
                  <div className="text-3xl">{internship.sdgIcon}</div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <Link
                    href={`/student/internships/${internship.id}`}
                    className="text-sm font-medium px-3 py-1 rounded-lg bg-[#00ADEF] text-black hover:bg-[#00c7ff] transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
