"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { modulesData, useAuth } from "@/context/AuthContext"; // mock auth + modules

interface Chapter {
  id: number;
  title: string;
  completed: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  sdgColor: string;
  icon: string;
}

export default function ModuleOverviewPage() {
  const router = useRouter();
  const params = useParams();
  const { username } = useAuth();
  const [module, setModule] = useState<Module | null>(null);
  const [allComplete, setAllComplete] = useState(false);

  const access = localStorage.getItem("solidarity_paid") === "true";

  // redirect if no access
  useEffect(() => {
    if (!access) router.replace("/payment");
  }, [access, router]);

  // load module and chapter progress
  useEffect(() => {
    const mod = modulesData.find((m) => m.id === params.moduleId);
    if (mod) {
      const savedProgress = JSON.parse(localStorage.getItem(`module-${mod.id}`) || "{}");
      const chaptersWithProgress = mod.chapters.map((ch) => ({
        ...ch,
        completed: savedProgress[ch.id] || false,
      }));
      setModule({ ...mod, chapters: chaptersWithProgress });
      setAllComplete(chaptersWithProgress.every((ch) => ch.completed));

      // update in-progress storage initially
      updateProgressStorage(mod, chaptersWithProgress);
    }
  }, [params.moduleId]);

  // navigate to chapter
  const goToChapter = (chapterId: number) => {
    router.push(`/student/training/${params.moduleId}/${chapterId}`);
  };

  // save completed module + certificate
  const handleCertificate = () => {
    if (!module) return;

    // 1️⃣ Completed modules
    const completedData = JSON.parse(sessionStorage.getItem("completedModulesData") || "{}");
    completedData[module.id] = {
      title: module.title,
      hours: module.chapters.length, // example: 1 hour per chapter
      certified: true,
      sdgColor: module.sdgColor,
    };
    sessionStorage.setItem("completedModulesData", JSON.stringify(completedData));

    // 2️⃣ Remove from in-progress if exists
    const inProgressModules = JSON.parse(sessionStorage.getItem("modulesInProgressData") || "[]");
    const index = inProgressModules.findIndex((m: any) => m.id === module.id);
    if (index !== -1) inProgressModules.splice(index, 1);
    sessionStorage.setItem("modulesInProgressData", JSON.stringify(inProgressModules));

    router.push(`/student/training/${params.moduleId}/certificate`);
  };

  // update in-progress modules
  const updateProgressStorage = (mod: Module, chapters: Chapter[]) => {
    const completedCount = chapters.filter((ch) => ch.completed).length;
    if (completedCount === 0 || completedCount === chapters.length) return;

    const inProgressModules = JSON.parse(sessionStorage.getItem("modulesInProgressData") || "[]");
    const existingIndex = inProgressModules.findIndex((m: any) => m.id === mod.id);

    const progressObj = { id: mod.id, title: mod.title, completedCount, total: chapters.length };
    if (existingIndex === -1) inProgressModules.push(progressObj);
    else inProgressModules[existingIndex] = progressObj;

    sessionStorage.setItem("modulesInProgressData", JSON.stringify(inProgressModules));
  };

  if (!module) return <p className="text-white">Module not found</p>;

  const completedCount = module.chapters.filter((ch) => ch.completed).length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{module.title}</h1>
      <p className="text-white/60">{module.description || "Complete chapters to learn more."}</p>

      <div className="space-y-3 mt-6">
        {module.chapters.map((chapter) => (
          <div
            key={chapter.id}
            className={`flex items-center justify-between p-4 rounded-xl border border-white/10 cursor-pointer hover:bg-white/5 transition ${
              chapter.completed ? "bg-white/10" : ""
            }`}
            onClick={() => goToChapter(chapter.id)}
          >
            <span className="text-white">{chapter.title}</span>
            {chapter.completed && <CheckCircle className="text-[#00ADEF]" />}
          </div>
        ))}
      </div>

      <p className="text-white/60 mt-6">
        Completed {completedCount}/{module.chapters.length} chapters.
      </p>

      {allComplete && (
        <button
          onClick={handleCertificate}
          className="mt-4 px-6 py-3 rounded-xl bg-[#00ADEF] text-black font-semibold hover:bg-[#00c7ff] transition"
        >
          🎓 Get Your Certificate
        </button>
      )}
    </div>
  );
}
