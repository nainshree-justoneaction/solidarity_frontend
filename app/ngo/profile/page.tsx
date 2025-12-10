"use client";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({ name: "GreenWave Trust", reg: "AA12345", location: "Indore" });
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage only on client
  useEffect(() => {
    const stored = localStorage.getItem("ngoProfile");
    if (stored) setProfile(JSON.parse(stored));
    setLoaded(true);
  }, []);

  function save() {
    localStorage.setItem("ngoProfile", JSON.stringify(profile));
    alert("Saved locally");
  }

  if (!loaded) return null; // avoid render before localStorage load

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">NGO Profile</h1>
      <div className="bg-[#0F0F0F] border border-[#202020] rounded-lg p-4 space-y-3">
        <div>
          <label className="text-zinc-400 text-sm">Name</label>
          <input
            value={profile.name}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
            className="w-full mt-2 bg-black border border-zinc-800 rounded px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-zinc-400 text-sm">Reg. No</label>
          <input
            value={profile.reg}
            onChange={e => setProfile({ ...profile, reg: e.target.value })}
            className="w-full mt-2 bg-black border border-zinc-800 rounded px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-zinc-400 text-sm">Location</label>
          <input
            value={profile.location}
            onChange={e => setProfile({ ...profile, location: e.target.value })}
            className="w-full mt-2 bg-black border border-zinc-800 rounded px-3 py-2 text-white"
          />
        </div>
        <button onClick={save} className="bg-white text-black px-3 py-2 rounded-md">
          Save
        </button>
      </div>
    </div>
  );
}
