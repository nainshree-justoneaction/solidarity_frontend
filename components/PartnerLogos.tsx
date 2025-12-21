"use client"

import { motion } from "framer-motion"

const LOGOS = [
  "/partners/ngo1.png",
  "/partners/brand.png",
  "/partners/brand1.png",
  "/partners/brand2.png",
  "/partners/institute.png",
]

export function PartnerLogos() {
  return (
    <div className="relative overflow-hidden mb-20">
      <motion.div
        className="flex gap-12 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...LOGOS, ...LOGOS].map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Partner logo"
            className="
              h-12 md:h-14
              object-contain
              opacity-40
              grayscale
              transition
              hover:opacity-80
              hover:grayscale-0
            "
          />
        ))}
      </motion.div>

      {/* Soft fade edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none" />
    </div>
  )
}
