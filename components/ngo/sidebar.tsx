"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  BarChart3,
  HandHeart,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react"

/* ---------------- MENU ---------------- */

const menuItems = [
  { name: "Dashboard", href: "/ngo/dashboard", icon: LayoutDashboard },
  { name: "Posted Internships", href: "/ngo/internships", icon: Briefcase },
  { name: "Applications", href: "/ngo/internships/applicants", icon: FileText },
  { name: "Students Assigned", href: "/ngo/internships/assigned", icon: Users },
  { name: "Reports", href: "/ngo/reports", icon: BarChart3 },
  { name: "Donations", href: "/ngo/donations", icon: HandHeart },
  { name: "Profile", href: "/ngo/profile", icon: User },
]

const sdgLabels = [
  { name: "Community Service", color: "#E5243B" },
  { name: "Hunger Relief", color: "#DDA63A" },
  { name: "Health", color: "#4C9F38" },
  { name: "Education", color: "#C5192D" },
  { name: "Environment", color: "#3F7E44" },
]

/* ---------------- COMPONENT ---------------- */

export default function NGOSidebar() {
  const [open, setOpen] = useState(false)
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
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden bg-black border border-white/10 p-2 rounded-lg"
      >
        {open ? <X className="text-white" /> : <Menu className="text-white" />}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 w-64 bg-[#0B0B0B]
        border-r border-white/10 flex flex-col z-40
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* BRAND */}
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-white">JustOneAction</h1>
          <p className="text-xs text-white/40 mt-1">NGO Admin Panel</p>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {menuItems.map((item) => {
            const active = pathname.startsWith(item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg
                  text-sm font-medium transition
                  ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5"
                  }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* SDG TAGS */}
        <div className="px-6 py-5 border-t border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-wide mb-3">
            SDG Focus Areas
          </p>
          <div className="space-y-2">
            {sdgLabels.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs text-white/60">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                {s.name}
              </div>
            ))}
          </div>
        </div>

        {/* LOGOUT */}
        <div className="px-4 py-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3
              rounded-lg text-white/70 hover:bg-white/5 transition text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
