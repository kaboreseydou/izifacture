"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-[#f4f5f8] dark:bg-gray-900 border-t border-gray-200/70 dark:border-gray-800 text-gray-600 dark:text-gray-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4 text-left">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/20">
                <Sparkles className="w-4 h-4 fill-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">
                facture<span className="text-blue-600">.izi</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm font-medium leading-relaxed">
              La solution SaaS de facturation moderne pour les entrepreneurs, PME et indépendants africains en zone FCFA (UEMOA / CEMAC).
            </p>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left font-semibold">
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-gray-900 dark:text-white tracking-wider">
                Produit
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#fonctionnalites" className="hover:text-blue-600 transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#tarifs" className="hover:text-blue-600 transition-colors">
                    Tarifs & Plans
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-gray-900 dark:text-white tracking-wider">
                Compagnie
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#temoignages" className="hover:text-blue-600 transition-colors">
                    Témoignages
                  </a>
                </li>
                <li>
                  <Link href="/support" className="hover:text-blue-600 transition-colors">
                    Support & Aide
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-gray-900 dark:text-white tracking-wider">
                Légal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Mentions Légales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Confidentialité
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200/60 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-medium">
          <p>© 2026 iziFacture. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5">
            <span>Fait avec fierté en Afrique</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
