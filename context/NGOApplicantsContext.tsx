"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Internship } from "./NGOInternshipsContext";

export interface Student {
  id: string;
  name: string;
  college: string;
  skills: string[];
}

export interface Applicant {
  id: string;
  internshipId: string;
  student: Student;
  status: "pending" | "selected" | "rejected";
}

interface NGOApplicantsContextType {
  applicants: Applicant[];
  setApplicants: (apps: Applicant[]) => void;
  updateApplicantStatus: (id: string, status: "pending" | "selected" | "rejected") => void;
}

const NGOApplicantsContext = createContext<NGOApplicantsContextType>({} as NGOApplicantsContextType);

export function NGOApplicantsProvider({ children }: { children: ReactNode }) {
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  function updateApplicantStatus(id: string, status: "pending" | "selected" | "rejected") {
    setApplicants(prev =>
      prev.map(a => a.id === id ? { ...a, status } : a)
    );
  }

  return (
    <NGOApplicantsContext.Provider value={{ applicants, setApplicants, updateApplicantStatus }}>
      {children}
    </NGOApplicantsContext.Provider>
  );
}

export function useNGOApplicants() {
  return useContext(NGOApplicantsContext);
}
