"use client"

import { useState } from "react"
import Link from "next/link"

const menuItems = [
  { name: "Dashboard", href: "/ngo/dashboard" },
  { name: "Posted Internships", href: "/ngo/internships" },
  { name: "Applications", href: "/ngo/internships/applicants" },
  { name: "Students Assigned", href: "/ngo/internships/assigned" },
  { name: "Reports", href: "/ngo/reports" },
  { name: "Donations", href: "/ngo/donations" },
  { name: "Profile", href: "/ngo/profile" },
]

const sdgLabels = [
  { name: "Community Service", sdg: 1 },
  { name: "Hunger Relief", sdg: 2 },
  { name: "Health", sdg: 3 },
  { name: "Education", sdg: 4 },
  { name: "Environment", sdg: 13 },
]

export default function NGOSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const getSdgColor = (sdg: number) => {
    const colors: Record<number, string> = {
      1: "bg-[#e5243b]",
      2: "bg-[#dda63b]",
      3: "bg-[#4c9f38]",
      4: "bg-[#c5192d]",
      13: "bg-[#407f3d]",
    }
    return colors[sdg] || "bg-zinc-500"
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 md:hidden p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        <span className="text-white font-bold text-lg">{isOpen ? "X" : "☰"}</span>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-[#0B0B0B] p-6 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-40`}
      >
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-white">Solidarity</h1>
          <p className="text-zinc-400 text-sm">NGO Admin</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-2 mb-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-3 rounded-md text-white hover:bg-white/5 transition-colors font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* SDG Labels */}
        <div className="border-t border-white/10 pt-6 mb-8">
          <p className="text-xs text-zinc-400 uppercase tracking-wider mb-4">SDG Categories</p>
          <div className="space-y-2">
            {sdgLabels.map((label) => (
              <div key={label.sdg} className="flex items-center gap-2 px-2">
                <div className={`w-3 h-3 rounded-full ${getSdgColor(label.sdg)}`} />
                <span className="text-xs text-zinc-400">{label.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button className="w-full px-4 py-3 rounded-md text-white hover:bg-white/5 transition font-medium">
          Logout
        </button>
      </aside>
    </>
  )
}
