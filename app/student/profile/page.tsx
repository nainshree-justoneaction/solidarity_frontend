"use client"

import { useEffect, useState } from "react"
import { Pencil, X, Save } from "lucide-react"
import toast from "react-hot-toast"

/* ---------------------------------- */
const INTEREST_OPTIONS = [
  "Poverty Reduction",
  "Gender Equality",
  "Clean Water & Sanitation",
  "Quality Education",
  "Technology & Innovation",
  "Peace & Justice",
  "Renewable Energy",
]

/* ---------------------------------- */
export default function StudentProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [edit, setEdit] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)

  /* ---------- LOAD PROFILE ---------- */
  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem("auth") || "{}")
    const profiles = JSON.parse(sessionStorage.getItem("PROFILES") || "{}")
    const registration = JSON.parse(sessionStorage.getItem("registration") || "{}")

    const student = profiles.student?.find(
      (p: any) => p.userId === auth.userId
    )

    if (!student) {
      toast.error("Profile not found")
      return
    }

    setUserId(auth.userId)

    setProfile({
      ...student,
      dob: student["Date of Birth"] || "",
      institute: registration.step2?.institute || "",
      semester: registration.step2?.semester || "",
      skills: registration.step2?.skills || "",
      interests: registration.step3?.interests || [],
      city: student.city || "",
      state: student.state || "",
      country: student.country || "India",
    })
  }, [])

  /* ---------- SAVE ---------- */
  const saveProfile = () => {
    const profiles = JSON.parse(sessionStorage.getItem("PROFILES") || "{}")
    const registration = JSON.parse(sessionStorage.getItem("registration") || "{}")

    profiles.student = profiles.student.map((p: any) =>
      p.userId === userId
        ? {
            ...p,
            fullName: profile.fullName,
            mobileNumber: profile.mobileNumber,
            gender: profile.gender,
            "Date of Birth": profile.dob,
            city: profile.city,
            state: profile.state,
            country: profile.country,
          }
        : p
    )

    registration.step2 = {
      ...registration.step2,
      institute: profile.institute,
      semester: profile.semester,
      skills: profile.skills,
    }

    registration.step3 = {
      ...registration.step3,
      interests: profile.interests,
    }

    sessionStorage.setItem("PROFILES", JSON.stringify(profiles))
    sessionStorage.setItem("registration", JSON.stringify(registration))

    toast.success("Profile updated")
    setEdit(false)
  }

  if (!profile) {
    return <p className="text-white text-center mt-20">Loading profile…</p>
  }

  const age =
    profile.dob
      ? new Date().getFullYear() - new Date(profile.dob).getFullYear()
      : "-"

  /* ---------------------------------- */
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* LEFT SIDEBAR */}
      <aside className="bg-gradient-to-b from-[#020617] to-[#020617]/80 border border-white/10 rounded-3xl p-6 space-y-6 sticky top-24">
        <div className="w-24 h-24 rounded-full bg-[#00ADEF] text-black flex items-center justify-center text-4xl font-bold mx-auto">
          {profile.fullName?.[0]}
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-white">{profile.fullName}</h2>
          <p className="text-white/60 text-sm">{profile.email}</p>
        </div>

        <div className="text-center text-white/70 text-sm">
          🎓 Student  
          <br />
          {profile.institute || "-"}
        </div>

        <button
          onClick={() => setEdit(!edit)}
          className="w-full py-2 rounded-xl bg-[#00ADEF] text-black font-semibold hover:bg-[#00c7ff] flex items-center justify-center gap-2"
        >
          {edit ? <X size={16} /> : <Pencil size={16} />}
          {edit ? "Cancel Editing" : "Edit Profile"}
        </button>
      </aside>

      {/* RIGHT CONTENT */}
      <section className="md:col-span-2 space-y-6">

        <InfoCard title="Personal Information">
          <Display label="Date of Birth" value={profile.dob} editable={edit}
            onChange={(v) => setProfile({ ...profile, dob: v })} type="date" />
          <Static label="Age" value={age} />
          <Display label="Gender" value={profile.gender} editable={edit}
            onChange={(v) => setProfile({ ...profile, gender: v })} />
        </InfoCard>

        <InfoCard title="Academic Information">
          <Display label="Institute" value={profile.institute} editable={edit}
            onChange={(v) => setProfile({ ...profile, institute: v })} />
          <Display label="Semester / Year" value={profile.semester} editable={edit}
            onChange={(v) => setProfile({ ...profile, semester: v })} />
          <Display label="Skills" value={profile.skills} editable={edit}
            onChange={(v) => setProfile({ ...profile, skills: v })} />
        </InfoCard>

        <InfoCard title="Residential Information">
          <Display label="City" value={profile.city} editable={edit}
            onChange={(v) => setProfile({ ...profile, city: v })} />
          <Display label="State" value={profile.state} editable={edit}
            onChange={(v) => setProfile({ ...profile, state: v })} />
          <Display label="Country" value={profile.country} editable={edit}
            onChange={(v) => setProfile({ ...profile, country: v })} />
        </InfoCard>

        <InfoCard title="Interests">
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((i) => {
              const active = profile.interests.includes(i)
              return (
                <button
                  key={i}
                  disabled={!edit}
                  onClick={() =>
                    edit &&
                    setProfile({
                      ...profile,
                      interests: active
                        ? profile.interests.filter((x: string) => x !== i)
                        : [...profile.interests, i],
                    })
                  }
                  className={`px-4 py-2 rounded-full text-sm border ${
                    active
                      ? "bg-[#00ADEF] text-black border-[#00ADEF]"
                      : "border-white/20 text-white/70"
                  }`}
                >
                  {i}
                </button>
              )
            })}
          </div>
        </InfoCard>

        {edit && (
          <button
            onClick={saveProfile}
            className="w-full py-3 rounded-xl bg-[#00ADEF] text-black font-semibold hover:bg-[#00c7ff] flex items-center justify-center gap-2"
          >
            <Save size={18} /> Save Changes
          </button>
        )}
      </section>
    </div>
  )
}

/* ---------------------------------- */
/* REUSABLE COMPONENTS */

function InfoCard({ title, children }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    </div>
  )
}

function Display({ label, value, editable, onChange, type = "text" }: any) {
  return (
    <div>
      <p className="text-xs text-white/60 uppercase">{label}</p>
      {editable ? (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full mt-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
        />
      ) : (
        <p className="mt-1 text-white font-medium">{value || "-"}</p>
      )}
    </div>
  )
}

function Static({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-white/60 uppercase">{label}</p>
      <p className="mt-1 text-white font-medium">{value}</p>
    </div>
  )
}
