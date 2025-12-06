"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import StepSidebar from "@/components/StepSidebar";
import { updateStudentProfile } from "@/lib/api";


type FormData = {
  fullName: string;
  age: string;
  gender: string;
  institute: string;
  about: string;
};

export default function RegistrationStep1() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<FormData>();

  const [auth, setAuth] =
    useState<{ email?: string; fullName?: string; userId?: number } | null | "loading">(
      "loading"
    );

  // Check auth once
  useEffect(() => {
    const stored = sessionStorage.getItem("auth");
    if (!stored) {
      router.replace("/auth/signup");
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      setAuth(parsed);

      if (parsed.fullName) setValue("fullName", parsed.fullName);
    } catch {
      router.replace("/auth/signup");
    }
  }, [router, setValue]);

  // Loading state
  if (auth === "loading") return null;

  if (!auth || !auth.userId) {
    toast.error("Please sign up first");
    router.replace("/auth/signup");
    return null;
  }

  // ------------------- SUBMIT ---------------------
  const onSubmit = async (data: FormData) => {
    if (!data.fullName || data.fullName.length < 3)
      return toast.error("Full name must be at least 3 characters");

    const ageNum = Number(data.age);
    if (!ageNum || ageNum < 15 || ageNum > 40)
      return toast.error("Age must be a number between 15 and 40");

    if (!data.gender) return toast.error("Select a gender");

    if (!data.institute || data.institute.length < 3)
      return toast.error("Enter valid institute name");

    if (!data.about || data.about.length < 10)
      return toast.error("Please write a short bio (min 10 characters)");

    try {
      // Use Mock API instead of fetch
      await updateStudentProfile(auth.userId!, {
        fullName: data.fullName,
        age: ageNum,
        gender: data.gender,
        institute: data.institute,
        about: data.about,
      });

      toast.success("Step 1 completed! Moving to Step 2...");
      router.push("/registration/registration-step2");
    } catch (err: any) {
      toast.error(err?.message || "Save failed");
    }
  };


  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 flex items-start justify-center">
      <div className="w-full max-w-6xl grid grid-cols-[240px_1fr] gap-12">

        {/* LEFT SIDEBAR REUSABLE */}
        <StepSidebar activeStep={1} />

        {/* RIGHT FORM */}
        <div className="bg-black border border-white/10 rounded-xl p-10">
          <h1 className="text-5xl font-bold mb-4">Step 1</h1>
          <p className="text-white/60 mb-10 text-lg">Personal Details</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

            {/* Full Name */}
            <div>
              <label className="block text-white/70 mb-2 text-sm">
                Full Name
              </label>
              <input
                {...register("fullName")}
                className="w-full bg-black border-b border-white/20 focus:border-[#00ADEF] transition px-1 py-2 text-lg outline-none"
                placeholder="Enter your full name"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-white/70 mb-2 text-sm">Age</label>
              <input
                {...register("age")}
                type="number"
                className="w-40 bg-black border-b border-white/20 focus:border-[#00ADEF] transition px-1 py-2 text-lg outline-none"
                placeholder="Age"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-white/70 mb-2 text-sm">
                Gender
              </label>
              <div className="flex gap-8 text-lg">
                {["male", "female", "other"].map((g) => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input
                      {...register("gender")}
                      type="radio"
                      value={g}
                      className="accent-[#00ADEF] w-4 h-4"
                    />
                    <span>{g.charAt(0).toUpperCase() + g.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Institute */}
            <div>
              <label className="block text-white/70 mb-2 text-sm">
                Institute / College
              </label>
              <input
                {...register("institute")}
                className="w-full bg-black border-b border-white/20 focus:border-[#00ADEF] transition px-1 py-2 text-lg outline-none"
                placeholder="Institute name"
              />
            </div>

            {/* ABOUT FIELD (new instead of interests) */}
            <div>
              <label className="block text-white/70 mb-2 text-sm">
                Short Bio (About You)
              </label>
              <textarea
                {...register("about")}
                rows={4}
                className="w-full bg-black border border-white/20 rounded-md px-3 py-3 text-base focus:border-[#00ADEF] transition outline-none"
                placeholder="Tell us something about yourself..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-6 pt-4">
              <button
                type="button"
                onClick={() => router.push("/auth/signup")}
                className="px-6 py-3 rounded-md border border-white/20 text-white hover:bg-white/5 transition"
              >
                Back
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-md font-semibold bg-[#00ADEF] text-black hover:bg-[#00c7ff] transition"
              >
                Save & Continue
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
