"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { modulesData } from "@/context/AuthContext";

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const [videoFinished, setVideoFinished] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");

  const { moduleId, chapterId } = params;

  // Get chapter title dynamically from modulesData
  useEffect(() => {
    const mod = modulesData.find((m) => m.id === moduleId);
    if (mod) {
      const ch = mod.chapters.find((c) => c.id.toString() === chapterId);
      if (ch) setChapterTitle(ch.title);
    }
  }, [moduleId, chapterId]);

  // Load saved progress
  useEffect(() => {
    const key = `module-${moduleId}`;
    const savedProgress = JSON.parse(localStorage.getItem(key) || "{}");
    if (savedProgress[chapterId]) setVideoFinished(true);
  }, [moduleId, chapterId]);

  const handleVideoComplete = () => {
    const key = `module-${moduleId}`;
    const savedProgress = JSON.parse(localStorage.getItem(key) || "{}");
    savedProgress[chapterId] = true;
    localStorage.setItem(key, JSON.stringify(savedProgress));
    setVideoFinished(true);

    // Short delay before redirect
    setTimeout(() => {
      router.push(`/student/training/${moduleId}`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-4">
        {chapterTitle || `Chapter ${chapterId}`}
      </h1>

      <div className="bg-white/5 rounded-2xl p-6">
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4" // replace with real video
          controls
          className="w-full rounded-lg"
          onEnded={handleVideoComplete}
        />

        {!videoFinished ? (
          <p className="text-white/60 mt-2">
            Watch the full video to mark chapter as complete.
          </p>
        ) : (
          <p className="text-green-400 mt-2 font-semibold animate-pulse">
            ✅ Chapter completed! Redirecting...
          </p>
        )}
      </div>
    </div>
  );
}
