"use client";
import React, { useContext } from "react";
import { NgoContext } from "@/context/NgoContext";
import InternshipCard from "@/components/ngo/IntenshipsCard";
import { useRouter } from "next/navigation";

export default function InternshipsHome() {
  const { state } = useContext(NgoContext);
  const router = useRouter();

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
        {state.internships.length === 0 ? (
          <div className="text-zinc-400">No internships yet. Post one to start receiving applications.</div>
        ) : (
          state.internships.map((it: any) => (
            <InternshipCard
              key={it.id}
              internship={it}
              onView={(id) => router.push(`/ngo/internships/${id}`)}
              onApplicants={(id) => router.push(`/ngo/internships/${id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
