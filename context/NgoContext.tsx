"use client";

import { createContext, useContext, useEffect, useState } from "react";

/* ------------------------------------------------------------------
   Types
------------------------------------------------------------------ */
export interface Internship {
  id: number;
  title: string;
  applicants: number;
  status: string;
}

export interface DonationDrive {
  id: number;
  title: string;
  target: number;
  collected: number;
  percentage: number;
  donors: DonorEntry[];
}

export interface DonorEntry {
  id: number;
  donor: string;
  amount: number;
  date: string;
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
   Context Shape
------------------------------------------------------------------ */
interface NGOContextType {
  internships: Internship[];
  donations: DonationDrive[];
  events: EventEntry[];
  notifications: NotificationEntry[];

  postInternship: (i: Omit<Internship, "id" | "applicants">) => void;
  addApplicant: (internshipId: number) => void;
}

/* ------------------------------------------------------------------
   SAFE DEFAULT (prevents build crash)
------------------------------------------------------------------ */
const defaultContext: NGOContextType = {
  internships: [],
  donations: [],
  events: [],
  notifications: [],
  postInternship: () => {},
  addApplicant: () => {},
};

export const NGOContext = createContext<NGOContextType>(defaultContext);

/* ------------------------------------------------------------------
   Provider
------------------------------------------------------------------ */
export function NGOProvider({ children }: { children: React.ReactNode }) {
  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("ngo_internships");
    if (stored) setInternships(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("ngo_internships", JSON.stringify(internships));
  }, [internships]);

  function postInternship(data: Omit<Internship, "id" | "applicants">) {
    setInternships((prev) => [
      {
        id: Date.now(),
        title: data.title,
        status: "Open",
        applicants: 0,
      },
      ...prev,
    ]);
  }

  function addApplicant(id: number) {
    setInternships((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, applicants: i.applicants + 1 } : i
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
        postInternship,
        addApplicant,
      }}
    >
      {children}
    </NGOContext.Provider>
  );
}

export function useNGO() {
  return useContext(NGOContext);
}
