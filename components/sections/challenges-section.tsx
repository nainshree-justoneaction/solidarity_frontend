"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { CloudSun, Vote, Shield, Users } from "lucide-react"

const challenges = [
  {
    icon: CloudSun,
    title: "Climate Sustainability",
    description: "Addressing environmental degradation and promoting eco-conscious behavior.",
    color: "#4C9F38",
    number: "01",
  },
  {
    icon: Vote,
    title: "Civic Participation",
    description: "Bridging the gap between youth and active democratic engagement.",
    color: "#26BDE2",
    number: "02",
  },
  {
    icon: Shield,
    title: "Community Resilience",
    description: "Building stronger, self-sustaining communities through collective action.",
    color: "#FCC30B",
    number: "03",
  },
  {
    icon: Users,
    title: "Grassroots Leadership",
    description: "Developing local leaders who can drive sustainable change.",
    color: "#E5243B",
    number: "04",
  },
]

export function ChallengesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-card/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-wider uppercase" style={{ color: "#E5243B" }}>
            The Civic Gap
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground text-balance">Challenges We Address</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Bridging the disconnect between youth and real-world civic action through targeted interventions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 rounded-xl bg-background border border-border group hover:border-transparent transition-all duration-300"
            >
              <span
                className="absolute top-4 right-4 text-4xl font-bold opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ color: challenge.color }}
              >
                {challenge.number}
              </span>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${challenge.color}15` }}
              >
                <challenge.icon className="w-6 h-6" style={{ color: challenge.color }} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{challenge.title}</h3>
              <p className="text-sm text-muted-foreground">{challenge.description}</p>

              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${challenge.color}08, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
