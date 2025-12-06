"use client"

import Sidebar from "@/components/institute-dashboard/sidebar"
import Navbar from "@/components/institute-dashboard/navbar"
import QuickStats from "@/components/institute-dashboard/quick-stats"
import FacultyManagement from "@/components/institute-dashboard/faculty-management"
import StudentTracking from "@/components/institute-dashboard/student-tracking"
import InternshipPrograms from "@/components/institute-dashboard/internship-programs"

export default function InstituteDashboard() {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-8 mt-16 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-white font-bold text-3xl">Institute Dashboard</h1>
              <p className="text-secondary text-sm mt-1">Welcome to Solidarity Institute Portal</p>
            </div>

            {/* Quick Stats */}
            <QuickStats />

            {/* Faculty Management */}
            <FacultyManagement />

            {/* Student Tracking */}
            <StudentTracking />

            {/* Available Internship Programs */}
            <div className="mt-12">
              <InternshipPrograms />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
