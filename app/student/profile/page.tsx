"use client"

import { useEffect, useState } from "react"
import { getStudentByUserId } from "@/lib/api"
import toast from "react-hot-toast"

export default function ProfilePage() {
  const [student, setStudent] = useState<any>(null)

  useEffect(() => {
    const authStr = sessionStorage.getItem("auth")
    if (!authStr) return

    const auth = JSON.parse(authStr)
    if (!auth.userId) return

    getStudentByUserId(auth.userId)
      .then(setStudent)
      .catch((err) => toast.error(err.message || "Failed to load profile"))
  }, [])

  if (!student) return <p className="text-white">Loading profile...</p>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white/10 rounded">
          <h2 className="font-semibold">Full Name</h2>
          <p>{student.fullName || "-"}</p>
        </div>
        <div className="p-4 bg-white/10 rounded">
          <h2 className="font-semibold">Email</h2>
          <p>{student.email || "-"}</p>
        </div>
        <div className="p-4 bg-white/10 rounded">
          <h2 className="font-semibold">Mobile</h2>
          <p>{student.mobileNumber || "-"}</p>
        </div>
        <div className="p-4 bg-white/10 rounded">
          <h2 className="font-semibold">City</h2>
          <p>{student.city || "-"}</p>
        </div>
      </div>
    </div>
  )
}
