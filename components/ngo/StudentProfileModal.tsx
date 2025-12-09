"use client";
import React from "react";

export default function StudentProfileModal({
  student,
  onClose,
}: {
  student: any | null;
  onClose: () => void;
}) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#090909] border border-[#202020] rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-white text-xl font-semibold">{student.name}</div>
            <div className="text-zinc-400 text-sm">{student.college} • {student.course} • {student.year}</div>
          </div>
          <button onClick={onClose} className="text-zinc-300">Close</button>
        </div>

        <div className="mt-4">
          <h4 className="text-zinc-400 text-sm">Skills</h4>
          <div className="mt-2 flex gap-2 flex-wrap">
            {(student.skills || []).map((s: string) => <span key={s} className="text-xs bg-zinc-800 px-2 py-1 rounded-full text-zinc-300">{s}</span>)}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-zinc-400 text-sm">Projects</h4>
          <ul className="mt-2 list-disc ml-5 text-zinc-300">
            {(student.projects || []).map((p: string, idx: number) => <li key={idx}>{p}</li>)}
          </ul>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <a target="_blank" rel="noreferrer" href={student.resume || "#"} className="px-3 py-2 bg-white text-black rounded-md">Resume</a>
          <button onClick={onClose} className="px-3 py-2 text-zinc-300">Close</button>
        </div>
      </div>
    </div>
  );
}
