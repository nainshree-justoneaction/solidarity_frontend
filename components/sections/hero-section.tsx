"use client"

import { useState } from "react"
import { SDGGlobalWheel } from "@/components/hero/SDGGlobalWheel"
import { SDGS } from "@/components/hero/sdg-data"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { HeroImageMarquee } from "@/components/hero/HeroMarquee"
import Link from "next/link"

export function HeroSection() {
  const [active, setActive] = useState(SDGS[0])

  return (
    <section className="relative min-h-screen bg-black overflow-hidden px-8">
      <HeroImageMarquee />

      {/* LEFT CONTENT */}
      <div className="relative z-20 max-w-xl pt-40 ml-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-6xl font-black text-white leading-tight"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            One Action.
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ color: active?.color ?? "#fff" }}
          >
            Infinite Impact.
          </motion.span>
        </motion.h1>


        <p className="mt-6 text-lg text-white/60 max-w-xl">
          Align your effort with{" "}
          <span className="font-semibold" style={{ color: active?.color }}>
            {active?.title ?? "the Global Goals"}
          </span>{" "}
          and create change at scale.
        </p>

        <div className="mt-10 flex gap-4">
          <Button size="lg" className="bg-white text-black px-8">
            <Link href="/public/take-action">Take Action</Link>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white"
          >
            Explore Movement
          </Button>
        </div>
      </div>

      {/* RIGHT VERTICAL SEMI-WHEEL */}
      <div
        className="
          absolute
          top-0
          right-[-20px]
          h-full
          w-[480px]
          overflow-hidden
          z-10
        "
      >
        <div
          className="
            absolute
            top-1/2
            right-[-140px]
            -translate-y-1/2
            rotate-[-90deg]
            origin-center
          "
        >
          <SDGGlobalWheel onHover={setActive} />
        </div>
      </div>

      {/* SOFT EDGE MASK (OPTIONAL BUT NICE) */}
      <div
        className="
          absolute inset-y-0 right-0 w-1/3
          bg-gradient-to-l from-black via-black/70 to-transparent
          pointer-events-none
          z-20
        "
      />
    </section>
  )
}
