"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Coins,
  Sparkles,
  TrendingUp,
  Wallet,
  Clock,
  Search,
  CheckCircle,
} from "lucide-react";
import { useApp } from "@/lib/context/app-context";

export function HeroSection() {
  const { user } = useApp();

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-[#f4f5f8] dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      {/* Background Glows */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Floating Badges Desktop */}
      <div className="hidden xl:flex absolute top-36 left-8 p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 items-center gap-3 animate-bounce duration-1000 pointer-events-none z-20">
        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
          <Coins className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="text-[10px] font-bold text-gray-400 block uppercase">Zone UEMOA / CEMAC</span>
          <span className="text-xs font-black text-gray-900 dark:text-white">Devise en FCFA (XOF)</span>
        </div>
      </div>

      <div className="hidden xl:flex absolute top-44 right-8 p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 items-center gap-3 animate-pulse pointer-events-none z-20">
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="text-[10px] font-bold text-gray-400 block uppercase">Conformité Fiscale</span>
          <span className="text-xs font-black text-gray-900 dark:text-white">TVA 18% Automatique</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        {/* Highlight Badge */}
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

        {/* High-Fidelity Dribbble SaaS Dashboard Mockup Frame */}
        <div className="relative max-w-5xl mx-auto mt-10 rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-2xl border border-gray-300/80 dark:border-gray-700 select-none">
          
          {/* Mac Window Header */}
          <div className="px-4 py-3 rounded-t-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-between border-b border-gray-200/80 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 shadow-xs" />
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-xs" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs" />
              <div className="ml-3 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[11px] font-mono text-gray-500">
                <span className="text-emerald-500 font-bold">https://</span>app.facture.izi/dashboard
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-extrabold text-[10px]">
                FCFA (XOF)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                En ligne
              </span>
            </div>
          </div>

          {/* SaaS Interface Mockup Body */}
          <div className="rounded-b-2xl bg-[#f7f8fc] dark:bg-gray-950 p-4 sm:p-6 space-y-6 text-left border-t border-white dark:border-gray-900">
            
            {/* Top Mockup Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/20">
                  <Sparkles className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    Sahel Logistics S.A.
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold">Compte Pro</span>
                  </h3>
                  <p className="text-[11px] text-gray-400">Tableau de bord financier UEMOA</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative hidden md:block">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    disabled
                    placeholder="Rechercher une facture..."
                    className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-44 text-gray-400"
                  />
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm">
                  <span>+ Nouvelle facture</span>
                </div>
              </div>
            </div>

            {/* 3 Premium KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
                    Total Facturé
                  </span>
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
                    <Wallet className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  14 850 000 FCFA
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 w-fit px-2 py-0.5 rounded-md">
                  <TrendingUp className="w-3 h-3" />
                  <span>+18.5% ce mois</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
                    Total Encaissé
                  </span>
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  12 300 000 FCFA
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 w-fit px-2 py-0.5 rounded-md">
                  <span>82% Taux d&apos;encaissement</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
                    En Attente / Impayés
                  </span>
                  <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
                  2 550 000 FCFA
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/60 w-fit px-2 py-0.5 rounded-md">
                  <span>2 factures à relancer</span>
                </div>
              </div>
            </div>

            {/* Split Grid: Mini Revenue Area Chart + Recent Invoices Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Mini Area Chart Curve Preview */}
              <div className="lg:col-span-7 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">
                      Évolution des Revenus (6 mois)
                    </h4>
                    <p className="text-[10px] text-gray-400">Montants facturés vs encaissements réels</p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold">
                    <span className="flex items-center gap-1 text-blue-600">
                      <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" /> Facturé
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Encaissé
                    </span>
                  </div>
                </div>

                {/* SVG Revenue Wave Representation */}
                <div className="h-36 w-full relative pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 Q60,20 120,50 T240,30 T360,10 L400,20 L400,100 L0,100 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M0,80 Q60,20 120,50 T240,30 T360,10 L400,20"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M0,90 Q60,40 120,70 T240,45 T360,25 L400,35"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                    />
                  </svg>
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span>Fév</span>
                    <span>Mar</span>
                    <span>Avr</span>
                    <span>Mai</span>
                    <span>Juin</span>
                    <span>Juil</span>
                  </div>
                </div>
              </div>

              {/* Table Preview */}
              <div className="lg:col-span-5 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">
                    Dernières Factures
                  </h4>
                  <span className="text-[10px] font-bold text-blue-600">Voir tout</span>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Row 1 */}
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-gray-900 dark:text-white text-[11px]">#FAC-2026-0049</p>
                      <p className="text-[10px] text-gray-400">Sahel Logistics S.A.</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900 dark:text-white text-[11px]">2 500 000 FCFA</p>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-bold">Payée</span>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-gray-900 dark:text-white text-[11px]">#FAC-2026-0048</p>
                      <p className="text-[10px] text-gray-400">Baobab Commerce</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900 dark:text-white text-[11px]">1 800 000 FCFA</p>
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[9px] font-bold">Envoyée</span>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-gray-900 dark:text-white text-[11px]">#FAC-2026-0047</p>
                      <p className="text-[10px] text-gray-400">Atlantique Tech</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900 dark:text-white text-[11px]">4 200 000 FCFA</p>
                      <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[9px] font-bold">En retard</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
