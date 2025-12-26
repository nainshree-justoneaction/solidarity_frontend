"use client";

import { createContext, useContext, useEffect, useState } from "react";

const NGOApplicantsContext = createContext<any>(null);

export function NGOApplicantsProvider({ children }: any) {
  const [applicants, setApplicants] = useState<any[]>([]);

  /* ================= DEMO SEED ================= */
  useEffect(() => {
    if (applicants.length > 0) return;

    const demo = [
      {
        id: "app-1",
        internshipId: 1766738025625,
        status: "selected",
        student: {
          id: "stu-1",
          name: "Aarav Mehra",
          college: "IIT Delhi",
          skills: ["Python", "AI", "ML"],
        },
        progress: {
          tasks: [
            { title: "Orientation & onboarding", done: true },
            { title: "Community survey", done: true },
            { title: "Weekly report", done: false },
          ],
          logs: [
            "Completed onboarding and NGO briefing",
            "Visited field location and collected survey data",
          ],
          score: 72,
        },
      },
      {
        id: "app-2",
        internshipId: 1766738025625,
        status: "selected",
        student: {
          id: "stu-2",
          name: "Riya Sharma",
          college: "NSUT",
          skills: ["UI/UX", "Figma", "Design"],
        },
        progress: {
          tasks: [
            { title: "Design audit", done: true },
            { title: "Poster redesign", done: false },
          ],
          logs: ["Completed design audit for NGO website"],
          score: 55,
        },
      },
    ];

    setApplicants(demo);
  }, []);

  /* ================= ACTIONS ================= */

  function updateApplicantStatus(id: string, status: string) {
    setApplicants(prev =>
      prev.map(a => (a.id === id ? { ...a, status } : a))
    );
  }

  function updateApplicantProgress(id: string, progress: any) {
    setApplicants(prev =>
      prev.map(a => (a.id === id ? { ...a, progress } : a))
    );
  }

  return (
    <NGOApplicantsContext.Provider
      value={{
        applicants,
        setApplicants,
        updateApplicantStatus,
        updateApplicantProgress,
      }}
    >
      {children}
    </NGOApplicantsContext.Provider>
  );
}

export function useNGOApplicants() {
  return useContext(NGOApplicantsContext);
}
