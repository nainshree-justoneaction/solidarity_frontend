"use client"

import { useParams, useRouter } from "next/navigation"
import { useContext } from "react"
import { DonationsContext } from "@/context/DonationContext"
import { MapPin, Package, Clock, ArrowLeft } from "lucide-react"

export default function MaterialDetail() {
  const { id } = useParams()
  const router = useRouter()
  const { materialRequests } = useContext(DonationsContext)

  const item = materialRequests.find(m => m.id === id)

  if (!item)
    return (
      <div className="p-10 text-white">
        Request not found.
      </div>
    )

  return (
    <div className="max-w-5xl mx-auto p-10 space-y-12 text-white">

      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4"
          >
            <ArrowLeft size={16} />
            Back to Material Requests
          </button>

          <h1 className="text-4xl font-bold tracking-tight">
            {item.category} Donation Request
          </h1>

          <p className="text-white/60 mt-2 max-w-2xl">
            Physical resource contribution request posted by your organization.
            Donors may pledge items for pickup and distribution.
          </p>
        </div>

        <StatusBadge status={item.status} />
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* -------- LEFT: DETAILS -------- */}
        <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-8 space-y-6">
          <SectionTitle icon={<Package />} title="Request Details" />

          <Detail label="Category" value={item.category} />
          <Detail label="Quantity Required" value={item.quantity} />
          <Detail
            label="Location"
            value={
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {item.city}
              </span>
            }
          />
        </div>

        {/* -------- RIGHT: IMPACT + LOGISTICS -------- */}
        <div className="space-y-6">

          {/* IMPACT PREVIEW */}
          <div className="bg-green-500/10 border border-green-400/30 rounded-3xl p-6">
            <h3 className="font-semibold mb-2 text-green-300">
              Estimated Impact
            </h3>
            <p className="text-green-200 text-sm">
              This donation may support multiple families or students depending
              on distribution needs.
            </p>
          </div>

          {/* SDG TAGS */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="font-semibold mb-3">
              Related SDGs
            </h3>

            <div className="flex flex-wrap gap-2">
              <SDGBadge label="SDG 1 · No Poverty" />
              <SDGBadge label="SDG 4 · Quality Education" />
              <SDGBadge label="SDG 11 · Sustainable Communities" />
            </div>
          </div>

          {/* PICKUP TIMELINE */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} />
              <h3 className="font-semibold">
                Estimated Pickup Timeline
              </h3>
            </div>

            <p className="text-white/60 text-sm">
              Pickup is usually coordinated within
              <b className="text-white"> 5–7 working days </b>
              after donor confirmation.
            </p>
          </div>
        </div>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex gap-4">
        <button className="bg-[#00ADEF] text-black px-8 py-3 rounded-xl font-semibold hover:bg-[#00c7ff] transition">
          Mark as Assigned
        </button>

        <button className="border border-white/20 px-8 py-3 rounded-xl text-white hover:bg-white/5 transition">
          Edit Request
        </button>
      </div>
    </div>
  )
}

/* ================= REUSABLE ================= */

function SectionTitle({ icon, title }: any) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  )
}

function Detail({ label, value }: any) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-white/50">
        {label}
      </p>
      <p className="text-white font-medium mt-1">
        {value}
      </p>
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
      className={`text-sm px-4 py-2 rounded-full font-semibold ${
        styles[status] || "bg-white/10 text-white/60"
      }`}
    >
      {status}
    </span>
  )
}

function SDGBadge({ label }: { label: string }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70">
      {label}
    </span>
  )
}
