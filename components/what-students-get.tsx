"use client"

import ScrollReveal from "./scroll-reveal"

const features = [
  {
    title: "Practical Skills",
    description: "Learn industry-relevant skills through hands-on projects and real-world scenarios",
    number: "01",
  },
  {
    title: "Industry Networking",
    description: "Build meaningful connections with professionals and peers in your field",
    number: "02",
  },
  {
    title: "Professional Exposure",
    description: "Experience diverse work environments and understand different career paths",
    number: "03",
  },
  {
    title: "Real-World Projects",
    description: "Contribute to actual projects that make a difference in communities",
    number: "04",
  },
]

export default function WhatStudentsGet() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background border-b border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance text-white">
            What Students Actually Get
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Beyond internships and visits — real skills, real connections, real impact
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="flex gap-6 group cursor-pointer">
                {/* Number accent */}
                <div className="flex-shrink-0">
                  <div className="text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                    {feature.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:translate-x-2 transition-transform">
                    {feature.title}
                  </h3>
                  <p className="text-muted leading-relaxed mb-4">{feature.description}</p>
                  {/* Animated line */}
                  <div className="h-0.5 w-0 bg-white group-hover:w-8 transition-all duration-300"></div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
