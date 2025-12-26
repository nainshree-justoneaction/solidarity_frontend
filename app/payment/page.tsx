"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"

export const loadRazorpay = () =>
  new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true)
      return
    }
    const script = document.createElement("script")
    script.id = "razorpay-script"
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

export default function FundraisingPaymentPage() {
  const router = useRouter()
  const params = useSearchParams()

  const moduleId = params.get("module") || "training"
  const email = "student@email.com" // replace later from auth

  const MIN_CONTRIBUTION = 365

  const handlePayment = async () => {
    toast.loading("Preparing secure contribution...")

    const loaded = await loadRazorpay()
    if (!loaded) {
      toast.dismiss()
      toast.error("Unable to load payment gateway")
      return
    }

    toast.dismiss()

    const options = {
      key: "rzp_test_RnEuedaujMr5dq",
      amount: MIN_CONTRIBUTION * 100,
      currency: "INR",
      name: "Just One Action",
      description: "Contribution towards social impact initiative",
      prefill: { email },
      theme: { color: "#16a34a" }, // green = contribution, not payment
      handler: () => {
        // 🔐 mark fundraising done for this module
        const data = JSON.parse(
          localStorage.getItem("fundraising_completed") || "{}"
        )
        data[moduleId] = true
        localStorage.setItem(
          "fundraising_completed",
          JSON.stringify(data)
        )

        toast.success("Thank you for contributing to the cause 🙏")
        router.push(`/student/training/${moduleId}/certificate`)
      },
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.on("payment.failed", () =>
      toast.error("Contribution failed. Please try again.")
    )
    rzp.open()
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-black/60 backdrop-blur sticky top-0">
        <Link
          href={`/student/training/${moduleId}`}
          className="text-white/70 hover:text-white transition"
        >
          ← Back to Training
        </Link>
        <h1 className="text-xl font-semibold tracking-wide">
          Fundraising Contribution
        </h1>
        <div />
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 py-20">

        {/* CONTEXT */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Complete Your Training Journey
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            As part of this module, you’re required to participate in
            fundraising or resource mobilization to support real on-ground work.
          </p>
        </div>

        {/* CONTRIBUTION CARD */}
        <div className="rounded-3xl border border-green-400/30 bg-green-500/5 p-10 text-center">

          <p className="text-green-300 text-sm uppercase tracking-wide mb-3">
            Minimum Contribution
          </p>

          <h2 className="text-6xl font-bold text-green-400 mb-4">
            ₹{MIN_CONTRIBUTION}
          </h2>

          <p className="text-white/70 mb-10 text-lg">
            This contribution supports verified social initiatives aligned with
            your training module.
          </p>

          <button
            onClick={handlePayment}
            className="px-14 py-5 text-xl font-semibold rounded-2xl
                       bg-green-400 text-black
                       hover:bg-green-300 transition
                       shadow-lg"
          >
            Contribute ₹{MIN_CONTRIBUTION}
          </button>

          <p className="text-white/50 text-sm mt-6">
            Secure contribution powered by Razorpay
          </p>
        </div>

        {/* NOTE */}
        <p className="text-white/40 text-sm mt-10 text-center max-w-xl mx-auto">
          This is not a fee or subscription. Your contribution directly supports
          social impact initiatives and enables certification for this module.
        </p>
      </main>
    </div>
  )
}
