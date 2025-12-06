"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import StepSidebar from "@/components/StepSidebar";


type Step2Form = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

export default function RegistrationStep2Page() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Step2Form>();

  const handleBack = () => router.push("/auth/registration");

  const onSubmit = (data: Step2Form) => {
    console.log("Step 2 Data:", data);
    router.push("/registration/registration-step3");
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center p-10">
      <StepSidebar activeStep={2} />
      <div className="w-full max-w-3xl">

        {/* Heading */}
        <h1 className="text-5xl font-bold mb-3">Step 2</h1>
        <p className="text-white/60 mb-10 text-lg">Address Details</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

          {/* Address Line 1 */}
          <div>
            <label className="block text-white/70 mb-2 text-sm">Address Line 1</label>
            <input
              {...register("addressLine1")}
              className="w-full bg-black border-b border-white/20 focus:border-[#00ADEF] transition px-1 
              py-2 text-lg outline-none"
              placeholder="House No / Street / Area"
            />
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block text-white/70 mb-2 text-sm">Address Line 2 (Optional)</label>
            <input
              {...register("addressLine2")}
              className="w-full bg-black border-b border-white/20 focus:border-[#00ADEF] transition px-1 
              py-2 text-lg outline-none"
              placeholder="Landmark or Apartment"
            />
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* City */}
            <div>
              <label className="block text-white/70 mb-2 text-sm">City</label>
              <input
                {...register("city")}
                className="w-full bg-black border-b border-white/20 focus:border-[#00ADEF] transition 
                px-1 py-2 text-lg outline-none"
                placeholder="City name"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-white/70 mb-2 text-sm">State</label>
              <input
                {...register("state")}
                className="w-full bg-black border-b border-white/20 focus:border-[#00ADEF] transition 
                px-1 py-2 text-lg outline-none"
                placeholder="State"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Pincode */}
            <div>
              <label className="block text-white/70 mb-2 text-sm">Pincode</label>
              <input
                {...register("pincode")}
                className="w-full bg-black border-b border-white/20 focus:border-[#00ADEF] transition 
                px-1 py-2 text-lg outline-none"
                placeholder="6-digit pincode"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-white/70 mb-2 text-sm">Country</label>
              <input
                {...register("country")}
                defaultValue="India"
                className="w-full bg-black border-b border-white/20 focus:border-[#00ADEF] transition 
                px-1 py-2 text-lg outline-none"
                placeholder="Country"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-6 pt-4">
            <button
              type="button"
              onClick={handleBack}
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
  );
}
