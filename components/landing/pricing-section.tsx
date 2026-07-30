"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { useApp } from "@/lib/context/app-context";

export function PricingSection() {
  const { user } = useApp();

  const plans = [
    {
      name: "Gratuit",
      price: "0 FCFA",
      period: "/mois",
      description: "Pour les freelances et indépendants qui se lancent.",
      features: [
        "Jusqu'à 5 factures par mois",
        "Modèle de facture standard A4",
        "Support par email",
        "Format FCFA (XOF/XAF)",
      ],
      ctaText: "Commencer gratuitement",
      ctaHref: "/register",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "5 000 FCFA",
      period: "/mois",
      description: "L'idéal pour les entrepreneurs actifs et consultants.",
      badge: "POPULAIRE",
      features: [
        "Factures et devis illimités",
        "Calcul TVA 18% automatique",
        "Personnalisation du logo & profil",
        "Suivi des paiements en temps réel",
        "Support prioritaire WhatsApp",
      ],
      ctaText: "Choisir le plan Pro",
      ctaHref: user ? "/dashboard" : "/register",
      highlighted: true,
    },
    {
      name: "Business",
      price: "15 000 FCFA",
      period: "/mois",
      description: "Pour les équipes et petites PME en croissance.",
      features: [
        "Tout l'accès de l'offre Pro",
        "Multi-utilisateurs (jusqu'à 5)",
        "Exports comptables & PDF HD",
        "Accompagnement dédié",
      ],
      ctaText: "Contacter l'équipe",
      ctaHref: "/support",
      highlighted: false,
    },
  ];

  return (
    <section id="tarifs" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest block">
            Tarification Transparente
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Des tarifs simples et transparents
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
            Choisissez le plan qui correspond à la taille de votre activité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl flex flex-col justify-between space-y-6 relative transition-all duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white shadow-2xl scale-105 border-2 border-blue-400/40"
                  : "bg-[#f7f8fc] dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200/80 dark:border-gray-800 shadow-md"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  {plan.badge}
                </span>
              )}

              <div className="space-y-4 text-left">
                <div>
                  <h3 className="text-xl font-extrabold">{plan.name}</h3>
                  <p
                    className={`text-xs mt-1 ${
                      plan.highlighted ? "text-blue-200" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-3xl sm:text-4xl font-black">{plan.price}</span>
                  <span
                    className={`text-xs font-semibold ${
                      plan.highlighted ? "text-blue-200" : "text-gray-400"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 text-xs font-semibold pt-4">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          plan.highlighted
                            ? "bg-blue-400/30 text-blue-200"
                            : "bg-blue-50 dark:bg-blue-950 text-blue-600"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className={plan.highlighted ? "text-blue-100" : "text-gray-700 dark:text-gray-300"}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  href={plan.ctaHref}
                  className={`w-full py-3.5 rounded-full text-xs font-black transition-all flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? "bg-white text-blue-900 hover:bg-blue-50 shadow-xl shadow-blue-900/40 hover:scale-105 active:scale-95"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 active:scale-95"
                  }`}
                >
                  {plan.highlighted && <Sparkles className="w-4 h-4 fill-blue-900" />}
                  <span>{plan.ctaText}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
