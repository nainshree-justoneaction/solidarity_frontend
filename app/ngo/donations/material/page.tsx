"use client"

import Link from "next/link"
import { useContext } from "react"
import { DonationsContext } from "@/context/DonationContext"
import { Package, MapPin, TrendingUp, Plus } from "lucide-react"

export default function MaterialDonationsPage() {
  const { materialRequests } = useContext(DonationsContext)

  const openCount = materialRequests.filter(r => r.status === "Open").length
  const assignedCount = materialRequests.filter(r => r.status === "Assigned").length

  return (
    <div className="space-y-14 p-10 text-white max-w-7xl mx-auto">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Material Donations
          </h1>
          <p className="text-white/60 mt-2 max-w-xl">
            Manage and track physical resource requirements like books,
            clothes, and essentials — transparently and efficiently.
          </p>
        </div>

        <Link
          href="/ngo/donations/material/post"
          className="flex items-center gap-2 bg-[#00ADEF] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#00c7ff] transition"
        >
          <Plus size={18} />
          New Request
        </Link>
      </div>

      {/* ================= KPI STRIP ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <KPI
          icon={<Package />}
          label="Total Requests"
          value={materialRequests.length}
        />
        <KPI
          icon={<TrendingUp />}
          label="Open Requests"
          value={openCount}
        />
        <KPI
          icon={<MapPin />}
          label="Assigned / In Progress"
          value={assignedCount}
        />
      </div>

      {/* ================= INFO STRIP ================= */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <h2 className="text-xl font-semibold">
          How Material Donations Work
        </h2>
        <p className="text-white/60 text-sm mt-2 max-w-3xl">
          NGOs post material needs → donors pledge items → pickup is coordinated
          → items are distributed to beneficiaries. No money involved, only
          verified logistics.
        </p>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {materialRequests.length === 0 && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-14 text-center">
          <h3 className="text-2xl font-semibold">
            No material requests yet
          </h3>
          <p className="text-white/60 mt-3 max-w-md mx-auto">
            Start by posting your first requirement and let donors support your
            cause with meaningful resources.
          </p>

          <Link
            href="/ngo/donations/material/post"
            className="inline-block mt-8 bg-[#00ADEF] text-black px-8 py-4 rounded-2xl font-semibold text-lg"
          >
            Create Material Request
          </Link>
        </div>
      )}

      {/* ================= REQUEST CARDS ================= */}
      {materialRequests.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materialRequests.map(req => (
            <div
              key={req.id}
              className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 hover:shadow-xl transition-all"
            >
              {/* CARD HEADER */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">
                  {req.category}
                </h3>

                <StatusBadge status={req.status} />
              </div>

              {/* DETAILS */}
              <div className="space-y-2 text-sm text-white/70">
                <p>
                  <span className="text-white/50">Quantity:</span>{" "}
                  {req.quantity}
                </p>
                <p className="flex items-center gap-1">
                  <MapPin size={14} />
                  {req.city}
                </p>
              </div>

              {/* IMPACT PREVIEW */}
              <div className="mt-4 bg-green-500/10 border border-green-400/30 rounded-xl p-3">
                <p className="text-green-300 text-xs">
                  Estimated impact: may support multiple families or students
                </p>
              </div>

              {/* CTA */}
              <Link
                href={`/ngo/donations/material/${req.id}`}
                className="inline-block mt-5 text-[#00ADEF] text-sm font-semibold hover:underline"
              >
                View details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ================= REUSABLE ================= */

function KPI({ icon, label, value }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-white/60">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Open: "bg-yellow-400/20 text-yellow-300",
    Assigned: "bg-blue-400/20 text-blue-300",
    Collected: "bg-green-400/20 text-green-300",
  }

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium ${
        styles[status] || "bg-white/10 text-white/60"
      }`}
    >
      {status}
    </span>
  )
}
