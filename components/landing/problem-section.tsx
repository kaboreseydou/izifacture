"use client";

import React from "react";
import { FileX2, Calculator, AlertOctagon } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: FileX2,
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800",
      title: "Factures non professionnelles",
      description: "Des documents Word ou Excel mal formatés qui renvoient une mauvaise image de marque à vos grands clients.",
    },
    {
      icon: Calculator,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800",
      title: "Calculs de TVA manuels",
      description: "Erreurs de calcul fréquentes de la TVA 18% UEMOA et temps précieux perdu à vérifier chaque montant HT et TTC.",
    },
    {
      icon: AlertOctagon,
      color: "text-red-600 bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800",
      title: "Suivi des paiements impossible",
      description: "Difficile de savoir quels clients ont payé et lesquels accumulent des retard sans un tableau de bord centralisé.",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest block">
            Les Défis de l&apos;Entrepreneur
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Pourquoi abandonner Word et Excel ?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
            Découvrez pourquoi les entrepreneurs modernes migrent vers iziFacture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#f7f8fc] dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 hover:shadow-xl transition-all duration-300 space-y-4 text-left"
              >
                <div className={`w-12 h-12 rounded-2xl border ${prob.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                  {prob.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                  {prob.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
