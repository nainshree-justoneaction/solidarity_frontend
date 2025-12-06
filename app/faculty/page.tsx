"use client"

import FacultySidebar from "@/components/faculty-dashboard/sidebar"
import FacultyNavbar from "@/components/faculty-dashboard/navbar"
import StatsOverview from "@/components/faculty-dashboard/stats-overview"
import MyStudentsSection from "@/components/faculty-dashboard/my-students"
import InternshipApprovalsSection from "@/components/faculty-dashboard/internship-approvals"
import StudentProgressVisuals from "@/components/faculty-dashboard/student-progress"

export default function FacultyDashboard() {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Fixed 240px Sidebar */}
      <div className="w-60 flex-shrink-0">
        <FacultySidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <FacultyNavbar />

        {/* Main Content with 12-column Grid */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-full">
            {/* 12-column grid with 24px gaps */}
            <div className="grid grid-cols-12 gap-6">
              {/* Stats Overview - Full Width */}
              <div className="col-span-12">
                <StatsOverview />
              </div>

              {/* My Students Table - Full Width */}
              <div className="col-span-12">
                <MyStudentsSection />
              </div>

              {/* Internship Approvals - 6 columns */}
              <div className="col-span-12 lg:col-span-6">
                <InternshipApprovalsSection />
              </div>

              {/* Student Progress - 6 columns */}
              <div className="col-span-12 lg:col-span-6">
                <StudentProgressVisuals />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
