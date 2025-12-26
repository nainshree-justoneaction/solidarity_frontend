"use client"

import Link from "next/link"
import { useContext } from "react"
import { DonationsContext } from "@/context/DonationContext"
import {
  IndianRupee,
  Package,
  HandHeart,
  TrendingUp,
  PlusCircle,
} from "lucide-react"

export default function DonationsDashboard() {
  const { donations, materialRequests } = useContext(DonationsContext)

  const totalRaised = donations.reduce((a, d) => a + d.collected, 0)

  return (
    <div className="max-w-7xl mx-auto p-10 space-y-14 text-white">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Donations Overview
          </h1>
          <p className="text-white/60 mt-2 max-w-2xl">
            Track financial and material contributions made by supporters.
            Maintain transparency, momentum, and measurable impact.
          </p>
        </div>

        <Link
          href="/ngo/donations/post"
          className="inline-flex items-center gap-2 bg-[#00ADEF] text-black
                     px-6 py-3 rounded-xl font-semibold hover:bg-[#00c7ff] transition"
        >
          <PlusCircle size={18} />
          Create Donation Request
        </Link>
      </div>

      {/* ================= EXECUTIVE STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Funds Raised"
          value={`₹${totalRaised.toLocaleString()}`}
          icon={<IndianRupee />}
        />
        <StatCard
          label="Active Money Drives"
          value={donations.length}
          icon={<TrendingUp />}
        />
        <StatCard
          label="Material Requests"
          value={materialRequests.length}
          icon={<Package />}
        />
        <StatCard
          label="Impact Areas"
          value="Education • Relief"
          icon={<HandHeart />}
        />
      </div>

      {/* ================= MAIN ACTION SPLIT ================= */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* MONEY */}
        <ActionBlock
          title="Money Donations"
          desc="Track fundraising drives, donor contributions, and progress toward financial goals."
          href="/ngo/donations/money"
          icon={<IndianRupee />}
          accent="green"
        />

        {/* MATERIAL */}
        <ActionBlock
          title="Material Donations"
          desc="Manage non-monetary contributions such as books, clothes, and essentials."
          href="/ngo/donations/material"
          icon={<Package />}
          accent="blue"
        />
      </div>

      {/* ================= CONTEXT NOTE ================= */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <p className="text-white/60 text-sm max-w-4xl">
          💡 Tip: Material donation requests often convert faster when paired
          with clear impact statements and estimated pickup timelines.
        </p>
      </div>
    </div>
  )
}

/* ================= COMPONENTS ================= */

function StatCard({ label, value, icon }: any) {
  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-3 text-[#00ADEF] mb-3">
        {icon}
        <p className="text-sm text-white/70">{label}</p>
      </div>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  )
}

function ActionBlock({ title, desc, href, icon, accent }: any) {
  const accentColor =
    accent === "green"
      ? "from-green-500/20 to-green-500/5 border-green-400/30"
      : "from-blue-500/20 to-blue-500/5 border-blue-400/30"

  return (
    <Link href={href}>
      <div
        className={`bg-gradient-to-br ${accentColor}
                    border rounded-3xl p-8 h-full
                    hover:scale-[1.02] transition cursor-pointer`}
      >
        <div className="flex items-center gap-3 mb-4 text-white">
          {icon}
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>

        <p className="text-white/70 max-w-md">
          {desc}
        </p>

        <p className="mt-6 text-sm font-semibold text-white">
          View & Manage →
        </p>
      </div>
    </Link>
  )
}
