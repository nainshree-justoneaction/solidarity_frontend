// app/dashboard/certificates/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Download } from "lucide-react"

interface Certificate {
  id: number
  title: string
  issuedBy: string
  date: string
  fileUrl: string
}

const mockCertificates: Certificate[] = [
  {
    id: 1,
    title: "SDG Awareness Training",
    issuedBy: "Social Impact Academy",
    date: "2025-11-01",
    fileUrl: "#",
  },
  {
    id: 2,
    title: "Community Engagement Program",
    issuedBy: "NGO Alliance",
    date: "2025-09-15",
    fileUrl: "#",
  },
  {
    id: 3,
    title: "Project Management Workshop",
    issuedBy: "Social Impact Academy",
    date: "2025-10-05",
    fileUrl: "#",
  },
]

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])

  useEffect(() => {
    setCertificates(mockCertificates)
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Certificates</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{cert.title}</h2>
              <p className="text-white/60 text-sm">{cert.issuedBy}</p>
              <p className="text-white/40 text-xs">{cert.date}</p>
            </div>

            <button
              onClick={() => alert(`Downloading ${cert.title}`)}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-[#00ADEF] text-black font-medium rounded-lg hover:bg-[#00c7ff] transition"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
