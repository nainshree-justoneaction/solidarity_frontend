"use client"

import Link from "next/link"

export default function ApplicationSuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl text-center px-12">
        {/* Success checkmark - SDG 15 Green */}
        <div className="mb-12 text-9xl">
          <div className="text-[#009739]">✓</div>
        </div>

        <h1 className="text-5xl font-bold mb-6">Application Submitted!</h1>
        <p className="text-2xl text-white/80 mb-20">
          You have successfully applied for this internship. The NGO will review your application and contact you soon.
        </p>

        {/* CTA */}
        <Link
          href="/student-dashboard-unlocked"
          className="inline-block text-2xl font-semibold px-12 py-4 text-white bg-[#00ADEF] hover:scale-105 transition-transform"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
