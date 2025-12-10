"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth, modulesData } from "@/context/AuthContext";

export default function TrainingModules() {
  const { fullName } = useAuth();
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    const updated = modulesData.map((mod) => {
      const savedProgress = JSON.parse(localStorage.getItem(`module-${mod.id}`) || "{}");
      const completedCount = Object.values(savedProgress).filter(Boolean).length;
      const progress = Math.round((completedCount / mod.chapters.length) * 100);
      return { ...mod, progress, completedCount };
    });
    setModules(updated);
  }, []);

  return (
    <section className="animate-fade-in space-y-6">
      <h1 className="text-3xl font-bold text-white">Welcome, {fullName}</h1>
      <h2 className="text-xl font-semibold text-white/90">Your Training Modules</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((mod, index) => (
          <Link
            key={mod.id}
            href={`/student/training/${mod.id}`}
            className="bg-black border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:scale-105 transition-transform transition-colors shadow-lg flex flex-col justify-between cursor-pointer relative"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* SDG Icon */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-2xl"
              style={{ backgroundColor: mod.sdgColor + "20", color: mod.sdgColor }}
            >
              {mod.icon}
            </div>

            {/* Title */}
            <h3 className="text-white font-semibold text-lg mb-4">{mod.title}</h3>

            {/* Progress Bar */}
            <div className="bg-white/5 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${mod.progress}%` }}
              />
            </div>

            {/* Progress Text */}
            <p className="text-white/60 text-sm mt-2">
              {mod.progress}% Complete ({mod.completedCount}/{mod.chapters.length} Chapters)
            </p>

            {/* Mini progress donut top-right */}
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center text-sm font-semibold text-white/80">
              {mod.completedCount}/{mod.chapters.length}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
