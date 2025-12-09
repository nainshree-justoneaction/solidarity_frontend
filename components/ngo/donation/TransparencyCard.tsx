"use client";
interface TransparencyCardProps {
  description: string;
  amount: number;
  category: "Income" | "Expense";
}

export default function TransparencyCard({ description, amount, category }: TransparencyCardProps) {
  const isIncome = category === "Income";
  return (
    <div className={`bg-[#111] border border-zinc-700 rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition-all`}>
      <div>
        <p className="text-white font-medium">{description}</p>
        <p className="text-xs text-zinc-400">{category}</p>
      </div>
      <p className={`font-bold ${isIncome ? "text-green-400" : "text-red-500"}`}>
        {isIncome ? "+" : "-"}₹{amount.toLocaleString()}
      </p>
    </div>
  );
}
