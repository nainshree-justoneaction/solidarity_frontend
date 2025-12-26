"use client"

import { useState } from "react"
import {
  Shirt,
  BookOpen,
  Laptop,
  Home,
  Users,
  HandHeart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

/* ---------------- TYPES ---------------- */

type Category = {
  id: string
  label: string
  icon: any
  impact: string
}

interface DonationPayload {
  id: string
  category: string
  description: string
  quantity: string
  city: string
  address: string
  notes?: string
  status: "submitted"
  createdAt: string
}

/* ---------------- CONSTANTS ---------------- */

const CATEGORIES: Category[] = [
  { id: "clothes", label: "Clothes", icon: Shirt, impact: "5 people" },
  { id: "books", label: "Books", icon: BookOpen, impact: "3 students" },
  { id: "electronics", label: "Electronics", icon: Laptop, impact: "1 learning center" },
  { id: "essentials", label: "Household Essentials", icon: Home, impact: "1 family" },
]

const DUMMY_NGO = {
  name: "Parikranti Foundation",
  location: "Indore, Madhya Pradesh",
  focus: "Education & Community Support",
}

/* ---------------- PAGE ---------------- */

export default function DonateGoodsPage() {
  const router = useRouter()

  const [category, setCategory] = useState<Category | null>(null)
  const [form, setForm] = useState({
    description: "",
    quantity: "",
    city: "",
    address: "",
    notes: "",
  })

  const handleSubmit = () => {
    if (!category || !form.description || !form.quantity || !form.city) {
      alert("Please fill all required fields")
      return
    }

    const donation: DonationPayload = {
      id: `DG-${Date.now()}`,
      category: category.label,
      description: form.description,
      quantity: form.quantity,
      city: form.city,
      address: form.address,
      notes: form.notes,
      status: "submitted",
      createdAt: new Date().toISOString(),
    }

    const existing = JSON.parse(
      localStorage.getItem("goods_donations") || "[]"
    )

    localStorage.setItem(
      "goods_donations",
      JSON.stringify([donation, ...existing])
    )

    router.push("/public/donate-goods/track")
  }

  return (
    <div className="max-w-4xl mx-auto py-20 space-y-14">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Donate Goods. Multiply Impact.
        </h1>
        <p className="text-white/60 max-w-2xl">
          Donate usable items and help NGOs support communities through
          education, relief, and essential resources.
        </p>
      </div>

      {/* CATEGORY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const active = category?.id === cat.id

          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat)}
              className={`p-6 rounded-2xl border text-left transition
                ${
                  active
                    ? "border-[#00ADEF] bg-[#00ADEF]/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }
              `}
            >
              <Icon className="h-8 w-8 text-[#00ADEF] mb-4" />
              <h3 className="text-lg font-semibold text-white">
                {cat.label}
              </h3>
              <p className="text-sm text-white/60">
                Gently used • Usable condition
              </p>
            </button>
          )
        })}
      </div>

      {/* CONDITIONAL FLOW */}
      {category && (
        <>
          {/* IMPACT */}
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-green-500/10 border border-green-400/30">
            <Users className="h-6 w-6 text-green-400" />
            <p className="text-green-300 text-sm">
              Your <b>{category.label.toLowerCase()}</b> may help{" "}
              <b>{category.impact}</b>.
            </p>
          </div>

          {/* NGO */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <HandHeart className="h-5 w-5 text-[#00ADEF]" />
              <h3 className="text-lg font-semibold text-white">
                Likely NGO Partner
              </h3>
            </div>

            <p className="text-white font-medium">{DUMMY_NGO.name}</p>
            <p className="text-white/60 text-sm">
              {DUMMY_NGO.location} • {DUMMY_NGO.focus}
            </p>

            <p className="text-xs text-white/40 mt-2">
              Final assignment depends on availability & location.
            </p>
          </div>

          {/* FORM */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Donation Details
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label="Item Description*"
                value={form.description}
                onChange={(v) => setForm({ ...form, description: v })}
              />
              <Input
                label="Approx Quantity*"
                value={form.quantity}
                onChange={(v) => setForm({ ...form, quantity: v })}
              />
              <Input
                label="City*"
                value={form.city}
                onChange={(v) => setForm({ ...form, city: v })}
              />
              <Input
                label="Pickup Address"
                value={form.address}
                onChange={(v) => setForm({ ...form, address: v })}
              />
            </div>

            <textarea
              placeholder="Additional notes (optional)"
              className="w-full rounded-xl bg-black border border-white/10 px-4 py-3 text-white"
              rows={3}
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
            />

            <Button
              size="lg"
              className="bg-[#00ADEF] text-black px-8"
              onClick={handleSubmit}
            >
              Submit Donation Request
            </Button>

            <p className="text-xs text-white/40">
              No money involved. Material donation only.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

/* ---------------- INPUT ---------------- */

function Input({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="text-sm text-white/60">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 rounded-xl bg-black border border-white/10 px-4 py-3 text-white focus:outline-none"
      />
    </div>
  )
}
