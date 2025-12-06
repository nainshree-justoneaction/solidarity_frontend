"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import StepSidebar from "@/components/StepSidebar";
import MultiSelectInterests from "@/components/MultiSelectInterest";
import { updateStudentProfile } from "@/lib/api";

export default function RegistrationStep3() {
  const router = useRouter();

  const [auth, setAuth] = useState<{
    userId?: number;
    email?: string;
    fullName?: string;
  } | "loading">("loading");

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("auth");

    if (!stored) {
      toast.error("Please sign up first");
      router.push("/auth/signup");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (!parsed?.userId) {
        toast.error("Please sign up first");
        router.push("/auth/signup");
      } else {
        setAuth(parsed);
      }
    } catch {
      router.push("/auth/signup");
    }
  }, [router]);

  if (auth === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }
  const handleSave = async () => {
    if (selectedInterests.length < 1) {
      toast.error("Select at least one interest area");
      return;
    }

    setSaving(true);

    try {
      console.log("Updating student with ID:", auth.userId, selectedInterests);

      await updateStudentProfile(auth.userId, {
        interests: selectedInterests,
      });

      toast.success("Registration Completed!");
      router.push("/dashboard"); // or next step
    } catch (err: any) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 flex items-start justify-center">
      <div className="w-full max-w-6xl grid grid-cols-[240px_1fr] gap-12">
        <StepSidebar activeStep={3} />
        <div className="bg-black border border-white/10 rounded-xl p-10">
          <h1 className="text-5xl font-bold mb-4">Step 3</h1>
          <p className="text-white/60 mb-10 text-lg">
            Select your interest areas
          </p>

          <MultiSelectInterests
            selected={selectedInterests}
            onChange={setSelectedInterests}
          />

          <div className="flex gap-6 pt-10">
            <button
              onClick={() => router.push("/auth/registration-step2")}
              className="px-6 py-3 rounded-md border border-white/20 text-white hover:bg-white/5 transition"
              disabled={saving}
            >
              Back
            </button>

            <button
              onClick={handleSave}
              className={`px-8 py-3 rounded-md font-semibold bg-[#00ADEF] text-black hover:bg-[#00c7ff] transition ${
                saving ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save & Finish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
