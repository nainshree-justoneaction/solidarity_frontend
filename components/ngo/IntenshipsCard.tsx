"use client";
import React from "react";

export default function InternshipCard({
  internship,
  onView,
  onApplicants,
}: {
  internship: any;
  onView?: (id: string | number) => void;
  onApplicants?: (id: string | number) => void;
}) {
  return (
    <div className="bg-[#0F0F0F] border border-[#202020] rounded-xl p-4 flex justify-between items-start">
      <div>
        <div className="text-white font-semibold">{internship.title}</div>
        <div className="text-zinc-400 text-sm mt-1">{internship.location || "Remote"} • {internship.mode || "Any"}</div>
        <div className="mt-3 flex gap-2 flex-wrap">
          {(internship.requiredSkills || []).map((s: string) => (
            <span key={s} className="text-xs bg-zinc-800 px-2 py-1 rounded-full text-zinc-300">{s}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end">
        <div className={`${internship.sdg || "bg-sdg4"} w-3 h-3 rounded-full`} />
        <div className="text-zinc-400 text-sm">{internship.applicants || 0} applicants</div>
        <div className="mt-2 flex gap-2">
          <button onClick={() => onApplicants && onApplicants(internship.id)} className="px-3 py-1 bg-white text-black rounded-md text-sm">Applicants</button>
          <button onClick={() => onView && onView(internship.id)} className="px-3 py-1 text-zinc-300 border border-zinc-700 rounded-md text-sm">View</button>
        </div>
      </div>
    </div>
  );
}
