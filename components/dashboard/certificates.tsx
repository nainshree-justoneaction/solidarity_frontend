"use client"

interface Certificate {
  id: string
  title: string
  date: string
  sdgColor: string
}

const certificates: Certificate[] = [
  { id: "1", title: "Social Advocacy", date: "Jan 2024", sdgColor: "#e5243b" },
  { id: "2", title: "Environmental Leadership", date: "Dec 2023", sdgColor: "#407f3d" },
  { id: "3", title: "Community Development", date: "Nov 2023", sdgColor: "#4c9f38" },
  { id: "4", title: "Gender Equality Champion", date: "Oct 2023", sdgColor: "#dd3e39" },
  { id: "5", title: "Education Mentor", date: "Sep 2023", sdgColor: "#c5192d" },
  { id: "6", title: "Sustainability Partner", date: "Aug 2023", sdgColor: "#26bde2" },
  { id: "7", title: "Climate Action Advocate", date: "Jul 2023", sdgColor: "#407f3d" },
  { id: "8", title: "Youth Leader", date: "Jun 2023", sdgColor: "#0066cc" },
]

export default function Certificates() {
  return (
    <section className="animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-6">Certificates</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {certificates.map((cert, index) => (
          <div
            key={cert.id}
            className="bg-black border border-white/10 rounded p-3 text-center hover:border-white/20 transition-colors animate-slide-up group cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Icon circle with SDG color */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-lg group-hover:scale-110 transition-transform"
              style={{ backgroundColor: cert.sdgColor + "30" }}
            >
              ✓
            </div>

            {/* Title */}
            <p className="text-white text-xs font-semibold truncate">{cert.title}</p>

            {/* Date */}
            <p className="text-cfcfcf text-xs mt-1">{cert.date}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
