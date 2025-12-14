"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import StepSidebar from "@/components/StepSidebar";
import { updateProfileByRole } from "@/lib/api";
import { registrationSteps } from "@/lib/registrationConfig";

export default function Step1() {
  const router = useRouter();
  const params = useParams();
  const role = params.role as string;

  const { register, handleSubmit, setValue } = useForm<any>();
  const [auth, setAuth] = useState<{ email?: string; fullName?: string; userId?: number } | null | "loading">("loading");

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

  if (auth === "loading") return null;

  if (!auth || !auth.userId) {
    toast.error("Please complete signup first");
    router.replace("/auth/signup");
    return null;
  }

  const fields = registrationSteps[role]?.step1 || [];
  if (!fields) {
    return <div className="p-10 text-white text-center text-2xl">Invalid Role: {role}</div>;
  }

  const onSubmit = async (data: any) => {
    try {
      for (const field of fields) {
        const value = data[field.name];

        if (field.required && (!value || value.toString().trim() === "")) {
          return toast.error(`${field.label} is required`);
        }

        if (["text", "email"].includes(field.type) && field.min && value.length < field.min) {
          return toast.error(`${field.label} must be at least ${field.min} characters`);
        }

        if (field.type === "number") {
          const num = Number(value);
          if (isNaN(num)) return toast.error(`${field.label} must be a valid number`);
          if (field.min && num < field.min) return toast.error(`${field.label} must be at least ${field.min}`);
          if (field.max && num > field.max) return toast.error(`${field.label} must be <= ${field.max}`);
        }
      }
      const prevSteps = JSON.parse(sessionStorage.getItem("registration") || "{}");
      const merged = {
        ...prevSteps,
        step1: data,
      };
      sessionStorage.setItem("registration", JSON.stringify(merged));
      const payload = {
        userId: auth.userId,
        role,
        email: auth.email,         // important
        fullName: auth.fullName,   // important
        ...data,
      };
     const user = await updateProfileByRole(auth.userId!,payload);
      toast.success("Step 1 completed!");
      router.push(`/registration/${role}/step2`);
    } catch (err: any) {
      toast.error(err?.message || "Save failed");
    }
  };


  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 flex items-start justify-center">
      <div className="w-full max-w-6xl grid grid-cols-[240px_1fr] gap-12">
        <StepSidebar activeStep={1} role={role} />
        <div className="bg-black border border-white/10 rounded-xl p-10">
          <h1 className="text-5xl font-bold mb-4">Step 1</h1>
          <p className="text-white/60 mb-10 text-lg">Personal Details</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {fields.map((field: any) => (
              <div key={field.name}>
                <label className="block text-white/70 mb-2 text-sm">{field.label}</label>
                {["text", "number", "email"].includes(field.type) && (
                  <input
                    {...register(field.name)}
                    type={field.type}
                    className="w-full bg-black border-b border-white/20 focus:border-[#00ADEF] transition px-1 py-2 text-lg outline-none"
                    placeholder={field.label}
                  />
                )}
                {field.type === "radio" && (
                  <div className="flex gap-8 text-lg">
                    {field.options.map((opt: string) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input {...register(field.name)} type="radio" value={opt} className="accent-[#00ADEF] w-4 h-4" />
                        <span>{opt.charAt(0).toUpperCase() + opt.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                )}
                {field.type === "textarea" && (
                  <textarea
                    {...register(field.name)}
                    rows={4}
                    className="w-full bg-black border border-white/20 rounded-md px-3 py-3 text-base focus:border-[#00ADEF] transition outline-none"
                    placeholder={field.label}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-6 pt-4">
              <button type="button" onClick={() => router.push("/auth/signup")} className="px-6 py-3 rounded-md border border-white/20 text-white hover:bg-white/5 transition">Back</button>
              <button type="submit" className="px-8 py-3 rounded-md font-semibold bg-[#00ADEF] text-black hover:bg-[#00c7ff] transition">Save & Continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
