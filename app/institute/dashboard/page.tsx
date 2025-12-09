"use client"

import { Topbar } from "@/components/institute/Topbar"
import { StatsCard } from "@/components/institute/StatsCard"
import Link from "next/link"

export default function InstituteDashboard() {
  const stats = [
    { label: "Total Students", value: 450, icon: "👥" },
    { label: "Total Faculty", value: 32, icon: "👨‍🏫" },
    { label: "Connected NGOs", value: 12, icon: "🤝" },
    { label: "Active Internships", value: 28, icon: "📋" },
  ]
  const actions = [
    { label: "Add Student", href: "/institute/students" },
    { label: "Add Faculty", href: "/institute/faculty" },
    { label: "Connect NGO", href: "/institute/ngo" },
  ]
  return (
    <div className="min-h-screen bg-[#000000]">
      <Topbar title="Institute Dashboard" />

      <div className="p-8 max-w-7xl mx-auto space-y-10">

        {/* Stats */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <StatsCard key={i} label={stat.label} value={stat.value} icon={stat.icon} />
            ))}
          </div>
        </section>

        {/* Panels */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Recent Activity */}
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm hover:border-[#2A2A2A] transition">
            <h3 className="font-semibold text-lg mb-5 text-white">Recent Activity</h3>

            <div className="space-y-4">
              {["New student registered", "Faculty added", "NGO connected"].map((activity, i) => (
                <div
                  key={i}
                  className="text-[#CFCFCF] text-sm pb-4 border-b border-[#1F1F1F] last:border-0 last:pb-0"
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm hover:border-[#2A2A2A] transition">
            <h3 className="font-semibold text-lg mb-5 text-white">Quick Actions</h3>
            <div className="flex flex-col gap-3"> {/* flex-col + gap ensures spacing */}
              {actions.map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className="w-full"
                >
                  <div className="w-full bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-[#E5E5E5] transition text-center">
                    {action.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
