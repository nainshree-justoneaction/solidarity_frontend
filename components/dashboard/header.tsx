"use client"

import { User } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="bg-black border-b border-white/10 px-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
            <User size={24} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  )
}
