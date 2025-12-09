"use client";
import { useContext, useState, useEffect } from "react";
import { NgoContext } from "@/context/NgoContext";
import ApplicantCard from "@/components/ngo/ApplicantCard";

export default function AllApplicants() {
  const { state, setState, updateApplication } = useContext(NgoContext);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // DEMO: auto-create applications if empty
  useEffect(() => {
    if (state.applications.length === 0 && state.internships.length > 0) {
      const demoApps = state.students.map((stu: any, idx: number) => ({
        id: `app-${Date.now()}-${idx}`,
        internshipId: state.internships[0].id,
        studentId: stu.id,
        student: stu,
        status: "pending",
        progress: { tasks: [], logs: [], score: null },
      }));
      setState((prev: any) => ({ ...prev, applications: demoApps }));
    }
  }, [state.students, state.internships, setState, state.applications.length]);

  const handleSelect = (app: any) => updateApplication(app.id, { status: "selected" });
  const handleReject = (app: any) => updateApplication(app.id, { status: "rejected" });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">All Applicants</h1>
      <div className="space-y-3">
        {state.applications.length === 0 && <div className="text-zinc-400">No applicants yet.</div>}
        {state.applications.map((app: any) => (
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
