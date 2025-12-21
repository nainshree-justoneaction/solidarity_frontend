"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const impactMetrics = [
  {
    value: 500,
    suffix: "K",
    label: "Active Citizens Engaged",
    color: "#E5243B",
  },
  {
    value: 150,
    suffix: "K",
    label: "Youth Leaders Empowered",
    color: "#26BDE2",
  },
  {
    value: 100,
    suffix: "+",
    label: "Campaign Events",
    color: "#4C9F38",
  },
  {
    value: 10,
    suffix: "M",
    label: "Social Media Reach",
    color: "#FCC30B",
  },
  {
    value: 30,
    suffix: "K",
    label: "Monthly Workshop Participants",
    color: "#DD1367",
  },
]

function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} style={{ color }}>
      {displayValue}
      {suffix}
    </span>
  )
}

export function ImpactGoalsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="impact" className="py-24 bg-card/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-wider uppercase" style={{ color: "#FCC30B" }}>
            Our Goals
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground text-balance">Impact Targets</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-background border border-border"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2">
                <AnimatedCounter value={metric.value} suffix={metric.suffix} color={metric.color} />
              </div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
