"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Coins, Receipt, PieChart, Sparkles } from "lucide-react";
import { useApp } from "@/lib/context/app-context";

export function HeroSection() {
  const { user } = useApp();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-[#f4f5f8] dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      {/* Decorative Floating Animated Blur Spheres */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Floating Decorative Vector Badges */}
      <div className="hidden lg:flex absolute top-36 left-12 p-3.5 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 items-center gap-3 animate-bounce duration-1000 pointer-events-none">
        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
          <Coins className="w-6 h-6" />
        </div>
        <div className="text-left">
          <span className="text-[10px] font-bold text-gray-400 block uppercase">Zone UEMOA / CEMAC</span>
          <span className="text-xs font-black text-gray-900 dark:text-white">Devise en FCFA (XOF)</span>
        </div>
      </div>

      <div className="hidden lg:flex absolute top-48 right-12 p-3.5 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 items-center gap-3 animate-pulse pointer-events-none">
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="text-left">
          <span className="text-[10px] font-bold text-gray-400 block uppercase">Conformité Fiscale</span>
          <span className="text-xs font-black text-gray-900 dark:text-white">TVA 18% Automatique</span>
        </div>
      </div>

      <div className="hidden lg:flex absolute bottom-28 left-20 p-3.5 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 items-center gap-3 pointer-events-none">
        <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600">
          <PieChart className="w-6 h-6" />
        </div>
        <div className="text-left">
          <span className="text-[10px] font-bold text-gray-400 block uppercase">Suivi en direct</span>
          <span className="text-xs font-black text-gray-900 dark:text-white">Impayés & Chiffre d&apos;affaires</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        {/* Top Highlight Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-extrabold shadow-sm">
          <Sparkles className="w-4 h-4 fill-blue-600/20" />
          <span>SaaS de Facturation N°1 pour les Entrepreneurs Africains</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Fini les factures sur <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Word et Excel</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
          La solution de facturation moderne pour les entrepreneurs, PME et indépendants en zone FCFA. Émettez vos factures conformes en moins d&apos;une minute.
        </p>

        {/* Primary CTA Button with Micro-Animations on Hover & Active Click */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {user ? (
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 group"
            >
              <span>Accéder à mon espace entreprise</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link
              href="/register"
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 group cursor-pointer"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Key USPs list */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-extrabold text-gray-500 dark:text-gray-400 pt-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Zéro carte bancaire requise</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Format FCFA (XOF/XAF)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Conforme UEMOA / CEMAC</span>
          </div>
        </div>

        {/* App Product Preview Mockup Card */}
        <div className="relative max-w-5xl mx-auto mt-12 rounded-3xl p-3 sm:p-4 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent pointer-events-none" />
          
          <div className="rounded-2xl bg-[#f7f8fc] dark:bg-gray-950 p-4 sm:p-8 space-y-6 border border-gray-100 dark:border-gray-800">
            {/* Header Mockup */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono font-bold text-gray-400 ml-2">
                  facture.izi — Dashboard Aperçu
                </span>
              </div>
              <span className="text-xs font-extrabold text-blue-600 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
                FCFA (XOF)
              </span>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Chiffre d&apos;affaires</span>
                <p className="text-xl font-black text-gray-900 dark:text-white">12 500 000 FCFA</p>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Taux encaissement 85%</span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Factures Émises</span>
                <p className="text-xl font-black text-gray-900 dark:text-white">28 Factures</p>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">TVA 18% Appliquée</span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Clients Actifs</span>
                <p className="text-xl font-black text-gray-900 dark:text-white">14 Entreprises</p>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Zone UEMOA</span>
              </div>
            </div>

            {/* Document Preview Snippet */}
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 dark:text-white">FACTURE #FAC-2026-0049</h4>
                  <p className="text-gray-400 text-[11px]">Client: Sahel Logistics S.A. — Dakar</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[11px]">
                Payée 2 500 000 FCFA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
