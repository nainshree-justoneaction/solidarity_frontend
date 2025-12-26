"use client";

import { useMemo } from "react";
import {
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useNGOApplicants } from "@/context/NGOApplicantsContext";
import { useNGO } from "@/context/NgoContext";

export default function TrackInternsPage() {
  const { applicants, updateApplicantProgress } = useNGOApplicants();
  const { internships } = useNGO();

  /* ================= SELECTED ONLY ================= */
  const selected = useMemo(
    () => applicants.filter(a => a.status === "selected"),
    [applicants]
  );

  return (
    <div className="px-8 py-10 space-y-10 text-white">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Intern Progress Tracking
        </h1>
        <p className="text-white/60 mt-2 max-w-xl">
          Monitor tasks, engagement, and performance of assigned students.
        </p>
      </div>

      {/* ================= EMPTY ================= */}
      {selected.length === 0 && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-14 text-center">
          <h3 className="text-2xl font-semibold mb-3">
            No interns assigned yet
          </h3>
          <p className="text-white/60">
            Select applicants to start tracking progress.
          </p>
        </div>
      )}

      {/* ================= LIST ================= */}
      <div className="space-y-6">
        {selected.map((app) => {
          const internship = internships.find(
            i => i.id === app.internshipId
          );

          return (
            <InternProgressCard
              key={app.id}
              app={app}
              internshipTitle={internship?.title}
              onUpdate={updateApplicantProgress}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ================================================= */
/* CARD */
/* ================================================= */

function InternProgressCard({
  app,
  internshipTitle,
  onUpdate,
}: any) {
  const completedTasks = app.progress.tasks.filter((t: any) => t.done).length;
  const totalTasks = app.progress.tasks.length;

  const score =
    app.progress.score ??
    Math.min(100, completedTasks * 30 + app.progress.logs.length * 10);

  let status = "Active";
  let statusIcon = <Clock size={14} />;
  let statusColor = "text-yellow-400";

  if (score >= 80) {
    status = "On Track";
    statusIcon = <CheckCircle size={14} />;
    statusColor = "text-green-400";
  } else if (score < 40) {
    status = "At Risk";
    statusIcon = <AlertTriangle size={14} />;
    statusColor = "text-red-400";
  }

  function toggleTask(idx: number) {
    const updated = [...app.progress.tasks];
    updated[idx].done = !updated[idx].done;

    onUpdate(app.id, {
      ...app.progress,
      tasks: updated,
    });
  }

  return (
    <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-8 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">
            {app.student.name}
          </h3>
          <p className="text-white/60 text-sm">
            {internshipTitle}
          </p>
        </div>

        <div className={`flex items-center gap-1 text-sm ${statusColor}`}>
          {statusIcon}
          {status}
        </div>
      </div>

      {/* TASKS */}
      <div>
        <p className="text-sm text-white/60 mb-2">
          Tasks ({completedTasks}/{totalTasks})
        </p>

        <div className="space-y-2">
          {app.progress.tasks.map((t: any, idx: number) => (
            <label
              key={idx}
              className="flex items-center gap-3 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTask(idx)}
              />
              <span
                className={t.done ? "line-through text-white/40" : ""}
              >
                {t.title}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* LOGS */}
      <div>
        <p className="text-sm text-white/60 mb-2">
          Weekly Updates
        </p>

        {app.progress.logs.length === 0 && (
          <p className="text-white/40 text-sm">
            No updates submitted yet.
          </p>
        )}

        <ul className="list-disc ml-4 text-sm space-y-1 text-white/70">
          {app.progress.logs.map((l: string, i: number) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>

      {/* SCORE */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <p className="text-sm text-white/60">
          Performance Score
        </p>
        <span className="text-xl font-bold">
          {score}%
        </span>
      </div>
    </div>
  );
}
