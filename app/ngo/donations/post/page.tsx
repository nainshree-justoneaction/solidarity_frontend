"use client";
import { useState, useContext } from "react";
import { DonationsContext } from "@/context/DonationContext";
import { useRouter } from "next/navigation";

export default function PostDonation() {
  const { addDonationRequest } = useContext(DonationsContext);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !target) return alert("Fill all fields");

    const newId = addDonationRequest({ title, target: Number(target) });
    router.push(`/ngo/donations/${newId}`);
  };

  return (
    <div className="p-8 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Post a New Donation</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-white mb-1">Donation Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="p-2 rounded bg-zinc-800 text-white"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white mb-1">Target Amount</label>
          <input
            type="number"
            value={target}
            onChange={e => setTarget(e.target.value)}
            className="p-2 rounded bg-zinc-800 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 px-4 py-2 rounded font-semibold hover:bg-green-600 transition"
        >
          Post Donation
        </button>
      </form>
    </div>
  );
}
