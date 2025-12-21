"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Eye, Rocket, Trophy } from "lucide-react"

const cards = [
  {
    icon: Eye,
    title: "Vision",
    description: "An inclusive, sustainable society by 2047 where every citizen contributes to national progress.",
    color: "#4C9F38",
  },
  {
    icon: Rocket,
    title: "Mission",
    description: "Mobilizing scalable, impact-driven solutions through youth leadership and community collaboration.",
    color: "#26BDE2",
  },
  {
    icon: Trophy,
    title: "Achievements",
    description: "Successful community mobilization and launch of multiple sustainable initiatives across India.",
    color: "#FCC30B",
  },
]

export function VisionMissionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="vision" className="py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-wider uppercase" style={{ color: "#4C9F38" }}>
            Our Purpose
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground text-balance">
            Vision, Mission & Achievements
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-card border border-border h-full">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${card.color}15` }}
                >
                  <card.icon className="w-8 h-8" style={{ color: card.color }} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>

                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                  style={{ backgroundColor: `${card.color}10` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
