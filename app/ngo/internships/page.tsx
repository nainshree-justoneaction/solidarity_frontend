"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { useNGO } from "@/context/NgoContext";
import InternshipCard from "@/components/ngo/IntenshipsCard";
import { useRouter } from "next/navigation";

export default function InternshipsHome() {
  const router = useRouter();
  const { internships } = useNGO();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Internships</h1>

        <div className="flex gap-2">
          <button
            onClick={() => router.push("/ngo/internships/post")}
            className="bg-white text-black px-3 py-2 rounded-md"
          >
            Post Internship
          </button>

          <button
            onClick={() => router.push("/ngo/internships/applicants")}
            className="px-3 py-2 text-zinc-300 border border-zinc-800 rounded-md"
          >
            All Applicants
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {internships.length === 0 ? (
          <div className="text-zinc-400">
            No internships yet. Post one to start receiving applications.
          </div>
        ) : (
          internships.map((it) => (
            <InternshipCard
              key={it.id}
              internship={it}
              onView={() => router.push(`/ngo/internships/${it.id}`)}
              onApplicants={() =>
                router.push(`/ngo/internships/${it.id}`)
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
