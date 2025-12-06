"use client"

import Link from "next/link"

export default function ModuleDetailsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-12 py-8 border-b border-white/10">
        <Link href="/modules" className="text-white hover:scale-105 transition-transform">
          ← Back to Modules
        </Link>
        <div className="text-2xl font-bold">Solidarity</div>
        <div></div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-12 py-24">
        <h1 className="text-5xl font-bold mb-6">Training Module 1</h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Course Description</h2>
          <p className="text-lg text-white/80 leading-relaxed mb-8">
            Learn the fundamentals of creating social impact. This comprehensive module covers the basics of
            understanding social challenges, identifying opportunities for change, and developing strategies to make a
            meaningful difference in communities.
          </p>

          <h2 className="text-2xl font-semibold mb-6">Learning Topics</h2>
          <ul className="space-y-4 text-lg text-white/80">
            <li className="flex gap-4">
              <span>•</span> Understanding the SDGs and global challenges
            </li>
            <li className="flex gap-4">
              <span>•</span> Problem identification and research methodologies
            </li>
            <li className="flex gap-4">
              <span>•</span> Designing scalable solutions for social impact
            </li>
            <li className="flex gap-4">
              <span>•</span> Collaboration with NGOs and community organizations
            </li>
            <li className="flex gap-4">
              <span>•</span> Measuring impact and success metrics
            </li>
          </ul>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Your Progress</h2>
          <div className="h-3 bg-white/10 w-full mb-2">
            <div className="h-full w-1/2 bg-[#00ADEF]" />
          </div>
          <p className="text-white/60">50% complete</p>
        </div>

        {/* CTA - SDG 15 Green */}
        <Link
          href="/module-complete"
          className="inline-block text-2xl font-semibold px-12 py-4 text-white bg-[#009739] hover:scale-105 transition-transform"
        >
          Mark as Completed
        </Link>
      </div>
    </div>
  )
}
