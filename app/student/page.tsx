"use client"

import TrainingModules from "@/components/student/training-modules"
import SocialInternships from "@/components/student/social-internships"
import ProgressOverview from "@/components/student/progress-overview"
import Certificates from "@/components/student/certificates"

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
