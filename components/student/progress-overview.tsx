"use client";

import { useEffect, useState } from "react";

interface ProgressCard {
  label: string;
  value: number;
  sdgColor: string;
}

export default function ProgressOverview() {
  const [progressCards, setProgressCards] = useState<ProgressCard[]>([]);

  useEffect(() => {
    const completedData = JSON.parse(sessionStorage.getItem("completedModulesData") || "{}");
    const completedModules = Object.values(completedData);

    const inProgressModules = JSON.parse(sessionStorage.getItem("modulesInProgressData") || "[]");

    const cards: ProgressCard[] = [
      {
        label: "Internships Completed",
        value: completedModules.filter((mod: any) => mod.title.toLowerCase().includes("internship")).length,
        sdgColor: "#e5243b",
      },
      {
        label: "Training Hours",
        value: completedModules.reduce((acc: number, mod: any) => acc + (mod.hours || 0), 0),
        sdgColor: "#c5192d",
      },
      {
        label: "Modules In Progress",
        value: inProgressModules.length,
        sdgColor: "#4c9f38",
      },
      {
        label: "Certificates Earned",
        value: completedModules.filter((mod: any) => mod.certified).length,
        sdgColor: "#0a4a99",
      },
    ];

    setProgressCards(cards);
  }, []);

  if (progressCards.length === 0) return <p className="text-white">No progress yet.</p>;

  return (
    <section className="animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-6">Your Progress Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {progressCards.map((card, index) => (
          <div
            key={card.label}
            className="bg-black border border-white/10 rounded p-6 hover:border-white/20 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: card.sdgColor }} />
              <p className="text-cfcfcf text-sm">{card.label}</p>
            </div>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
