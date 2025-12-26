import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, Clock, Users, ArrowRight } from "lucide-react"

const volunteerOpportunities = [
  {
    id: "food-bank",
    title: "Local Food Bank Assistant",
    organization: "Community Food Network",
    location: "New York, NY",
    commitment: "4 hours/week",
    volunteers: 23,
    sdg: 2,
    sdgName: "Zero Hunger",
    sdgColor: "#DDA63A",
    description: "Help sort and distribute food to families in need. No experience required.",
  },
  {
    id: "tutoring",
    title: "After-School Tutoring",
    organization: "Education First",
    location: "Online / Remote",
    commitment: "2 hours/week",
    volunteers: 45,
    sdg: 4,
    sdgName: "Quality Education",
    sdgColor: "#C5192D",
    description: "Tutor students in math, science, or English. Help shape the next generation.",
  },
  {
    id: "elderly-care",
    title: "Elderly Companion Program",
    organization: "Senior Care Alliance",
    location: "Los Angeles, CA",
    commitment: "3 hours/week",
    volunteers: 18,
    sdg: 3,
    sdgName: "Good Health",
    sdgColor: "#4C9F38",
    description: "Spend time with seniors, providing companionship and assistance with daily activities.",
  },
  {
    id: "beach-cleanup",
    title: "Beach Cleanup Coordinator",
    organization: "Ocean Guardians",
    location: "Miami, FL",
    commitment: "6 hours/month",
    volunteers: 67,
    sdg: 14,
    sdgName: "Life Below Water",
    sdgColor: "#0A97D9",
    description: "Lead beach cleanup events and educate participants about ocean conservation.",
  },
  {
    id: "tree-planting",
    title: "Urban Reforestation Volunteer",
    organization: "Green Cities Initiative",
    location: "Chicago, IL",
    commitment: "4 hours/month",
    volunteers: 89,
    sdg: 13,
    sdgName: "Climate Action",
    sdgColor: "#3F7E44",
    description: "Plant and maintain trees in urban areas to combat climate change.",
  },
  {
    id: "crisis-support",
    title: "Crisis Helpline Volunteer",
    organization: "Mental Health Support Network",
    location: "Online / Remote",
    commitment: "8 hours/week",
    volunteers: 34,
    sdg: 3,
    sdgName: "Good Health",
    sdgColor: "#4C9F38",
    description: "Provide emotional support to people in crisis. Training provided.",
  },
]

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">Volunteer</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Give your time.
              <br />
              <span className="text-muted-foreground">Change lives.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Find volunteer opportunities that match your skills and availability. Every hour you give creates lasting
              impact.
            </p>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-card border border-border rounded-xl p-6 hover:border-foreground/20 transition-colors group"
              >
                {/* SDG Badge */}
                <div
                  className="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white mb-4"
                  style={{ backgroundColor: opportunity.sdgColor }}
                >
                  SDG {opportunity.sdg}: {opportunity.sdgName}
                </div>

                <h3 className="text-lg font-semibold mb-2">{opportunity.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{opportunity.organization}</p>
                <p className="text-sm text-muted-foreground mb-4">{opportunity.description}</p>

                {/* Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{opportunity.commitment}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{opportunity.volunteers} volunteers</span>
                  </div>
                </div>

                <Button
                  className="w-full group-hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: opportunity.sdgColor }}
                >
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              {"Don't"} see what {"you're"} looking for?
            </p>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/take-action">Explore Other Actions</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
