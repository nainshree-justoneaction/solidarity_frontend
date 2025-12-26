"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Vision", href: "#vision" },
  { name: "Movement", href: "#movement" },
  { name: "Impact", href: "#impact" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/90 backdrop-blur-md border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* BRAND */}
          <Link href="/" className="flex flex-col leading-tight">
            <motion.div whileHover={{ scale: 1.03 }} className="text-xl font-bold tracking-tight">
              <span className="text-foreground">Just </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #E5243B, #FCC30B, #4C9F38, #26BDE2)",
                }}
              >
                OneAction
              </span>
            </motion.div>
            <span className="text-xs text-muted-foreground tracking-wide">
              by Parikranti Foundation
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}

            {/* AUTH CTAs */}
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button
                  size="sm"
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  Log in
                </Button>
              </Link>

              <Link href="/auth/signup">
                <Button
                  size="sm"
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  Let's Co-create
                </Button>
              </Link>
            </div>
          </div>


          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-2 space-y-2">
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-border text-foreground"
                  >
                    Log in
                  </Button>
                </Link>

                <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-foreground text-background">
                    Join Movement
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
