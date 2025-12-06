"use client"

interface Program {
  id: number
  title: string
  ngo: string
  duration: string
  seats: number
  sdg: string
  sdgColor: string
}

const programs: Program[] = [
  {
    id: 1,
    title: "Environmental Conservation",
    ngo: "Green Earth NGO",
    duration: "3 months",
    seats: 5,
    sdg: "13",
    sdgColor: "#407f3d",
  },
  {
    id: 2,
    title: "Education Support",
    ngo: "Learn India",
    duration: "6 months",
    seats: 8,
    sdg: "4",
    sdgColor: "#c5192d",
  },
  {
    id: 3,
    title: "Healthcare Outreach",
    ngo: "Health for All",
    duration: "4 months",
    seats: 6,
    sdg: "3",
    sdgColor: "#4c9f38",
  },
  {
    id: 4,
    title: "Social Enterprise",
    ngo: "Empower Communities",
    duration: "6 months",
    seats: 4,
    sdg: "1",
    sdgColor: "#e5243b",
  },
]

export default function InternshipPrograms() {
  return (
    <div>
      <h2 className="text-black font-bold text-lg mb-4">Available Internship Programs</h2>
      <div className="grid grid-cols-2 gap-4">
        {programs.map((program) => (
          <div key={program.id} className="bg-white border border-black border-opacity-20 p-5 rounded">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-black font-bold text-sm">{program.title}</h3>
                <p className="text-black opacity-60 text-xs mt-1">{program.ngo}</p>
              </div>
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: program.sdgColor }}
              >
                {program.sdg}
              </div>
            </div>

            <div className="space-y-2 mb-4 text-xs text-black opacity-70">
              <p>Duration: {program.duration}</p>
              <p>Available Seats: {program.seats}</p>
            </div>

            <button className="w-full px-3 py-2 border border-black text-black text-xs font-medium hover:bg-black hover:text-white transition-colors rounded">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
