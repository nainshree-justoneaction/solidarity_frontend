"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  User,
  Briefcase,
  BookOpen,
  BarChart3,
  Award,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react"

interface MenuItem {
  label: string
  icon: React.ReactNode
  href: string
  sdgColor?: string
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <Home size={20} />, href: "/dashboard" },
  { label: "Profile", icon: <User size={20} />, href: "/dashboard/profile" },
  { label: "Your Internships", icon: <Briefcase size={20} />, href: "/dashboard/internships" },
  { label: "Training Modules", icon: <BookOpen size={20} />, href: "/dashboard/training", sdgColor: "#c5192d" },
  { label: "Reports", icon: <BarChart3 size={20} />, href: "/dashboard/reports" },
  { label: "Certificates", icon: <Award size={20} />, href: "/dashboard/certificates" },
  { label: "Notifications", icon: <Bell size={20} />, href: "/dashboard/notifications" },
]

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Clear auth session
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("auth")
    }
    router.push("/auth/login")
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-black border border-white p-2"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-black border-r border-white/10 flex flex-col fixed lg:relative h-full z-40 transform lg:transform-none transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="w-12 h-12 bg-white rounded flex items-center justify-center font-bold text-black text-xl">
            S
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname?.startsWith(item.href)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded text-white hover:bg-white/5 transition-colors relative ${
                  isActive ? "bg-white/10 font-semibold" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.sdgColor && (
                  <div
                    className="w-2 h-2 rounded-full absolute left-0"
                    style={{ backgroundColor: item.sdgColor }}
                  />
                )}
                <span className="text-white">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
