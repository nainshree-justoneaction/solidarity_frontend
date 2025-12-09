"use client"

import DashboardSidebar from "@/components/dashboard/sidebar"
import DashboardHeader from "@/components/dashboard/header"
import TrainingModules from "@/components/dashboard/training-modules"
import SocialInternships from "@/components/dashboard/social-internships"
import ProgressOverview from "@/components/dashboard/progress-overview"
import Certificates from "@/components/dashboard/certificates"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto p-8 space-y-8">
          <TrainingModules />
          <SocialInternships />
          <ProgressOverview />
          <Certificates />
        </main>
      </div>
    </div>
  )
}
