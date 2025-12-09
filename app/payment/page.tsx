"use client"

import Link from "next/link"
import { useState } from "react"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("upi")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-12 py-8 border-b border-white/10">
        <Link href="/student-dashboard" className="text-white hover:scale-105 transition-transform">
          ← Back
        </Link>
        <div className="text-2xl font-bold">Solidarity</div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-0 px-12 py-24">
        <h1 className="text-6xl font-bold mb-4">Activate Your 1-Year Access</h1>
        <p className="text-3xl font-semibold text-white/80 mb-16">₹365 only</p>

        {/* Benefits */}
        <div className="mb-16 space-y-6">
          <h2 className="text-2xl font-semibold mb-8">What You Get</h2>
          <div className="flex items-start gap-8">
            <div className="text-3xl">🌍</div>
            <div>
              <h3 className="text-xl font-semibold">Social Internships</h3>
              <p className="text-white/60">Access to vetted NGO internship opportunities</p>
            </div>
          </div>
          <div className="flex items-start gap-8">
            <div className="text-3xl">📚</div>
            <div>
              <h3 className="text-xl font-semibold">Training Modules</h3>
              <p className="text-white/60">Self-paced learning content and certifications</p>
            </div>
          </div>
          <div className="flex items-start gap-8">
            <div className="text-3xl">🏭</div>
            <div>
              <h3 className="text-xl font-semibold">Industrial Visits</h3>
              <p className="text-white/60">On-site exposure to real-world work environments</p>
            </div>
          </div>
          <div className="flex items-start gap-8">
            <div className="text-3xl">📊</div>
            <div>
              <h3 className="text-xl font-semibold">Progress Tracking</h3>
              <p className="text-white/60">Monitor your growth and achievements</p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Payment Details</h2>

          <div className="space-y-8">
            <div>
              <label className="block text-lg font-medium mb-4">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-black text-white text-lg py-3 border-b border-white focus:outline-none focus:border-white placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-4">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value="student@email.com"
                readOnly
                className="w-full bg-black text-white text-lg py-3 border-b border-white/50 focus:outline-none placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-4">Phone</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full bg-black text-white text-lg py-3 border-b border-white focus:outline-none focus:border-white placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-4">Payment Method</label>
              <div className="space-y-4">
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <span className="text-lg">UPI</span>
                </label>
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <span className="text-lg">Debit / Credit Card</span>
                </label>
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === "netbanking"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <span className="text-lg">Net Banking</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* PAY NOW button - SDG 2 Yellow */}
        <Link
          href="/payment-success"
          className="inline-block text-2xl font-semibold px-12 py-4 text-black bg-[#F9C80E] hover:scale-105 transition-transform"
        >
          Pay Now – ₹365
        </Link>
      </div>
    </div>
  )
}
