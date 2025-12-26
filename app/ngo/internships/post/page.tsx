"use client";

import React, { useState } from "react";
import { useNGO } from "@/context/NgoContext";
import { useRouter } from "next/navigation";
import { Briefcase, MapPin, Layers } from "lucide-react";

/* ---------- input style ---------- */
const inputClass = `
  w-full rounded-xl bg-[#070707]
  border border-white/15 px-4 py-3
  text-white text-sm placeholder:text-white/30
  focus:outline-none focus:border-[#00ADEF]
  focus:ring-2 focus:ring-[#00ADEF]/20 transition
`;

export default function PostInternship() {
  const router = useRouter();
  const { addInternship } = useNGO(); // ✅ SAME CONTEXT

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("On-site");
  const [sdg, setSdg] = useState("bg-sdg4");

  function save() {
    if (!title.trim()) {
      alert("Internship title is required");
      return;
    }

    addInternship({
      id: Date.now(),
      title,
      description,
      skills: skills.split(",").map(s => s.trim()).filter(Boolean),
      location,
      mode,
      sdg,
      applicants: [],
      status: "Open",
      createdAt: new Date().toISOString(),
    });

    router.push("/ngo/internships");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10 text-white">

      {/* HEADER */}
      <div>
        <p className="text-xs uppercase tracking-widest text-white/40">
          NGO Dashboard
        </p>
        <h1 className="text-3xl font-bold mt-2">Post a New Internship</h1>
        <p className="text-white/60 mt-3 max-w-2xl">
          Well-defined roles attract better applicants.
        </p>
      </div>

      {/* FORM */}
      <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-8 space-y-12">

        <Section icon={<Briefcase />} title="Basics" subtitle="Define the role">
          <Field label="Title">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Community Outreach Intern"
              className={inputClass}
            />
          </Field>

          <Field label="Description">
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={6}
              className={`${inputClass} resize-none`}
            />
          </Field>
        </Section>

        <Section icon={<Layers />} title="Requirements" subtitle="Skills & setup">
          <Field label="Skills (comma separated)">
            <input
              value={skills}
              onChange={e => setSkills(e.target.value)}
              className={inputClass}
            />
          </Field>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Location">
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Mode">
              <select
                value={mode}
                onChange={e => setMode(e.target.value)}
                className={inputClass}
              >
                <option>On-site</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </Field>
          </div>
        </Section>

        <Section icon={<MapPin />} title="SDG Alignment" subtitle="Impact focus">
          <Field label="Primary SDG">
            <select
              value={sdg}
              onChange={e => setSdg(e.target.value)}
              className={inputClass}
            >
              <option value="bg-sdg4">Education</option>
              <option value="bg-sdg6">Clean Water</option>
              <option value="bg-sdg11">Sustainable Cities</option>
              <option value="bg-sdg14">Life Below Water</option>
              <option value="bg-sdg17">Partnerships</option>
            </select>
          </Field>
        </Section>

        <div className="flex justify-end pt-6 border-t border-white/10">
          <button
            onClick={save}
            className="bg-white text-black px-7 py-3 rounded-xl font-semibold"
          >
            Publish Internship
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- reusable ---------- */

function Section({ icon, title, subtitle, children }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="text-[#00ADEF]">{icon}</div>
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-white/50">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-white/70">{label}</label>
      {children}
    </div>
  );
}
