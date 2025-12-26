"use client";

import { createContext, useContext, useEffect, useState } from "react";

/* ------------------------------------------------------------------
   TYPES
------------------------------------------------------------------ */

export interface Internship {
  id: number;
  title: string;
  description: string;
  skills: string[];
  location: string;
  mode: "On-site" | "Remote" | "Hybrid";
  sdg: string;
  applicants: any[];        // keep array for future
  status: "Open" | "Closed";
  createdAt: string;
}

export interface DonationDrive {
  id: number;
  title: string;
  target: number;
  collected: number;
  percentage: number;
}

export interface EventEntry {
  id: string;
  title: string;
  date: string;
  volunteersNeeded: number;
  sdg: string;
}

export interface NotificationEntry {
  id: string;
  text: string;
  date: string;
  eventId: string;
}

/* ------------------------------------------------------------------
   CONTEXT SHAPE
------------------------------------------------------------------ */

interface NGOContextType {
  internships: Internship[];
  donations: DonationDrive[];
  events: EventEntry[];
  notifications: NotificationEntry[];

  addInternship: (i: Omit<Internship, "id" | "applicants" | "createdAt">) => void;
  addApplicant: (internshipId: number, applicant?: any) => void;
}

/* ------------------------------------------------------------------
   SAFE DEFAULT
------------------------------------------------------------------ */

const defaultContext: NGOContextType = {
  internships: [],
  donations: [],
  events: [],
  notifications: [],
  addInternship: () => {},
  addApplicant: () => {},
};

export const NGOContext = createContext<NGOContextType>(defaultContext);

/* ------------------------------------------------------------------
   PROVIDER
------------------------------------------------------------------ */

export function NGOProvider({ children }: { children: React.ReactNode }) {
  const [internships, setInternships] = useState<Internship[]>([]);

  /* ---------- LOAD ---------- */
  useEffect(() => {
    const stored = localStorage.getItem("ngo_internships");
    if (stored) setInternships(JSON.parse(stored));
  }, []);

  /* ---------- SAVE ---------- */
  useEffect(() => {
    localStorage.setItem("ngo_internships", JSON.stringify(internships));
  }, [internships]);

  /* ---------- ACTIONS ---------- */

  function addInternship(
    data: Omit<Internship, "id" | "applicants" | "createdAt">
  ) {
    const newInternship: Internship = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      skills: data.skills || [],
      location: data.location,
      mode: data.mode,
      sdg: data.sdg,
      status: data.status ?? "Open",
      applicants: [],
      createdAt: new Date().toISOString(),
    };

    setInternships((prev) => [newInternship, ...prev]);
  }

  function addApplicant(internshipId: number, applicant: any = {}) {
    setInternships((prev) =>
      prev.map((i) =>
        i.id === internshipId
          ? { ...i, applicants: [...i.applicants, applicant] }
          : i
      )
    );
  }

  return (
    <NGOContext.Provider
      value={{
        internships,
        donations: [],
        events: [],
        notifications: [],
        addInternship,
        addApplicant,
      }}
    >
      {children}
    </NGOContext.Provider>
  );
}

/* ------------------------------------------------------------------
   HOOK
------------------------------------------------------------------ */

export function useNGO() {
  return useContext(NGOContext);
}

export function updateApplicantProgress(id: string, progress: any) {
  setApplicants(prev =>
    prev.map(a =>
      a.id === id ? { ...a, progress } : a
    )
  );
}