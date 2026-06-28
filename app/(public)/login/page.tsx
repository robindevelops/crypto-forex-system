"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/constants/routes";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#050505] relative overflow-hidden">
      
      {/* Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
        <h1 className="text-[30vw] font-black leading-none uppercase text-white rotate-[-10deg] scale-150">
          LOGIN
        </h1>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href={ROUTES.HOME} className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 bg-[#CCFF00] flex items-center justify-center text-black font-black text-2xl rotate-3 group-hover:rotate-12 transition-transform border-2 border-black">
              C
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white">
              CryptoForex
            </span>
          </Link>
        </div>

        {/* Brutalist Card */}
        <div className="bg-[#111111] border-2 border-white/20 p-8 md:p-10 relative group">
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#FF0055] border-2 border-white/20 rotate-12" />
          
          <div className="mb-8">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Enter</h1>
            <p className="text-sm font-bold text-[#CCFF00] mt-1 uppercase tracking-widest">
              Access Dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOU@EXAMPLE.COM"
                  className="w-full pl-12 pr-4 py-4 bg-[#050505] border-2 border-white/20 text-white placeholder:text-white/20 focus:border-[#CCFF00] focus:ring-0 outline-none transition-colors uppercase font-mono text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-[#050505] border-2 border-white/20 text-white placeholder:text-white/20 focus:border-[#CCFF00] focus:ring-0 outline-none transition-colors font-mono text-sm tracking-widest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#CCFF00] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={clsx(
                "w-full flex items-center justify-between gap-3 px-6 py-4 mt-8 bg-black text-white font-black uppercase tracking-widest text-base hover:bg-white hover:text-black hover:shadow-[6px_6px_0_0_#CCFF00] border-2 border-white hover:border-black transition-all",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? "AUTHENTICATING..." : "LOGIN"}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t-2 border-white/10 text-center">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
              New User?{" "}
              <Link href={ROUTES.REGISTER} className="text-[#CCFF00] hover:text-white transition-colors ml-2">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
