"use client"

import NGOSidebar from "@/components/ngo/sidebar"
import NGOHeader from "@/components/ngo/header"
import OverviewStats from "@/components/ngo/overview-stats"
import PostedInternships from "@/components/ngo/posted-internships"
import OngoingStudents from "@/components/ngo/ongoing-students"
import Reports from "@/components/ngo/reports"

export default function NGODashboard() {
  return (
    <div className="flex min-h-screen">
      <NGOSidebar />
      <div className="flex-1">
        <NGOHeader />
        <main className="p-8 space-y-8 bg-background">
          <OverviewStats />
          <PostedInternships />
          <OngoingStudents />
          <Reports />
        </main>
      </div>
    </div>
  )
}
