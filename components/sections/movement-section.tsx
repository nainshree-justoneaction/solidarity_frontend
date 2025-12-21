"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { User, Users, Leaf, Crown } from "lucide-react"

const pillars = [
  {
    icon: User,
    title: "Individual Responsibility",
    description: "Every person has the power to make a difference.",
    color: "#E5243B",
  },
  {
    icon: Users,
    title: "Collective Impact",
    description: "Small actions multiply into transformative change.",
    color: "#26BDE2",
  },
  {
    icon: Leaf,
    title: "Sustainable Behavior",
    description: "Building habits that protect our planet's future.",
    color: "#4C9F38",
  },
  {
    icon: Crown,
    title: "Community Leadership",
    description: "Empowering local champions to lead change.",
    color: "#FCC30B",
  },
]

export function MovementSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="movement" className="py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium tracking-wider uppercase" style={{ color: "#FCC30B" }}>
              The Movement
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Just One X-tion Campaign
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Empowering individuals to take one impactful, SDG-aligned action. A single action creates ripples that
              transform communities and drive progress toward sustainable development.
            </p>

            {/* Progress indicator */}
            <div className="mt-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>One Action</span>
                <span>SDG Progress</span>
              </div>
              <div className="h-2 rounded-full bg-card overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "75%" } : {}}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #E5243B, #FCC30B, #4C9F38, #26BDE2)",
                  }}
                />
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${pillar.color}15` }}
                >
                  <pillar.icon className="w-5 h-5" style={{ color: pillar.color }} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
