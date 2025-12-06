"use client"

import { useEffect, useState } from "react"
import Button from "./button"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [parallaxY, setParallaxY] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const scrollY = window.scrollY
      setParallaxY(scrollY * 0.3)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background border-b border-border">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance text-white">
                Build Your Future with{" "}
                <span className="relative inline-block">
                  Social Internships
                  <span className="absolute bottom-2 left-0 w-full h-1 bg-white/40"></span>
                </span>{" "}
                &{" "}
                <span className="relative inline-block">
                  Real-World Training
                  <span className="absolute bottom-2 left-0 w-full h-1 bg-white/40"></span>
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted font-light leading-relaxed max-w-xl">
                Get 1-year access to internships, industrial visits, and skill training — all for just{" "}
                <span className="font-semibold text-white">₹365.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button variant="primary" size="lg" className="animate-slide-up">
                Join Now
              </Button>
              <Button variant="secondary" size="lg" className="animate-slide-up delay-100">
                Explore Programs
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-muted mb-4">Trusted by 10,000+ students</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-2xl font-bold text-white">10K+</p>
                  <p className="text-xs text-muted">Active Students</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-xs text-muted">Partner Companies</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">95%</p>
                  <p className="text-xs text-muted">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative h-96 lg:h-full min-h-96 flex items-center justify-center">
            <div className="relative w-full h-full" style={{ transform: `translateY(${parallaxY}px)` }}>
              {/* Abstract growth illustration */}
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Central circle (growth) */}
                <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="2" opacity="0.1" />
                <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="1.5" opacity="0.2" />
                <circle cx="200" cy="200" r="80" stroke="white" strokeWidth="1.5" opacity="0.3" />
                <circle cx="200" cy="200" r="60" stroke="white" strokeWidth="2" opacity="0.5" />

                {/* Rising bars (skill growth) */}
                <g opacity="0.6">
                  <rect x="120" y="280" width="20" height="60" fill="white" opacity="0.3" rx="4" />
                  <rect x="160" y="250" width="20" height="90" fill="white" opacity="0.5" rx="4" />
                  <rect x="200" y="200" width="20" height="140" fill="white" opacity="0.7" rx="4" />
                  <rect x="240" y="240" width="20" height="100" fill="white" opacity="0.5" rx="4" />
                  <rect x="280" y="270" width="20" height="70" fill="white" opacity="0.3" rx="4" />
                </g>

                {/* Connecting paths (network) */}
                <g stroke="white" strokeWidth="1.5" opacity="0.2">
                  <path d="M 80 200 Q 140 140 200 200" fill="none" />
                  <path d="M 320 200 Q 260 140 200 200" fill="none" />
                  <path d="M 200 80 L 200 200" />
                  <path d="M 200 320 L 200 200" />
                </g>

                {/* Corner accents */}
                <line x1="50" y1="50" x2="100" y2="50" stroke="white" strokeWidth="2" opacity="0.3" />
                <line x1="50" y1="50" x2="50" y2="100" stroke="white" strokeWidth="2" opacity="0.3" />

                <line x1="350" y1="350" x2="300" y2="350" stroke="white" strokeWidth="2" opacity="0.3" />
                <line x1="350" y1="350" x2="350" y2="300" stroke="white" strokeWidth="2" opacity="0.3" />
              </svg>

              {/* Floating accent element */}
              <div
                className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/20 rounded-full animate-parallax white-glow"
                style={{
                  animation: "parallax-rise 8s ease-in-out infinite",
                  animationDelay: "0.5s",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
