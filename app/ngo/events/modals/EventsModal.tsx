"use client";

import { useState } from "react";

export default function EventModal({ onClose, onSubmit }: any) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [volunteersNeeded, setVolunteersNeeded] = useState(0);
  const [sdg, setSdg] = useState("bg-sdg11");

  const handleSubmit = () => {
    if (!title.trim() || !date) return alert("Fill all fields");
    onSubmit({ title, date, volunteersNeeded, sdg });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0F0F0F] p-6 rounded-xl w-[400px] space-y-4">
        <h3 className="text-white text-lg font-semibold">Create Event</h3>
        <input
          type="text"
          placeholder="Event Title"
          className="w-full p-2 rounded-md bg-zinc-900 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          className="w-full p-2 rounded-md bg-zinc-900 text-white"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Volunteers Needed"
          className="w-full p-2 rounded-md bg-zinc-900 text-white"
          value={volunteersNeeded}
          onChange={(e) => setVolunteersNeeded(Number(e.target.value))}
        />
        <select
          className="w-full p-2 rounded-md bg-zinc-900 text-white"
          value={sdg}
          onChange={(e) => setSdg(e.target.value)}
        >
          <option value="bg-sdg11">SDG 11</option>
          <option value="bg-sdg14">SDG 14</option>
        </select>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-3 py-2 rounded-md bg-zinc-700">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-2 rounded-md bg-white text-black"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
