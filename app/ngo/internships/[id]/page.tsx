"use client";

import { useParams, useRouter } from "next/navigation";
import { useNGO } from "@/context/NgoContext";
import { useMemo, useState } from "react";
import { ArrowLeft, Users } from "lucide-react";

/* -------------------------------------------------- */

export default function InternshipDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { internships } = useNGO();

  const internship = useMemo(
    () => internships.find((i) => String(i.id) === String(id)),
    [internships, id]
  );

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  if (!internship) {
    return (
      <div className="p-10 text-white/60">
        Internship not found.
      </div>
    );
  }

  const applicants = internship.applicants || [];

  return (
    <div className="px-8 py-10 space-y-10 text-white">

      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => router.push("/ngo/internships")}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-3"
          >
            <ArrowLeft size={16} />
            Back to internships
          </button>

          <h1 className="text-3xl font-bold">
            {internship.title}
          </h1>

          <p className="text-white/60 mt-2 max-w-2xl">
            {internship.description || "No description provided."}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
          <Users size={18} className="text-[#00ADEF]" />
          <span className="font-semibold">{applicants.length}</span>
          <span className="text-white/60 text-sm">Applicants</span>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= APPLICANTS ================= */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">
            Applicants
          </h2>

          {applicants.length === 0 ? (
            <EmptyApplicants />
          ) : (
            <div className="space-y-4">
              {applicants.map((app: any) => (
                <ApplicantCard
                  key={app.id}
                  applicant={app}
                  onView={() => setSelectedStudent(app)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-lg">
            Internship Info
          </h3>

          <Info label="Location" value={internship.location || "Not specified"} />
          <Info label="Mode" value={internship.mode || "N/A"} />
          <Info
            label="Skills"
            value={
              internship.requiredSkills?.join(", ") || "Not specified"
            }
          />
          <Info label="Status" value={internship.status || "Open"} />
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedStudent && (
        <StudentProfileModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------- */
/* COMPONENTS */
/* -------------------------------------------------- */

function ApplicantCard({
  applicant,
  onView,
}: {
  applicant: any;
  onView: () => void;
}) {
  return (
    <div className="
      bg-gradient-to-br from-[#0f0f0f] to-[#0b0b0b]
      border border-white/10 rounded-2xl p-6
      flex items-center justify-between
      hover:border-white/20 transition
    ">
      <div>
        <p className="font-semibold">
          {applicant.fullName}
        </p>
        <p className="text-white/60 text-sm">
          {applicant.email}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onView}
          className="px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/5"
        >
          View
        </button>

        <button
          className="px-4 py-2 rounded-lg bg-[#00ADEF] text-black font-medium hover:bg-[#00c7ff]"
        >
          Shortlist
        </button>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-white/40">{label}</p>
      <p className="text-sm text-white">{value}</p>
    </div>
  );
}

function EmptyApplicants() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
      <h3 className="text-xl font-semibold mb-2">
        No applicants yet
      </h3>
      <p className="text-white/60">
        Students who apply to this internship will appear here.
      </p>
    </div>
  );
}

/* -------------------------------------------------- */

function StudentProfileModal({
  student,
  onClose,
}: {
  student: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-2">
          {student.fullName}
        </h2>
        <p className="text-white/60 mb-6">
          {student.email}
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white text-black rounded-lg font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
