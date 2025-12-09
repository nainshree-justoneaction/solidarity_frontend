"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const ngoName = "Parikranti Foundation";

  // Temporary mock data — replace with API calls later
  const [donations, setDonations] = useState([
    { id: 1, donor: "Acme Foundation", amount: 50000, date: "2025-11-12" },
    { id: 2, donor: "Local Donor", amount: 1500, date: "2025-11-20" },
  ]);

  const [internships, setInternships] = useState([
    {
      id: 1,
      title: "Community Outreach Coordinator",
      applicants: 6,
      status: "Open",
    },
    {
      id: 2,
      title: "Water Quality Intern",
      applicants: 18,
      status: "Open",
    },
  ]);

  return (
    <div className="p-6 text-white">
      {/* TOP HEADING */}
      <h2 className="text-sm opacity-60 mb-1">Dashboard</h2>
      <h1 className="text-3xl font-semibold">Welcome back, {ngoName}</h1>
      <p className="opacity-70 mt-1">
        What would you like to do today?
      </p>

      {/* ACTION BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Link href="/ngo/internships">
          <div className="p-5 rounded-xl bg-[#111] hover:bg-[#151515] cursor-pointer">
            <h3 className="text-lg font-semibold">Hire Interns</h3>
            <p className="text-sm opacity-70">
              Post roles & track student applicants.
            </p>
            <button className="mt-3 bg-white text-black text-sm px-4 py-1 rounded">
              Open →
            </button>
          </div>
        </Link>

        <Link href="/ngo/donations">
          <div className="p-5 rounded-xl bg-[#111] hover:bg-[#151515] cursor-pointer">
            <h3 className="text-lg font-semibold">Donations</h3>
            <p className="text-sm opacity-70">
              Create donation drives & monitor funds.
            </p>
            <button className="mt-3 bg-white text-black text-sm px-4 py-1 rounded">
              Open →
            </button>
          </div>
        </Link>

        <Link href="/ngo/events">
          <div className="p-5 rounded-xl bg-[#111] hover:bg-[#151515] cursor-pointer">
            <h3 className="text-lg font-semibold">Events & CSR</h3>
            <p className="text-sm opacity-70">
              Plan events & send notifications.
            </p>
            <button className="mt-3 bg-white text-black text-sm px-4 py-1 rounded">
              Open →
            </button>
          </div>
        </Link>
      </div>

      {/* PROGRESS OVERVIEW */}
      <h2 className="text-xl font-semibold mt-10 mb-3">Your Progress Overview</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat number={internships.length} title="Internships Posted" color="red" />
        <Stat number={24} title="Applications Received" color="blue" />
        <Stat number={2} title="Donation Drives" color="teal" />
        <Stat number={1} title="Events Planned" color="orange" />
      </div>

      {/* RECENT SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        {/* RECENT INTERNSHIPS */}
        <div className="bg-[#111] p-5 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Recent Internships</h3>
            <Link href="/ngo/internships/create">
              <button className="text-black bg-white px-3 py-1 rounded text-sm">
                Post
              </button>
            </Link>
          </div>

          {internships.map((i) => (
            <div key={i.id} className="border-b border-white/10 py-3">
              <h4 className="font-medium">{i.title}</h4>
              <p className="text-sm opacity-70">
                {i.applicants} applicants • {i.status}
              </p>
              <Link
                href={`/ngo/internships/${i.id}`}
                className="text-blue-400 text-sm"
              >
                View
              </Link>
            </div>
          ))}
        </div>

        {/* RECENT DONATIONS */}
        <div className="bg-[#111] p-5 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Recent Donations</h3>
            <Link href="/ngo/donations/create">
              <button className="text-black bg-white px-3 py-1 rounded text-sm">
                Add
              </button>
            </Link>
          </div>

          {donations.map((d) => (
            <div key={d.id} className="border-b border-white/10 py-3">
              <h4 className="font-medium">{d.donor}</h4>
              <p className="text-sm opacity-70">
                ₹{d.amount.toLocaleString()} • {d.date}
              </p>
              <Link
                className="text-blue-400 text-sm"
                href={`/ngo/donations/${d.id}`}
              >
                View
              </Link>
            </div>
          ))}
        </div>

        {/* UPCOMING EVENTS */}
        <div className="bg-[#111] p-5 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Upcoming Events</h3>
            <button className="text-black bg-white px-3 py-1 rounded text-sm">
              Create
            </button>
          </div>

          <div className="border-b border-white/10 py-3">
            <h4 className="font-medium">Beach Cleanup Drive</h4>
            <p className="text-sm opacity-70">
              2026-01-24 • 40 volunteers needed
            </p>
            <Link href="#" className="text-blue-400 text-sm">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ number, title, color }: any) {
  const dotColor = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    teal: "bg-teal-400",
    orange: "bg-orange-400",
  };

  return (
    <div className="bg-[#111] p-4 rounded-xl">
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${dotColor[color]}`}></span>
        <p className="text-sm opacity-75">{title}</p>
      </div>
      <h2 className="text-2xl font-semibold mt-2">{number}</h2>
    </div>
  );
}
