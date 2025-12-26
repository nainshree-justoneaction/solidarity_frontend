"use client"

import Link from "next/link"
import { IndianRupee, Package } from "lucide-react"

export default function SelectDonationType() {
  return (
    <div className="max-w-4xl mx-auto py-24 space-y-10 text-white">

      <div className="text-center">
        <h1 className="text-3xl font-bold">What do you want to post?</h1>
        <p className="text-white/60 mt-2">
          Choose the type of donation request
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <TypeCard
          title="Money Donation"
          desc="Raise funds transparently for your cause"
          icon={<IndianRupee size={32} />}
          href="/ngo/donations/money/post/"
        />

        <TypeCard
          title="Material Donation"
          desc="Request books, clothes, essentials & more"
          icon={<Package size={32} />}
          href="/ngo/donations/material/post"
        />
      </div>
    </div>
  )
}

function TypeCard({ title, desc, icon, href }: any) {
  return (
    <Link href={href}>
      <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-10
                      hover:border-green-400/40 hover:bg-green-500/5 transition">
        <div className="text-green-400 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-white/60 text-sm mt-1">{desc}</p>
      </div>
    </Link>
  )
}
