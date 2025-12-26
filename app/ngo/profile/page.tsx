"use client";

import { ShieldCheck, MapPin, Users, HandHeart, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
export default function NGOProfilePage() {
  const router = useRouter();
  return (
    <div className="px-8 py-10 space-y-12 text-white">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            NGO Profile
          </h1>
          <p className="text-white/60 mt-2 max-w-xl">
            Public-facing profile used by donors, students, and partners to
            evaluate credibility and impact.
          </p>
        </div>

        <button
          className="
            flex items-center gap-2
            bg-[#00ADEF] text-black px-6 py-3 rounded-xl
            font-semibold hover:bg-[#00c7ff] transition
          "
          onClick={() => router.push("/ngo/profile/edit")}
        >
          <Edit size={18} />
          Edit Profile
        </button>
      </div>

      {/* ================= ORG CARD ================= */}
      <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row gap-8">

        {/* LEFT */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold">
            Parikranti Foundation
          </h2>

          <p className="text-white/60 leading-relaxed max-w-2xl">
            Parikranti Foundation is a grassroots NGO working on education,
            community development, and youth empowerment across central India.
            We collaborate with students, institutions, and donors to deliver
            measurable social impact.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Badge label="Verified NGO" />
            <Badge label="80G Certified" />
            <Badge label="12A Registered" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-72 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-green-400">
            <ShieldCheck size={18} />
            <span className="font-semibold">Verified Organization</span>
          </div>

          <p className="text-white/60 text-sm">
            All documents verified by platform admins.
          </p>

          <div className="pt-4 border-t border-white/10 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <MapPin size={14} />
              Indore, Madhya Pradesh
            </div>

            <div className="flex items-center gap-2 text-white/70">
              <Users size={14} />
              Founded in 2018
            </div>
          </div>
        </div>
      </div>

      {/* ================= IMPACT STRIP ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Stat label="Students Impacted" value="1,200+" />
        <Stat label="Internships Hosted" value="85+" />
        <Stat label="Funds Raised" value="₹18.4L" />
        <Stat label="Communities Served" value="32" />
      </div>

      {/* ================= SDG ALIGNMENT ================= */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-semibold mb-6">
          SDG Alignment
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <SDGCard
            title="Quality Education"
            sdg="SDG 4"
            desc="Student internships, learning programs, skill development"
          />
          <SDGCard
            title="Clean Water & Sanitation"
            sdg="SDG 6"
            desc="Water quality monitoring & awareness drives"
          />
          <SDGCard
            title="Sustainable Cities"
            sdg="SDG 11"
            desc="Community engagement & urban resilience initiatives"
          />
        </div>
      </div>

      {/* ================= CONTACT & LEGAL ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* CONTACT */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-semibold mb-4">
            Contact Information
          </h3>

          <InfoRow label="Email" value="contact@parikranti.org" />
          <InfoRow label="Phone" value="+91 9XXXXXXXXX" />
          <InfoRow label="Website" value="www.parikranti.org" />
        </div>

        {/* LEGAL */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-semibold mb-4">
            Legal Details
          </h3>

          <InfoRow label="Registration ID" value="MP/2018/XXXX" />
          <InfoRow label="PAN" value="AACTPXXXXQ" />
          <InfoRow label="Compliance" value="12A • 80G" />
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Badge({ label }: { label: string }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">
      {label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <p className="text-white/60 text-sm">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function SDGCard({
  title,
  sdg,
  desc,
}: {
  title: string;
  sdg: string;
  desc: string;
}) {
  return (
    <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6">
      <p className="text-sm text-[#00ADEF] font-medium">{sdg}</p>
      <h4 className="text-lg font-semibold mt-1">{title}</h4>
      <p className="text-white/60 text-sm mt-2">{desc}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-white/5 text-sm">
      <span className="text-white/60">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
