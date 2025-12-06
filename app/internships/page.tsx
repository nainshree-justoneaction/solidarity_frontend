"use client"

import Link from "next/link"

export default function InternshipsPage() {
  const internships = [
    {
      id: 1,
      title: "Environmental Educator",
      ngo: "Green Earth Foundation",
      duration: "3 months",
      mode: "Hybrid",
      sdgIcons: "🌍",
    },
    {
      id: 2,
      title: "Education Support Coordinator",
      ngo: "Learn to Lead",
      duration: "6 months",
      mode: "On-site",
      sdgIcons: "📚",
    },
    {
      id: 3,
      title: "Water Project Assistant",
      ngo: "Clean Water Initiative",
      duration: "4 months",
      mode: "Hybrid",
      sdgIcons: "💧",
    },
    {
      id: 4,
      title: "Marine Research Intern",
      ngo: "Ocean Guardians",
      duration: "3 months",
      mode: "On-site",
      sdgIcons: "🌊",
    },
    {
      id: 5,
      title: "Community Development Officer",
      ngo: "Social Impact Hub",
      duration: "6 months",
      mode: "Hybrid",
      sdgIcons: "👥",
    },
    {
      id: 6,
      title: "Food Security Project Lead",
      ngo: "Nourish Foundation",
      duration: "3 months",
      mode: "On-site",
      sdgIcons: "🌾",
    },
    {
      id: 7,
      title: "Healthcare Access Advocate",
      ngo: "Health for All",
      duration: "4 months",
      mode: "Hybrid",
      sdgIcons: "🏥",
    },
    {
      id: 8,
      title: "Renewable Energy Consultant",
      ngo: "Clean Tech Solutions",
      duration: "5 months",
      mode: "Remote",
      sdgIcons: "⚡",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-12 py-8 border-b border-white/10">
        <Link href="/student-dashboard-unlocked" className="text-white hover:scale-105 transition-transform">
          ← Back
        </Link>
        <div className="text-2xl font-bold">Solidarity</div>
        <div></div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-0 px-12 py-24">
        <h1 className="text-6xl font-bold mb-6">Available Internships</h1>
        <p className="text-2xl text-white/60 mb-20">Find the perfect opportunity to make real-world impact</p>

        {/* Internship Cards Grid */}
        <div className="grid grid-cols-2 gap-12">
          {internships.map((internship) => (
            <div key={internship.id} className="border border-white/20">
              <div className="p-8">
                <div className="text-4xl mb-6">{internship.sdgIcons}</div>

                <h3 className="text-2xl font-semibold mb-3">{internship.title}</h3>

                <p className="text-white/60 mb-4">{internship.ngo}</p>

                <div className="flex gap-6 mb-8">
                  <div>
                    <p className="text-sm text-white/40 mb-1">Duration</p>
                    <p className="text-lg text-white">{internship.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/40 mb-1">Mode</p>
                    <p className="text-lg text-white">{internship.mode}</p>
                  </div>
                </div>

                {/* SDG 2 Yellow Button */}
                <Link
                  href="/internship-details"
                  className="inline-block text-lg font-semibold px-8 py-3 text-black bg-[#F9C80E] hover:scale-105 transition-transform"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
