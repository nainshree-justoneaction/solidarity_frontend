"use client";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: { background: "#111", color: "#fff", border: "1px solid rgba(255,255,255,0.08)" },
        success: { style: { background: "#06170a", borderColor: "#009739" } },
        error: { style: { background: "#200808", borderColor: "#E5243B" } },
      }}
    />
  );
}
