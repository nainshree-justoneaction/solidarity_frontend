"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { signup } from "@/lib/api"
import { Navbar } from "@/components/navbar"

const roles = [
  { id: "student", label: "Student", desc: "Learn. Intern. Lead change.", color: "#E5243B" },
  { id: "public", label: "Public", desc: "Support causes. Take action.", color: "#26BDE2" },
  { id: "institute", label: "Institute", desc: "Empower students at scale.", color: "#FCC30B" },
  { id: "ngo", label: "NGO", desc: "Create real-world impact.", color: "#4C9F38" },
]

export default function SignupPage() {
  const router = useRouter()

  const [role, setRole] = useState<string | null>(null)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const selectedRole = roles.find(r => r.id === role)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!role) return toast.error("Choose a role to continue")
    if (!fullName.trim()) return toast.error("Name required")
    if (!email.includes("@")) return toast.error("Invalid email")
    if (phone.length !== 10) return toast.error("Invalid phone")
    if (password.length < 6) return toast.error("Password too short")

    setLoading(true)
    try {
      const user = await signup({
        fullName,
        email,
        mobileNumber: phone,
        password,
        role,
      })

      sessionStorage.setItem(
        "auth",
        JSON.stringify({
          userId: user.id,
          fullName,
          email,
          role,
        })
      )

      toast.success("Account created")

      router.push(`/registration/${role}/step1`)
    } catch (err: any) {
      toast.error(err.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }


  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        <Navbar />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-black leading-tight">
            One Action.
            <br />
            <span className="text-white/60">Infinite Impact.</span>
          </h1>

          <p className="mt-6 text-lg text-white/50 max-w-xl mx-auto">
            Choose how you want to participate in building a sustainable Bharat.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {roles.map(r => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`
                relative p-8 rounded-2xl border text-left transition-all duration-300
                ${role === r.id
                  ? "border-white scale-[1.04]"
                  : "border-white/20 opacity-60 hover:opacity-100"}
              `}
              style={{
                boxShadow: role === r.id ? `0 0 80px ${r.color}40` : "none",
              }}
            >
              <div className="text-xl font-semibold flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                {r.label}
              </div>
              <p className="mt-3 text-sm text-white/60">{r.desc}</p>
            </button>
          ))}
        </div>

        {role && (
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                placeholder="Full name"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-white outline-none"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
              <input
                placeholder="Phone"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-white outline-none"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>

            <input
              placeholder="Email"
              className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-white outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-white outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold bg-white text-black hover:bg-white/90 transition disabled:opacity-40"
            >
              {loading ? "Creating account…" : `Continue as ${selectedRole?.label}`}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}
