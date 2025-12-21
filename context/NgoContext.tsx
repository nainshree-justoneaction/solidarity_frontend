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
   Context Type
------------------------------------------------------------------ */
interface NGOContextType {
  internships: Internship[];
  donations: DonationDrive[];
  events: EventEntry[];
  notifications: NotificationEntry[];

  postInternship: (i: Omit<Internship, "id" | "applicants">) => void;
  addApplicant: (internshipId: number) => void;

  createDonationDrive: (
    data: Omit<DonationDrive, "id" | "collected" | "percentage" | "donors">
  ) => void;

  addDonation: (donationId: number, donor: Omit<DonorEntry, "id">) => void;

  createEvent: (data: Omit<EventEntry, "id">) => void;
  removeEvent: (id: string) => void;
  notifyEvent: (eventId: string, text: string) => void;
}

export const NGOContext = createContext<NGOContextType>({} as NGOContextType);

/* ------------------------------------------------------------------
   Provider
------------------------------------------------------------------ */
export function NGOProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false); // <--- fix hydration
  const [internships, setInternships] = useState<Internship[]>([]);
  const [donations, setDonations] = useState<DonationDrive[]>([]);
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [notifications, setNotifications] = useState<NotificationEntry[]>([]);

  /* --------------------------------------------------------------
       READ FROM LOCALSTORAGE (only on client)
  -------------------------------------------------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    setInternships(JSON.parse(localStorage.getItem("ngo_internships") || "[]"));
    setDonations(JSON.parse(localStorage.getItem("ngo_donations") || "[]"));
    setEvents(JSON.parse(localStorage.getItem("ngo_events") || "[]"));
    setNotifications(JSON.parse(localStorage.getItem("ngo_notifications") || "[]"));

    setReady(true);
  }, []);

  /* --------------------------------------------------------------
       WRITE TO LOCALSTORAGE
  -------------------------------------------------------------- */
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("ngo_internships", JSON.stringify(internships));
  }, [internships, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("ngo_donations", JSON.stringify(donations));
  }, [donations, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("ngo_events", JSON.stringify(events));
  }, [events, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("ngo_notifications", JSON.stringify(notifications));
  }, [notifications, ready]);

  /* ------------------------------------------------------------------
     ACTIONS — Internships
  ------------------------------------------------------------------ */
  function postInternship(data: Omit<Internship, "id" | "applicants">) {
    const next: Internship = {
      id: Date.now(),
      title: data.title,
      status: "Open",
      applicants: 0,
    };
    setInternships((prev) => [next, ...prev]);
  }

  function addApplicant(id: number) {
    setInternships((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, applicants: i.applicants + 1 } : i
      )
    );
  }

  /* ------------------------------------------------------------------
     ACTIONS — Donations (FIXED edge cases)
  ------------------------------------------------------------------ */
  function createDonationDrive(
    data: Omit<DonationDrive, "id" | "collected" | "percentage" | "donors">
  ) {
    const next: DonationDrive = {
      id: Date.now(),
      title: data.title,
      target: data.target,
      collected: 0,
      percentage: 0,
      donors: [],
    };
    setDonations((prev) => [next, ...prev]);
  }

  function addDonation(donationId: number, donorData: Omit<DonorEntry, "id">) {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id !== donationId) return d;

        const donorEntry: DonorEntry = {
          id: Date.now(),
          ...donorData,
        };

        const newCollected = d.collected + donorEntry.amount;

        return {
          ...d,
          collected: newCollected,
          percentage:
            d.target > 0
              ? Math.min(Math.round((newCollected / d.target) * 100), 100)
              : 0,
          donors: [donorEntry, ...d.donors],
        };
      })
    );
  }

  /* ------------------------------------------------------------------
     ACTIONS — Events
  ------------------------------------------------------------------ */
  function createEvent(data: Omit<EventEntry, "id">) {
    const next: EventEntry = {
      id: `ev-${Date.now()}`,
      ...data,
    };
    setEvents((prev) => [next, ...prev]);
  }

  function removeEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  function notifyEvent(eventId: string, text: string) {
    const note: NotificationEntry = {
      id: `n-${Date.now()}`,
      text,
      date: new Date().toLocaleString(),
      eventId,
    };
    setNotifications((prev) => [note, ...prev]);
  }

  /* ------------------------------------------------------------------
     EXPORT
  ------------------------------------------------------------------ */
  return (
    <NGOContext.Provider
      value={{
        internships,
        donations,
        events,
        notifications,

        postInternship,
        addApplicant,

        createDonationDrive,
        addDonation,

        createEvent,
        removeEvent,
        notifyEvent,
      }}
    >
      {children}
    </NGOContext.Provider>
  );
}

export function useNGO() {
  return useContext(NGOContext);
}
