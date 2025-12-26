"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Bell,
  Plus,
  MapPin,
  Activity,
} from "lucide-react";

/* ---------------- TYPES ---------------- */

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  volunteersNeeded: number;
  volunteersJoined: number;
  sdg: string;
}

interface Notification {
  id: string;
  text: string;
  date: string;
}

/* ---------------- PAGE ---------------- */

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [vols, setVols] = useState(20);
  const [sdg, setSdg] = useState("SDG 11");

  /* ---------------- LOAD ---------------- */

  useEffect(() => {
    const e = localStorage.getItem("ngo_events");
    const n = localStorage.getItem("ngo_event_notifications");
    if (e) setEvents(JSON.parse(e));
    if (n) setNotifications(JSON.parse(n));
  }, []);

  useEffect(() => {
    localStorage.setItem("ngo_events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(
      "ngo_event_notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  /* ---------------- ACTIONS ---------------- */

  function createEvent() {
    if (!title || !date || !location) return alert("Fill all fields");

    const ev: EventItem = {
      id: `ev-${Date.now()}`,
      title,
      date,
      location,
      volunteersNeeded: vols,
      volunteersJoined: Math.floor(vols * 0.45), // demo realism
      sdg,
    };

    setEvents((p) => [ev, ...p]);
    setTitle("");
    setDate("");
    setLocation("");
    setVols(20);
  }

  function notify(ev: EventItem) {
    const note: Notification = {
      id: `n-${Date.now()}`,
      text: `Volunteers notified for "${ev.title}"`,
      date: new Date().toLocaleString(),
    };
    setNotifications((p) => [note, ...p]);
  }

  /* ---------------- STATS ---------------- */

  const totalVolunteers = events.reduce(
    (a, e) => a + e.volunteersJoined,
    0
  );

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-16 px-10 py-10 text-white">

      {/* ================= HERO ================= */}
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Orchestrating <br /> Real-World Impact
          </h1>
          <p className="text-white/60 mt-4 max-w-xl">
            Plan, manage, and scale community events with structured execution
            and measurable participation.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Stat label="Events Organized" value={events.length} />
          <Stat label="Volunteers Mobilized" value={totalVolunteers} />
          <Stat label="SDGs Impacted" value="5" />
          <Stat label="Engagement Rate" value="92%" />
        </div>
      </section>

      {/* ================= ACTIVE EVENTS ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Active & Upcoming Events
        </h2>

        {events.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
            <p className="text-white/60">
              No events created yet. Start your first initiative.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((ev) => {
            const progress = Math.round(
              (ev.volunteersJoined / ev.volunteersNeeded) * 100
            );

            return (
              <div
                key={ev.id}
                className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{ev.title}</h3>
                    <p className="text-white/60 text-sm flex items-center gap-2">
                      <Calendar size={14} /> {ev.date}
                    </p>
                    <p className="text-white/60 text-sm flex items-center gap-2">
                      <MapPin size={14} /> {ev.location}
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-white/10">
                    {ev.sdg}
                  </span>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>
                      {ev.volunteersJoined}/{ev.volunteersNeeded} Volunteers
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full">
                    <div
                      className="h-full bg-[#00ADEF] rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => notify(ev)}
                  className="text-sm text-[#00ADEF] hover:underline flex items-center gap-2"
                >
                  <Bell size={14} /> Notify Volunteers
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CREATE EVENT ================= */}
      <section className="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Launch a New Event
          </h2>
          <p className="text-white/60 text-sm max-w-md">
            Create structured, goal-driven events aligned with SDGs and community
            needs.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
          <Input label="Event Title" value={title} set={setTitle} />
          <Input label="Location" value={location} set={setLocation} />
          <Input label="Date" value={date} set={setDate} type="date" />
          <Input
            label="Volunteers Required"
            value={vols}
            set={setVols}
            type="number"
          />

          <select
            value={sdg}
            onChange={(e) => setSdg(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
          >
            <option>SDG 11 – Sustainable Cities</option>
            <option>SDG 6 – Clean Water</option>
            <option>SDG 4 – Quality Education</option>
            <option>SDG 13 – Climate Action</option>
          </select>

          <button
            onClick={createEvent}
            className="w-full bg-[#00ADEF] text-black py-3 rounded-xl font-semibold"
          >
            Create Event
          </button>
        </div>
      </section>

      {/* ================= ACTIVITY LOG ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Activity Log
        </h2>

        {notifications.length === 0 && (
          <p className="text-white/50">No activity yet.</p>
        )}

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="bg-[#0f172a] border border-white/10 rounded-xl p-4"
            >
              <p className="text-white">{n.text}</p>
              <p className="text-xs text-white/50 mt-1">{n.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------- UI PARTS ---------------- */

function Stat({ label, value }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <p className="text-white/60 text-sm">{label}</p>
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
    </div>
  );
}

function Input({ label, value, set, type = "text" }: any) {
  return (
    <div>
      <label className="text-xs text-white/60">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => set(type === "number" ? Number(e.target.value) : e.target.value)}
        className="w-full mt-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-white"
      />
    </div>
  );
}
