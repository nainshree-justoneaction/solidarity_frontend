"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginRequest } from "@/lib/api";
import FormInput from "@/components/FormInput";

type FormData = { email: string; password: string };

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const toastId = toast.loading("Signing in...");

    try {
      // lowercase email to match mock backend
      const resp = await loginRequest(data.email.toLowerCase(), data.password);

      // store auth for next pages
      sessionStorage.setItem(
        "auth",
        JSON.stringify({
          userId: resp.user.id,
          email: resp.user.email,
          fullName: resp.user.fullName,
          token: resp.token,
        })
      );

      toast.dismiss(toastId);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 py-12">
      <div className="w-full max-w-md bg-black border border-white/10 rounded-2xl p-10 shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-3">Welcome Back</h1>
        <p className="text-white/60 mb-8">
          Login to continue your social impact journey.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <FormInput
              label="Email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <FormInput
              type="password"
              label="Password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-white/30 text-black cursor-not-allowed"
                : "bg-[#00ADEF] text-black hover:bg-[#00c7ff]"
            }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-white/60">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-white underline hover:text-[#00ADEF]">
            Create one
          </a>
        </div>
      </div>
    </div>
  );
}
