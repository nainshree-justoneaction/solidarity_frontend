"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { modulesData } from "@/context/AuthContext";

/* ---------------- SIMPLE QUIZ DATA (DEMO) ---------------- */
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the main objective of this chapter?",
    options: [
      "Entertainment",
      "Social Awareness",
      "Profit Maximization",
      "None of the above",
    ],
    correct: 1,
  },
];

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();

  const moduleId = params.moduleId as string;
  const chapterId = Number(params.chapterId);

  const [chapterTitle, setChapterTitle] = useState("");
  const [isFundraising, setIsFundraising] = useState(false);

  const [videoFinished, setVideoFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  /* ---------------- LOAD CHAPTER ---------------- */
  useEffect(() => {
    const mod = modulesData.find((m) => m.id === moduleId);
    if (!mod) return;

    const ch = mod.chapters.find((c) => c.id === chapterId);
    if (!ch) return;

    setChapterTitle(ch.title);
    setIsFundraising(ch.type === "fundraising");
  }, [moduleId, chapterId]);

  /* ---------------- LOAD SAVED PROGRESS ---------------- */
  useEffect(() => {
    const key = `module-${moduleId}`;
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    if (saved[chapterId]?.completed) {
      setVideoFinished(true);
      setQuizPassed(true);
    }
  }, [moduleId, chapterId]);

  /* ---------------- MARK COMPLETE ---------------- */
  const markChapterComplete = () => {
    const key = `module-${moduleId}`;
    const saved = JSON.parse(localStorage.getItem(key) || "{}");

    saved[chapterId] = {
      completed: true,
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem(key, JSON.stringify(saved));

    setTimeout(() => {
      router.push(`/student/training/${moduleId}`);
    }, 1200);
  };

  /* ---------------- FUNDRAISING CHAPTER ---------------- */
  if (isFundraising) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-6 text-white">
        <h1 className="text-3xl font-bold mb-4">
          Fundraising & Resource Mobilization
        </h1>

        <p className="text-white/70 max-w-xl">
          This chapter focuses on converting your learning into real-world
          impact. Fundraising is about responsibility, awareness, and action.
        </p>

        <div className="mt-10 rounded-xl border border-green-400/30 bg-green-500/5 p-6">
          <p className="text-green-300 font-semibold mb-3">
            Action Required to Complete Module
          </p>

          <p className="text-sm text-green-200/80 mb-6">
            To unlock your certificate, you must participate in fundraising or
            resource mobilization for this cause.
          </p>

          <button
            onClick={() =>
              router.push(`/payment?module=${moduleId}`)
            }
            className="px-6 py-3 rounded-lg bg-green-400 text-black font-semibold hover:bg-green-300"
          >
            Proceed to Fundraising
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- NORMAL CHAPTER ---------------- */
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-white space-y-8">
      <h1 className="text-3xl font-bold">{chapterTitle}</h1>

      {/* VIDEO */}
      {!videoFinished && (
        <div className="bg-white/5 rounded-2xl p-6">
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            controls
            className="w-full rounded-lg"
            onEnded={() => setVideoFinished(true)}
          />
          <p className="text-white/60 mt-2">
            Watch the full video to unlock the quiz.
          </p>
        </div>
      )}

      {/* QUIZ */}
      {videoFinished && !quizPassed && (
        <div className="bg-white/5 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Quick Check</h2>

          <p className="text-white/80">
            {QUIZ_QUESTIONS[0].question}
          </p>

          <div className="space-y-2">
            {QUIZ_QUESTIONS[0].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedOption(i)}
                className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                  selectedOption === i
                    ? "border-[#00ADEF] bg-[#00ADEF]/10"
                    : "border-white/20 hover:bg-white/5"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            disabled={selectedOption === null}
            onClick={() => {
              if (selectedOption === QUIZ_QUESTIONS[0].correct) {
                setQuizPassed(true);
                markChapterComplete();
              } else {
                alert("Incorrect answer. Try again.");
              }
            }}
            className="mt-4 px-6 py-3 rounded-lg bg-[#00ADEF] text-black font-semibold disabled:opacity-50"
          >
            Submit Answer
          </button>
        </div>
      )}

      {/* SUCCESS */}
      {quizPassed && (
        <p className="text-green-400 font-semibold animate-pulse">
          ✅ Chapter completed! Redirecting...
        </p>
      )}
    </div>
  );
}
