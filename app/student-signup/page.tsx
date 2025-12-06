"use client"

import type React from "react"

import Link from "next/link"

export default function StudentSignupPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would validate and submit to backend
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple top navigation */}
      <div className="flex items-center justify-between px-12 py-8 border-b border-white/10">
        <div className="text-2xl font-bold">Solidarity</div>
        <Link href="/login" className="text-white hover:scale-105 transition-transform">
          Login
        </Link>
      </div>

      {/* Main content - left aligned, massive whitespace */}
      <div className="max-w-2xl mx-0 px-12 py-24">
        <h1 className="text-6xl font-bold mb-6 leading-tight">Join as a Student</h1>
        <p className="text-xl text-white/60 mb-12">
          Unlock access to internships, training modules, and real-world experience.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Full Name */}
          <div>
            <label className="block text-lg font-medium mb-4">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-black text-white text-lg py-3 border-b border-white focus:outline-none focus:border-white placeholder:text-white/30"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium mb-4">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-black text-white text-lg py-3 border-b border-white focus:outline-none focus:border-white placeholder:text-white/30"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-lg font-medium mb-4">Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full bg-black text-white text-lg py-3 border-b border-white focus:outline-none focus:border-white placeholder:text-white/30"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-medium mb-4">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full bg-black text-white text-lg py-3 border-b border-white focus:outline-none focus:border-white placeholder:text-white/30"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-lg font-medium mb-4">Role</label>
            <select className="w-full bg-black text-white text-lg py-3 border-b border-white focus:outline-none focus:border-white appearance-none cursor-pointer">
              <option value="student" selected>
                Student
              </option>
              <option value="faculty">Faculty</option>
              <option value="institute">Institute</option>
              <option value="ngo">NGO</option>
            </select>
          </div>

          {/* Primary CTA - SDG 10 Red */}
          <div className="pt-8">
            <Link
              href="/student-dashboard"
              className="inline-block text-2xl font-semibold px-12 py-4 text-black bg-[#E5243B] hover:scale-105 transition-transform"
            >
              Create Account
            </Link>
          </div>
        </form>

        {/* Secondary link */}
        <p className="text-lg text-white/60 mt-12">
          Already registered?{" "}
          <Link href="/login" className="text-white font-semibold hover:scale-105 transition-transform inline-block">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
