"use client"

import { useState, useContext } from "react"
import { DonationsContext } from "@/context/DonationContext"
import { useRouter } from "next/navigation"

export default function PostMoneyDonation() {
  const { addDonationRequest } = useContext(DonationsContext)
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [target, setTarget] = useState("")
  const [description, setDescription] = useState("")

  const submit = () => {
    if (!title || !target) {
      alert("Please complete required fields")
      return
    }

    const id = addDonationRequest({ title, target: Number(target) })
    router.push(`/ngo/donations/money`)
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-6 text-white">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Create Fundraising Drive
        </h1>
        <p className="text-white/60 mt-2">
          Launch a transparent money donation campaign for your cause.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8 backdrop-blur-xl">

        <Field
          label="Donation Title"
          hint="Clear, purpose-driven title builds donor trust"
          value={title}
          onChange={setTitle}
          placeholder="Education for Underprivileged Children"
        />

        <Field
          label="Target Amount (₹)"
          hint="Set a realistic funding goal"
          value={target}
          onChange={setTarget}
          placeholder="50000"
          type="number"
        />

        <div>
          <label className="text-sm text-white/70">
            Description <span className="text-white/40">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Explain how funds will be used"
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none"
          />
        </div>

        {/* CTA */}
        <button
          onClick={submit}
          className="w-full py-4 rounded-2xl bg-[#00ADEF] text-black font-semibold text-lg hover:bg-[#00c7ff] transition"
        >
          Publish Fundraising Campaign
        </button>

        <p className="text-xs text-white/40 text-center">
          Donations are tracked transparently in real-time
        </p>
      </div>
    </div>
  )
}

function Field({ label, hint, value, onChange, placeholder, type = "text" }: any) {
  return (
    <div>
      <label className="text-sm text-white/70">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-2 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none"
      />
      <p className="text-xs text-white/40 mt-1">{hint}</p>
    </div>
  )
}
