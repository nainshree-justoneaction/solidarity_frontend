"use client"

import { User } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function DashboardHeader() {
  const { fullName } = useAuth()

  return (
    <header className="bg-black border-b border-white/10 px-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
        <div className="flex items-center gap-4">
          {/* User Icon with tooltip below */}
          <div className="relative group">
            <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
              <User size={24} className="text-white" />
            </div>
            {/* Tooltip */}
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">
              {fullName}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
