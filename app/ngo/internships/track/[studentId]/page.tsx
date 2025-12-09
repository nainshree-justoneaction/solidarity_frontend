"use client";
import React, { useContext, useState, useEffect } from "react";
import { NgoContext } from "@/context/NgoContext";
import { useParams, useRouter } from "next/navigation";

export default function TrackStudent() {
  const { state, setState } = useContext(NgoContext);
  const params = useParams();
  const studentId = params.studentId;
  const router = useRouter();

  // find selected student
  const selected = (state.selectedInterns || []).find(
    (s: any) => String(s.studentId) === String(studentId) || String(s.id) === String(studentId)
  );

  const [progress, setProgress] = useState<any>({ tasks: [], logs: [] });

  useEffect(() => {
    const prog = state.progress?.[studentId];
    if (prog) setProgress(prog);
  }, [state.progress, studentId]);

  function saveProgress(updated: any) {
    const nextProgress = { ...(state.progress || {}), [studentId]: updated };
    setState({ ...state, progress: nextProgress });
    setProgress(updated);
  }

  function addTask(text: string) {
    if (!text.trim()) return;
    const updated = { ...progress, tasks: [...(progress.tasks || []), { text, done: false }] };
    saveProgress(updated);
  }

  function toggleTask(i: number) {
    const tasks = [...(progress.tasks || [])];
    tasks[i].done = !tasks[i].done;
    saveProgress({ ...progress, tasks });
  }

  function addLog() {
    const txt = prompt("Enter log");
    if (!txt) return;
    const updated = { ...progress, logs: [...(progress.logs || []), { date: new Date().toLocaleString(), text: txt }] };
    saveProgress(updated);
  }

  if (!selected) return <div className="text-zinc-400">Selected intern not found.</div>;

  const completed = (progress.tasks || []).filter((t: any) => t.done).length;
  const total = (progress.tasks || []).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{selected.student?.name || selected.name}</h1>
          <div className="text-zinc-400 text-sm">{selected.student?.college}</div>
        </div>
        <div>
          <button onClick={() => router.back()} className="text-zinc-300">Back</button>
        </div>
      </div>

      <div>
        <div className="text-zinc-400">Progress: {percent}%</div>
        <div className="w-full h-2 bg-zinc-800 rounded mt-2">
          <div className="h-2 bg-emerald-400 rounded" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks */}
        <div>
          <h3 className="text-white font-semibold mb-2">Tasks</h3>
          <div className="bg-[#0F0F0F] border border-[#202020] rounded p-4 space-y-2">
            {(progress.tasks || []).length === 0 && <div className="text-zinc-400">No tasks yet.</div>}
            {(progress.tasks || []).map((t: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <div className={`${t.done ? "line-through text-zinc-400" : ""}`}>{t.text}</div>
                <button onClick={() => toggleTask(i)} className="px-2 py-1 bg-white text-black rounded-md text-sm">
                  {t.done ? "Undo" : "Done"}
                </button>
              </div>
            ))}
            <div className="pt-3 flex gap-2">
              <input
                id="newTask"
                placeholder="New task"
                className="flex-1 bg-[#0B0B0B] border border-zinc-800 rounded px-3 py-2 text-white"
              />
              <button
                onClick={() => {
                  const el = document.getElementById("newTask") as HTMLInputElement;
                  addTask(el.value);
                  el.value = "";
                }}
                className="px-3 py-2 bg-white text-black rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Logs */}
        <div>
          <h3 className="text-white font-semibold mb-2">Logs</h3>
          <div className="bg-[#0F0F0F] border border-[#202020] rounded p-4 space-y-3">
            {(progress.logs || []).length === 0 && <div className="text-zinc-400">No logs yet.</div>}
            {(progress.logs || []).map((l: any, i: number) => (
              <div key={i}>
                <div className="text-zinc-400 text-xs">{l.date}</div>
                <div className="text-white">{l.text}</div>
              </div>
            ))}
            <div className="pt-3">
              <button onClick={addLog} className="px-3 py-2 bg-white text-black rounded-md">Add Log</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
