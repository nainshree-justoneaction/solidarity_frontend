"use client"

import { motion } from "framer-motion"

const IMAGES = [
  "/about/impact-1.png",
  "/about/impact-2.png",
  "/about/impact-3.png",
  "/about/impact-4.png",
  "/about/impact-3.png",
]

export function HeroImageMarquee() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">

      {/* TOP ROW */}
      <motion.div
        className="absolute top-[20%] flex gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...IMAGES, ...IMAGES].map((src, i) => (
          <img
            key={`top-${i}`}
            src={src}
            className="h-40 w-64 object-cover rounded-xl opacity-20 blur-[1px]"
          />
        ))}
      </motion.div>

      {/* BOTTOM ROW */}
      <motion.div
        className="absolute top-[55%] flex gap-8"
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          duration: 70,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...IMAGES, ...IMAGES].map((src, i) => (
          <img
            key={`bottom-${i}`}
            src={src}
            className="h-44 w-72 object-cover rounded-xl opacity-15 blur-[1.5px]"
          />
        ))}
      </motion.div>

      {/* EDGE MASK */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
    </div>
  )
}
