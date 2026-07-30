"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Receipt, Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        setSuccessMsg("Connexion réussie ! Redirection...");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setErrorMsg(
        errorObj?.message === "Invalid login credentials"
          ? "Adresse email ou mot de passe incorrect."
          : errorObj?.message || "Erreur de connexion."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f5f8] dark:bg-gray-950 flex flex-col justify-center items-center p-4 font-sans text-gray-900 dark:text-gray-100 select-none">
      <div className="w-full max-w-md space-y-6">
        {/* Logo Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold mx-auto shadow-lg shadow-blue-500/20">
            <Receipt className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            facture<span className="text-blue-600">.izi</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Connectez-vous à votre espace entreprise
          </p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xl space-y-6">
          {/* Notifications */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {/* Email Field */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-extrabold text-blue-600">
                Adresse Email Professionnelle *
              </label>
              <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500/20">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="votre@entreprise.sn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-extrabold text-gray-500">
                Mot de Passe *
              </label>
              <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500/20">
                <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? "Connexion en cours..." : "Se connecter"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center pt-2 text-xs text-gray-500 font-medium">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="font-extrabold text-blue-600 hover:underline"
            >
              Créer mon espace entreprise
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
