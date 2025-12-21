"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

/* ------------------------------------------------------------------
   Types
------------------------------------------------------------------ */
export interface Internship {
  id: string;
  title: string;
  description: string;
  skills: string[];
  mode: string;
  location: string;
  sdg: string;
  status: string;
  createdAt: string;
  stipend?: string;
  duration?: string;
}

/* ------------------------------------------------------------------
   Context + Provider
------------------------------------------------------------------ */
interface NGOInternshipsContextType {
  internships: Internship[];
  addInternship: (data: Omit<Internship, "id">) => void;
  updateInternship?: (id: string, data: Partial<Internship>) => void;
}

const NGOInternshipsContext = createContext<NGOInternshipsContextType>({} as NGOInternshipsContextType);

/* ------------------------------------------------------------------
   Provider Component
------------------------------------------------------------------ */
export function NGOInternshipsProvider({ children }: { children: ReactNode }) {
  const [internships, setInternships] = useState<Internship[]>([]);

  function addInternship(data: Omit<Internship, "id">) {
    const newInternship: Internship = {
      id: `int-${Date.now()}`,
      ...data,
    };
    setInternships(prev => [newInternship, ...prev]);
  }

  function updateInternship(id: string, data: Partial<Internship>) {
    setInternships(prev =>
      prev.map(i => (i.id === id ? { ...i, ...data } : i))
    );
  }

  return (
    <NGOInternshipsContext.Provider value={{ internships, addInternship, updateInternship }}>
      {children}
    </NGOInternshipsContext.Provider>
  );
}

/* ------------------------------------------------------------------
   Custom Hook
------------------------------------------------------------------ */
export function useNGOInternships() {
  return useContext(NGOInternshipsContext);
}
