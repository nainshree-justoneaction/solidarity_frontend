"use client"

import Link from "next/link"

export default function InternshipDetailsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-12 py-8 border-b border-white/10">
        <Link href="/internships" className="text-white hover:scale-105 transition-transform">
          ← Back to Internships
        </Link>
        <div className="text-2xl font-bold">Solidarity</div>
        <div></div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-12 py-24">
        <div className="flex items-start gap-8 mb-16">
          <div className="text-6xl">🌍</div>
          <div>
            <p className="text-white/60 mb-2">Green Earth Foundation</p>
            <h1 className="text-5xl font-bold">Environmental Educator</h1>
          </div>
        </div>

        {/* Description */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">About This Internship</h2>
          <p className="text-lg text-white/80 leading-relaxed mb-8">
            Join Green Earth Foundation as an Environmental Educator and help communities understand the importance of
            environmental conservation. You'll lead workshops, develop educational materials, and engage with local
            schools to promote sustainable practices.
          </p>
        </div>

        {/* Key Details */}
        <div className="mb-16 grid grid-cols-2 gap-12">
          <div>
            <p className="text-sm text-white/40 mb-2">Duration</p>
            <p className="text-2xl font-semibold">3 months</p>
          </div>
          <div>
            <p className="text-sm text-white/40 mb-2">Mode</p>
            <p className="text-2xl font-semibold">Hybrid</p>
          </div>
          <div>
            <p className="text-sm text-white/40 mb-2">Commitment</p>
            <p className="text-2xl font-semibold">20 hours/week</p>
          </div>
          <div>
            <p className="text-sm text-white/40 mb-2">Location</p>
            <p className="text-2xl font-semibold">New Delhi</p>
          </div>
        </div>

        {/* Expectations */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">What's Expected</h2>
          <ul className="space-y-4 text-lg text-white/80">
            <li className="flex gap-4">
              <span>•</span> Develop and deliver environmental education workshops
            </li>
            <li className="flex gap-4">
              <span>•</span> Create engaging educational materials and content
            </li>
            <li className="flex gap-4">
              <span>•</span> Collaborate with schools and communities
            </li>
            <li className="flex gap-4">
              <span>•</span> Document impact and outcomes
            </li>
            <li className="flex gap-4">
              <span>•</span> Participate in team meetings and training
            </li>
          </ul>
        </div>

        {/* CTA - SDG 15 Green */}
        <Link
          href="/applied"
          className="inline-block text-2xl font-semibold px-12 py-4 text-white bg-[#009739] hover:scale-105 transition-transform"
        >
          Apply for This Internship
        </Link>
      </div>
    </div>
  )
}
