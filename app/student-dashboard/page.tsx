"use client"

import Link from "next/link"
import { useState } from "react"

export default function LockedDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
            <Link href="/student-dashboard" className="block text-lg text-white hover:scale-105 transition-transform">
              Home
            </Link>
            <Link href="#profile" className="block text-lg text-white hover:scale-105 transition-transform">
              Your Profile
            </Link>
            <div className="text-lg text-white/40">Internships (locked)</div>
            <div className="text-lg text-white/40">Modules (locked)</div>
            <div className="text-lg text-white/40">Reports (locked)</div>
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
          className="mb-8 text-white hover:scale-105 transition-transform"
        >
          ☰
        </button>

        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold mb-4">Welcome, Student</h1>
          <p className="text-2xl text-white/60 mb-16">Complete your profile & unlock your training modules.</p>

          {/* Locked sections preview */}
          <div className="space-y-8 mb-16">
            <div className="opacity-40 pointer-events-none">
              <h3 className="text-2xl font-semibold mb-4">Training Modules</h3>
              <div className="grid grid-cols-3 gap-8">
                <div className="bg-black border border-white/10 p-8">
                  <div className="h-24 bg-white/5 rounded"></div>
                  <p className="mt-4 text-white/40">Module 1</p>
                </div>
                <div className="bg-black border border-white/10 p-8">
                  <div className="h-24 bg-white/5 rounded"></div>
                  <p className="mt-4 text-white/40">Module 2</p>
                </div>
                <div className="bg-black border border-white/10 p-8">
                  <div className="h-24 bg-white/5 rounded"></div>
                  <p className="mt-4 text-white/40">Module 3</p>
                </div>
              </div>
            </div>

            <div className="opacity-40 pointer-events-none">
              <h3 className="text-2xl font-semibold mb-4">Social Internships</h3>
              <div className="border border-white/10 p-8">
                <p className="text-white/40">Available internships will appear here</p>
              </div>
            </div>

            <div className="opacity-40 pointer-events-none">
              <h3 className="text-2xl font-semibold mb-4">Reports</h3>
              <div className="border border-white/10 p-8">
                <p className="text-white/40">Your progress reports will appear here</p>
              </div>
            </div>
          </div>

          {/* CTA Button - SDG 6 Blue */}
          <Link
            href="/payment"
            className="inline-block text-2xl font-semibold px-12 py-4 text-white bg-[#00ADEF] hover:scale-105 transition-transform"
          >
            Unlock Full Access – ₹365
          </Link>
        </div>
      </div>
    </div>
  )
}
