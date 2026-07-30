"use client";

import React from "react";
import { UserPlus, FileCheck, Download } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      icon: UserPlus,
      title: "Inscris-toi",
      description: "Crée ton compte en moins de 2 minutes, sans carte bancaire requise.",
    },
    {
      step: "2",
      icon: FileCheck,
      title: "Crée",
      description: "Remplis les détails. La devise en FCFA et la TVA 18% sont gérées pour toi.",
    },
    {
      step: "3",
      icon: Download,
      title: "Télécharge",
      description: "Génère un PDF professionnel et envoie-le directement à ton client.",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#f4f5f8] dark:bg-gray-900 border-y border-gray-200/70 dark:border-gray-800">
      <div className="max-w-7xl mx-auto space-y-16 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest block">
            Simplicité Maximale
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Comment ça marche ?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
            3 étapes ultra-rapides pour émettre votre première facture professionnelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-gray-950 border border-gray-200/80 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-4 relative group"
              >
                {/* Step Number Badge */}
                <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  {st.step}
                </div>

                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                  {st.title}
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-xs">
                  {st.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
