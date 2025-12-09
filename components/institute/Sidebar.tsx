"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart3,
  Award,
  Bell,
  LogOut,
  Settings,
  BookOpen,
  GraduationCap,
} from "lucide-react"

interface SidebarProps {
  userType: "student" | "faculty" | "institute"
}

export function Sidebar({ userType }: SidebarProps) {
  const pathname = usePathname()

  const menuItems = {
    student: [
      { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/student/profile", label: "Profile", icon: Users },
      { href: "/student/internships", label: "Your Internships", icon: Briefcase },
      { href: "/student/modules", label: "Training Modules", icon: BookOpen },
      { href: "/student/reports", label: "Reports", icon: BarChart3 },
      { href: "/student/certificates", label: "Certificates", icon: Award },
      { href: "/student/notifications", label: "Notifications", icon: Bell },
    ],
    faculty: [
      { href: "/faculty/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/faculty/students", label: "Students", icon: GraduationCap },
      { href: "/faculty/internships", label: "Internships", icon: Briefcase },
      { href: "/faculty/reports", label: "Reports", icon: BarChart3 },
    ],
    institute: [
      { href: "/institute/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/institute/students", label: "Students", icon: Users },
      { href: "/institute/faculty", label: "Faculty", icon: GraduationCap },
      { href: "/institute/ngo", label: "Connected NGOs", icon: Briefcase },
      { href: "/institute/internships", label: "Internships", icon: BookOpen },
      { href: "/institute/reports", label: "Reports", icon: BarChart3 },
    ],
  }

  const items = menuItems[userType]

  return (
    <div className="w-64 bg-[#000000] border-r border-[#1F1F1F] flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-[#1F1F1F]">
        <Link href={`/${userType}/dashboard`} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#111111] flex items-center justify-center font-bold">S</div>
          <span className="font-bold">Solidarity</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive ? "bg-[#111111] text-white" : "text-[#CFCFCF] hover:bg-[#111111]"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#1F1F1F]">
        <Link href="/">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#CFCFCF] hover:bg-[#111111] transition">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
