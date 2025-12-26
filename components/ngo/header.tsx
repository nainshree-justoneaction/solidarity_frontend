"use client";

import { Bell, ChevronDown } from "lucide-react";

export default function NGOHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header
      className="
        sticky top-0 z-40
        bg-black/80 backdrop-blur-xl
        border-b border-white/10
      "
    >
      <div className="h-16 px-8 flex items-center justify-between">

        {/* LEFT */}
        <div>
          <h1 className="text-lg font-semibold text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-white/50">
              {subtitle}
            </p>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* Notifications */}
          <button
            className="
              relative p-2 rounded-lg
              hover:bg-white/5 transition
            "
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#00ADEF] rounded-full" />
          </button>

          {/* Profile */}
          <button
            className="
              flex items-center gap-2 px-3 py-2
              rounded-lg hover:bg-white/5 transition
            "
          >
            <div className="w-8 h-8 rounded-full bg-[#00ADEF]/20 flex items-center justify-center text-[#00ADEF] font-bold">
              P
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">Parikranti Foundation</p>
              <p className="text-xs text-white/50">NGO Admin</p>
            </div>
            <ChevronDown size={14} className="text-white/50" />
          </button>

        </div>
      </div>
    </header>
  );
}
