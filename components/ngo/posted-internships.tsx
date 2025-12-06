"use client"

import { Eye, Edit2 } from "lucide-react"

export default function PostedInternships() {
  const internships = [
    {
      id: 1,
      title: "Community Health Outreach",
      sdg: 3,
      category: "Health",
      applicants: 24,
      status: "Active",
      color: "bg-[#4c9f38]",
    },
    {
      id: 2,
      title: "Education Support Program",
      sdg: 4,
      category: "Education",
      applicants: 32,
      status: "Active",
      color: "bg-[#c5192d]",
    },
    {
      id: 3,
      title: "Environmental Conservation",
      sdg: 13,
      category: "Environment",
      applicants: 18,
      status: "Active",
      color: "bg-[#407f3d]",
    },
    {
      id: 4,
      title: "Poverty Alleviation",
      sdg: 1,
      category: "Community Service",
      applicants: 41,
      status: "Active",
      color: "bg-[#e5243b]",
    },
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">Posted Internships</h2>
      <div className="border border-white/10 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-black/30">
                <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Internship Title</th>
                <th className="text-left px-6 py-4 text-secondary text-sm font-medium">SDG Category</th>
                <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Applicants</th>
                <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Status</th>
                <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {internships.map((internship) => (
                <tr key={internship.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{internship.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${internship.color}`} />
                      <span className="text-secondary text-sm">{internship.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{internship.applicants}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-[#4c9f38]/10 text-[#4c9f38] text-xs font-medium rounded border border-[#4c9f38]/20">
                      {internship.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary">
                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-white/10 rounded transition-colors border border-transparent hover:border-white/10">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded transition-colors border border-transparent hover:border-white/10">
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
