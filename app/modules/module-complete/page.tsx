"use client"

import Link from "next/link"

export default function ModuleCompletePage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl text-center px-12">
        {/* Success checkmark - SDG 15 Green */}
        <div className="mb-12 text-9xl">
          <div className="text-[#009739]">✓</div>
        </div>

        <h1 className="text-5xl font-bold mb-6">Module Completed!</h1>
        <p className="text-2xl text-white/80 mb-16">Social Internships are now available for you to apply.</p>

        {/* CTA - SDG 6 Blue */}
        <Link
          href="/internships"
          className="inline-block text-2xl font-semibold px-12 py-4 text-white bg-[#00ADEF] hover:scale-105 transition-transform"
        >
          View Available Internships
        </Link>
      </div>
    </div>
  )
}
