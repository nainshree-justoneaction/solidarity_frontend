"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const SDG_COLORS = {
  sdg1: "#e5243b",
  sdg2: "#dda63b",
  sdg4: "#c5192d",
  sdg6: "#26bde2",
  sdg13: "#407f3d",
  sdg14: "#0a4a99",
}

export default function InternshipDetailsPage({ params }: { params: { id: string } }) {
  // Mock data for a single internship
  const internship = {
    id: params.id,
    title: "Environmental Education & Community Outreach",
    sdg: "sdg13",
    ngo: "Green Earth Foundation",
    description: `Join our environmental education initiative where you'll work directly with local communities to promote sustainable practices and climate awareness. This is a hands-on opportunity to make a real impact on environmental conservation.`,
    about: `Green Earth Foundation is a leading organization working on environmental sustainability and climate action. We've been helping communities adopt eco-friendly practices for over 15 years.`,
    responsibilities: [
      "Conduct environmental awareness workshops in local schools and communities",
      "Develop educational materials and content",
      "Assist in organizing tree planting drives and cleanup campaigns",
      "Document and report on community engagement activities",
      "Support project planning and implementation",
    ],
    requirements: [
      "Strong passion for environmental conservation",
      "Good communication and presentation skills",
      "Ability to work with diverse community groups",
      "Basic knowledge of environmental issues",
      "Willing to work flexible hours for community events",
    ],
    duration: "3 months",
    hours: [20, 25, 30],
    seatsAvailable: 5,
    location: "Mumbai, India",
    related: [
      { id: 1, title: "Ocean Conservation Project", sdg: "sdg14" },
      { id: 2, title: "Urban Gardening Initiative", sdg: "sdg13" },
      { id: 3, title: "Water Conservation Drive", sdg: "sdg6" },
    ],
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-white/10 py-6 px-4 md:px-8">
        <Link
          href="/internships"
          className="flex items-center gap-2 text-secondary hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Back to Internships
        </Link>
        <div className="flex items-start gap-4">
          <div
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: SDG_COLORS[internship.sdg as keyof typeof SDG_COLORS] }}
          ></div>
          <h1 className="text-4xl font-bold">{internship.title}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About This Opportunity</h2>
              <p className="text-secondary leading-relaxed">{internship.description}</p>
            </div>

            {/* About NGO */}
            <div className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-semibold mb-4">About the NGO</h2>
              <p className="text-secondary leading-relaxed">{internship.about}</p>
            </div>

            {/* Responsibilities */}
            <div className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-semibold mb-4">Your Responsibilities</h2>
              <ul className="space-y-2">
                {internship.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex gap-3 text-secondary">
                    <span className="text-white font-bold shrink-0">{idx + 1}.</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {internship.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-3 text-secondary">
                    <span className="text-white">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours per week */}
            <div className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-semibold mb-4">Hours Per Week</h2>
              <div className="flex gap-2 flex-wrap">
                {internship.hours.map((hour) => (
                  <span key={hour} className="border border-white/30 px-4 py-2 text-sm text-white">
                    {hour}h/week
                  </span>
                ))}
              </div>
            </div>

            {/* Related Internships */}
            <div className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-semibold mb-6">Related Internships</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {internship.related.map((related) => (
                  <div key={related.id} className="border border-white/20 p-4 hover:border-white/50 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: SDG_COLORS[related.sdg as keyof typeof SDG_COLORS] }}
                      ></div>
                      <h3 className="text-sm font-medium text-white">{related.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Apply Button */}
            <button className="w-full bg-white text-black py-3 font-semibold hover:bg-white/90 transition-colors">
              Apply Now
            </button>

            {/* Summary Box */}
            <div className="border border-white/20 p-6 space-y-4">
              <div>
                <p className="text-sm text-secondary mb-1">SDG Category</p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: SDG_COLORS[internship.sdg as keyof typeof SDG_COLORS] }}
                  ></div>
                  <p className="text-white">Environmental Action</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-secondary mb-1">Location</p>
                <p className="text-white">{internship.location}</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-secondary mb-1">Duration</p>
                <p className="text-white">{internship.duration}</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-secondary mb-1">Seats Available</p>
                <p className="text-white">{internship.seatsAvailable}</p>
              </div>
            </div>

            {/* NGO Profile */}
            <div className="border border-white/20 p-6">
              <h3 className="font-semibold mb-4">About NGO</h3>
              <div className="border-2 border-white w-12 h-12 rounded mb-3 flex items-center justify-center">
                <span className="text-lg font-bold">GE</span>
              </div>
              <p className="font-semibold text-white mb-2">{internship.ngo}</p>
              <div className="flex gap-1 flex-wrap">
                <span className="text-xs border border-white/30 px-2 py-1">SDG 13</span>
              </div>
              <button className="w-full border border-white text-white py-2 mt-4 hover:bg-white/5 transition-colors text-sm">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
