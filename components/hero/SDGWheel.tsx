"use client"
import { motion } from "framer-motion"

const SDG_COLORS = [
  "#E5243B", "#DDA63A", "#4C9F38", "#C5192D", "#FF3A21",
  "#26BDE2", "#FCC30B", "#A21942", "#FD6925", "#DD1367",
  "#FD9D24", "#BF8B2E", "#3F7E44", "#0A97D9", "#56C02B",
  "#00689D", "#19486A",
]

export function SDGWheel() {
  return (
    <motion.div
      initial={{ rotateX: 18, rotateZ: 0 }}
      animate={{ rotateZ: 360 }}
      transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
      style={{ transformStyle: "preserve-3d" }}
    >

      {SDG_COLORS.map((color, i) => (
        <span
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: color,
            top: "50%",
            left: "50%",
            transform: `rotate(${(360 / 17) * i}deg) translateY(-250px)`,
            boxShadow: `0 0 14px ${color}`,
          }}
        />
      ))}
    </motion.div>
  )
}
