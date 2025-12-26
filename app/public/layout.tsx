"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <main className="flex-1 pt-24">
        <div className="max-w-6xl mx-auto px-6">

        

          {children}
        </div>
      </main>
    </div>
  )
}
