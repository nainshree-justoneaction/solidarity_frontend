"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import AuthNavbar from "@/components/auth-navbar"
import ParticleBackground from "@/components/particle-background"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <>
      <AuthNavbar />
      <ParticleBackground />

      <div className="min-h-screen bg-black relative flex items-center justify-center pt-20 pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
              {!submitted ? (
                <>
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-muted-foreground">Enter your email to receive a reset link</p>
                  </div>

                  {/* Security Illustration */}
                  <div className="flex justify-center py-4">
                    <div className="relative w-32 h-32">
                      {/* Outer circle */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad1)" strokeWidth="1" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(0, 217, 255, 0.2)" strokeWidth="1" />
                        <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />

                        {/* Lock outline */}
                        <g transform="translate(50, 50)">
                          <path
                            d="M -8,-5 L -8,-12 Q -8,-18 -2,-18 L 2,-18 Q 8,-18 8,-12 L 8,-5"
                            fill="none"
                            stroke="rgba(0, 217, 255, 0.8)"
                            strokeWidth="1.5"
                          />
                          <rect
                            x="-10"
                            y="-5"
                            width="20"
                            height="16"
                            rx="2"
                            fill="none"
                            stroke="rgba(0, 217, 255, 0.8)"
                            strokeWidth="1.5"
                          />
                          <circle cx="0" cy="2" r="2" fill="rgba(0, 217, 255, 0.8)" />
                        </g>

                        <defs>
                          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(0, 217, 255, 0.5)" />
                            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.5)" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Glowing element */}
                      <div className="absolute inset-0 animate-glow-pulse"></div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@student.com"
                        className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition neon-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-semibold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50 neon-text animate-glow-pulse"
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </form>

                  {/* Back to Login */}
                  <p className="text-center text-muted-foreground text-sm">
                    Remember your password?{" "}
                    <Link href="/auth/login" className="text-primary hover:text-cyan-300 font-medium transition">
                      Return to Login
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                        <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
                    <p className="text-muted-foreground mb-4">We've sent a password reset link to {email}</p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Check your spam folder if you don't see it in a few minutes.
                    </p>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-semibold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition neon-text animate-glow-pulse"
                  >
                    Back to Reset
                  </button>

                  <p className="text-center text-muted-foreground text-sm">
                    <Link href="/auth/login" className="text-primary hover:text-cyan-300 font-medium transition">
                      Return to Login
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
