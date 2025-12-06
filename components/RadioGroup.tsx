// components/RadioGroup.tsx
"use client";
import React from "react";

export default function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const val = opt.toLowerCase();
        return (
          <label key={val} className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              value={val}
              checked={value === val}
              onChange={() => onChange(val)}
              className="w-4 h-4 accent-white"
            />
            <span className="ml-3 text-white capitalize">{opt}</span>
          </label>
        );
      })}
    </div>
  );
}
