"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { CheckCircle, Award, BookOpen, HandHeart } from "lucide-react";
import { modulesData, useAuth } from "@/context/AuthContext";

export default function ModuleOverviewPage() {
  const router = useRouter();
  const params = useParams();
  const { username } = useAuth();

  const [module, setModule] = useState<any>(null);
  const [allComplete, setAllComplete] = useState(false);

  useEffect(() => {
    const mod = modulesData.find((m) => m.id === params.moduleId);
    if (!mod) return;

    const saved = JSON.parse(localStorage.getItem(`module-${mod.id}`) || "{}");
    const fundraisingDone = JSON.parse(
      localStorage.getItem("fundraising_completed") || "{}"
    )[mod.id];

    const chapters = mod.chapters.map((ch: any) => {
      if (ch.type === "fundraising") {
        return {
          ...ch,
          completed: Boolean(fundraisingDone),
        };
      }

      return {
        ...ch,
        completed: Boolean(saved[ch.id]),
      };
    });


    setModule({ ...mod, chapters });
    setAllComplete(chapters.every((c: any) => c.completed));
  }, [params.moduleId]);

  if (!module) return null;

  const completedCount = module.chapters.filter((c: any) => c.completed).length;

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white">{module.title}</h1>
        <p className="text-white/60 mt-1">
          Open-access training programme · Learn → Act → Create Impact
        </p>
      </div>

      {/* SKILLS + ACHIEVEMENTS */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white/5 border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#00ADEF]" />
            Skills You’ll Learn
          </h3>

          <ul className="mt-4 space-y-2 text-white/70 text-sm">
            {module.skills?.map((skill: string, i: number) => (
              <li key={i} className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-[#00ADEF]" />
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400" />
            Outcomes & Recognition
          </h3>

          <div className="mt-4 space-y-3 text-sm">
            <div className="bg-blue-500/10 text-blue-300 px-4 py-2 rounded-lg">
              📜 Certificate of Completion
            </div>
            <div className="bg-green-500/10 text-green-300 px-4 py-2 rounded-lg">
              ⭐ Letter of Recommendation (based on performance)
            </div>
            <div className="bg-purple-500/10 text-purple-300 px-4 py-2 rounded-lg">
              🤝 Opportunity to lead or fundraise for real causes
            </div>
          </div>
        </div>
      </div>

      {/* MODULES */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          Explore Modules
        </h2>

        <div className="space-y-3">
          {module.chapters.map((chapter: any, index: number) => (
            <div
              key={chapter.id}
              onClick={() =>
                router.push(`/student/training/${params.moduleId}/${chapter.id}`)
              }
              className={`
                flex items-center justify-between
                p-4 rounded-xl cursor-pointer
                border border-white/10
                transition hover:bg-white/5
                ${chapter.completed ? "bg-white/10" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-full bg-[#00ADEF]/20 text-[#00ADEF] flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-white">{chapter.title}</span>
              </div>

              {chapter.completed && (
                <CheckCircle className="text-[#00ADEF]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="pt-6 border-t border-white/10 space-y-4">
        <p className="text-white/60">
          Progress: {completedCount}/{module.chapters.length} modules completed
        </p>

        {allComplete && (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() =>
                router.push(`/student/training/${params.moduleId}/certificate`)
              }
              className="px-6 py-3 rounded-xl bg-[#00ADEF] text-black font-semibold hover:bg-[#00c7ff]"
            >
              🎓 Get Your Certificate
            </button>

            {!JSON.parse(localStorage.getItem("fundraising_completed") || "{}")[module.id] && (
              <button
                onClick={() =>
                  router.push(`/fundraisers/contribute?module=${module.id}`)
                }
                className="px-6 py-3 rounded-xl border border-green-400/40 text-green-300 hover:bg-green-400/10 flex items-center gap-2"
              >
                <HandHeart className="h-5 w-5" />
                Complete Fundraising Activity
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
