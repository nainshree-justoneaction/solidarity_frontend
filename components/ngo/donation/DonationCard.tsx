"use client";
interface DonationCardProps {
  donor: string;
  amount: number;
  date: string;
  status: string;
}

export default function DonationCard({ donor, amount, date, status }: DonationCardProps) {
  return (
    <div className="bg-[#111] border border-zinc-700 rounded-lg p-6 flex items-center justify-between hover:shadow-lg transition-all">
      <div>
        <p className="text-white font-semibold">{donor}</p>
        <p className="text-zinc-400 text-sm">{new Date(date).toLocaleDateString()}</p>
      </div>
      <div className="text-right">
        <p className="text-green-400 font-bold">₹{amount.toLocaleString()}</p>
        <p className="text-zinc-400 text-xs">{status}</p>
      </div>
    </div>
  );
}
