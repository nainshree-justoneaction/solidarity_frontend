"use client"

import Link from "next/link"

export default function AuthNavbar() {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold neon-text">
          SOLIDAR
        </Link>
        <div className="flex gap-8 items-center">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition">
            Home
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-foreground transition">
            Programs
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-foreground transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}
