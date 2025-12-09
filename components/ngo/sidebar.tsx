"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut, Menu, X } from "lucide-react"

const menuItems = [
  { name: "Dashboard", icon: "📊", href: "#" },
  { name: "Posted Internships", icon: "🎯", href: "#" },
  { name: "Applications", icon: "📋", href: "#" },
  { name: "Students Assigned", icon: "👥", href: "#" },
  { name: "Reports", icon: "📈", href: "#" },
  { name: "Profile", icon: "👤", href: "#" },
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
    return colors[sdg] || "bg-muted"
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 md:hidden p-2 border border-white/10 rounded hover:bg-white/5"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-black border-r border-white/10 p-6 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-40`}
      >
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-white">Solidarity</h1>
          <p className="text-secondary text-sm">NGO Admin</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-2 mb-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-white/5 rounded transition-colors border border-transparent hover:border-white/10"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* SDG Labels Section */}
        <div className="border-t border-white/10 pt-6 mb-8">
          <p className="text-xs text-secondary uppercase tracking-wider mb-4">SDG Categories</p>
          <div className="space-y-2">
            {sdgLabels.map((label) => (
              <div key={label.sdg} className="flex items-center gap-2 px-2">
                <div className={`w-3 h-3 rounded-full ${getSdgColor(label.sdg)}`} />
                <span className="text-xs text-secondary">{label.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-white/5 rounded transition-colors border border-transparent hover:border-white/10 w-full">
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>
    </>
  )
}
