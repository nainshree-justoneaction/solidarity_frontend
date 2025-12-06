"use client"

import Link from "next/link"

export default function ModulesPage() {
  const modules = [
    { id: 1, title: "Fundamentals of Social Impact", icon: "🌍" },
    { id: 2, title: "Digital Skills for Development", icon: "💻" },
    { id: 3, title: "Leadership & Teamwork", icon: "👥" },
    { id: 4, title: "Project Management Basics", icon: "📊" },
    { id: 5, title: "Communication Skills", icon: "🗣️" },
    { id: 6, title: "Career Development", icon: "🚀" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-12 py-8 border-b border-white/10">
        <Link href="/student-dashboard-unlocked" className="text-white hover:scale-105 transition-transform">
          ← Back to Dashboard
        </Link>
        <div className="text-2xl font-bold">Solidarity</div>
        <div></div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-12 py-24">
        <h1 className="text-5xl font-bold mb-4">Training Modules</h1>
        <p className="text-xl text-white/60 mb-16">Complete these modules to unlock your internship opportunities</p>

        <div className="grid grid-cols-3 gap-8">
          {modules.map((module) => (
            <Link
              key={module.id}
              href="/module-details"
              className="p-8 border border-white/10 bg-black hover:scale-105 transition-transform"
            >
              <div className="text-5xl mb-6">{module.icon}</div>
              <h3 className="text-xl font-semibold">{module.title}</h3>
              <p className="text-white/60 mt-4 text-sm">Click to start learning</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
