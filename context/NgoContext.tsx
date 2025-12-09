"use client";

import { createContext, useEffect, useState } from "react";
import { SEED_STUDENTS } from "@/lib/seed-student";

export const NgoContext = createContext<any>(null);

export const NgoProvider = ({ children }: any) => {
  const [state, setState] = useState({
    internships: [],
    students: [],
    applications: [],
    selectedInterns: [],
    progress: {},
  });

  // Load from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = {
      internships: JSON.parse(localStorage.getItem("internships") || "[]"),
      students: JSON.parse(localStorage.getItem("students") || "[]"),
      applications: JSON.parse(localStorage.getItem("applications") || "[]"),
      selectedInterns: JSON.parse(localStorage.getItem("selectedInterns") || "[]"),
      progress: JSON.parse(localStorage.getItem("progress") || "{}"),
    };

    if (stored.students.length === 0) stored.students = SEED_STUDENTS;
    setState(stored);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("internships", JSON.stringify(state.internships));
    localStorage.setItem("students", JSON.stringify(state.students));
    localStorage.setItem("applications", JSON.stringify(state.applications));
    localStorage.setItem("selectedInterns", JSON.stringify(state.selectedInterns));
    localStorage.setItem("progress", JSON.stringify(state.progress));
  }, [state]);

  const addInternship = (internship: any) =>
    setState((prev: any) => ({
      ...prev,
      internships: [internship, ...prev.internships],
    }));

  const applyInternship = (application: any) =>
    setState((prev: any) => ({
      ...prev,
      applications: [...prev.applications, application],
    }));

  const updateApplication = (id: string, updates: any) =>
    setState((prev: any) => ({
      ...prev,
      applications: prev.applications.map((a: any) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    }));

  const saveProgress = (studentId: string, progressData: any) =>
    setState((prev: any) => ({
      ...prev,
      progress: { ...prev.progress, [studentId]: progressData },
    }));

  return (
    <NgoContext.Provider
      value={{ state, setState, addInternship, applyInternship, updateApplication, saveProgress }}
    >
      {children}
    </NgoContext.Provider>
  );
};
