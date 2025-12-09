"use client";

export default function HeroCard({ title, desc, colorClass, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-[#0F0F0F] border border-[#202020] rounded-xl p-6 hover:brightness-110 transition w-[260px]"
    >
      <div className={`w-10 h-10 rounded-md mb-4 ${colorClass}`} />

      <h3 className="text-white font-semibold text-lg">{title}</h3>
      <p className="text-zinc-400 text-sm mt-2">{desc}</p>

      <button className="bg-white text-black px-3 py-2 rounded-md text-sm mt-4">
        Open →
      </button>
    </div>
  );
}
