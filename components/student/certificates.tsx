"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface Certificate {
  id: string
  title: string
  date: string
  sdgColor: string
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [activeCert, setActiveCert] = useState<Certificate | null>(null)

  useEffect(() => {
    const completedData = JSON.parse(sessionStorage.getItem("completedModulesData") || "{}")
    const certs: Certificate[] = Object.entries(completedData)
      .filter(([_, mod]: any) => mod.certified)
      .map(([id, mod]: any) => ({
        id,
        title: mod.title,
        date: new Date().toLocaleString("en-US", { month: "short", year: "numeric" }),
        sdgColor: mod.sdgColor,
      }))
    setCertificates(certs)
  }, [])

  if (certificates.length === 0)
    return <p className="text-white">No certificates earned yet.</p>

  return (
    <section className="animate-fade-in relative">
      <h2 className="text-xl font-bold text-white mb-6">Certificates</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {certificates.map((cert, index) => (
          <div
            key={cert.id}
            className="bg-black border border-white/10 rounded p-3 text-center hover:border-white/20 transition-colors animate-slide-up group cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => setActiveCert(cert)}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-lg group-hover:scale-110 transition-transform"
              style={{ backgroundColor: cert.sdgColor + "30" }}
            >
              ✓
            </div>
            <p className="text-white text-xs font-semibold truncate">{cert.title}</p>
            <p className="text-cfcfcf text-xs mt-1">{cert.date}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeCert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-black rounded-xl p-6 max-w-sm w-full relative">
            <button
              className="absolute top-3 right-3 text-white hover:text-[#00ADEF]"
              onClick={() => setActiveCert(null)}
            >
              <X size={20} />
            </button>
            <h1 className="text-2xl font-bold text-white mb-4">{activeCert.title}</h1>
            <p className="text-white/70 mb-6">Issued: {activeCert.date}</p>
            <div
              className="w-40 h-40 mx-auto rounded-full flex items-center justify-center text-white text-6xl mb-4"
              style={{ backgroundColor: activeCert.sdgColor + "50" }}
            >
              ✓
            </div>
            <p className="text-white/60 mt-2">
              Congratulations! You have successfully completed this module and earned this certificate.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
