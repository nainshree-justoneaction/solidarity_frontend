"use client"

import { Bell, User } from "lucide-react"

export default function NGOHeader() {
  return (
    <header className="border-b border-white/10 bg-black/50 sticky top-0 z-30">
      <div className="px-8 py-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">NGO Dashboard</h1>

        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/5 rounded transition-colors border border-transparent hover:border-white/10">
            <Bell size={22} className="text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#e5243b] rounded-full" />
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
              <User size={20} className="text-secondary" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">NGO Admin</p>
              <p className="text-xs text-secondary">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
