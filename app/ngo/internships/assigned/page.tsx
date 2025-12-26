"use client";

import { useMemo } from "react";
import { Users, GraduationCap, CalendarCheck } from "lucide-react";
import { useNGO } from "@/context/NgoContext";
import { useNGOApplicants } from "@/context/NGOApplicantsContext";

export default function AssignedStudentsPage() {
  const { internships } = useNGO();
  const { applicants } = useNGOApplicants();

  /* ================= FILTER SELECTED ================= */
  const assigned = useMemo(() => {
    return applicants.filter(a => a.status === "selected");
  }, [applicants]);

  /* ================= GROUP BY INTERNSHIP ================= */
  const grouped = useMemo(() => {
    const map: Record<string, any[]> = {};
    assigned.forEach(app => {
      if (!map[app.internshipId]) map[app.internshipId] = [];
      map[app.internshipId].push(app);
    });
    return map;
  }, [assigned]);

  return (
    <div className="px-8 py-10 space-y-10 text-white">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Students Assigned
        </h1>
        <p className="text-white/60 mt-2 max-w-xl">
          Track students who have been selected and onboarded for internships.
        </p>
      </div>

      {/* ================= EMPTY ================= */}
      {assigned.length === 0 && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-14 text-center">
          <h3 className="text-2xl font-semibold mb-3">
            No students assigned yet
          </h3>
          <p className="text-white/60">
            Once you shortlist applicants, they will appear here.
          </p>
        </div>
      )}

      {/* ================= LIST ================= */}
      <div className="space-y-10">
        {Object.keys(grouped).map((internshipId) => {
          const internship = internships.find(
            i => String(i.id) === String(internshipId)
          );

          return (
            <div
              key={internshipId}
              className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-8 space-y-6"
            >
              {/* INTERNSHIP TITLE */}
              <div>
                <h2 className="text-2xl font-semibold">
                  {internship?.title || "Internship"}
                </h2>
                <p className="text-white/50 text-sm mt-1">
                  Assigned Students
                </p>
              </div>

              {/* STUDENTS */}
              <div className="grid gap-4">
                {grouped[internshipId].map((app) => (
                  <StudentRow key={app.id} student={app.student} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================= */
/* STUDENT ROW */
/* ================================================= */

function StudentRow({ student }: { student: any }) {
  return (
    <div
      className="
        bg-gradient-to-br from-[#0f0f0f] to-[#0b0b0b]
        border border-white/10 rounded-2xl p-6
        flex items-center justify-between
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#00ADEF]/10 flex items-center justify-center">
          <Users className="text-[#00ADEF]" />
        </div>

        <div>
          <p className="font-semibold">
            {student.name}
          </p>
          <p className="text-white/60 text-sm flex items-center gap-1">
            <GraduationCap size={14} />
            {student.college}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {student.skills.map((s: string) => (
              <span
                key={s}
                className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="text-right">
        <span className="inline-flex items-center gap-1 text-green-400 text-sm font-medium">
          <CalendarCheck size={14} />
          Active
        </span>
      </div>
    </div>
  );
}
