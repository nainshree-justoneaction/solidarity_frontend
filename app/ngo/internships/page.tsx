"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { useNGO } from "@/context/NgoContext";
import { Briefcase, Users, Clock, Plus } from "lucide-react";
import InternshipCard from "@/components/ngo/InternshipCard";

export default function InternshipsHome() {
  const router = useRouter();
  const { internships } = useNGO();

  const totalInternships = internships.length;
  const totalApplicants = internships.reduce(
    (sum, i) => sum + (i.applicants?.length || 0),
    0
  );

  return (
    <div className="px-8 py-10 space-y-10 text-white">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Internship Management
          </h1>
          <p className="text-white/60 mt-2 max-w-xl">
            Create roles, review applicants, and manage student participation.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/ngo/internships/post")}
            className="flex items-center gap-2 bg-[#00ADEF] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#00c7ff] transition"
          >
            <Plus size={18} />
            Post Internship
          </button>

          <button
            onClick={() => router.push("/ngo/internships/applicants")}
            className="px-6 py-3 rounded-xl border border-white/20 text-white/80 hover:bg-white/5 transition"
          >
            View Applicants
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Stat icon={<Briefcase size={20} />} label="Active Internships" value={totalInternships} />
        <Stat icon={<Users size={20} />} label="Total Applicants" value={totalApplicants} />
        <Stat icon={<Clock size={20} />} label="Avg. Duration" value="4–6 Weeks" />
      </div>

      {/* LIST */}
      <div className="space-y-5">
        <h2 className="text-2xl font-semibold">Your Posted Internships</h2>

        {internships.length === 0 ? (
          <EmptyState onPost={() => router.push("/ngo/internships/post")} />
        ) : (
          <div className="grid gap-4">
            {internships.map((it) => (
              <InternshipCard
                key={it.id}
                internship={it}
                onView={() => router.push(`/ngo/internships/${it.id}`)}
                onApplicants={() =>
                  router.push(`/ngo/internships/${it.id}/applicants`)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Stat({ icon, label, value }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#00ADEF]/10 text-[#00ADEF] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-white/60 text-sm">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function EmptyState({ onPost }: { onPost: () => void }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-14 text-center">
      <h3 className="text-2xl font-semibold mb-3">No internships yet</h3>
      <p className="text-white/60 max-w-lg mx-auto">
        Post your first internship to attract skilled students.
      </p>
      <button
        onClick={onPost}
        className="mt-8 bg-[#00ADEF] text-black px-8 py-3 rounded-xl font-semibold"
      >
        Create Internship
      </button>
    </div>
  );
}
