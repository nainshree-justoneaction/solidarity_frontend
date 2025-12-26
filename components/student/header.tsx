"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User, LogOut } from "lucide-react"
import { CircularProgress } from "@/components/CircularProgress"

/* ---------------- COMPLETION HELPER ---------------- */
function calculateCompletion(profile: any) {
  if (!profile) return 0

  const fields = [
    profile.fullName,
    profile.mobileNumber,
    profile.gender,
    profile["Date of Birth"],
    profile.city,
    profile.state,
    profile.country,
  ]

  const filled = fields.filter(
    (v) => typeof v === "string" && v.trim().length > 0
  ).length

  return Math.round((filled / fields.length) * 100)
}

/* ---------------- HEADER ---------------- */
export default function DashboardHeader() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem("auth") || "{}")
    const profiles = JSON.parse(sessionStorage.getItem("PROFILES") || "{}")

    const student = profiles.student?.find(
      (p: any) => p.userId === auth.userId
    )

    if (student) setProfile(student)
  }, [])

  const completion = calculateCompletion(profile)

  const logout = () => {
    sessionStorage.removeItem("auth")
    router.push("/auth/login")
  }

  return (
    <header className="bg-black border-b border-white/10 px-8 py-5 flex items-center justify-between">
      <h1 className="text-xl font-bold text-white">Student Dashboard</h1>

      {/* USER MENU */}
      <div className="relative group">
        <div
          onClick={() => router.push("/student/profile")}
          className="relative cursor-pointer"
        >
          <CircularProgress value={completion} />

          {/* Avatar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#00ADEF] text-black
                    flex items-center justify-center font-bold text-sm">
              {profile?.fullName?.[0] || "S"}
            </div>
          </div>
        </div>


        {/* DROPDOWN */}
        <div
          className="absolute right-0 mt-3 w-56 bg-black border border-white/20
                     rounded-xl shadow-xl opacity-0 pointer-events-none
                     group-hover:opacity-100 group-hover:pointer-events-auto
                     transition"
        >
          <div className="p-4 border-b border-white/10">
            <p className="text-white font-semibold text-sm">
              {profile?.fullName || "Student"}
            </p>

            <div className="mt-2">
              <div className="flex justify-between text-xs text-white/60">
                <span>Profile Completion</span>
                <span>{completion}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full mt-1 overflow-hidden">
                <div
                  className={`h-full ${completion < 40
                    ? "bg-red-400"
                    : completion < 70
                      ? "bg-yellow-400"
                      : "bg-[#00ADEF]"
                    }`}
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-3
                       text-white/70 hover:bg-white/5 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
