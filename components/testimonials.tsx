"use client"

import ScrollReveal from "./scroll-reveal"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Business Analytics, Year 2",
    text: "Solidarity gave me the exposure I needed to understand what I actually want to do. The internship was transformative.",
    initials: "PS",
  },
  {
    name: "Arjun Patel",
    role: "Software Engineer, Year 3",
    text: "The industrial visits opened my eyes to how companies really operate. Best investment I made for my career.",
    initials: "AP",
  },
  {
    name: "Maya Desai",
    role: "Finance Major, Year 2",
    text: "Not just learning skills — I built a network that will help me throughout my career. Worth every penny.",
    initials: "MD",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background border-b border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance text-white">
            Hear From Students
          </h2>
          <p className="text-lg text-muted">Real voices, real experiences</p>
        </div>

        {/* Testimonials Grid with thin white borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="border border-white/20 p-8 rounded-xl hover:border-white/50 hover:white-glow transition-all duration-300 group">
                {/* Avatar */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center font-bold text-sm text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{testimonial.name}</p>
                    <p className="text-xs text-muted">{testimonial.role}</p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-muted leading-relaxed mb-4 group-hover:text-white/90 transition-colors">
                  "{testimonial.text}"
                </p>

                {/* Stars */}
                <div className="flex gap-1 text-white/70">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
