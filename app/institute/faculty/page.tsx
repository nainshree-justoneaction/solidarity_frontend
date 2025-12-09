"use client"

import { Topbar } from "@/components/institute/Topbar"
import { Pencil, Trash2 } from "lucide-react"

// SDG Colors array (17 goals)
const SDG_COLORS = [
  "#E5243B", "#DDA63A", "#4C9F38", "#C5192D", "#FF3A21",
  "#26BDE2", "#FCC30B", "#A21942", "#FD6925", "#DD1367",
  "#FD9D24", "#BF8B2E", "#3F7E44", "#0A97D9", "#56C02B",
  "#00689D", "#19486A"
]

export default function InstituteFaculty() {
  const faculty = [
    { name: "Dr. Smith", email: "smith@uni.edu", dept: "CS", manages: 12, lastActive: "Today" },
    { name: "Prof. Jones", email: "jones@uni.edu", dept: "Engineering", manages: 8, lastActive: "Yesterday" },
    { name: "Dr. Brown", email: "brown@uni.edu", dept: "Business", manages: 15, lastActive: "2 days ago" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Topbar title="Faculty" />
      <div className="p-8 max-w-7xl mx-auto">
        <button className="mb-6 bg-white text-black font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition">
          + Add Faculty
        </button>

        <div className="bg-black border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900">
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">Department</th>
                <th className="px-6 py-3 text-left font-semibold">Manages Students</th>
                <th className="px-6 py-3 text-left font-semibold">Last Active</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((f, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-800 hover:bg-gray-900 transition relative"
                  style={{ borderLeft: `4px solid ${SDG_COLORS[i % SDG_COLORS.length]}` }}
                >
                  <td className="px-6 py-4 font-medium">{f.name}</td>
                  <td className="px-6 py-4 text-gray-300">{f.email}</td>
                  <td className="px-6 py-4 text-gray-300">{f.dept}</td>
                  <td className="px-6 py-4 font-bold">{f.manages}</td>
                  <td className="px-6 py-4 text-gray-300">{f.lastActive}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button className="hover:text-green-400 transition"><Pencil size={18} /></button>
                    <button className="hover:text-red-500 transition"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
