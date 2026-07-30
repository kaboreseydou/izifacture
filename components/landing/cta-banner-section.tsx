"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useApp } from "@/lib/context/app-context";

export function CtaBannerSection() {
  const { user } = useApp();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto rounded-[36px] bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden space-y-6">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-blue-500/10 rounded-[36px] pointer-events-none blur-2xl" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Commencez en 2 minutes</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          Rejoignez les entrepreneurs qui facturent comme des pros
        </h2>

        <p className="text-xs sm:text-base text-blue-200 max-w-xl mx-auto font-medium">
          N&apos;attendez plus pour professionnaliser votre gestion financière. Testez iziFacture gratuitement dès aujourd&apos;hui.
        </p>

        <div className="pt-4">
          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-blue-900 font-black text-sm shadow-xl hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
              <span>Accéder à mon tableau de bord</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link
              href="/register"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
              <span>Créer ma première facture gratuitement</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
