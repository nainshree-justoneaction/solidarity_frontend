"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Building2, MapPin, Mail, Phone, Globe, Shield } from "lucide-react";

const inputClass = `
  w-full rounded-xl bg-[#070707]
  border border-white/15 px-4 py-3
  text-white text-sm
  placeholder:text-white/30
  focus:outline-none focus:ring-2
  focus:ring-[#00ADEF]/30 focus:border-[#00ADEF]
  transition
`;

export default function EditNGOProfile() {
  const router = useRouter();

  /* ================= DEMO STATE ================= */
  const [form, setForm] = useState({
    name: "Parikranti Foundation",
    description:
      "Parikranti Foundation works on education, community development, and youth empowerment across central India.",
    city: "Indore, Madhya Pradesh",
    email: "contact@parikranti.org",
    phone: "+91 9XXXXXXXXX",
    website: "www.parikranti.org",
    registrationId: "MP/2018/XXXX",
    pan: "AACTPXXXXQ",
    compliance: "12A • 80G",
  });

  function update(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function saveProfile() {
    // DEMO: later replace with API
    console.log("Updated NGO Profile:", form);
    alert("Profile updated successfully (demo).");
    router.push("/ngo/profile");
  }

  return (
    <div className="px-8 py-10 max-w-5xl mx-auto space-y-10 text-white">

      {/* ================= HEADER ================= */}
      <div>
        <p className="text-xs uppercase tracking-widest text-white/40">
          NGO Dashboard
        </p>
        <h1 className="text-3xl font-bold mt-2">
          Edit NGO Profile
        </h1>
        <p className="text-white/60 mt-3 max-w-2xl">
          This information is visible to donors, students, and partners.
          Keep it accurate and professional.
        </p>
      </div>

      {/* ================= FORM CARD ================= */}
      <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-10 space-y-12">

        {/* ================= BASIC INFO ================= */}
        <Section icon={<Building2 />} title="Organization Information">
          <Field label="NGO Name">
            <input
              value={form.name}
              onChange={e => update("name", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="About NGO">
            <textarea
              rows={5}
              value={form.description}
              onChange={e => update("description", e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </Field>

          <Field label="City & State">
            <input
              value={form.city}
              onChange={e => update("city", e.target.value)}
              className={inputClass}
            />
          </Field>
        </Section>

        {/* ================= CONTACT ================= */}
        <Section icon={<Mail />} title="Contact Details">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Email">
              <input
                value={form.email}
                onChange={e => update("email", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Phone">
              <input
                value={form.phone}
                onChange={e => update("phone", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Website">
            <input
              value={form.website}
              onChange={e => update("website", e.target.value)}
              className={inputClass}
            />
          </Field>
        </Section>

        {/* ================= LEGAL ================= */}
        <Section icon={<Shield />} title="Legal & Compliance">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Registration ID">
              <input
                value={form.registrationId}
                onChange={e => update("registrationId", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="PAN">
              <input
                value={form.pan}
                onChange={e => update("pan", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Compliance Certificates">
            <input
              value={form.compliance}
              onChange={e => update("compliance", e.target.value)}
              className={inputClass}
            />
          </Field>
        </Section>

        {/* ================= ACTION ================= */}
        <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
          <button
            onClick={() => router.push("/ngo/profile")}
            className="px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={saveProfile}
            className="bg-[#00ADEF] text-black px-8 py-3 rounded-xl font-semibold hover:bg-[#00c7ff] transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE ================= */

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="text-[#00ADEF]">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/70">
        {label}
      </label>
      {children}
    </div>
  );
}
