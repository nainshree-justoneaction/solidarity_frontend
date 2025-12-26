"use client"

import { useEffect, useState } from "react"
import jsPDF from "jspdf"
import { useAuth } from "@/context/AuthContext"

interface Certificate {
  id: string
  title: string
  date: string
  sdgColor?: string
}

export default function CertificatesPage() {
  const { fullName } = useAuth()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isDownloading, setIsDownloading] = useState(false)

  /* ---------------- LOAD CERTIFICATES ---------------- */
  useEffect(() => {
    // Primary source
    const completedData = JSON.parse(
      sessionStorage.getItem("completedModulesData") || "{}"
    )

    // Fallback (for safety)
    const fundraising = JSON.parse(
      localStorage.getItem("fundraising_completed") || "{}"
    )

    const certs: Certificate[] = []

    Object.entries(completedData).forEach(([id, mod]: any) => {
      certs.push({
        id,
        title: mod.title || id,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        sdgColor: mod.sdgColor || "#00ADEF",
      })
    })

    // If completedModulesData empty but fundraising done
    if (certs.length === 0) {
      Object.keys(fundraising).forEach((key) => {
        if (fundraising[key]) {
          certs.push({
            id: key,
            title: key.replace("-", " ").toUpperCase(),
            date: new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          })
        }
      })
    }

    setCertificates(certs)
  }, [])

  /* ---------------- PDF GENERATION ---------------- */
  const downloadCertificate = (cert: Certificate) => {
    if (!fullName) return

    setIsDownloading(true)

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    })

    const w = pdf.internal.pageSize.width
    const h = pdf.internal.pageSize.height

    pdf.setFillColor(255, 255, 255)
    pdf.rect(0, 0, w, h, "F")

    pdf.setDrawColor(180)
    pdf.setLineWidth(3)
    pdf.rect(30, 30, w - 60, h - 60)

    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(42)
    pdf.text("CERTIFICATE OF COMPLETION", w / 2, 120, { align: "center" })

    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(20)
    pdf.text("This certificate is proudly awarded to", w / 2, 180, {
      align: "center",
    })

    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(36)
    pdf.text(fullName, w / 2, 240, { align: "center" })

    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(20)
    pdf.text("for successfully completing the module", w / 2, 300, {
      align: "center",
    })

    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(30)
    pdf.text(cert.title, w / 2, 350, { align: "center" })

    pdf.setFontSize(18)
    pdf.text(`Date: ${cert.date}`, w / 2, 410, { align: "center" })

    pdf.line(w / 2 - 120, 460, w / 2 + 120, 460)
    pdf.setFontSize(16)
    pdf.text("Just One Action", w / 2, 490, { align: "center" })

    pdf.save(`${cert.title}.pdf`)
    setIsDownloading(false)
  }

  /* ---------------- UI ---------------- */
  if (certificates.length === 0) {
    return (
      <p className="text-white/70 text-center mt-20">
        No certificates earned yet.
      </p>
    )
  }

  return (
    <section className="space-y-8 px-6 py-8">
      <h1 className="text-3xl font-bold text-white">Your Certificates</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-6
                       flex flex-col justify-between shadow-lg
                       hover:scale-105 transition"
          >
            <div>
              <h2 className="text-xl font-semibold text-white">
                {cert.title}
              </h2>
              <p className="text-white/60 text-sm mt-1">
                Issued by Just One Action
              </p>
              <p className="text-white/40 text-xs mt-1">{cert.date}</p>
            </div>

            <button
              onClick={() => downloadCertificate(cert)}
              disabled={isDownloading}
              className="mt-6 px-4 py-2 rounded-xl bg-[#00ADEF]
                         text-black font-semibold hover:bg-[#00c7ff]"
            >
              {isDownloading ? "Generating..." : "Download PDF"}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
