"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // ✅ IMPORTANT FIX
        body: JSON.stringify({
          name,
          phone,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Account created ✅");

      router.push("/user-login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#6F7C8F] flex items-center justify-center px-4">
      
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#5a6a7f]/30 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#4a5a6f]/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[#3a4a5f]/15 blur-3xl" />
      </div>

      <div className="w-full max-w-sm rounded-3xl bg-white/10 p-10 ring-1 ring-white/20 backdrop-blur-sm shadow-2xl shadow-black/30">
        
        {/* Icon */}
        <div className="flex justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
        </div>

        <h1 className="mt-6 text-center text-2xl font-light text-white">
          Create <span className="font-serif italic text-white/90">Account</span>
        </h1>

        <p className="mt-1 text-center text-sm text-white/60">
          Join the NOVALIE community
        </p>

        {/* FORM */}
        <div className="mt-8 flex flex-col gap-4">

          {/* NAME */}
          <div>
            <label className="text-sm text-white/70">Name</label>
            <input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm text-white/70">Phone</label>
            <input
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-white/70">Email</label>
            <input
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-white/70">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            className="mt-2 w-full rounded-full bg-white py-3 text-sm font-medium tracking-wide text-[#6F7C8F] hover:bg-white/90"
          >
            Register
          </button>

        </div>

        {/* LOGIN LINK */}
        <p className="mt-6 text-sm text-center text-white/60">
          Already have account?{" "}
          <span
            onClick={() => router.push("/user-login")}
            className="text-white cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

