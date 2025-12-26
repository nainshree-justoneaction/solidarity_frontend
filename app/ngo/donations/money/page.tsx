"use client"

import { useContext } from "react"
import Link from "next/link"
import { DonationsContext } from "@/context/DonationContext"
import { IndianRupee, Users, PlusCircle } from "lucide-react"

export default function MoneyDonationsPage() {
  const { donations } = useContext(DonationsContext)

  const totalRaised = donations.reduce((sum, d) => sum + d.collected, 0)
  const totalTarget = donations.reduce((sum, d) => sum + d.target, 0)

  return (
    <div className="max-w-7xl mx-auto p-10 space-y-14 text-white">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Money Donations
          </h1>
          <p className="text-white/60 mt-2 max-w-2xl">
            Monitor fundraising campaigns, donor contributions,
            and financial progress across all active donation drives.
          </p>
        </div>

        <Link
          href="/ngo/donations/money/post"
          className="inline-flex items-center gap-2 bg-[#00ADEF] text-black
                     px-6 py-3 rounded-xl font-semibold hover:bg-[#00c7ff] transition"
        >
          <PlusCircle size={18} />
          New Money Drive
        </Link>
      </div>

      {/* ================= SUMMARY STRIP ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SummaryCard label="Total Raised" value={`₹${totalRaised.toLocaleString()}`} />
        <SummaryCard label="Total Target" value={`₹${totalTarget.toLocaleString()}`} />
        <SummaryCard label="Active Drives" value={donations.length} />
      </div>

      {/* ================= DONATION DRIVES ================= */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Active Fundraising Drives</h2>

        {donations.length === 0 && (
          <EmptyState />
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {donations.map(d => {
            const percent =
              d.target > 0
                ? Math.round((d.collected / d.target) * 100)
                : 0

            return (
              <div
                key={d.id}
                className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 space-y-4"
              >
                {/* TITLE */}
                <div>
                  <h3 className="text-xl font-semibold">{d.title}</h3>
                  <p className="text-white/60 text-sm">
                    Financial donation campaign
                  </p>
                </div>

                {/* AMOUNTS */}
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">
                    ₹{d.collected.toLocaleString()} raised
                  </span>
                  <span className="text-white/50">
                    of ₹{d.target.toLocaleString()}
                  </span>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00ADEF] transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* META */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Users size={16} />
                    {d.donors.length} donors
                  </div>

                  <Link
                    href={`/ngo/donations/money/${d.id}`}
                    className="text-[#00ADEF] text-sm font-semibold hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ================= COMPONENTS ================= */

function SummaryCard({ label, value }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <p className="text-white/60 text-sm">{label}</p>
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
      <IndianRupee className="h-12 w-12 text-white/40 mx-auto mb-4" />
      <h3 className="text-xl font-semibold">No money drives yet</h3>
      <p className="text-white/60 mt-2 max-w-md mx-auto">
        Create your first fundraising campaign to start receiving
        financial support from donors.
      </p>

      <Link
        href="/ngo/donations/post?type=money"
        className="inline-block mt-6 bg-[#00ADEF] text-black
                   px-6 py-3 rounded-xl font-semibold"
      >
        Create Money Drive
      </Link>
    </div>
  )
}
