"use client"

import { ArrowRight } from "lucide-react"

interface Internship {
  id: string
  title: string
  description: string
  sdgColor: string
  icon: string
}

const internships: Internship[] = [
  {
    id: "1",
    title: "Community Service Initiative",
    description: "Work with local communities on social impact projects.",
    sdgColor: "#e5243b",
    icon: "🤝",
  },
  {
    id: "2",
    title: "Hunger Relief Program",
    description: "Support food security and nutrition initiatives.",
    sdgColor: "#dda63b",
    icon: "🌾",
  },
  {
    id: "3",
    title: "Education Outreach",
    description: "Mentor students and improve educational access.",
    sdgColor: "#c5192d",
    icon: "📚",
  },
  {
    id: "4",
    title: "Environmental Conservation",
    description: "Participate in climate action and sustainability projects.",
    sdgColor: "#407f3d",
    icon: "🌱",
  },
  {
    id: "5",
    title: "Water Projects",
    description: "Support clean water and sanitation initiatives.",
    sdgColor: "#26bde2",
    icon: "💧",
  },
  {
    id: "6",
    title: "Marine Protection",
    description: "Work on ocean and marine ecosystem projects.",
    sdgColor: "#0a4a99",
    icon: "🐟",
  },
]

import { useRouter } from "next/navigation"

export default function SocialInternships() {
  const router = useRouter()
  const handleApply = (id: string) => {
    const paid = localStorage.getItem("solidarity_paid") === "true"

    if (!paid) {
      router.push("/dashboard/payment")
      return
    }

    router.push(`/dashboard/internships/${id}`)
  }

  return (
    <section className="animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-6">Available Social Internships</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship, index) => (
          <div
            key={internship.id}
            className="bg-black border border-white/10 rounded p-6 hover:border-white/20 transition-all duration-300 group animate-slide-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div
              className="w-12 h-12 rounded flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform"
              style={{ backgroundColor: internship.sdgColor + "20" }}
            >
              {internship.icon}
            </div>

            <h3 className="text-white font-semibold mb-2">{internship.title}</h3>

            <p className="text-cfcfcf text-sm mb-6">{internship.description}</p>

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
    </section>
  )
}
