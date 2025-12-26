import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CauseCard } from "@/components/cause-card"

const causes = [
  {
    id: "clean-water-africa",
    title: "Clean Water for Rural Africa",
    description: "Provide clean drinking water to communities in Sub-Saharan Africa through well construction.",
    sdg: 6,
    sdgName: "Clean Water & Sanitation",
    sdgColor: "#26BDE2",
    raised: 45000,
    goal: 75000,
    image: "/clean-water-well-africa-village.jpg",
  },
  {
    id: "education-girls",
    title: "Education for Girls in South Asia",
    description: "Support girls' education through scholarships, school supplies, and safe learning environments.",
    sdg: 4,
    sdgName: "Quality Education",
    sdgColor: "#C5192D",
    raised: 32000,
    goal: 50000,
    image: "/girls-education-school-classroom-learning.jpg",
  },
  {
    id: "food-security",
    title: "Food Security Initiative",
    description: "Combat hunger by supporting sustainable farming practices and food distribution programs.",
    sdg: 2,
    sdgName: "Zero Hunger",
    sdgColor: "#DDA63A",
    raised: 18500,
    goal: 40000,
    image: "/sustainable-farming-food-security-agriculture.jpg",
  },
  {
    id: "climate-action",
    title: "Reforestation Project",
    description: "Plant trees to combat climate change and restore ecosystems in deforested areas.",
    sdg: 13,
    sdgName: "Climate Action",
    sdgColor: "#3F7E44",
    raised: 67000,
    goal: 100000,
    image: "/tree-planting-reforestation-nature-conservation.jpg",
  },
  {
    id: "healthcare-access",
    title: "Mobile Health Clinics",
    description: "Bring healthcare to remote communities through mobile clinics and telemedicine services.",
    sdg: 3,
    sdgName: "Good Health & Well-being",
    sdgColor: "#4C9F38",
    raised: 28000,
    goal: 60000,
    image: "/mobile-health-clinic-medical-care-community.jpg",
  },
  {
    id: "ocean-cleanup",
    title: "Ocean Plastic Cleanup",
    description: "Remove plastic waste from oceans and coastlines to protect marine life.",
    sdg: 14,
    sdgName: "Life Below Water",
    sdgColor: "#0A97D9",
    raised: 41000,
    goal: 80000,
    image: "/ocean-cleanup-plastic-marine-conservation.jpg",
  },
]

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">Donate</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Support a cause
              <br />
              <span className="text-muted-foreground">you believe in.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Every donation directly contributes to the UN Sustainable Development Goals. Choose a campaign and make
              your impact visible.
            </p>
          </div>

          {/* Causes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {causes.map((cause) => (
              <CauseCard key={cause.id} {...cause} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
