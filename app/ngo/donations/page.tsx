"use client";
import { useContext } from "react";
import { DonationsContext } from "@/context/DonationContext";
import DonationCard from "@/components/ngo/donation/DonationCard";
import DonorCard from "@/components/ngo/donation/DonarCard";
import TransparencyCard from "@/components/ngo/donation/TransparencyCard";
import { useRouter } from "next/navigation";

export default function DonationsHome() {
  const { incomingDonations, donations, ledger, donors } = useContext(DonationsContext);
  const router = useRouter();

  return (
    <div className="space-y-12 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Donations Dashboard</h1>
        <button
          className="bg-green-500 text-black px-4 py-2 rounded font-semibold hover:bg-green-600 transition"
          onClick={() => router.push("/ngo/donations/post")}
        >
          Post Donation
        </button>
      </div>

      {/* Incoming Donations */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Incoming Donations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {incomingDonations.map(d => <DonationCard key={d.id} {...d} />)}
        </div>
      </section>

      {/* Active Donation Requests */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Donation Requests</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {donations.map(d => (
            <div key={d.id} className="bg-[#111] border border-zinc-700 p-4 rounded-lg hover:shadow-lg transition-all">
              <h3 className="text-white font-semibold mb-2">{d.title}</h3>
              <p className="text-zinc-400 text-sm">
                ₹{d.collected.toLocaleString()} / ₹{d.target.toLocaleString()} ({d.percentage}%)
              </p>
              <div className="w-full bg-zinc-700 h-2 rounded mt-1">
                <div className="bg-green-400 h-2 rounded" style={{ width: `${d.percentage}%` }} />
              </div>
              <button
                className="mt-2 text-green-400 text-sm hover:underline"
                onClick={() => router.push(`/ngo/donations/${d.id}`)}
              >
                Add Donation
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Transparency Ledger */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Transparency Ledger</h2>
        <div className="space-y-3">
          {ledger.map(l => <TransparencyCard key={l.id} {...l} />)}
        </div>
      </section>

      {/* Top Donors */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Top Donors</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {donors.map(d => <DonorCard key={d.id} {...d} />)}
        </div>
      </section>
    </div>
  );
}
