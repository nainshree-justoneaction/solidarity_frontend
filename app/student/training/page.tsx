"use client";
import Link from "next/link";
import { useAuth, modulesData } from "@/context/AuthContext";

export default function TrainingModulesPage() {
  const { fullName } = useAuth();

  return (
    <section className="animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-6">
        Welcome, {fullName}
      </h1>
      <h2 className="text-xl font-semibold text-white mb-6">Training Modules</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modulesData.map((mod, index) => {
          const savedProgress = JSON.parse(localStorage.getItem(`module-${mod.id}`) || "{}");
          const completedCount = Object.values(savedProgress).filter(Boolean).length;
          const progress = Math.round((completedCount / mod.chapters.length) * 100);

          return (
            <Link
              key={mod.id}
              href={`/student/training/${mod.id}`}
              className="bg-black border border-white/10 rounded p-6 hover:border-white/20 hover:scale-105 transition-transform transition-colors cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded flex items-center justify-center mb-4"
                style={{ backgroundColor: mod.sdgColor + "20" }}
              >
                <div style={{ color: mod.sdgColor, fontSize: "24px" }}>{mod.icon}</div>
              </div>
              <h3 className="text-white font-semibold mb-2">{mod.title}</h3>

              <div className="bg-white/5 h-1 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-white/60 text-sm mt-2">{progress}% Complete</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
