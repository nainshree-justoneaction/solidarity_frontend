"use client";

import React, { useState } from "react";
import { useNGOInternships } from "@/context/NGOInternshipsContext";
import { useRouter } from "next/navigation";

export default function PostInternship() {
  const router = useRouter();
  const { addInternship } = useNGOInternships();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("On-site");
  const [sdg, setSdg] = useState("bg-sdg4");

  function save() {
    if (!title.trim()) {
      alert("Title required");
      return;
    }

    addInternship({
      title,
      description,
      stipend: "",          // if you add stipend later, remove this
      duration: "",         // same
      mode,
      skills: skills.split(",").map(s => s.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      location,
      sdg,
      status: "Open",
    } as any);

    router.push("/ngo/internships");
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Post Internship</h1>

      <div className="space-y-4">
        
        {/* TITLE */}
        <div>
          <label className="text-zinc-400 text-sm">Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full mt-2 bg-[#0B0B0B] border border-zinc-800 rounded px-3 py-2 text-white"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-zinc-400 text-sm">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full mt-2 bg-[#0B0B0B] border border-zinc-800 rounded px-3 py-2 text-white"
            rows={5}
          />
        </div>

        {/* SKILLS */}
        <div>
          <label className="text-zinc-400 text-sm">
            Required Skills (comma separated)
          </label>
          <input
            value={skills}
            onChange={e => setSkills(e.target.value)}
            className="w-full mt-2 bg-[#0B0B0B] border border-zinc-800 rounded px-3 py-2 text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          
          {/* LOCATION */}
          <div>
            <label className="text-zinc-400 text-sm">Location</label>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full mt-2 bg-[#0B0B0B] border border-zinc-800 rounded px-3 py-2 text-white"
            />
          </div>

          {/* MODE */}
          <div>
            <label className="text-zinc-400 text-sm">Mode</label>
            <select
              value={mode}
              onChange={e => setMode(e.target.value)}
              className="w-full mt-2 bg-[#0B0B0B] border border-zinc-800 rounded px-3 py-2 text-white"
            >
              <option>On-site</option>
              <option>Remote</option>
            </select>
          </div>
        </div>

        {/* SDG */}
        <div>
          <label className="text-zinc-400 text-sm">SDG Color</label>
          <select
            value={sdg}
            onChange={e => setSdg(e.target.value)}
            className="w-full mt-2 bg-[#0B0B0B] border border-zinc-800 rounded px-3 py-2 text-white"
          >
            <option value="bg-sdg4">Education (SDG 4)</option>
            <option value="bg-sdg6">Clean Water (SDG 6)</option>
            <option value="bg-sdg14">Life Below Water (SDG 14)</option>
            <option value="bg-sdg11">Sustainable Cities (SDG 11)</option>
            <option value="bg-sdg17">Partnerships (SDG 17)</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            onClick={save}
            className="bg-white text-black px-4 py-2 rounded-md"
          >
            Publish Internship
          </button>
        </div>
      </div>
    </div>
  );
}
