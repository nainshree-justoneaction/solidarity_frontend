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
  { label: "Dashboard", icon: <Home size={18} />, href: "/student/dashboard" },
  { label: "Profile", icon: <User size={18} />, href: "/student/profile" },
  { label: "Your Internships", icon: <Briefcase size={18} />, href: "/student/internships" },
  {
    label: "Training Modules",
    icon: <BookOpen size={18} />,
    href: "/student/training",
    sdgColor: "#c5192d",
  },
  { label: "Reports", icon: <BarChart3 size={18} />, href: "/student/reports" },
  { label: "Certificates", icon: <Award size={18} />, href: "/student/certificates" },
  { label: "Notifications", icon: <Bell size={18} />, href: "/student/notifications" },
]

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const logout = () => {
    sessionStorage.removeItem("auth")
    router.push("/auth/login")
  }

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden
                   bg-black border border-white/20 p-2 rounded-md"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`w-64 bg-black border-r border-white/10
                    flex flex-col fixed lg:relative h-full z-40
                    transition-transform ${
                      isOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }`}
      >
        {/* LOGO */}
        <div className="p-6 border-b border-white/10 text-white font-bold">
          Just One Action
        </div>

        {/* NAV */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname?.startsWith(item.href)
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm transition relative ${
                  isActive
                    ? "bg-white/10 text-white font-semibold"
                    : "text-white/70 hover:bg-white/5"
                }`}
              >
                {item.sdgColor && (
                  <span
                    className="absolute left-2 w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.sdgColor }}
                  />
                )}
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3
                       rounded-md text-white/70 hover:bg-white/5 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
