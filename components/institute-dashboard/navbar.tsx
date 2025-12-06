"use client"

import { Search, Bell } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="h-16 bg-white border-b border-black border-opacity-20 fixed top-0 right-0 left-64 flex items-center justify-between px-8 z-50">
      {/* Institute Name */}
      <h1 className="text-black font-semibold text-lg">Delhi Institute of Technology</h1>

      {/* Search Bar */}
      <div className="flex-1 max-w-xs mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-black text-white placeholder-secondary border border-white border-opacity-20 text-sm focus:outline-none focus:border-opacity-50 transition-colors"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="relative text-black hover:opacity-70 transition-opacity">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-black border-opacity-20">
          <div className="text-right">
            <p className="text-black text-sm font-medium">Dr. Rajesh Kumar</p>
            <p className="text-black text-xs opacity-60">Admin</p>
          </div>
          <div className="w-8 h-8 bg-black border border-white rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">RK</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
