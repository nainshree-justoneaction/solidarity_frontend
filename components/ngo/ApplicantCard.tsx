"use client";
import React from "react";

export default function ApplicantCard({
  application,
  student,
  onView,
  onSelect,
  onReject,
}: {
  application: any;
  student: any;
  onView?: (s:any) => void;
  onSelect?: (app:any) => void;
  onReject?: (app:any) => void;
}) {
  return (
    <div className="bg-[#0B0B0B] border border-[#171717] rounded-md p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white">
          {student.name?.split(" ").map((n:string)=>n[0]).slice(0,2)}
        </div>
        <div>
          <div className="text-white font-medium">{student.name}</div>
          <div className="text-zinc-400 text-sm">{student.college} • {student.course}</div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="text-zinc-400 text-sm">{application.status}</div>
        <div className="flex gap-2">
          <button onClick={() => onView && onView(student)} className="text-sm underline text-zinc-300">View</button>
          {application.status !== "selected" && (
            <>
              <button onClick={() => onSelect && onSelect(application)} className="px-3 py-1 bg-white text-black rounded-md text-sm">Select</button>
              <button onClick={() => onReject && onReject(application)} className="px-3 py-1 text-rose-400 rounded-md text-sm">Reject</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
