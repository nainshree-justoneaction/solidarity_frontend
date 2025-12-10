"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { internships } from "@/data/internships"

interface Internship {
  id: string
  title: string
  ngo: string
  duration?: string
  mode?: string
  hours?: string
  location?: string
  sdgIcon: string
  description: string
  expectations?: string[]
  color: string
  domain: string
}

export default function InternshipDetailsPage() {
  const router = useRouter()
  const { id } = useParams()
  const [internship, setInternship] = useState<Internship | null>(null)
  const [isApplied, setIsApplied] = useState(false)

  useEffect(() => {
    const found = internships.find((i) => i.id === id) || null
    setInternship(found)

    // Check if already applied
    const appliedIds: string[] = JSON.parse(sessionStorage.getItem("appliedInternships") || "[]")
    setIsApplied(found ? appliedIds.includes(found.id) : false)
  }, [id])

  if (!internship) {
    return (
      <div className="text-white p-10 text-center text-2xl">
        Loading or Internship Not Found
      </div>
    )
  }

  const handleApply = () => {
    if (isApplied) return // Prevent double apply

    // Save in sessionStorage
    const appliedIds: string[] = JSON.parse(sessionStorage.getItem("appliedInternships") || "[]")
    sessionStorage.setItem("appliedInternships", JSON.stringify([...appliedIds, internship.id]))

    setIsApplied(true)
    router.push(`/student/internships/${internship.id}/apply`)
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-6">
        <button onClick={() => router.back()} className="text-white text-base hover:text-gray-300 transition">
          ← Back
        </button>
        <div className="text-xl sm:text-2xl font-bold">Solidarity</div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="text-5xl sm:text-6xl">{internship.sdgIcon}</div>
          <div>
            <p className="text-white/70 mb-1">{internship.ngo}</p>
            <h1 className="text-3xl sm:text-4xl font-bold">{internship.title}</h1>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">About This Internship</h2>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">{internship.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {internship.duration && <Detail label="Duration" value={internship.duration} />}
          {internship.mode && <Detail label="Mode" value={internship.mode} />}
          {internship.hours && <Detail label="Commitment" value={internship.hours} />}
          {internship.location && <Detail label="Location" value={internship.location} />}
        </div>

        {internship.expectations && internship.expectations.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">What's Expected</h2>
            <ul className="list-disc list-inside text-white/80 space-y-1">
              {internship.expectations.map((exp, idx) => (
                <li key={idx}>{exp}</li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleApply}
            disabled={isApplied}
            style={{ background: internship.color || "#2563eb" }}
            className={`rounded-lg text-xl sm:text-2xl font-semibold px-10 py-3 text-white shadow-md hover:scale-105 transition-transform ${isApplied ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isApplied ? "Already Applied" : "Apply for This Internship"}
          </button>
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs sm:text-sm text-white/50 mb-1">{label}</p>
      <p className="text-lg sm:text-xl font-semibold">{value}</p>
    </div>
  )
}
