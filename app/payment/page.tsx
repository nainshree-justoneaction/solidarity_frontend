"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
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

export default function PaymentPage() {
  const router = useRouter()

  const email = "student@email.com"

  const handlePayment = async () => {
    toast.loading("Preparing payment...")

    const loaded = await loadRazorpay()
    if (!loaded) {
      toast.dismiss()
      toast.error("Payment system failed to load")
      return
    }

    toast.dismiss()

    const options = {
      key: "rzp_test_RnEuedaujMr5dq",
      amount: 36500,
      currency: "INR",
      name: "Solidarity",
      description: "1-Year Access Subscription",
      prefill: { email },
      theme: { color: "#F9C80E" },
      handler: () => {
        localStorage.setItem("solidarity_paid", "true")
        toast.success("Payment Successful!")
        router.push("/payment/payment-success")
      }
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.on("payment.failed", () => toast.error("Payment Failed"))
    rzp.open()
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0">
        <Link href="/student/dashboard" className="text-white/70 hover:text-white transition">
          ← Back
        </Link>
        <h1 className="text-2xl font-semibold tracking-wide">Solidarity</h1>
        <div></div>
      </header>

      <main className="w-full max-w-3xl mx-auto px-8 md:px-0 py-20">

        {/* Title */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4">Activate Your Access</h1>
          <p className="text-3xl font-semibold text-yellow-400">₹365 / year</p>
          <p className="text-white/70 mt-3 text-lg tracking-wide">
            One-time payment. Instant access to everything.
          </p>
        </div>

        {/* Benefits */}
        <section className="mb-20 space-y-6">
          {[
            ["🌍", "Social Internships"],
            ["📚", "Training Modules"],
            ["🏭", "Industrial Visits"],
            ["📊", "Progress Tracking"],
          ].map(([icon, title], i) => (
            <div
              key={i}
              className="flex items-center gap-5 p-5 border border-white/10 rounded-2xl 
                         bg-white/5 hover:bg-white/10 transition"
            >
              <div className="text-3xl">{icon}</div>
              <p className="text-xl font-medium">{title}</p>
            </div>
          ))}
        </section>

        {/* Pay Button */}
        <div className="text-center">
          <button
            onClick={handlePayment}
            className="text-2xl font-semibold px-16 py-5 
                       bg-yellow-400 text-black rounded-2xl
                       hover:scale-[1.03] transition-transform shadow-lg"
          >
            Pay ₹365
          </button>

          <p className="text-white/50 text-sm mt-4">
            Secure payment powered by Razorpay
          </p>
        </div>
      </main>
    </div>
  )
}
