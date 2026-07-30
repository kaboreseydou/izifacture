"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StatCards } from "@/components/dashboard/stat-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { UnpaidAlerts } from "@/components/dashboard/unpaid-alerts";
import {
  DashboardDateFilter,
  DateFilterPreset,
} from "@/components/dashboard/dashboard-date-filter";
import { DashboardStats, RevenueDataPoint } from "@/lib/data/mock/fixtures";
import { useApp } from "@/lib/context/app-context";
import { Sparkles, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { invoices, companyProfile } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Date Filter State
  const [datePreset, setDatePreset] = useState<DateFilterPreset>("all");
  const [customFilterDate, setCustomFilterDate] = useState<string>("");

  const handleStatCardClick = (filterId: string) => {
    setActiveFilter(filterId);
    const el = document.getElementById("invoices-table-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter invoices by Date Preset
  const filteredInvoices = invoices.filter((inv) => {
    if (!inv.issueDate) return true;
    const invDate = new Date(inv.issueDate);
    const now = new Date();

    if (datePreset === "this_month") {
      return (
        invDate.getMonth() === now.getMonth() &&
        invDate.getFullYear() === now.getFullYear()
      );
    }
    if (datePreset === "last_30") {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return invDate >= thirtyDaysAgo;
    }
    if (datePreset === "this_year") {
      return invDate.getFullYear() === 2026;
    }
    if (datePreset === "custom" && customFilterDate) {
      return inv.issueDate === customFilterDate;
    }
    return true;
  });

  // Dynamic calculations for Stats based on filtered invoices
  const totalBilled = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = filteredInvoices
    .filter((inv) => inv.status === "payee")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = filteredInvoices
    .filter((inv) => inv.status === "envoyee" || inv.status === "en_retard")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const pendingCount = filteredInvoices.filter(
    (inv) => inv.status === "en_retard" || inv.status === "envoyee"
  ).length;

  const dynamicStats: DashboardStats = {
    totalInvoices: filteredInvoices.length,
    totalBilled,
    totalPaid,
    totalPending,
    billedGrowth: 0,
    paidGrowth: 0,
    pendingCount,
  };

  // Build dynamic 6-month Revenue Chart Data from filtered invoices
  const months = ["Fév", "Mar", "Avr", "Mai", "Juin", "Juil"];
  const dynamicRevenueChart: RevenueDataPoint[] = months.map((m) => ({
    month: m,
    facture: 0,
    encaisse: 0,
  }));

  filteredInvoices.forEach((inv) => {
    if (!inv.issueDate) return;
    const dateObj = new Date(inv.issueDate);
    const mIdx = dateObj.getMonth();
    const monthLabels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    const label = monthLabels[mIdx];
    const target = dynamicRevenueChart.find((d) => d.month === label);
    if (target) {
      target.facture += inv.amount;
      if (inv.status === "payee") {
        target.encaisse += inv.amount;
      }
    }
  });

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
                  Espace Entreprise — {companyProfile.company}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Bienvenue, {companyProfile.name.split(" ")[0]} 👋
              </h2>
              <p className="text-xs text-blue-200 mt-1 max-w-xl">
                Voici un aperçu en temps réel de votre situation financière en zone FCFA.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Date Filter Popover Calendar */}
              <DashboardDateFilter
                preset={datePreset}
                customDate={customFilterDate}
                onFilterChange={(preset, custom) => {
                  setDatePreset(preset);
                  if (custom) setCustomFilterDate(custom);
                }}
              />

              <Link
                href="/factures/nouvelle"
                className="px-4 py-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Créer une facture</span>
              </Link>
            </div>
          </div>

          {/* 4 Interactive Stat Cards */}
          <StatCards
            stats={dynamicStats}
            activeFilter={activeFilter}
            onFilterChange={handleStatCardClick}
          />

          {/* Main Grid: Revenue Chart + Unpaid Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart data={dynamicRevenueChart} />
            </div>
            <div className="lg:col-span-1">
              <UnpaidAlerts />
            </div>
          </div>

          {/* Recent Invoices Table with Live Search */}
          <div id="invoices-table-section">
            <RecentInvoices
              invoices={filteredInvoices}
              selectedStatus={activeFilter}
              onStatusChange={setActiveFilter}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
