"use client"

import { motion, useAnimation } from "framer-motion"
import { useState } from "react"
import { SDGS } from "./sdg-data"

const SIZE = 900
const CENTER = SIZE / 2
const OUTER = 420
const INNER = 280
const ICON_RADIUS = 360
const SLICE = 360 / 17

function polar(r: number, angle: number) {
  const rad = (angle - 90) * Math.PI / 180
  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER + r * Math.sin(rad),
  }
}

export function SDGGlobalWheel({
  onHover,
}: {
  onHover: (sdg: any | null) => void
}) {
  const controls = useAnimation()
  const [hovered, setHovered] = useState<any | null>(null)

  return (
    <div className="relative w-[820px] h-[410px]">

      {/* WHEEL ONLY (ROTATES) */}
      <svg
        width={SIZE}
        height={SIZE / 2}
        viewBox={`0 0 ${SIZE} ${SIZE / 2}`}
        style={{ overflow: "hidden" }}
      >
        <motion.g
          animate={controls}
          initial={{ rotate: 0 }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
          transform-origin={`${CENTER}px ${CENTER}px`}
        >
          {SDGS.map((sdg, i) => {
            const start = i * SLICE
            const end = start + SLICE
            const mid = start + SLICE / 2

            const p1 = polar(OUTER, start)
            const p2 = polar(OUTER, end)
            const p3 = polar(INNER, end)
            const p4 = polar(INNER, start)
            const icon = polar(ICON_RADIUS, mid)

            const d = `
              M ${p1.x} ${p1.y}
              A ${OUTER} ${OUTER} 0 0 1 ${p2.x} ${p2.y}
              L ${p3.x} ${p3.y}
              A ${INNER} ${INNER} 0 0 0 ${p4.x} ${p4.y}
              Z
            `

            return (
              <g
                key={sdg.id}
                onMouseEnter={() => {
                  controls.stop()
                  setHovered(sdg)
                  onHover(sdg)
                }}
                onMouseLeave={() => {
                  setHovered(null)
                  onHover(null)
                  controls.start({
                    rotate: 360,
                    transition: {
                      duration: 80,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  })
                }}
                style={{ cursor: "pointer" }}
              >
                <path d={d} fill={sdg.color} />
                <image
                  href={sdg.icon}
                  x={icon.x - 26}
                  y={icon.y - 26}
                  width={52}
                  height={52}
                />
              </g>
            )
          })}
        </motion.g>
      </svg>
    </div>
  )
}
