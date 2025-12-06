"use client";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | false;
  hint?: string;
};

export default function FormInput({ label, error, hint, className = "", ...props }: Props) {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium mb-2 text-white">{label}</label>}
      <input
        {...props}
        className="w-full px-4 py-3 bg-black border border-white/20 text-white placeholder:text-white/40 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-60"
      />
      {hint && <div className="text-xs text-white/60 mt-1">{hint}</div>}
      {error && <div className="text-xs text-[ #E5243B ] mt-1 text-red-400">{error}</div>}
    </div>
  );
}
