"use client";
interface DonorCardProps {
  name: string;
  totalDonation: number;
  donations: number;
}

export default function DonorCard({ name, totalDonation, donations }: DonorCardProps) {
  return (
    <div className="bg-[#111] border border-zinc-700 rounded-lg p-6 text-center hover:shadow-lg transition-all">
      <div className="w-12 h-12 rounded-full bg-green-400/20 flex items-center justify-center mx-auto mb-3">
        <span className="text-green-400 font-bold">{name.charAt(0)}</span>
      </div>
      <h3 className="text-white font-semibold text-sm mb-2">{name}</h3>
      <p className="text-lg font-bold text-green-400 mb-1">₹{totalDonation.toLocaleString()}</p>
      <p className="text-xs text-zinc-400">{donations} donations</p>
    </div>
  );
}
