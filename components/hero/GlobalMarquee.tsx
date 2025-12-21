"use client"
import { motion } from "framer-motion"

const ROW_A = [
  "/hero/impact-1.png",
  "/hero/impact-2.png",
  "/hero/impact-3.png",
]

const ROW_B = [
  "/hero/impact-3.png",
  "/hero/impact-1.png",
  "/hero/impact-2.png",
]

function MarqueeRow({
  images,
  reverse = false,
  duration = 70,
}: {
  images: string[]
  reverse?: boolean
  duration?: number
}) {
  return (
    <motion.div
      className="flex gap-32"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{
        duration,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {[...images, ...images].map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="h-40 w-auto opacity-80 border border-red-500"
        />
      ))}
    </motion.div>
  )
}

export function GlobalMarquee() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[30%] left-0 w-full">
        <MarqueeRow images={ROW_A} duration={90} />
      </div>
      <div className="absolute top-[55%] left-0 w-full">
        <MarqueeRow images={ROW_B} reverse duration={65} />
      </div>
    </div>
  )
}
