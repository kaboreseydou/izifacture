"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Amadou D.",
      role: "Consultant IT — Dakar, Sénégal",
      text: "Depuis que j'utilise iziFacture, je ne perds plus des heures à formater mes tableaux Excel. Mes factures font beaucoup plus professionnelles et mes clients me règlent plus vite.",
      rating: 5,
    },
    {
      name: "Fatou S.",
      role: "Agence de Communication — Abidjan, Côte d'Ivoire",
      text: "Le calcul de la TVA à 18% automatique m'a sauvé la vie. Pouvoir éditer et suivre mes factures en FCFA par défaut est indispensable pour notre trésorerie.",
      rating: 5,
    },
    {
      name: "Kwame O.",
      role: "Freelance UI/UX Designer — Lomé, Togo",
      text: "Le tableau de bord me permet de voir d'un coup d'œil qui m'a réglé et qui est en retard. L'interface est moderne, ultra-rapide et intuitive.",
      rating: 5,
    },
  ];

  return (
    <section id="temoignages" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#f4f5f8] dark:bg-gray-900 border-y border-gray-200/70 dark:border-gray-800">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest block">
            Avis Clients & Témoignages
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Ils nous font confiance
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
            Rejoignez des centaines d&apos;entrepreneurs satisfaits à travers la zone FCFA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-gray-950 border border-gray-200/80 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 text-left relative"
            >
              <div className="space-y-4">
                {/* 5 Stars Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-blue-500/20" />

                <p className="text-xs text-gray-700 dark:text-gray-300 font-medium italic leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm font-extrabold text-gray-900 dark:text-white">
                  {t.name}
                </p>
                <p className="text-[11px] text-gray-400 font-medium">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
