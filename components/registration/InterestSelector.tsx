"use client";

import { useState } from "react";

interface Props {
  value: string[];
  onChange: (updated: string[]) => void;
}

const INTEREST_AREAS = [
  "Teaching & Mentoring",
  "Environment & Climate",
  "Health & Wellness",
  "Counseling & Support",
  "Technology & Innovation",
  "Clean Water & Sanitation",
  "Poverty Reduction",
  "Gender Equality",
  "Peace & Justice",
  "Renewable Energy",
];

export default function InterestSelector({ value, onChange }: Props) {
  const toggle = (area: string) => {
    const updated = value.includes(area)
      ? value.filter((x) => x !== area)
      : [...value, area];

    onChange(updated);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {INTEREST_AREAS.map((area) => {
        const active = value.includes(area);

        return (
          <div
            key={area}
            onClick={() => toggle(area)}
            className={`border rounded-xl p-5 cursor-pointer flex items-center gap-4 transition
              ${active ? "border-white bg-white/10 shadow-lg" : "border-white/20 hover:border-white/40"}`}
          >
            <div
              className={`w-4 h-4 rounded-full border 
                ${active ? "bg-white border-white" : "border-white/40"}`}
            ></div>

            <p className="text-lg">{area}</p>
          </div>
        );
      })}
    </div>
  );
}
