"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NgoSidebar() {
  const path = usePathname();

  const nav = [
    { name: "Dashboard", href: "/ngo/dashboard" },
    { name: "Interns", href: "/ngo/interns" },
    { name: "Donations", href: "/ngo/donations" },
    { name: "Events", href: "/ngo/events" },
    { name: "Profile", href: "/ngo/profile" },
  ];

  return (
    <div className="w-64 bg-[#0E0E0E] border-r border-[#1F1F1F] p-6">
      <h2 className="text-xl font-bold mb-10">NGO Panel</h2>

      <div className="space-y-2">
        {nav.map((i) => (
          <Link key={i.href} href={i.href}>
            <div
              className={`px-4 py-2 rounded-lg cursor-pointer transition ${
                path.startsWith(i.href)
                  ? "bg-white text-black"
                  : "hover:bg-[#1A1A1A] text-zinc-300"
              }`}
            >
              {i.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
