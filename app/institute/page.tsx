"use client";
import FacultyManagement from "@/components/institute/faculty-management";
import StudentTracking from "@/components/institute/student-tracking";
import InternshipPrograms from "@/components/institute/internship-programs";
import QuickStats from "@/components/institute/quick-stats";
import Navbar from "@/components/institute/navbar";
import Sidebar from "@/components/institute/sidebar";
export default function InstituteDashboard() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="pt-20 px-8 pb-12">
          {/* Quick Stats */}
          <QuickStats />

          {/* Faculty Management */}
          <FacultyManagement />

          {/* Student Tracking */}
          <StudentTracking />

          {/* Internship Programs */}
          <div className="mt-8">
            <InternshipPrograms />
          </div>
        </main>
      </div>
    </div>
  );
}
