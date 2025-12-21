"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Eye, Heart, Users, Leaf } from "lucide-react"
import { PartnerLogos } from "@/components/PartnerLogos"

const benefits = [
  {
    icon: Eye,
    title: "Brand Visibility",
    description: "Reach millions of engaged youth across India.",
    color: "#E5243B",
  },
  {
    icon: Heart,
    title: "CSR Alignment",
    description: "Demonstrate commitment to sustainable development.",
    color: "#26BDE2",
  },
  {
    icon: Users,
    title: "Audience Engagement",
    description: "Connect with a passionate community of change-makers.",
    color: "#4C9F38",
  },
  {
    icon: Leaf,
    title: "Eco-Driven Identity",
    description: "Associate your brand with environmental responsibility.",
    color: "#FCC30B",
  },
]

export function PartnersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-120px" })

  return (
    <section className="py-28 bg-card/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-sm font-medium tracking-wider uppercase"
            style={{ color: "#26BDE2" }}
          >
            Partnerships
          </span>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground">
            Trusted by Our Partners
          </h2>

          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Collaborating with NGOs, institutions, and brands to drive real-world impact.
          </p>
        </motion.div>

        {/* LOGOS */}
        <PartnerLogos />

        {/* BENEFITS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="
                p-6 rounded-xl
                bg-background
                border border-border
                text-center
                transition
              "
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto"
                style={{ backgroundColor: `${benefit.color}15` }}
              >
                <benefit.icon className="w-7 h-7" style={{ color: benefit.color }} />
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {benefit.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
