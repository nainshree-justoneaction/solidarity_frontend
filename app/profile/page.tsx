"use client"

import { useState } from "react"
import { Download, Edit2 } from "lucide-react"

const SDG_ICONS = {
  sdg4: "📓", // Red notebook
  sdg13: "👁️", // Green eye
  sdg14: "🐟", // Blue fish
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+91 9876543210",
    avatar: "AJ",
  }

  // Mock internships data
  const internships = [
    {
      id: 1,
      title: "Environmental Sustainability Program",
      sdg: "sdg13",
      duration: "3 months",
      certificateUrl: "#",
    },
    {
      id: 2,
      title: "Education for All Initiative",
      sdg: "sdg4",
      duration: "2 months",
      certificateUrl: "#",
    },
    {
      id: 3,
      title: "Ocean Conservation Project",
      sdg: "sdg14",
      duration: "1 month",
      certificateUrl: "#",
    },
  ]

  const certificates = [
    { id: 1, title: "Environmental Leadership", sdg: "sdg13", date: "Dec 2024" },
    { id: 2, title: "Education Excellence", sdg: "sdg4", date: "Nov 2024" },
    { id: 3, title: "Marine Conservation", sdg: "sdg14", date: "Oct 2024" },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-white/10 py-8 px-4 md:px-8">
        <h1 className="text-4xl font-bold">Your Profile</h1>
        <div className="w-16 h-1 bg-white mt-4"></div>
      </div>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="border border-white/20 rounded-lg p-8">
          {/* Avatar and Info */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center bg-background text-2xl font-bold shrink-0">
              {userData.avatar}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
              <p className="text-secondary mb-1">{userData.email}</p>
              <p className="text-secondary mb-6">{userData.phone}</p>

              <button className="border border-white px-6 py-2 hover:bg-white/5 transition-colors">
                <Edit2 className="inline mr-2" size={16} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* SDG Icons */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-secondary mb-4">Completed Internships:</p>
            <div className="flex gap-6">
              <div className="text-2xl">{SDG_ICONS.sdg4}</div>
              <div className="text-2xl">{SDG_ICONS.sdg13}</div>
              <div className="text-2xl">{SDG_ICONS.sdg14}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-white/10 flex gap-8">
          {["personal", "internships", "certificates", "activity"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-2 border-b-2 transition-colors capitalize ${
                activeTab === tab ? "border-white text-white" : "border-transparent text-secondary hover:text-white"
              }`}
            >
              {tab === "personal" && "Personal Info"}
              {tab === "internships" && "Completed Internships"}
              {tab === "certificates" && "Certificates"}
              {tab === "activity" && "Activity Log"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "personal" && (
            <div className="space-y-4">
              <div className="border border-white/10 p-4">
                <p className="text-secondary mb-1">Email</p>
                <p className="text-white">{userData.email}</p>
              </div>
              <div className="border border-white/10 p-4">
                <p className="text-secondary mb-1">Phone</p>
                <p className="text-white">{userData.phone}</p>
              </div>
            </div>
          )}

          {activeTab === "internships" && (
            <div className="space-y-4">
              {internships.map((internship) => (
                <div key={internship.id} className="border border-white/10 p-6 hover:border-white/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{SDG_ICONS[internship.sdg as keyof typeof SDG_ICONS]}</span>
                        <h3 className="text-lg font-semibold">{internship.title}</h3>
                      </div>
                      <p className="text-secondary text-sm">{internship.duration}</p>
                    </div>
                    <button className="border border-white px-4 py-2 hover:bg-white/5 transition-colors flex items-center gap-2">
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="border border-white/10 p-6 relative overflow-hidden hover:border-white/30 transition-colors"
                >
                  {/* SDG-colored ribbon */}
                  <div className="absolute top-0 right-0 w-16 h-16 transform translate-x-4 -translate-y-4">
                    <div
                      className="w-full h-full opacity-20"
                      style={{
                        background: `var(--${cert.sdg})`,
                      }}
                    ></div>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{cert.title}</h3>
                  <p className="text-secondary text-sm">{cert.date}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="text-center py-12">
              <p className="text-secondary">Your activity log will appear here</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
