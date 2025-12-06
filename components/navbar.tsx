"use client"

import { useState } from "react"
import Button from "./button"
import Link from "next/link"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold text-white">Solidarity</div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "About", "Programs", "Pricing", "Contact"].map((link) => (
              <a key={link} href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>

          {/* Join Now Button */}
          <div className="hidden md:block">
            <Link href="/auth/signup">
              <Button variant="secondary" size="sm">
                Join Now
              </Button>
            </Link>
          </div>


          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center gap-1"
          >
            <span
              className={`block w-full h-0.5 bg-white transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span className={`block w-full h-0.5 bg-white transition-all ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span
              className={`block w-full h-0.5 bg-white transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-4">
            {["Home", "About", "Programs", "Pricing", "Contact"].map((link) => (
              <a key={link} href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                {link}
              </a>
            ))}
            <Button variant="secondary" size="sm" className="w-full">
              Join Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
