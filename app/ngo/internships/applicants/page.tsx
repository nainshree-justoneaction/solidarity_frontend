"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useNGOInternships } from "@/context/NGOInternshipsContext";
import { useNGOApplicants } from "@/context/NGOApplicantsContext";
import ApplicantCard from "@/components/ngo/ApplicantCard";
import { Users, CheckCircle, XCircle } from "lucide-react";

/* ================================================== */

export default function AllApplicantsPage() {
  const { internships } = useNGOInternships();
  const { applicants, setApplicants, updateApplicantStatus } =
    useNGOApplicants();

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  // 🔒 ensure demo data runs only once
  const demoSeeded = useRef(false);

  /* ================= DEMO DATA ================= */
  useEffect(() => {
    if (demoSeeded.current) return;
    if (applicants.length > 0) return;

    demoSeeded.current = true;

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

    setApplicants(
      demoStudents.map((stu, idx) => ({
        id: `app-${Date.now()}-${idx}`,
        internshipId: "demo-internship",
        studentId: stu.id,
        student: stu,
        status: "pending",
        progress: { tasks: [], logs: [], score: null },
      }))
    );
  }, [applicants.length, setApplicants]);

  /* ================= STATS ================= */
  const stats = useMemo(() => {
    return {
      total: applicants.length,
      selected: applicants.filter(a => a.status === "selected").length,
      rejected: applicants.filter(a => a.status === "rejected").length,
    };
  }, [applicants]);

  /* ================= ACTIONS ================= */
  const handleSelect = (app: any) =>
    updateApplicantStatus(app.id, "selected");

  const handleReject = (app: any) =>
    updateApplicantStatus(app.id, "rejected");

  /* ================= RENDER ================= */
  return (
    <div className="px-8 py-10 space-y-10 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          All Applicants
        </h1>
        <p className="text-white/60 mt-2 max-w-xl">
          Review, shortlist, and onboard students applying to your internships.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Stat icon={<Users />} label="Total Applicants" value={stats.total} />
        <Stat icon={<CheckCircle />} label="Selected" value={stats.selected} />
        <Stat icon={<XCircle />} label="Rejected" value={stats.rejected} />
      </div>

      {/* LIST */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Applicant List</h2>

        {applicants.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
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
        )}
      </div>

      {/* MODAL */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

/* ================================================== */
/* SUB COMPONENTS */
/* ================================================== */

function Stat({ icon, label, value }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#00ADEF]/10 text-[#00ADEF] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-white/60 text-sm">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-14 text-center">
      <h3 className="text-xl font-semibold mb-2">
        No applicants yet
      </h3>
      <p className="text-white/60">
        Students who apply to your internships will appear here.
      </p>
    </div>
  );
}

/* ================= MODAL ================= */

function StudentModal({
  student,
  onClose,
}: {
  student: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold">{student.name}</h2>
        <p className="text-white/60 mt-1">{student.college}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {student.skills.map((s: string) => (
            <span
              key={s}
              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="bg-white text-black px-6 py-2 rounded-xl font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
