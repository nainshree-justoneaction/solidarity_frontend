"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import StepSidebar from "@/components/StepSidebar";
import { registrationSteps } from "@/lib/registrationConfig";
import InterestSelector from "@/components/registration/InterestSelector";

export default function Step3() {
  const router = useRouter();
  const params = useParams();
  const role = params.role as string;

  const { register, handleSubmit, setValue } = useForm<any>();
  const fields = registrationSteps[role]?.step3 || [];

  const [interests, setInterests] = useState<string[]>([]);

  // Load saved step3 data & interests from sessionStorage
  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem("registration") || "{}");
    if (saved.step3) {
      for (const key in saved.step3) {
        setValue(key, saved.step3[key]);
      }
      if (saved.step3.interests) setInterests(saved.step3.interests);
    }
  }, [setValue]);

  // Save interests to sessionStorage whenever it changes
  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem("registration") || "{}");
    sessionStorage.setItem(
      "registration",
      JSON.stringify({
        ...saved,
        step3: { ...(saved.step3 || {}), interests },
      })
    );
  }, [interests]);

  const onSubmit = (data: any) => {
    // Merge interests into step3 data
    const step3Data = { ...data, interests };
    const saved = JSON.parse(sessionStorage.getItem("registration") || "{}");
    const updated = { ...saved, step3: step3Data };
    sessionStorage.setItem("registration", JSON.stringify(updated));

    toast.success("Step 3 saved in sessionStorage!");
    router.push(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 flex items-start justify-center">
      <div className="w-full max-w-6xl grid grid-cols-[240px_1fr] gap-12">

        <StepSidebar activeStep={3} role={role} />

        <div className="bg-black border border-white/10 rounded-xl p-10">
          <h1 className="text-5xl font-bold mb-4">Step 3</h1>
          <p className="text-white/60 mb-10 text-lg">Final Details</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {fields.length === 0 && (
              <div className="text-xl text-white/70">
                Step 3 not configured for role: {role}
              </div>
            )}

            {fields.map((field: any) => (
              <div key={field.name}>
                <label className="block text-white/70 mb-2 text-sm">{field.label}</label>

                {["text", "number", "email"].includes(field.type) && (
                  <input
                    {...register(field.name)}
                    type={field.type}
                    className="w-full bg-black border-b border-white/20
                               focus:border-[#00ADEF] transition px-1 py-2 text-lg outline-none"
                    placeholder={field.label}
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    {...register(field.name)}
                    rows={4}
                    className="w-full bg-black border border-white/20 rounded-md
                               px-3 py-3 text-base focus:border-[#00ADEF] transition outline-none"
                    placeholder={field.label}
                  />
                )}
              </div>
            ))}

            {/* Interest Selector */}
            {/* Interest Selector */}
            {["student", "ngo"].includes(role) && (
              <div>
                <div className="text-white/80 text-lg mb-4">Select Your Interests</div>
                <InterestSelector value={interests} onChange={setInterests} />
              </div>
            )}

            <div className="flex gap-6 pt-4">
              <button
                type="button"
                onClick={() => router.push(`/registration/${role}/step2`)}
                className="px-6 py-3 rounded-md border border-white/20 text-white hover:bg-white/5 transition"
              >
                Back
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-md font-semibold bg-[#00ADEF] text-black hover:bg-[#00c7ff] transition"
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
