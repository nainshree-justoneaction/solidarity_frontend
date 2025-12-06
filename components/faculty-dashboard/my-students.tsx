"use client"

export default function MyStudentsSection() {
  const students = [
    {
      id: "1",
      name: "Aarav Sharma",
      enrollmentId: "ESI2024001",
      internship: "Social Impact Coordinator",
      progress: 75,
      status: "Active",
    },
    {
      id: "2",
      name: "Priya Verma",
      enrollmentId: "ESI2024002",
      internship: "Community Outreach",
      progress: 90,
      status: "Active",
    },
    {
      id: "3",
      name: "Rohan Singh",
      enrollmentId: "ESI2024003",
      internship: "Project Management",
      progress: 100,
      status: "Completed",
    },
    {
      id: "4",
      name: "Anaya Patel",
      enrollmentId: "ESI2024004",
      internship: "Research Analyst",
      progress: 45,
      status: "Active",
    },
    {
      id: "5",
      name: "Vikram Das",
      enrollmentId: "ESI2024005",
      internship: "Development Program",
      progress: 60,
      status: "On Hold",
    },
  ]

  return (
    <div className="bg-white border border-black border-opacity-100">
      {/* Header with SDG icon */}
      <div className="px-6 py-4 border-b border-black border-opacity-100 flex items-center gap-2 bg-white">
        <span className="text-sm" style={{ color: "#c5192d" }}>
          📓
        </span>
        <h3 className="text-sm font-bold text-black">My Students</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-black border-opacity-100">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-6 py-3 text-left text-xs font-bold">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Enrollment ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Internship Assigned</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr
                key={student.id}
                className={`border-b border-black border-opacity-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-black bg-opacity-2"
                }`}
              >
                <td className="px-6 py-4 text-xs text-black font-medium">{student.name}</td>
                <td className="px-6 py-4 text-xs text-black text-opacity-70">{student.enrollmentId}</td>
                <td className="px-6 py-4 text-xs text-black">{student.internship}</td>
                <td className="px-6 py-4">
                  <div className="w-20 h-1 bg-black bg-opacity-10 overflow-hidden">
                    <div className="h-full bg-black" style={{ width: `${student.progress}%` }}></div>
                  </div>
                  <span className="text-xs text-black text-opacity-60 mt-1 block">{student.progress}%</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2 py-1 border border-black ${
                      student.status === "Active"
                        ? "border-opacity-100 bg-black text-white"
                        : student.status === "Completed"
                          ? "border-opacity-50 text-black"
                          : "border-opacity-30 text-black text-opacity-70"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs">
                  <button className="px-2 py-1 border border-black border-opacity-100 text-black">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
