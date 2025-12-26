"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Users, User } from "lucide-react";
import { useNGO } from "@/context/NgoContext";
import { useNGOApplicants } from "@/context/NGOApplicantsContext";

/* ================================================= */

export default function InternshipApplicantsPage() {
  const router = useRouter();
  const params = useParams();
  const internshipId = String(params.id);

  const { internships } = useNGO();
  const { applicants, updateApplicantStatus } = useNGOApplicants();

  const internship = internships.find(
    (i) => String(i.id) === internshipId
  );

  const internshipApplicants = applicants.filter(
    (a) => String(a.internshipId) === internshipId
  );

  if (!internship) {
    return (
      <div className="p-10 text-white">
        <p className="text-white/60">Internship not found.</p>
        <button
          onClick={() => router.push("/ngo/internships")}
          className="mt-4 text-[#00ADEF]"
        >
          ← Back to internships
        </button>
      </div>
    );
  }

  return (
    <div className="px-8 py-10 space-y-10 text-white">

      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <button
            onClick={() => router.push("/ngo/internships")}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-3"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-3xl font-bold">
            Applicants
          </h1>

          <p className="text-white/60 mt-2">
            Internship:{" "}
            <span className="text-white font-medium">
              {internship.title}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
          <Users size={18} className="text-[#00ADEF]" />
          <span className="font-semibold">
            {internshipApplicants.length}
          </span>
          <span className="text-white/60 text-sm">
            Applicants
          </span>
        </div>
      </div>

      {/* ================= LIST ================= */}
      {internshipApplicants.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4">
          {internshipApplicants.map((app, index) => (
            <ApplicantCard
              key={app.id}
              applicant={app.student}
              status={app.status}
              onSelect={() =>
                updateApplicantStatus(app.id, "selected")
              }
              onReject={() =>
                updateApplicantStatus(app.id, "rejected")
              }
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================================= */
/* COMPONENTS */
/* ================================================= */

function ApplicantCard({
  applicant,
  status,
  onSelect,
  onReject,
  index,
}: {
  applicant: any;
  status: string;
  onSelect: () => void;
  onReject: () => void;
  index: number;
}) {
  return (
    <div
      className="
        bg-gradient-to-br from-[#0f0f0f] to-[#0b0b0b]
        border border-white/10 rounded-2xl p-6
        flex items-center justify-between
        hover:border-white/20 transition
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#00ADEF]/10 flex items-center justify-center">
          <User className="text-[#00ADEF]" />
        </div>

        <div>
          <p className="font-semibold">
            {applicant?.name || `Applicant ${index + 1}`}
          </p>
          <p className="text-white/60 text-sm">
            {applicant?.college || "College not shared"}
          </p>

          {status !== "pending" && (
            <span
              className={`inline-block mt-2 text-xs px-3 py-1 rounded-full
                ${
                  status === "selected"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
            >
              {status.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex gap-2">
        {status === "pending" && (
          <>
            <button
              onClick={onReject}
              className="
                px-4 py-2 rounded-lg text-sm
                border border-white/20 text-white/80
                hover:bg-white/5 transition
              "
            >
              Reject
            </button>

            <button
              onClick={onSelect}
              className="
                px-4 py-2 rounded-lg text-sm font-medium
                bg-[#00ADEF] text-black
                hover:bg-[#00c7ff] transition
              "
            >
              Shortlist
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-14 text-center">
      <h3 className="text-2xl font-semibold mb-3">
        No applicants yet
      </h3>
      <p className="text-white/60 max-w-lg mx-auto">
        Students who apply to this internship will appear here for review.
      </p>
    </div>
  );
}
