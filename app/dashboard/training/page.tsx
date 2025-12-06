// app/dashboard/training/page.tsx
"use client"

import { useEffect, useState } from "react"

interface Module {
  id: number
  title: string
  description: string
  progress: number // 0-100
}

const mockModules: Module[] = [
  { id: 1, title: "Sustainable Development Goals", description: "Learn about SDGs and their impact.", progress: 70 },
  { id: 2, title: "Community Engagement", description: "Tips for working with local communities.", progress: 40 },
  { id: 3, title: "Project Management", description: "Manage projects efficiently and effectively.", progress: 90 },
  { id: 4, title: "Digital Volunteering", description: "Use digital tools for social impact.", progress: 20 },
]

export default function TrainingModulesPage() {
  const [modules, setModules] = useState<Module[]>([])

  useEffect(() => {
    setModules(mockModules)
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Training Modules</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="bg-white/5 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-white/10 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">{mod.title}</h2>
              <p className="text-white/60 text-sm">{mod.description}</p>
            </div>

            <div className="mt-4">
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 bg-[#00ADEF] rounded-full transition-all"
                  style={{ width: `${mod.progress}%` }}
                />
              </div>
              <p className="text-right text-white/60 text-sm mt-1">{mod.progress}% completed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
