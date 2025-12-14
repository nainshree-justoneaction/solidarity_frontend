"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signup } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: "Student", label: "Student", desc: "Apply for internships", color: "#E5243B" },
    { id: "Faculty", label: "Faculty", desc: "Access portal", color: "#4C9F38" },
    { id: "Institute", label: "Institute", desc: "Manage students", color: "#FFC30B" },
    { id: "Ngo", label: "NGO", desc: "Post opportunities", color: "#27AE60" },
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(fullName)
    if (!fullName.trim()) return toast.error("Full name is required");
    if (!email.includes("@")) return toast.error("Enter a valid email");
    if (phone.trim().length !== 10 || !/^\d+$/.test(phone))
      return toast.error("Phone must be exactly 10 digits");

    if (!password.trim()) return toast.error("Password is required");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");

    if (!role) return toast.error("Please select a role");

    setLoading(true);

    try {
      const newUser = await signup({
        fullName,
        email,
        phone,
        password,
        role,
      });

      toast.success("Account created!");

      // 🔥 Correct redirect based on role
      router.push(`/registration/${role}/step1`);

    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white px-6 md:px-20 py-12">

      {/* LEFT SECTION */}
      <div className="w-1/2 pr-16 hidden md:flex flex-col justify-center">
        <h1 className="text-5xl font-semibold tracking-tight" style={{ color: "#E5243B" }}>
          SOLIDARITY
        </h1>

        <p className="mt-6 text-white/70 text-lg leading-relaxed">
          A platform connecting students with NGOs to build measurable social impact.
          Earn certificates, gain skills, and contribute to meaningful field projects.
        </p>

        <ul className="mt-8 space-y-4 text-white/70">
          <li>• Mentor-led field projects</li>
          <li>• Stipend & verified certificates</li>
          <li>• Workshops & impact tracking</li>
        </ul>

        <div className="mt-14 animate-pulse">
          <div className="w-64 h-40 bg-white/5 rounded-xl border border-white/10"></div>
          <p className="mt-4 text-sm text-white/40">Building futures through partnership</p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full md:w-1/2 max-w-xl">
        <div className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-sm">

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-semibold">Create Account</h2>
            <div className="text-sm text-white/60">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-red-500 hover:text-red-400">
                Sign in
              </Link>
            </div>
          </div>

          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input
                className="bg-transparent border-b border-white/40 pb-3 focus:border-red-500 outline-none"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                className="bg-transparent border-b border-white/40 pb-3 focus:border-red-500 outline-none"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <input
              className="bg-transparent border-b border-white/40 pb-3 w-full focus:border-red-500 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="bg-transparent border-b border-white/40 pb-3 w-full focus:border-red-500 outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* ROLE SELECTION */}
            <div>
              <p className="text-sm mb-3 text-white/60">Select your role</p>

              <div className="grid grid-cols-2 gap-4">
                {roles.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`p-4 rounded-xl cursor-pointer border transition 
                      hover:scale-[1.02] duration-200
                      ${role === r.id
                        ? "border-white bg-white/10 shadow-lg shadow-black/40"
                        : "border-white/20 hover:border-white/40"}`}
                  >
                    <p className="font-medium flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }}></span>
                      {r.label}
                    </p>
                    <p className="text-xs text-white/50 mt-1">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-lg rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#E5243B" }}
            >
              {loading ? "Creating..." : "Continue"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}