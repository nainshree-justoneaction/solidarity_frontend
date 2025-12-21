"use client"
import { motion } from "framer-motion"

const ROW_1 = [
  "/hero/impact-1.png",
  "/hero/impact-2.png",
  "/hero/impact-3.png",
]

const ROW_2 = [
  "/hero/impact-3.png",
  "/hero/impact-1.png",
  "/hero/impact-2.png",
]

function MarqueeRow({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  return (
    <motion.div
      className="flex gap-24"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration: 60, ease: "linear", repeat: Infinity }}
    >
      {[...images, ...images].map((src, i) => (
        <img
          key={i}
          src={src}
          className="h-36 w-auto opacity-15 grayscale"
          draggable={false}
        />
      ))}
    </motion.div>
  )
}

export function MovingBackground() {
  return (
    <div className="absolute inset-y-0 left-0 w-full overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[30%]">
        <MarqueeRow images={ROW_1} />
      </div>
      <div className="absolute top-[55%]">
        <MarqueeRow images={ROW_2} reverse />
      </div>
    </div>
  )
}
