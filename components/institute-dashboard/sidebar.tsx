"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black border-r border-white border-opacity-10 fixed left-0 top-0 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white border-opacity-10">
        <h2 className="text-white font-bold text-lg">Solidarity</h2>
        <p className="text-secondary text-xs mt-1">Institute Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <NavItem icon="📊" label="Dashboard" sdg={null} href="/institute" />
        <NavItem icon="📓" label="Faculty Panel" sdg="4" href="/institute/faculty" />
        <NavItem icon="➕" label="Student Tracking" sdg="5" href="/institute/students" />
        <NavItem icon="🔗" label="Internships" sdg="8" href="/institute/internships" />
        <NavItem icon="🕊️" label="Reports" sdg="16" href="/institute/reports" />
        <NavItem icon="👤" label="Profile" sdg={null} href="/institute/profile" />
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white border-opacity-10">
        <button className="flex items-center gap-3 text-secondary hover:text-white w-full p-2 text-sm transition-colors">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}

function NavItem({ icon, label, sdg, href }: { icon: string; label: string; sdg: string | null; href: string }) {
  const sdgColors: Record<string, string> = {
    "4": "#c5192d",
    "5": "#dd3e39",
    "8": "#a21942",
    "16": "#0066cc",
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 text-secondary hover:text-white rounded text-sm transition-colors group"
    >
      <span className="text-lg">{icon}</span>
      <span className="flex-1">{label}</span>
      {sdg && (
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: sdgColors[sdg] }} title={`SDG ${sdg}`}></div>
      )}
    </Link>
  )
}
