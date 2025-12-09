"use client"

import { User } from "lucide-react"

interface TopbarProps {
  title?: string
}

export function Topbar({ title }: TopbarProps) {
  return (
    <div className="bg-[#000000] border-b border-[#1F1F1F] px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      <h1 className="text-2xl font-bold tracking-tight text-white">{title || "Dashboard"}</h1>

      <button className="w-10 h-10 rounded-full bg-[#111111] border border-[#1F1F1F] flex items-center justify-center hover:border-[#CFCFCF] transition">
        <User size={20} className="text-white" />
      </button>
    </div>
  )
}
