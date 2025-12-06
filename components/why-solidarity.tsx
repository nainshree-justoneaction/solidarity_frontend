"use client"
import ScrollReveal from "./scroll-reveal"

const features = [
  {
    title: "Social Internships",
    description: "Work on meaningful projects with purpose-driven organizations making real social impact",
    icon: "→",
  },
  {
    title: "Industrial Visits",
    description: "Gain insider access to leading companies and understand industry workflows firsthand",
    icon: "↗",
  },
  {
    title: "Real-World Exposure",
    description: "Bridge the gap between classroom learning and practical professional experience",
    icon: "◆",
  },
  {
    title: "1-Year Access",
    description: "Continuous learning and development for a full year with updated opportunities",
    icon: "∞",
  },
]

export default function WhySolidarity() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background border-b border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance text-white">Why Solidarity?</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Comprehensive pathways to building your professional foundation
          </p>
        </div>

        {/* Cards Grid with thin white borders (10-15% opacity as specified) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="group p-8 border border-white/15 rounded-lg bg-background hover:border-white/30 hover:white-glow transition-all duration-300 cursor-pointer">
                <div className="text-5xl mb-6 transform transition-transform group-hover:scale-110 text-white/70">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-muted leading-relaxed">{feature.description}</p>

                {/* Subtle white line accent on hover */}
                <div className="mt-6 h-1 w-0 bg-white/30 group-hover:w-12 transition-all duration-300"></div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
