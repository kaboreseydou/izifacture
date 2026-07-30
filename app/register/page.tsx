"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Receipt, Mail, Lock, User, Building, ArrowRight, AlertCircle, MailCheck } from "lucide-react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // 1. Sign up user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // 2. Insert initial company profile for user
        await supabase.from("company_profile").insert({
          id: data.user.id,
          user_id: data.user.id,
          name: fullName,
          company: companyName,
          email: email,
          phone: "+221 77 000 00 00",
          address: "Dakar, Sénégal",
          nif: "SN-DKR-2026-B-0001",
          rccm: "SN-DKR-2026-B-0001",
          currency: "XOF",
          default_tax: "18",
          prefix: "FAC-2026-",
          iban: "SN012 01001 00000000000 00",
          wave_number: "+221 77 000 00 00",
          orange_number: "+221 77 000 00 00",
        });

        // 3. Immediately Sign out so user is NOT auto-logged in without confirmation
        await supabase.auth.signOut();

        setRegisteredSuccess(true);
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setErrorMsg(errorObj?.message || "Erreur lors de la création du compte.");
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
            Créer votre compte entreprise en zone FCFA
          </p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xl space-y-5">
          {registeredSuccess ? (
            /* Confirmation Screen after registration */
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                <MailCheck className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                  Vérifiez votre boîte mail ! ✉️
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                  Votre compte a été créé avec succès. Un lien de confirmation a été envoyé à{" "}
                  <span className="font-extrabold text-blue-600">{email}</span>.
                </p>
                <p className="text-[11px] text-gray-400">
                  Veuillez cliquer sur le lien dans l&apos;email pour valider votre adresse, puis connectez-vous.
                </p>
              </div>

              <div className="pt-3">
                <Link
                  href="/login"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Passer à la connexion</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <>
              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4 text-xs">
                {/* Nom Responsable */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-extrabold text-blue-600">
                    Nom du Responsable *
                  </label>
                  <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500/20">
                    <User className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Amadou Diallo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Nom Entreprise */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-extrabold text-amber-500">
                    Nom de l&apos;Entreprise / Raison Sociale *
                  </label>
                  <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500/20">
                    <Building className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Sahel Logistics S.A."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-extrabold text-gray-500">
                    Adresse Email Professionnelle *
                  </label>
                  <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500/20">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="email"
                      required
                      placeholder="contact@entreprise.sn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-extrabold text-gray-500">
                    Mot de Passe (minimum 6 caractères) *
                  </label>
                  <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500/20">
                    <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="password"
                      required
                      minLength={6}
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
                  <span>{loading ? "Création en cours..." : "Créer mon compte"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Footer Link */}
              <div className="text-center pt-2 text-xs text-gray-500 font-medium">
                Déjà un compte ?{" "}
                <Link
                  href="/login"
                  className="font-extrabold text-blue-600 hover:underline"
                >
                  Se connecter
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
