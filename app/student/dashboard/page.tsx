"use client"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import WhySolidarity from "@/components/why-solidarity"
import PricingSection from "@/components/pricing-section"
import WhatStudentsGet from "@/components/what-students-get"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-20">
        <HeroSection />
        <WhySolidarity />
        <PricingSection />
        <WhatStudentsGet />
        <Testimonials />
        <Footer />
      </main>
    </>
  )
}
