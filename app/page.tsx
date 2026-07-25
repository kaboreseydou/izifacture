"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StatCards } from "@/components/dashboard/stat-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { UnpaidAlerts } from "@/components/dashboard/unpaid-alerts";
import {
  MOCK_STATS,
  MOCK_REVENUE_CHART,
  MOCK_RECENT_INVOICES,
} from "@/lib/data/mock/fixtures";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f7f8fc] dark:bg-gray-950 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar Header */}
        <Topbar
          onMobileMenuOpen={() => setMobileSidebarOpen(true)}
          title="Tableau de bord"
        />

        {/* Dashboard Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Welcome Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg shadow-blue-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[10px] font-bold tracking-wide uppercase flex items-center gap-1 border border-blue-400/30">
                  <Sparkles className="w-3 h-3 text-blue-300" />
                  Espace Entreprise — Atlantique SA
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Bienvenue, Kofi 👋
              </h2>
              <p className="text-xs text-blue-200 mt-1 max-w-xl">
                Voici un aperçu en temps réel de votre situation financière en zone FCFA.
                Vos encaissements ont progressé de <span className="font-bold text-emerald-400">+18.5%</span> ce mois.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/factures/nouvelle"
                className="px-4 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
              >
                <span>Créer une facture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <StatCards stats={MOCK_STATS} />

          {/* Main Grid: Revenue Chart + Unpaid Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart data={MOCK_REVENUE_CHART} />
            </div>
            <div className="lg:col-span-1">
              <UnpaidAlerts />
            </div>
          </div>

          {/* Recent Invoices Table */}
          <RecentInvoices invoices={MOCK_RECENT_INVOICES} />
        </main>
      </div>
    </div>
  );
}
