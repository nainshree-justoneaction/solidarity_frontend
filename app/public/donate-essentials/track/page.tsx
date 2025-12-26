"use client"

import { CheckCircle, Clock, Truck, HandHeart, Package } from "lucide-react"

const DONATION = {
  id: "DG-10241",
  category: "Books",
  quantity: "5 items",
  city: "Indore",
  ngo: "Parikranti Foundation",
  submittedAt: "23 Dec 2025",
  status: "pickup", // submitted | assigned | pickup | delivered
}

const STEPS = [
  {
    key: "submitted",
    title: "Donation Submitted",
    description: "Your donation request has been received.",
    icon: CheckCircle,
  },
  {
    key: "assigned",
    title: "NGO Assigned",
    description: "An NGO partner has been matched for your donation.",
    icon: HandHeart,
  },
  {
    key: "pickup",
    title: "Pickup Scheduled",
    description: "Pickup is being coordinated with you.",
    icon: Truck,
  },
  {
    key: "delivered",
    title: "Delivered",
    description: "Items delivered to beneficiaries.",
    icon: Package,
  },
]

export default function TrackDonationPage() {
  const currentIndex = STEPS.findIndex(
    (s) => s.key === DONATION.status
  )

  return (
    <div className="max-w-3xl mx-auto py-20 space-y-12">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Track Your Donation
        </h1>
        <p className="text-white/60">
          Donation ID: <span className="text-white">{DONATION.id}</span>
        </p>
      </div>

      {/* SUMMARY CARD */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
        <p className="text-white font-medium">
          {DONATION.category} • {DONATION.quantity}
        </p>
        <p className="text-white/60 text-sm">
          City: {DONATION.city}
        </p>
        <p className="text-white/60 text-sm">
          NGO Partner: {DONATION.ngo}
        </p>
        <p className="text-white/40 text-xs">
          Submitted on {DONATION.submittedAt}
        </p>
      </div>

      {/* TIMELINE */}
      <div className="space-y-6">
        {STEPS.map((step, index) => {
          const Icon = step.icon
          const active = index <= currentIndex

          return (
            <div
              key={step.key}
              className="flex gap-4 items-start"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${active
                    ? "bg-[#00ADEF] text-black"
                    : "bg-white/10 text-white/40"
                  }
                `}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1">
                <h3
                  className={`font-semibold ${active ? "text-white" : "text-white/50"
                    }`}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-white/60">
                  {step.description}
                </p>
              </div>

              {active && (
                <CheckCircle className="text-green-400 mt-1" size={18} />
              )}
            </div>
          )
        })}
      </div>

      {/* FOOTNOTE */}
      <div className="text-xs text-white/40">
        Status updates are shared as the donation progresses.
      </div>
    </div>
  )
}
