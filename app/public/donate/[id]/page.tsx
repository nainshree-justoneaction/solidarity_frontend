"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DonationForm } from "@/components/donation-form"
import { DonationSuccess } from "@/components/donation-success"
import { ArrowLeft } from "lucide-react"

const causesData: Record<
  string,
  {
    title: string
    description: string
    fullDescription: string
    sdg: number
    sdgName: string
    sdgColor: string
    raised: number
    goal: number
    image: string
    impact: string[]
  }
> = {
  "clean-water-africa": {
    title: "Clean Water for Rural Africa",
    description: "Provide clean drinking water to communities in Sub-Saharan Africa through well construction.",
    fullDescription:
      "Access to clean water is a fundamental human right, yet millions in rural Africa still lack this basic necessity. This project constructs community wells, installs water purification systems, and trains local technicians for maintenance. Every well serves approximately 500 people and dramatically reduces waterborne diseases.",
    sdg: 6,
    sdgName: "Clean Water & Sanitation",
    sdgColor: "#26BDE2",
    raised: 45000,
    goal: 75000,
    image: "/clean-water-well-africa-village-community.jpg",
    impact: [
      "$25 provides clean water for one person for a year",
      "$100 covers water purification equipment",
      "$500 trains a local water technician",
    ],
  },
  "education-girls": {
    title: "Education for Girls in South Asia",
    description: "Support girls' education through scholarships, school supplies, and safe learning environments.",
    fullDescription:
      "Education transforms lives and communities. This initiative provides scholarships, school supplies, and creates safe learning environments for girls in South Asia. We partner with local schools to ensure sustainability and community involvement in breaking the cycle of poverty through education.",
    sdg: 4,
    sdgName: "Quality Education",
    sdgColor: "#C5192D",
    raised: 32000,
    goal: 50000,
    image: "/girls-education-school-learning-empowerment.jpg",
    impact: [
      "$25 provides school supplies for one student",
      "$100 covers one month of school fees",
      "$500 funds a full year scholarship",
    ],
  },
  "food-security": {
    title: "Food Security Initiative",
    description: "Combat hunger by supporting sustainable farming practices and food distribution programs.",
    fullDescription:
      "This initiative tackles food insecurity through a two-pronged approach: immediate food distribution to families in need and long-term sustainable farming training for communities. We work with local farmers to implement climate-resilient agricultural practices that ensure food security for generations.",
    sdg: 2,
    sdgName: "Zero Hunger",
    sdgColor: "#DDA63A",
    raised: 18500,
    goal: 40000,
    image: "/sustainable-farming-food-security-agriculture-comm.jpg",
    impact: [
      "$25 provides meals for a family for a week",
      "$100 supplies seeds for a community garden",
      "$500 trains 10 farmers in sustainable practices",
    ],
  },
  "climate-action": {
    title: "Reforestation Project",
    description: "Plant trees to combat climate change and restore ecosystems in deforested areas.",
    fullDescription:
      "Forests are the lungs of our planet. This project plants native tree species in deforested areas, restoring ecosystems and creating carbon sinks. We work with local communities who serve as forest guardians, creating sustainable livelihoods while protecting the environment.",
    sdg: 13,
    sdgName: "Climate Action",
    sdgColor: "#3F7E44",
    raised: 67000,
    goal: 100000,
    image: "/tree-planting-reforestation-nature-forest.jpg",
    impact: [
      "$10 plants 5 native trees",
      "$50 restores one hectare of forest",
      "$250 trains a community forest guardian",
    ],
  },
  "healthcare-access": {
    title: "Mobile Health Clinics",
    description: "Bring healthcare to remote communities through mobile clinics and telemedicine services.",
    fullDescription:
      "Healthcare should not depend on geography. Our mobile health clinics bring essential medical services to remote communities, providing check-ups, vaccinations, and connecting patients to specialists via telemedicine. Each clinic serves thousands of people who would otherwise have no access to healthcare.",
    sdg: 3,
    sdgName: "Good Health & Well-being",
    sdgColor: "#4C9F38",
    raised: 28000,
    goal: 60000,
    image: "/mobile-health-clinic-medical-care-community.jpg",
    impact: [
      "$25 provides basic medical supplies",
      "$100 covers one community health screening",
      "$500 sponsors a mobile clinic visit",
    ],
  },
  "ocean-cleanup": {
    title: "Ocean Plastic Cleanup",
    description: "Remove plastic waste from oceans and coastlines to protect marine life.",
    fullDescription:
      "Our oceans are drowning in plastic. This project deploys cleanup crews along coastlines and operates specialized vessels to collect plastic waste from the ocean. We also work with coastal communities to implement waste management systems that prevent plastic from reaching the ocean.",
    sdg: 14,
    sdgName: "Life Below Water",
    sdgColor: "#0A97D9",
    raised: 41000,
    goal: 80000,
    image: "/ocean-cleanup-plastic-marine-conservation-beach.jpg",
    impact: [
      "$25 removes 10kg of ocean plastic",
      "$100 equips one cleanup volunteer",
      "$500 sponsors a coastline cleanup event",
    ],
  },
}

export default function DonateCausePage() {
  const params = useParams()
  const causeId = params.id as string
  const cause = causesData[causeId]

  const [donated, setDonated] = useState(false)
  const [donationAmount, setDonationAmount] = useState(25)

  if (!cause) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Cause not found</h1>
            <Link href="/public/donate" className="text-muted-foreground hover:text-foreground">
              Back to causes
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const progress = Math.min((cause.raised / cause.goal) * 100, 100)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/public/donate"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to causes
          </Link>

          {donated ? (
            <div className="max-w-2xl mx-auto py-12">
              <DonationSuccess
                amount={donationAmount}
                causeTitle={cause.title}
                sdg={cause.sdg}
                sdgName={cause.sdgName}
                sdgColor={cause.sdgColor}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left: Cause Details */}
              <div>
                <div className="aspect-video rounded-xl overflow-hidden mb-6">
                  <img
                    src={cause.image || "/placeholder.svg"}
                    alt={cause.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white mb-4"
                  style={{ backgroundColor: cause.sdgColor }}
                >
                  SDG {cause.sdg}: {cause.sdgName}
                </div>

                <h1 className="text-3xl font-bold mb-4">{cause.title}</h1>
                <p className="text-muted-foreground mb-6 leading-relaxed">{cause.fullDescription}</p>

                {/* Progress */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold">${cause.raised.toLocaleString()}</span>
                    <span className="text-muted-foreground">of ${cause.goal.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%`, backgroundColor: cause.sdgColor }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% funded</p>
                </div>

                {/* Impact */}
                <div className="space-y-3">
                  <p className="text-sm font-medium">Your impact</p>
                  {cause.impact.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: cause.sdgColor }}
                      />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Donation Form */}
              <div>
                <div className="sticky top-24 bg-card border border-border rounded-xl p-8">
                  <h2 className="text-xl font-bold mb-6">Make a donation</h2>
                  <DonationForm
                    causeTitle={cause.title}
                    sdgColor={cause.sdgColor}
                    onSuccess={() => {
                      setDonated(true)
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
