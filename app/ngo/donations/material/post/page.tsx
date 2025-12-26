"use client"

import { useContext, useState } from "react"
import { DonationsContext } from "@/context/DonationContext"
import { useRouter } from "next/navigation"
import { Truck, Users, Tag } from "lucide-react"

/* ---------------- SDG OPTIONS ---------------- */
const SDGS = [
  { id: 4, label: "Quality Education", color: "#c5192d" },
  { id: 1, label: "No Poverty", color: "#e5243b" },
  { id: 2, label: "Zero Hunger", color: "#dda63b" },
  { id: 3, label: "Good Health", color: "#4c9f38" },
]

export default function PostMaterialDonation() {
  const { addMaterialRequest } = useContext(DonationsContext)
  const router = useRouter()

  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [city, setCity] = useState("")
  const [sdg, setSdg] = useState<any>(null)

  /* ---------------- DERIVED UI ---------------- */
  const impactText =
    category.toLowerCase().includes("book")
      ? "May help 3–5 students"
      : category.toLowerCase().includes("clothes")
      ? "May support 2 families"
      : "May support 1 community center"

  const pickupTimeline = city ? "Pickup expected within 3–5 days" : ""

  const submit = () => {
    if (!category || !quantity || !city || !sdg) {
      alert("Please complete all required fields")
      return
    }

    addMaterialRequest({
      category,
      quantity,
      city,
    })

    router.push("/ngo/donations/material")
  }

  return (
    <div className="max-w-3xl mx-auto py-20 px-6 text-white">

      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Create Material Donation Request
        </h1>
        <p className="text-white/60 mt-3 max-w-xl">
          Request physical resources like books, clothes, or essentials —
          transparently aligned with Sustainable Development Goals.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-10 space-y-10 backdrop-blur-xl">

        {/* BASIC DETAILS */}
        <Section title="Donation Details">
          <Field
            label="Material Category"
            placeholder="Books, Clothes, Electronics"
            value={category}
            onChange={setCategory}
          />

          <Field
            label="Quantity Required"
            placeholder="e.g. 50 books"
            value={quantity}
            onChange={setQuantity}
          />

          <Field
            label="Pickup City"
            placeholder="Indore"
            value={city}
            onChange={setCity}
          />
        </Section>

        {/* SDG TAGS */}
        <Section title="Aligned Sustainable Development Goal">
          <div className="flex flex-wrap gap-3">
            {SDGS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSdg(s)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition ${
                  sdg?.id === s.id
                    ? "bg-white text-black border-white"
                    : "border-white/20 text-white/70 hover:bg-white/10"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                {s.label}
              </button>
            ))}
          </div>
        </Section>

        {/* IMPACT PREVIEW */}
        {(category || quantity) && (
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-green-500/10 border border-green-400/30">
            <Users className="h-6 w-6 text-green-400" />
            <p className="text-green-300 text-sm">
              This donation <b>{impactText}</b> through verified NGO partners.
            </p>
          </div>
        )}

        {/* PICKUP TIMELINE */}
        {pickupTimeline && (
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-blue-500/10 border border-blue-400/30">
            <Truck className="h-6 w-6 text-blue-400" />
            <p className="text-blue-300 text-sm">
              {pickupTimeline} based on availability and location.
            </p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={submit}
          className="w-full py-4 rounded-2xl bg-[#00ADEF] text-black font-semibold text-lg hover:bg-[#00c7ff] transition"
        >
          Publish Material Request
        </button>

        <p className="text-xs text-white/40 text-center">
          No payments involved • Transparent pickup coordination
        </p>
      </div>
    </div>
  )
}

/* ---------------- UI HELPERS ---------------- */

function Section({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-6">{children}</div>
    </div>
  )
}

function Field({ label, placeholder, value, onChange }: any) {
  return (
    <div>
      <label className="text-sm text-white/70">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-2 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none"
      />
    </div>
  )
}
