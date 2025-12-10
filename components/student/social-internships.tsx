"use client"

import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { internships as allInternships, Internship as InternshipType } from "@/data/internships"

export default function SocialInternships() {
  const router = useRouter()
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [filteredInternships, setFilteredInternships] = useState<InternshipType[]>([])
  const [visibleCount, setVisibleCount] = useState(6) // initially 6 dikhayenge

  useEffect(() => {
    const registration = JSON.parse(sessionStorage.getItem("registration") || "{}")
    const interests = registration.step3?.interests || []
    setSelectedInterests(interests)

    const filtered = allInternships.filter((i) => interests.includes(i.domain))
    setFilteredInternships(filtered)
  }, [])

  const handleApply = (id: string) => {
    const paid = localStorage.getItem("solidarity_paid") === "true"
    if (!paid) {
      router.push("/payment")
      return
    }
    router.push(`/student/internships/${id}`)
  }

  if (selectedInterests.length === 0) {
    return (
      <section className="animate-fade-in">
        <h2 className="text-xl font-bold text-white mb-6">Available Social Internships</h2>
        <p className="text-white/70">Select your interests during registration to see relevant internships here.</p>
      </section>
    )
  }

  const visibleInternships = filteredInternships.slice(0, visibleCount)
  const hasMore = visibleCount < filteredInternships.length

  return (
    <section className="animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-6">Available Social Internships</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleInternships.map((internship, index) => (
          <div
            key={internship.id}
            className="bg-black border border-white/10 rounded p-6 hover:border-white/20 transition-all duration-300 group animate-slide-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div
              className="w-12 h-12 rounded flex items-center justify-center mb-2 text-2xl group-hover:scale-110 transition-transform"
              style={{ backgroundColor: internship.sdgColor + "20" }}
            >
              {internship.icon}
            </div>

            <h3 className="text-white font-semibold mb-1">{internship.title}</h3>
            <p className="text-white/60 text-sm mb-1">{internship.ngoName}</p>
            <p className="text-cfcfcf text-sm mb-4">{internship.description}</p>

            <button
              onClick={() => handleApply(internship.id)}
              className="w-full bg-white text-black font-medium py-2 rounded flex items-center justify-center gap-2 hover:bg-white/90 transition-colors group"
            >
              Apply Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount(filteredInternships.length)}
            className="px-6 py-3 rounded-md border border-white/20 text-white hover:bg-white/5 transition"
          >
            More Internships
          </button>
        </div>
      )}
    </section>
  )
}
