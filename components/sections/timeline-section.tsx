"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Megaphone, Search, Rocket, CheckCircle } from "lucide-react"

const timelineData = [
  {
    year: "1",
    title: "Awareness & Engagement",
    description: "Events, workshops, digital campaigns to spread the movement.",
    icon: Megaphone,
    color: "#E5243B",
    activities: ["Launch campaigns", "Community events", "Digital outreach", "Youth workshops"],
  },
  {
    year: "2",
    title: "Research & Advocacy",
    description: "Youth-led solutions and policy advocacy for systemic change.",
    icon: Search,
    color: "#26BDE2",
    activities: ["Policy research", "Advocacy programs", "Solution development", "Stakeholder engagement"],
  },
  {
    year: "3",
    title: "Implementation & Monitoring",
    description: "Pilots, mentorship programs, and continuous feedback loops.",
    icon: Rocket,
    color: "#4C9F38",
    activities: ["Pilot projects", "Mentorship programs", "Impact assessment", "Scale successful models"],
  },
]

export function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeYear, setActiveYear] = useState(0)

  return (
    <section className="py-24 bg-card/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-wider uppercase" style={{ color: "#26BDE2" }}>
            Roadmap
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground text-balance">Our X-tion Plan</h2>
        </motion.div>

        {/* Timeline selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-card rounded-full p-1 border border-border">
            {timelineData.map((item, index) => (
              <button
                key={item.year}
                onClick={() => setActiveYear(index)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeYear === index ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
                style={{
                  backgroundColor: activeYear === index ? item.color : "transparent",
                }}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline content */}
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="text-center lg:text-left">
            <div
              className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-6"
              style={{ backgroundColor: `${timelineData[activeYear].color}15` }}
            >
              {(() => {
                const Icon = timelineData[activeYear].icon
                return <Icon className="w-8 h-8" style={{ color: timelineData[activeYear].color }} />
              })()}
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">{timelineData[activeYear].title}</h3>
            <p className="text-lg text-muted-foreground">{timelineData[activeYear].description}</p>
          </div>

          <div className="space-y-4">
            {timelineData[activeYear].activities.map((activity, index) => (
              <motion.div
                key={activity}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: timelineData[activeYear].color }} />
                <span className="text-foreground">{activity}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-12">
          {timelineData.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveYear(index)}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: activeYear === index ? item.color : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
