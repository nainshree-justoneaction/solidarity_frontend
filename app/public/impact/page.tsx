import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StatCard } from "@/components/stat-card"
import { SDGContributionChart } from "@/components/sdg-contribution-chart"
import { BadgesSection } from "@/components/badges-section"
import { RecentActions } from "@/components/recent-actions"
import { ImpactMilestones } from "@/components/impact-milestones"

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">Impact Dashboard</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Your impact.
              <br />
              <span className="text-muted-foreground">Measured.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Every action you take contributes to real-world change. Track your progress and see the difference you're
              making.
            </p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Actions" value="23" subtext="+3 this month" color="#4C9F38" />
            <StatCard label="Amount Donated" value="$175" subtext="Across 4 causes" color="#26BDE2" />
            <StatCard label="Volunteer Hours" value="12" subtext="2 organizations" color="#FCC30B" />
            <StatCard label="SDGs Supported" value="9" subtext="of 17 goals" color="#DD1367" />
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* SDG Contributions - spans 2 columns */}
            <div className="lg:col-span-2">
              <SDGContributionChart />
            </div>

            {/* Milestones */}
            <div>
              <ImpactMilestones />
            </div>
          </div>

          {/* Badges */}
          <div className="mb-8">
            <BadgesSection />
          </div>

          {/* Recent Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActions />

            {/* Collective Stats */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6">Collective Impact</h3>
              <p className="text-muted-foreground text-sm mb-6">
                You're part of a global community taking action. Here's what we've achieved together.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-2xl font-bold">12,847</p>
                  <p className="text-xs text-muted-foreground">Total actions</p>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-2xl font-bold">$2.4M</p>
                  <p className="text-xs text-muted-foreground">Donated</p>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-2xl font-bold">8,432</p>
                  <p className="text-xs text-muted-foreground">Volunteer hours</p>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-2xl font-bold">4,521</p>
                  <p className="text-xs text-muted-foreground">Active members</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-center text-muted-foreground">
                  Your actions represent <span className="font-semibold text-foreground">0.18%</span> of our collective
                  impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
