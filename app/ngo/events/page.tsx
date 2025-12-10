"use client";
import React, { useState, useEffect } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [vols, setVols] = useState(10);
  const [sdg, setSdg] = useState("bg-sdg11");

  // Load from localStorage (client-only)
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) setEvents(JSON.parse(storedEvents));

    const storedNotifications = localStorage.getItem("eventNotifications");
    if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("eventNotifications", JSON.stringify(notifications));
  }, [notifications]);

  function createEvent() {
    if (!title || !date) {
      alert("Title and date required");
      return;
    }
    const next = {
      id: `ev-${Date.now()}`,
      title,
      date,
      volunteersNeeded: vols,
      sdg,
    };
    setEvents((prev) => [next, ...prev]);
    setTitle("");
    setDate("");
    setVols(10);
  }

  function notifyAll(ev: any) {
    const note = {
      id: `n-${Date.now()}`,
      text: `Reminder: ${ev.title} on ${ev.date}`,
      date: new Date().toLocaleString(),
      eventId: ev.id,
    };
    setNotifications((prev) => [note, ...prev]);
    alert("Notification simulated (saved locally).");
  }

  function removeEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Events & CSR</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="space-y-4">
            {events.length === 0 && (
              <div className="text-zinc-400">No events planned.</div>
            )}
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-[#0F0F0F] border border-[#202020] rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <div className="text-white font-semibold">{ev.title}</div>
                  <div className="text-zinc-400 text-sm">
                    {ev.date} • {ev.volunteersNeeded} volunteers
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => notifyAll(ev)}
                    className="px-3 py-1 bg-white text-black rounded-md"
                  >
                    Notify
                  </button>
                  <button
                    onClick={() => removeEvent(ev.id)}
                    className="px-3 py-1 text-rose-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-[#0F0F0F] border border-[#202020] rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Create Event</h4>
            <div className="space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-white"
              />
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-white"
              />
              <input
                value={vols}
                onChange={(e) => setVols(Number(e.target.value))}
                type="number"
                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-white"
              />
              <select
                value={sdg}
                onChange={(e) => setSdg(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-white"
              >
                <option value="bg-sdg11">Sustainable Cities (SDG 11)</option>
                <option value="bg-sdg14">Life Below Water (SDG 14)</option>
                <option value="bg-sdg6">Clean Water (SDG 6)</option>
                <option value="bg-sdg17">Partnerships (SDG 17)</option>
              </select>
              <button
                onClick={createEvent}
                className="w-full bg-white text-black px-3 py-2 rounded-md"
              >
                Create Event
              </button>
            </div>
          </div>

          <div className="mt-4 bg-[#0F0F0F] border border-[#202020] rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Notifications</h4>
            {notifications.length === 0 && (
              <div className="text-zinc-400">No notifications yet.</div>
            )}
            {notifications.map((n) => (
              <div key={n.id} className="p-2 bg-black/30 rounded mb-2">
                <div className="text-zinc-300 text-sm">{n.date}</div>
                <div className="text-white">{n.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
