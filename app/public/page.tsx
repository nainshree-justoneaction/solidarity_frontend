import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import HeroSection from "@/components/hero-section"
import { CollectiveImpact } from "@/components/collective-impact"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CollectiveImpact />
      </main>
      <Footer />
    </div>
  )
}
