"use client";

import { Users, Eye, CheckCircle } from "lucide-react";

export default function InternshipCard({
  internship,
  onView,
  onApplicants,
}: {
  internship: any;
  onView?: (id: string | number) => void;
  onApplicants?: (id: string | number) => void;
}) {
  const applicantCount = Array.isArray(internship.applicants)
    ? internship.applicants.length
    : internship.applicants || 0;

  const status = internship.status || "Open";

  return (
    <div
      className="
        group
        bg-gradient-to-br from-[#0f0f0f] to-[#0b0b0b]
        border border-white/10 rounded-2xl p-6
        flex flex-col md:flex-row md:items-center md:justify-between gap-6
        hover:border-[#00ADEF]/40 hover:shadow-[0_0_0_1px_rgba(0,173,239,0.25)]
        transition-all duration-300
      "
    >
      {/* ================= LEFT ================= */}
      <div className="space-y-3 max-w-2xl">
        {/* TITLE + STATUS */}
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-white">
            {internship.title}
          </h3>

          <span
            className={`text-xs px-2 py-0.5 rounded-full border ${
              status === "Open"
                ? "border-green-400/40 text-green-300"
                : "border-white/20 text-white/50"
            }`}
          >
            {status}
          </span>
        </div>

        {/* META */}
        <p className="text-sm text-white/60">
          {internship.location || "Remote"} •{" "}
          {internship.mode || "Flexible"}
        </p>

        {/* SKILLS */}
        {internship.requiredSkills?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {internship.requiredSkills.map((skill: string) => (
              <span
                key={skill}
                className="
                  text-xs px-3 py-1 rounded-full
                  bg-white/5 border border-white/10
                  text-white/70
                  group-hover:border-white/20 transition
                "
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex flex-col items-start md:items-end gap-4 min-w-[230px]">
        {/* SDG + APPLICANTS */}
        <div className="flex items-center gap-4 text-sm">
          {/* SDG */}
          <div className="flex items-center gap-2 text-white/60">
            <span
              className={`w-3 h-3 rounded-full ${
                internship.sdg || "bg-sdg4"
              }`}
            />
            SDG aligned
          </div>

          {/* APPLICANTS */}
          <div className="flex items-center gap-1 text-white/70">
            <Users size={14} />
            {applicantCount}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">
          <button
            onClick={() => onApplicants && onApplicants(internship.id)}
            className="
              px-4 py-2 rounded-lg text-sm font-medium
              bg-white text-black
              hover:bg-white/90 transition
              flex items-center gap-1
            "
          >
            <CheckCircle size={14} />
            Applicants
          </button>

          <button
            onClick={() => onView && onView(internship.id)}
            className="
              px-4 py-2 rounded-lg text-sm font-medium
              border border-white/20 text-white/80
              hover:bg-white/5 transition
              flex items-center gap-1
            "
          >
            <Eye size={14} />
            View
          </button>
        </div>
      </div>
    </div>
  );
}
