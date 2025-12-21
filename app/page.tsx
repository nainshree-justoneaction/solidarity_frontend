"use client";
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { VisionMissionSection } from "@/components/sections/vision-mission-section"
import { ChallengesSection } from "@/components/sections/challenges-section"
import { MovementSection } from "@/components/sections/movement-section"
import { TimelineSection } from "@/components/sections/timeline-section"
import { HubFeaturesSection } from "@/components/sections/hub-features-section"
import { ImpactGoalsSection } from "@/components/sections/impact-goals-section"
import { ActionFlowSection } from "@/components/sections/action-flow-section"
import { PartnersSection } from "@/components/sections/partners-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <VisionMissionSection />
      <ChallengesSection />
      <MovementSection />
      <TimelineSection />
      <HubFeaturesSection />
      <ImpactGoalsSection />
      <ActionFlowSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
