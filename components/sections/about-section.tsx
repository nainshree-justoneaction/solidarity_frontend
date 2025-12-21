"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Users, Target, Leaf, Heart } from "lucide-react"

const aboutPoints = [
  {
    icon: Users,
    title: "Youth-Driven Nonprofit",
    description: "Aligned with India's Vision 2047 and UN Sustainable Development Goals.",
    color: "#26BDE2",
  },
  {
    icon: Target,
    title: "Self-Sustainability",
    description: "Empowering individuals and communities to achieve lasting independence.",
    color: "#FCC30B",
  },
  {
    icon: Leaf,
    title: "Environmental Impact",
    description: "Grassroots initiatives for social, economic, and environmental change.",
    color: "#4C9F38",
  },
  {
    icon: Heart,
    title: "Civic Engagement",
    description: "Building active citizens who drive meaningful community transformation.",
    color: "#E5243B",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-120px" })

  return (
    <section id="about" ref={ref} className="py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="text-sm font-medium tracking-wider uppercase text-[#26BDE2]">
            Who We Are
          </span>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground">
            Parikranti Foundation
          </h2>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A movement dedicated to creating sustainable change through youth empowerment
            and community action.
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT — STAGGERED CARDS */}
          <div className="grid sm:grid-cols-2 gap-8">
            {aboutPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-6 rounded-xl bg-card border border-border
                  ${index % 2 === 0 ? "lg:translate-y-8" : ""}
                `}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${point.color}15` }}
                >
                  <point.icon className="w-6 h-6" style={{ color: point.color }} />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {point.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {point.description}
                </p>

                {/* Accent bar */}
                <div
                  className="absolute left-0 bottom-0 h-1 w-full rounded-b-xl"
                  style={{ backgroundColor: point.color }}
                />
              </motion.div>
            ))}
          </div>

          {/* RIGHT — STAGGERED IMAGES */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              "/about/impact-1.png",
              "/about/impact-2.png",
              "/about/impact-3.png",
              "/about/impact-4.png",
            ].map((src, i) => (
              <div
                key={src}
                className={`overflow-hidden rounded-xl
                  ${i % 2 === 0 ? "translate-y-8" : ""}
                `}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover aspect-[4/3]"
                />
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
