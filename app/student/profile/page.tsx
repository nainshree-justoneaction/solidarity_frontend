"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getProfileByRole } from "@/lib/api"

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const authStr = sessionStorage.getItem("auth")
    if (!authStr) return

    const auth = JSON.parse(authStr)

    // FIX: Correct argument order
    getProfileByRole(auth.userId, auth.role)
      .then(setProfile)
      .catch(() => toast.error("Failed to load profile"))
  }, [])

  if (!profile)
    return (
      <p className="text-white text-center mt-10 text-lg animate-pulse">
        Loading Profile...
      </p>
    )

  return (
    <div className="space-y-10 px-4 py-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Profile Overview
        </h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
          {profile.fullName ? profile.fullName[0] : "U"}
        </div>

        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-bold text-white">{profile.fullName}</h2>
          <p className="text-white/70">{profile.email}</p>
          <p className="text-white/60 text-sm">{profile.institute}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <PremiumInfo label="Full Name" value={profile.fullName} />
        <PremiumInfo label="Email" value={profile.email} />
        <PremiumInfo label="Mobile Number" value={profile.mobileNumber} />
        <PremiumInfo label="Age" value={profile.age} />
        <PremiumInfo label="Gender" value={profile.gender} />
        <PremiumInfo label="Institute" value={profile.institute} />
        <PremiumInfo label="Semester" value={profile.semester} />
        <PremiumInfo label="Skills" value={profile.skills} />
        <PremiumInfo label="About" value={profile.about} long />
      </div>
    </div>
  )
}

function PremiumInfo({ label, value, long = false }) {
  return (
    <div
      className={`p-5 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        long ? "col-span-full" : ""
      }`}
    >
      <h3 className="text-sm text-white/60 uppercase tracking-wide font-semibold">
        {label}
      </h3>
      <p className="text-lg text-white mt-1 font-medium">{value || "-"}</p>
    </div>
  )
}
