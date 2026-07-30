"use client";

import React from "react";
import { FileEdit, Percent, TrendingUp, Users } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: FileEdit,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
      title: "Factures professionnelles",
      description: "Créez des factures à votre image avec votre logo et vos coordonnées d'émetteur en quelques clics.",
    },
    {
      icon: Percent,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800",
      title: "TVA 18% automatique",
      description: "Ne calculez plus manuellement. La TVA à 18% UEMOA s'applique automatiquement si nécessaire.",
    },
    {
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
      title: "Suivi en temps réel",
      description: "Un tableau de bord intuitif pour suivre vos encaissements et vos factures en attente ou en retard.",
    },
    {
      icon: Users,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800",
      title: "Gestion clients intégrée",
      description: "Un répertoire centralisé pour retrouver rapidement les coordonnées NIF et RCCM de vos clients.",
    },
  ];

  return (
    <section id="fonctionnalites" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest block">
            Fonctionnalités Clés
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
            Une suite complète et intuitive pour gérer votre facturation de A à Z sans prise de tête.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#f7f8fc] dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5 group"
              >
                <div className={`p-4 rounded-2xl border ${feat.color} shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="space-y-2 text-left">
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
