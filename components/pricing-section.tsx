"use client"

import ScrollReveal from "./scroll-reveal"
import Button from "./button"

export default function PricingSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background border-b border-white/10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance text-white">
            Get Everything for{" "}
            <span className="relative inline-block">
              ₹365 / Year
              <span className="absolute bottom-1 left-0 w-full h-1 bg-white/40"></span>
            </span>
          </h2>
        </div>

        <ScrollReveal delay={100}>
          <div className="border border-white/15 p-12 rounded-2xl bg-background hover:border-white/30 hover:white-glow transition-all duration-300">
            {/* Main benefit */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-2 text-white">Complete Access Package</h3>
              <p className="text-muted text-lg">Everything you need to launch your career</p>
            </div>

            {/* Benefits list */}
            <div className="space-y-5 mb-12">
              {["Social Internships", "Industrial Visits", "Skill Trainings", "Certification"].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center text-lg font-medium text-white animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-2xl mr-4 text-white/70">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button variant="secondary" size="lg" className="w-full">
              Join Now
            </Button>

            <p className="text-center text-muted text-sm mt-6">Limited slots available • 30-day money-back guarantee</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
