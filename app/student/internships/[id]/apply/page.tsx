"use client"

import Link from "next/link"

export default function ApplicationSuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-gray-900 rounded-xl p-8 shadow-lg">
        {/* Success checkmark */}
        <div className="text-8xl mb-6">
          <span className="text-[#00C853]">✓</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Application Submitted!</h1>
        <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
          Your application has been successfully submitted. The NGO will review it and get in touch with you shortly.
        </p>

        {/* CTA */}
        <Link
          href="/student/dashboard"
          className="inline-block w-full sm:w-auto px-8 py-3 text-lg sm:text-xl font-semibold text-white bg-[#00ADEF] rounded-lg shadow-md hover:bg-[#0098c7] hover:scale-105 transition-transform"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
