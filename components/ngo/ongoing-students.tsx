"use client"

export default function OngoingStudents() {
  const students = [
    {
      id: 1,
      name: "Aarav Kumar",
      internship: "Community Health Outreach",
      sdg: 3,
      color: "bg-[#4c9f38]",
      progress: 65,
    },
    {
      id: 2,
      name: "Priya Sharma",
      internship: "Education Support",
      sdg: 4,
      color: "bg-[#c5192d]",
      progress: 45,
    },
    {
      id: 3,
      name: "Rohan Patel",
      internship: "Environmental Conservation",
      sdg: 13,
      color: "bg-[#407f3d]",
      progress: 78,
    },
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">Ongoing Students</h2>
      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="border border-white/10 rounded p-6 hover:border-white/20 transition-colors bg-black/30 hover:bg-black/50"
          >
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full border-2 border-white/30 flex-shrink-0 bg-white/5 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{student.name[0]}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{student.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${student.color} flex-shrink-0`} />
                </div>
                <p className="text-secondary text-sm mb-4">{student.internship}</p>

                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${student.color} transition-all duration-300`}
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                  <span className="text-secondary text-sm font-medium">{student.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
