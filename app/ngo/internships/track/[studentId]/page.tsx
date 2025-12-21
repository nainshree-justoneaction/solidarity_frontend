"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { useNGO } from "@/context/NgoContext";
import { useParams, useRouter } from "next/navigation";

type Task = { text: string; done: boolean };
type Log = { date: string; text: string };

export default function TrackStudent() {
  const router = useRouter();
  const params = useParams();
  const studentId = String(params?.studentId || "");

  const { internships } = useNGO();

  // TEMP mock: until backend exists
  const selected = internships.find(
    (i) => String(i.id) === studentId
  );

  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);

  function addTask(text: string) {
    if (!text.trim()) return;
    setTasks((t) => [...t, { text, done: false }]);
  }

  function toggleTask(index: number) {
    setTasks((t) =>
      t.map((x, i) =>
        i === index ? { ...x, done: !x.done } : x
      )
    );
  }

  function addLog() {
    const txt = prompt("Enter log");
    if (!txt?.trim()) return;

    setLogs((l) => [
      { date: new Date().toLocaleString(), text: txt },
      ...l,
    ]);
  }

  if (!selected) {
    return <div className="text-zinc-400">Intern not found.</div>;
  }

  const completed = tasks.filter((t) => t.done).length;
  const percent =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{selected.title}</h1>
        <button onClick={() => router.back()} className="text-zinc-300">
          Back
        </button>
      </div>

      <div>
        <p className="text-zinc-400">Progress: {percent}%</p>
        <div className="h-2 bg-zinc-800 rounded mt-2">
          <div
            className="h-2 bg-emerald-400 rounded"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tasks */}
        <div>
          <h3 className="font-semibold mb-2">Tasks</h3>
          <div className="bg-[#0F0F0F] border border-[#202020] p-4 rounded space-y-2">
            {tasks.length === 0 && (
              <div className="text-zinc-400">No tasks yet.</div>
            )}

            {tasks.map((t, i) => (
              <div key={i} className="flex justify-between">
                <span className={t.done ? "line-through text-zinc-400" : ""}>
                  {t.text}
                </span>
                <button
                  onClick={() => toggleTask(i)}
                  className="bg-white text-black px-2 py-1 rounded text-sm"
                >
                  {t.done ? "Undo" : "Done"}
                </button>
              </div>
            ))}

            <TaskInput onAdd={addTask} />
          </div>
        </div>

        {/* Logs */}
        <div>
          <h3 className="font-semibold mb-2">Logs</h3>
          <div className="bg-[#0F0F0F] border border-[#202020] p-4 rounded space-y-3">
            {logs.length === 0 && (
              <div className="text-zinc-400">No logs yet.</div>
            )}

            {logs.map((l, i) => (
              <div key={i}>
                <p className="text-xs text-zinc-400">{l.date}</p>
                <p>{l.text}</p>
              </div>
            ))}

            <button
              onClick={addLog}
              className="bg-white text-black px-3 py-2 rounded"
            >
              Add Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskInput({ onAdd }: { onAdd: (t: string) => void }) {
  const [value, setValue] = useState("");

  return (
    <div className="flex gap-2 pt-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New task"
        className="flex-1 bg-[#0B0B0B] border border-zinc-800 px-3 py-2 rounded"
      />
      <button
        onClick={() => {
          onAdd(value);
          setValue("");
        }}
        className="bg-white text-black px-3 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
}
