"use client"

interface Student {
  id: number
  name: string
  faculty: string
  internship: string
  progress: number
  status: "Ongoing" | "Completed" | "On Hold"
}

const studentData: Student[] = [
  {
    id: 1,
    name: "Aisha Kapoor",
    faculty: "Prof. Anjali Singh",
    internship: "Environmental NGO",
    progress: 65,
    status: "Ongoing",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    faculty: "Dr. Vikram Patel",
    internship: "Education Outreach",
    progress: 40,
    status: "Ongoing",
  },
  {
    id: 3,
    name: "Zara Ali",
    faculty: "Ms. Priya Sharma",
    internship: "Social Enterprise",
    progress: 85,
    status: "Ongoing",
  },
  {
    id: 4,
    name: "Nikhil Gupta",
    faculty: "Prof. Anjali Singh",
    internship: "Healthcare NGO",
    progress: 100,
    status: "Completed",
  },
]

export default function StudentTracking() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded flex items-center justify-center text-white bg-red-500 text-xs font-bold">
          ➕
        </div>
        <h2 className="text-black font-bold text-lg">Student Tracking</h2>
      </div>

      <div className="border border-black border-opacity-20 rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Faculty Mentor</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Internship</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black divide-opacity-10 bg-white">
            {studentData.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 text-black text-sm font-medium">{student.name}</td>
                <td className="px-6 py-3 text-black text-sm opacity-70">{student.faculty}</td>
                <td className="px-6 py-3 text-black text-sm opacity-70">{student.internship}</td>
                <td className="px-6 py-3">
                  <div className="w-full bg-white border border-black border-opacity-20 h-2 rounded overflow-hidden">
                    <div className="bg-black h-full transition-all" style={{ width: `${student.progress}%` }}></div>
                  </div>
                  <p className="text-black text-xs mt-1 opacity-60">{student.progress}%</p>
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded border ${
                      student.status === "Completed"
                        ? "bg-black text-white border-black"
                        : student.status === "On Hold"
                          ? "bg-gray-300 text-black border-black"
                          : "bg-white text-black border-black"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
