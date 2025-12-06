// components/MultiSelectInterests.tsx
"use client";
import React from "react";

export const INTERESTS = [
  "Teaching",
  "Community Survey",
  "Plantation Drives",
  "Event Volunteering",
  "Social Media Awareness",
  "Fundraising",
  "NGO Field Work",
  "Women Empowerment Workshops",
  "Health Camps",
];

export default function MultiSelectInterests({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (arr: string[]) => void;
}) {
  function toggle(item: string) {
    if (selected.includes(item)) onChange(selected.filter((i) => i !== item));
    else onChange([...selected, item]);
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {INTERESTS.map((i) => {
        const active = selected.includes(i);
        return (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={`text-sm px-3 py-2 rounded-md border ${active ? "border-white" : "border-white/20"} ${
              active ? "bg-white/5" : "bg-transparent"
            }`}
          >
            <span className={`text-white ${active ? "font-medium" : "font-normal"}`}>{i}</span>
          </button>
        );
      })}
    </div>
  );
}
