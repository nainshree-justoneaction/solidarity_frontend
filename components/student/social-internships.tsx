"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  internships as allInternships,
  Internship as InternshipType,
} from "@/data/internships";

/* ---------------------------------------------
   COMPONENT
--------------------------------------------- */

export default function SocialInternships() {
  const router = useRouter();

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<
    InternshipType[]
  >([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // 🔥 FIX: training completion MUST be reactive
  const [trainingDone, setTrainingDone] = useState(false);

  /* ---------------------------------------------
     CHECK TRAINING COMPLETION (REAL SOURCE)
  --------------------------------------------- */
  useEffect(() => {
    const checkTraining = () => {
      const fundraising = JSON.parse(
        localStorage.getItem("fundraising_completed") || "{}"
      );

      // if ANY module fundraising is completed → unlock internships
      const completed = Object.values(fundraising).some(Boolean);
      setTrainingDone(completed);
    };

    checkTraining(); // initial check

    // re-check when user returns to this tab/page
    window.addEventListener("focus", checkTraining);

    return () => {
      window.removeEventListener("focus", checkTraining);
    };
  }, []);

  /* ---------------------------------------------
     LOAD INTERESTS + FILTER INTERNSHIPS
  --------------------------------------------- */
  useEffect(() => {
    const registration = JSON.parse(
      sessionStorage.getItem("registration") || "{}"
    );

    const interests = registration.step3?.interests || [];
    setSelectedInterests(interests);

    const filtered = allInternships.filter((i) =>
      interests.includes(i.domain)
    );

    setFilteredInternships(filtered);
  }, []);

  /* ---------------------------------------------
     APPLY HANDLER
  --------------------------------------------- */
  const handleApply = (id: string) => {
    if (!trainingDone) {
      router.push("/student/training");
      return;
    }

    router.push(`/student/internships/${id}`);
  };

  /* ---------------------------------------------
     EMPTY STATE
  --------------------------------------------- */
  if (selectedInterests.length === 0) {
    return (
      <section className="animate-fade-in">
        <h2 className="text-xl font-bold text-white mb-6">
          Available Social Internships
        </h2>
        <p className="text-white/70">
          Select your interests during registration to see relevant internships
          here.
        </p>
      </section>
    );
  }

  const visibleInternships = filteredInternships.slice(0, visibleCount);
  const hasMore = visibleCount < filteredInternships.length;

  /* ---------------------------------------------
     UI
  --------------------------------------------- */
  return (
    <section className="animate-fade-in space-y-6">
      <h2 className="text-xl font-bold text-white">
        Available Social Internships
      </h2>

      {/* TRAINING GATE MESSAGE */}
      {!trainingDone && (
        <div className="p-4 rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 text-sm">
          ⚠️ You must complete at least <b>one training module</b> (including
          fundraising) before applying for social internships.
        </div>
      )}

      {/* INTERNSHIP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleInternships.map((internship, index) => (
          <div
            key={internship.id}
            className="bg-black border border-white/10 rounded p-6 hover:border-white/20 transition-all duration-300 group animate-slide-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div
              className="w-12 h-12 rounded flex items-center justify-center mb-2 text-2xl group-hover:scale-110 transition-transform"
              style={{ backgroundColor: internship.sdgColor + "20" }}
            >
              {internship.icon}
            </div>

            <h3 className="text-white font-semibold mb-1">
              {internship.title}
            </h3>
            <p className="text-white/60 text-sm mb-1">
              {internship.ngoName}
            </p>
            <p className="text-cfcfcf text-sm mb-4">
              {internship.description}
            </p>

            {/* APPLY BUTTON */}
            <button
              disabled={!trainingDone}
              onClick={() => handleApply(internship.id)}
              className={`
                w-full py-2 rounded flex items-center justify-center gap-2
                font-medium transition-colors
                ${
                  trainingDone
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-white/10 text-white/40 cursor-not-allowed"
                }
              `}
            >
              {trainingDone ? "Apply Now" : "Complete Training to Apply"}
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount(filteredInternships.length)}
            className="px-6 py-3 rounded-md border border-white/20 text-white hover:bg-white/5 transition"
          >
            More Internships
          </button>
        </div>
      )}
    </section>
  );
}
