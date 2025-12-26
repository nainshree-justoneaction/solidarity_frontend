"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Briefcase,
  IndianRupee,
  CalendarDays,
  Users,
} from "lucide-react"

/* ---------------- PAGE ---------------- */

export default function NGODashboard() {
  const ngoName = "Parikranti Foundation"

  // dummy data
  const internships = [
    { id: 1, title: "Community Outreach Coordinator", applicants: 6 },
    { id: 2, title: "Water Quality Intern", applicants: 18 },
  ]

  const donations = [
    { id: 1, donor: "Acme Foundation", amount: 50000, date: "12 Nov 2025" },
    { id: 2, donor: "Local Donor", amount: 1500, date: "20 Nov 2025" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-14 text-white">

      {/* ================= HERO ================= */}
      <section className="space-y-2">
        <p className="text-sm text-white/50">NGO Dashboard</p>
        <h1 className="text-4xl font-bold">{ngoName}</h1>
        <p className="text-white/60 max-w-2xl">
          Manage internships, donations, and social initiatives from one place.
        </p>
      </section>

      {/* ================= QUICK STATS ================= */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Stat icon={Briefcase} label="Internships Posted" value={internships.length} />
        <Stat icon={Users} label="Total Applicants" value={24} />
        <Stat icon={IndianRupee} label="Donation Drives" value={2} />
        <Stat icon={CalendarDays} label="Events Planned" value={1} />
      </section>

      {/* ================= PRIMARY ACTIONS ================= */}
      <section className="grid md:grid-cols-3 gap-6">
        <ActionCard
          title="Hire Interns"
          description="Post internships and review student applications."
          href="/ngo/internships"
        />

        <ActionCard
          title="Manage Donations"
          description="Create donation drives and track contributions."
          href="/ngo/donations"
        />

        <ActionCard
          title="Events & CSR"
          description="Plan events, CSR activities, and volunteer drives."
          href="/ngo/events"
        />
      </section>

      {/* ================= ACTIVITY ================= */}
      <section className="grid md:grid-cols-3 gap-8">

        {/* Internships */}
        <ActivityCard
          title="Recent Internships"
          actionLabel="Post Internship"
          actionHref="/ngo/internships/create"
        >
          {internships.map((i) => (
            <Row
              key={i.id}
              title={i.title}
              meta={`${i.applicants} applicants`}
              href={`/ngo/internships/${i.id}`}
            />
          ))}
        </ActivityCard>

        {/* Donations */}
        <ActivityCard
          title="Recent Donations"
          actionLabel="Add Donation"
          actionHref="/ngo/donations/create"
        >
          {donations.map((d) => (
            <Row
              key={d.id}
              title={d.donor}
              meta={`₹${d.amount.toLocaleString()} • ${d.date}`}
              href={`/ngo/donations/${d.id}`}
            />
          ))}
        </ActivityCard>

        {/* Events */}
        <ActivityCard
          title="Upcoming Events"
          actionLabel="Create Event"
          actionHref="/ngo/events/create"
        >
          <Row
            title="Beach Cleanup Drive"
            meta="24 Jan 2026 • 40 volunteers"
            href="#"
          />
        </ActivityCard>
      </section>
    </div>
  )
}

/* ================= COMPONENTS ================= */

function Stat({ icon: Icon, label, value }: any) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
      <Icon className="h-6 w-6 text-white/70 mb-3" />
      <p className="text-sm text-white/60">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  )
}

function ActionCard({ title, description, href }: any) {
  return (
    <Link href={href}>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition cursor-pointer h-full">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-white/60">{description}</p>
        <p className="mt-4 text-sm text-blue-400">Open →</p>
      </div>
    </Link>
  )
}

function ActivityCard({ title, actionLabel, actionHref, children }: any) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        <Link
          href={actionHref}
          className="text-xs bg-white text-black px-3 py-1 rounded"
        >
          {actionLabel}
        </Link>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Row({ title, meta, href }: any) {
  return (
    <div className="border-b border-white/10 pb-3 last:border-0">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-white/60">{meta}</p>
      <Link href={href} className="text-sm text-blue-400">
        View
      </Link>
    </div>
  )
}
