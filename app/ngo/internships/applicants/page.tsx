"use client";

import { useState, useEffect } from "react";
import { useNGOInternships } from "@/context/NGOInternshipsContext";
import { useNGOApplicants } from "@/context/NGOApplicantsContext";
import ApplicantCard from "@/components/ngo/ApplicantCard";

export default function AllApplicants() {
  const { internships } = useNGOInternships();
  const { applicants, setApplicants, updateApplicantStatus } = useNGOApplicants();

  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // AUTO-CREATE DEMO APPLICANTS IF NONE
  useEffect(() => {
    if (applicants.length === 0 && internships.length > 0) {
      const demoStudents = [
        {
          id: "stu-1",
          name: "Aarav Mehra",
          college: "IIT Delhi",
          skills: ["Python", "AI", "ML"],
        },
        {
          id: "stu-2",
          name: "Riya Sharma",
          college: "NSUT",
          skills: ["UI/UX", "Figma", "Illustrator"],
        },
        {
          id: "stu-3",
          name: "Karan Gupta",
          college: "DTU",
          skills: ["React", "NodeJS", "MongoDB"],
        },
      ];

      const demoApps = demoStudents.map((stu, idx) => ({
        id: `app-${Date.now()}-${idx}`,
        internshipId: internships[0].id,
        studentId: stu.id,
        student: stu,
        status: "pending",
        progress: { tasks: [], logs: [], score: null },
      }));

      setApplicants(demoApps);
    }
  }, [internships, applicants, setApplicants]);

  const handleSelect = (app: any) =>
    updateApplicantStatus(app.id, "selected");

  const handleReject = (app: any) =>
    updateApplicantStatus(app.id, "rejected");

  return (
    <div className="space-y-6">
      
      <h1 className="text-2xl font-semibold">All Applicants</h1>

      <div className="space-y-3">
        {applicants.length === 0 && (
          <div className="text-zinc-400">No applicants yet.</div>
        )}

        {applicants.map((app: any) => (
          <ApplicantCard
            key={app.id}
            application={app}
            student={app.student}
            onView={() => setSelectedStudent(app.student)}
            onSelect={() => handleSelect(app)}
            onReject={() => handleReject(app)}
          />
        ))}
      </div>

      {selectedStudent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 w-96 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{selectedStudent.name}</h2>
            <p>College: {selectedStudent.college}</p>
            <p>Skills: {selectedStudent.skills.join(", ")}</p>

            <button
              className="mt-4 bg-white text-black px-3 py-2 rounded-md"
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
