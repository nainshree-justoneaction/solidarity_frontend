"use client";
import { useContext, useState } from "react";
import { DonationsContext } from "@/context/DonationContext";
import { useParams, useRouter } from "next/navigation";

export default function DonationDetailPage() {
  const { id } = useParams();
  const donationId = parseInt(id as string);
  const { donations, addDonation } = useContext(DonationsContext);
  const router = useRouter();

  const donation = donations.find(d => d.id === donationId);
  const [donor, setDonor] = useState("");
  const [amount, setAmount] = useState("");

  if (!donation) return <p className="text-white p-8">Donation not found.</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donor || !amount) return alert("Fill all fields");

    addDonation(
      {
        id: Date.now(),
        donor,
        amount: Number(amount),
        date: new Date().toISOString(),
        status: "Received",
      },
      donationId
    );

    setDonor("");
    setAmount("");
    router.refresh();
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-white">{donation.title}</h1>
      <p className="text-zinc-400">
        ₹{donation.collected.toLocaleString()} / ₹{donation.target.toLocaleString()} ({donation.percentage}%)
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="text-white block mb-1">Donor Name</label>
          <input
            value={donor}
            onChange={e => setDonor(e.target.value)}
            className="w-full p-2 rounded bg-[#111] text-white border border-zinc-700"
          />
        </div>
        <div>
          <label className="text-white block mb-1">Amount</label>
          <input
            value={amount}
            onChange={e => setAmount(e.target.value)}
            type="number"
            className="w-full p-2 rounded bg-[#111] text-white border border-zinc-700"
          />
        </div>
        <button className="bg-green-400 text-black px-4 py-2 rounded font-semibold">Add Donation</button>
      </form>

      {donation.donors.length > 0 && (
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold text-white">Donors</h2>
          {donation.donors.map(d => (
            <p key={d.id} className="text-white text-sm">
              {d.donor} donated ₹{d.amount.toLocaleString()} on {new Date(d.date).toLocaleDateString()}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
