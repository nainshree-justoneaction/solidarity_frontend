"use client"

interface Faculty {
  id: number
  name: string
  email: string
  assignedStudents: number
  status: "Active" | "Inactive"
}

const facultyData: Faculty[] = [
  { id: 1, name: "Prof. Anjali Singh", email: "anjali.singh@dit.edu.in", assignedStudents: 24, status: "Active" },
  { id: 2, name: "Dr. Vikram Patel", email: "vikram.patel@dit.edu.in", assignedStudents: 31, status: "Active" },
  { id: 3, name: "Ms. Priya Sharma", email: "priya.sharma@dit.edu.in", assignedStudents: 18, status: "Active" },
  { id: 4, name: "Prof. Arjun Desai", email: "arjun.desai@dit.edu.in", assignedStudents: 0, status: "Inactive" },
]

export default function FacultyManagement() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded flex items-center justify-center text-white bg-red-600 text-xs font-bold">
          📓
        </div>
        <h2 className="text-black font-bold text-lg">Faculty Management</h2>
      </div>

      <div className="border border-black border-opacity-20 rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Assigned Students</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black divide-opacity-10 bg-white">
            {facultyData.map((faculty) => (
              <tr key={faculty.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 text-black text-sm font-medium">{faculty.name}</td>
                <td className="px-6 py-3 text-black text-sm opacity-70">{faculty.email}</td>
                <td className="px-6 py-3 text-black text-sm font-medium">{faculty.assignedStudents}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded border ${
                      faculty.status === "Active"
                        ? "bg-white border-black text-black"
                        : "bg-black text-white border-black opacity-50"
                    }`}
                  >
                    {faculty.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm">
                  <button className="text-black hover:underline">Edit</button>
                  <span className="mx-2 text-black opacity-30">|</span>
                  <button className="text-black hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
