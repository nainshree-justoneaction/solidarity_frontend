export default function StatBox({ title, desc, color }: any) {
  return (
    <div
      className="p-6 rounded-xl shadow-lg cursor-pointer hover:scale-[1.02] transition"
      style={{ backgroundColor: color }}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm mt-2 opacity-90">{desc}</p>
    </div>
  );
}
