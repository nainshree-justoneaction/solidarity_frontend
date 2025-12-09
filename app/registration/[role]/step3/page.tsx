"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import StepSidebar from "@/components/StepSidebar";
import { ROLES, roleLabels } from "../../role-utils";
import { registrationSteps } from "@/lib/registrationConfig";
import toast from "react-hot-toast";
import { updateProfileByRole } from "@/lib/api";

export default function Step3() {
  const router = useRouter();
  const { role } = useParams();
  const { register, handleSubmit } = useForm<any>();

  const [auth, setAuth] = useState<any>("loading");

  // Validate user + role
  useEffect(() => {
    const stored = sessionStorage.getItem("auth");
    if (!stored) return router.replace("/auth/signup");

    const parsed = JSON.parse(stored);

    if (!ROLES.includes(role as any))
      return router.replace(`/registration/${parsed.role}/step1`);

    if (parsed.role !== role)
      return router.replace(`/registration/${parsed.role}/step1`);

    setAuth(parsed);
  }, [role, router]);

  if (auth === "loading") return null;

  const fields = registrationSteps[role as string]?.step3 || [];

  const onSubmit = async (data: any) => {
    for (const f of fields) {
      const value = data[f.name];
      if (f.required && (!value || value.toString().trim() === "")) {
        return toast.error(`${f.label} is required`);
      }
    }

    try {
      await updateProfileByRole(auth.userId, { role, ...data });
      toast.success("Registration Completed!");
      router.push(`/${role}/dashboard`);
    } catch (err: any) {
      toast.error(err?.message || "Failed to save");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 flex items-start justify-center">
      <div className="w-full max-w-6xl grid grid-cols-[240px_1fr] gap-12">

        {/* Sidebar */}
        <StepSidebar activeStep={3} role={role as string} />

        {/* Main Content */}
        <div className="bg-black border border-white/10 rounded-xl p-10">
          <h1 className="text-5xl font-bold mb-4">Step 3</h1>
          <p className="text-white/60 mb-10 text-lg">
            Final Details – {roleLabels[role as string]}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {fields.map((field: any) => (
              <div key={field.name}>
                <label className="block mb-2 text-sm text-white/70">
                  {field.label}
                </label>

                {["text", "email", "number"].includes(field.type) && (
                  <input
                    {...register(field.name)}
                    type={field.type}
                    placeholder={field.label}
                    className="w-full bg-black border-b border-white/20 
                               focus:border-[#00ADEF] transition px-1 py-2 text-lg outline-none"
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    {...register(field.name)}
                    rows={4}
                    placeholder={field.label}
                    className="w-full bg-black border border-white/20 rounded-md
                               px-3 py-3 text-base focus:border-[#00ADEF] transition outline-none"
                  />
                )}
              </div>
            ))}

            <div className="flex gap-6 pt-4">
              <button
                type="button"
                onClick={() => router.push(`/registration/${role}/step2`)}
                className="px-6 py-3 rounded-md border border-white/20 
                           text-white hover:bg-white/5 transition"
              >
                Back
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-md font-semibold bg-[#00ADEF] 
                           text-black hover:bg-[#00c7ff] transition"
              >
                Finish Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
