"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Eye, EyeOff, Loader2, Lock, User, AlertCircle } from "lucide-react";
import { site } from "@/lib/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMessage(data.error || "Invalid username or password");
      }
    } catch {
      setErrorMessage("Network connection failure. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-navy-950 px-5 py-16">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-navy-900 p-8 text-lavender-100 shadow-2xl sm:p-10">
        <div className="flex items-center gap-2.5">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/30 text-purple-400">
            <ShieldCheck size={20} aria-hidden />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">
              {site.name}
            </p>
            <p className="text-xs text-lavender-200/70">Restricted Administration</p>
          </div>
        </div>

        <h1 className="font-display mt-6 text-3xl font-semibold text-white">
          Admin Portal Sign In
        </h1>
        <p className="mt-2 text-xs leading-5 text-lavender-200/80">
          Secure enquiry pipeline, follow-up notes, and studio operations. Protected with encrypted HTTP-only cookies and bcrypt hashing.
        </p>

        {errorMessage ? (
          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-200">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" aria-hidden />
            <span>{errorMessage}</span>
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold uppercase tracking-wider text-lavender-200"
            >
              Username
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-lavender-200/60">
                <User size={16} aria-hidden />
              </span>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin username"
                className="w-full rounded-xl border border-white/10 bg-navy-850 py-3 pl-10 pr-4 text-sm text-white placeholder:text-lavender-200/40 focus:border-purple-500 focus:bg-navy-800 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-lavender-200"
            >
              Password
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-lavender-200/60">
                <Lock size={16} aria-hidden />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-white/10 bg-navy-850 py-3 pl-10 pr-10 text-sm text-white placeholder:text-lavender-200/40 focus:border-purple-500 focus:bg-navy-800 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-lavender-200/60 hover:text-white"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition-all hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 border-t border-white/10 pt-4 text-center">
          <p className="text-[11px] text-lavender-200/60">
            Internal access restricted to authorized personnel. Session activity is encrypted and audited.
          </p>
        </div>
      </div>
    </div>
  );
}
