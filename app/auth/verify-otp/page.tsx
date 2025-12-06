"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import AuthNavbar from "@/components/auth-navbar"
import ParticleBackground from "@/components/particle-background"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.join("").length === 6) {
      setLoading(true)
      setTimeout(() => setLoading(false), 1000)
    }
  }

  return (
    <>
      <AuthNavbar />
      <ParticleBackground />

      <div className="min-h-screen bg-black relative flex items-center justify-center pt-20 pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="animate-fade-in">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg glass mb-4 mx-auto">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-md"></div>
              </div>
            </div>

            {/* Card */}
            <div className="glass rounded-2xl p-8 space-y-6 animate-slide-up">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">Verify OTP</h1>
                <p className="text-muted-foreground">OTP sent to your registered email</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* OTP Input Boxes */}
                <div className="flex gap-3 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-12 text-center text-xl font-bold bg-input border-2 rounded-lg focus:outline-none transition ${
                        digit
                          ? "border-primary text-primary animate-glow-pulse"
                          : "border-border text-foreground neon-border"
                      }`}
                    />
                  ))}
                </div>

                {/* Resend OTP */}
                <p className="text-center text-sm text-muted-foreground">
                  Didn't receive OTP?{" "}
                  <button type="button" className="text-primary hover:text-cyan-300 font-medium transition">
                    Resend
                  </button>
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || otp.join("").length !== 6}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-semibold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50 neon-text animate-glow-pulse"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>

              {/* Back to Login */}
              <p className="text-center text-muted-foreground text-sm">
                <Link href="/auth/login" className="text-primary hover:text-cyan-300 font-medium transition">
                  Return to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
