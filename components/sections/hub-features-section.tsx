"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { BookOpen, Users, Lightbulb, Briefcase, Crown } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Academic Resources",
    description: "Curated learning materials aligned with SDG education.",
    color: "#E5243B",
  },
  {
    icon: Users,
    title: "Peer Learning",
    description: "Connect with like-minded youth for collaborative growth.",
    color: "#26BDE2",
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "Platform for developing and showcasing sustainable solutions.",
    color: "#FCC30B",
  },
  {
    icon: Briefcase,
    title: "Internships",
    description: "Real-world opportunities with impact-driven organizations.",
    color: "#4C9F38",
  },
  {
    icon: Crown,
    title: "Leadership",
    description: "Programs to cultivate the next generation of change-makers.",
    color: "#DD1367",
  },
]

export function HubFeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-wider uppercase" style={{ color: "#DD1367" }}>
            Digital Platform
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground text-balance">One-Stop Digital Hub</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A comprehensive platform designed to empower, connect, and accelerate youth-led initiatives.
          </p>
        </motion.div>

        {/* Pentagon layout for desktop */}
        <div className="relative max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative p-6 rounded-2xl border border-border bg-card transition-all duration-300 ${
                  index === 4 ? "md:col-start-2" : ""
                }`}
                style={{
                  boxShadow: hoveredIndex === index ? `0 0 40px ${feature.color}20` : "none",
                }}
              >
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground text-center mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
