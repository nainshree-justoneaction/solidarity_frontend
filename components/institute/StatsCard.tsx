import type React from "react"

interface StatsCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm hover:border-[#2A2A2A] hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#CFCFCF] text-sm font-medium">{label}</h3>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}
