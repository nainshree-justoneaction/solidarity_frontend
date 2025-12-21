"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Eye, Heart, UserCheck, BarChart3, ArrowRight } from "lucide-react"

const flowSteps = [
  {
    icon: Eye,
    title: "Awareness",
    description: "Learn about SDGs and sustainable practices",
    color: "#E5243B",
  },
  {
    icon: Heart,
    title: "Active Involvement",
    description: "Participate in campaigns and initiatives",
    color: "#26BDE2",
  },
  {
    icon: UserCheck,
    title: "Conscious Citizenship",
    description: "Integrate sustainable habits into daily life",
    color: "#4C9F38",
  },
  {
    icon: BarChart3,
    title: "Measurable Actions",
    description: "Track and amplify your impact",
    color: "#FCC30B",
  },
]

export function ActionFlowSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-wider uppercase" style={{ color: "#4C9F38" }}>
            Your Journey
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground text-balance">From Awareness to Action</h2>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {flowSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center bg-background border-2"
                    style={{ borderColor: step.color }}
                  >
                    <step.icon className="w-8 h-8" style={{ color: step.color }} />
                  </motion.div>

                  {/* Arrow for desktop */}
                  {index < flowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-4 z-20">
                      <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                  )}

                  <h3 className="mt-6 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
