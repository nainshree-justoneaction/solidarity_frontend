"use client"

import Link from "next/link"
import { useState } from "react"

export default function UnlockedDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const modules = [
    { id: 1, title: "Module 1", progress: 45, icon: "📖" },
    { id: 2, title: "Module 2", progress: 20, icon: "📱" },
    { id: 3, title: "Module 3", progress: 0, icon: "🎯" },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-black border-r border-white/10 transition-all duration-300 overflow-hidden`}
      >
        <div className="p-8">
          <h2 className="text-xl font-bold mb-12">Solidarity</h2>

          <nav className="space-y-6">
            <Link
              href="/student-dashboard-unlocked"
              className="block text-lg text-white font-semibold hover:scale-105 transition-transform"
            >
              Dashboard
            </Link>
            <Link href="/modules" className="block text-lg text-white hover:scale-105 transition-transform">
              Training Modules
            </Link>
            <Link href="/internships" className="block text-lg text-white hover:scale-105 transition-transform">
              Available Internships
            </Link>
            <Link href="#reports" className="block text-lg text-white hover:scale-105 transition-transform">
              Reports
            </Link>
            <Link href="#profile" className="block text-lg text-white hover:scale-105 transition-transform">
              Profile
            </Link>
            <hr className="border-white/10 my-8" />
            <Link href="/login" className="block text-lg text-white hover:scale-105 transition-transform">
              Logout
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-12">
        {/* Toggle sidebar button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-8 text-white hover:scale-105 transition-transform text-2xl"
        >
          ☰
        </button>

        <div className="max-w-6xl">
          <h1 className="text-5xl font-bold mb-4">Dashboard</h1>
          <p className="text-xl text-white/60 mb-16">Your learning journey with Solidarity</p>

          {/* Progress Overview Bar */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Your Progress</h2>
            <div className="h-2 bg-white/10 w-full overflow-hidden">
              <div className="h-full w-1/3 bg-[#00ADEF]" />
            </div>
            <p className="mt-4 text-white/60">33% complete</p>
          </div>

          {/* Modules Grid */}
          <h2 className="text-2xl font-semibold mb-8">Training Modules</h2>
          <div className="grid grid-cols-3 gap-8 mb-16">
            {modules.map((module) => (
              <Link
                key={module.id}
                href="/module-details"
                className="p-8 border border-white/10 bg-black hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-4">{module.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{module.title}</h3>
                <div className="h-2 bg-white/10 mb-2">
                  <div className="h-full bg-[#00ADEF]" style={{ width: `${module.progress}%` }} />
                </div>
                <p className="text-sm text-white/60">{module.progress}% complete</p>
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex gap-8">
            <Link
              href="/internships"
              className="text-lg font-semibold px-8 py-3 border-2 border-white hover:scale-105 transition-transform"
            >
              Explore Internships
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
