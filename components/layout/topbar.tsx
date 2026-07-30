"use client";

import React from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Plus,
  ChevronRight,
  Globe,
} from "lucide-react";

interface TopbarProps {
  onMobileMenuOpen: () => void;
  title?: string;
}

export function Topbar({
  onMobileMenuOpen,
  title = "Tableau de bord",
}: TopbarProps) {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800 sticky top-0 z-30 px-4 md:px-8 py-3.5 flex items-center justify-between transition-colors">
      {/* Left section: Hamburger button + Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuOpen}
          className="md:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-0.5">
            <span>facture.izi</span>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {title}
            </span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Right section: Quick actions */}
      <div className="flex items-center gap-2.5">
        {/* Currency & Region Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5" />
          <span>Zone UEMOA (XOF / FCFA)</span>
        </div>

        {/* Notifications Button */}
        <button className="relative p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-gray-900" />
        </button>

        {/* Create Invoice Primary CTA */}
        <Link
          href="/factures/nouvelle"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all duration-150"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Créer une facture</span>
          <span className="sm:hidden">Créer</span>
        </Link>
      </div>
    </header>
  );
}
