"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowRight, LayoutDashboard } from "lucide-react";
import { useApp } from "@/lib/context/app-context";

export function LandingNav() {
  const { user } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
            facture<span className="text-blue-600">.izi</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-xs text-gray-600 dark:text-gray-300">
          <a
            href="#fonctionnalites"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Fonctionnalités
          </a>
          <a
            href="#tarifs"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Tarifs
          </a>
          <a
            href="#temoignages"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Témoignages
          </a>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Accéder au Tableau de bord</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs font-extrabold text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors px-3 py-2"
              >
                Se connecter
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Commencer gratuitement</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4 font-bold text-sm text-gray-700 dark:text-gray-200">
            <a
              href="#fonctionnalites"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Fonctionnalités
            </a>
            <a
              href="#tarifs"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Tarifs
            </a>
            <a
              href="#temoignages"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Témoignages
            </a>
          </nav>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-blue-600 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Accéder au Tableau de bord</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-full border border-gray-200 dark:border-gray-700 font-extrabold text-xs text-center text-gray-800 dark:text-white"
                >
                  Se connecter
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full bg-blue-600 text-white font-extrabold text-xs shadow-md text-center flex items-center justify-center gap-2"
                >
                  <span>Commencer gratuitement</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
