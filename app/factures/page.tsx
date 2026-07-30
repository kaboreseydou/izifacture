"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { StatusBadge } from "@/components/shared/status-badge";
import { useApp } from "@/lib/context/app-context";
import { formatFCFA, formatDate } from "@/lib/utils";
import {
  Search,
  Plus,
  ArrowUpRight,
  Menu,
  ChevronRight,
} from "lucide-react";

export default function InvoicesListPage() {
  const router = useRouter();
  const { invoices } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("tous");

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.number.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "tous" || inv.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#f4f5f8] dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 select-none">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="md:hidden mr-1"
                >
                  <Menu className="w-4 h-4 text-gray-600" />
                </button>
                <Link href="/" className="hover:underline">
                  Tableau de bord
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Toutes les Factures
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Factures Émises
              </h1>
              <p className="text-xs text-gray-400">
                Gérez, suivez et consultez l&apos;ensemble de vos factures et impayés.
              </p>
            </div>

            <Link
              href="/factures/nouvelle"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Créer une Facture</span>
            </Link>
          </div>

          {/* Filter Bar & Search */}
          <div className="p-4 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par client, entreprise ou N°..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Pill Tabs Status Filter */}
            <div className="p-1 rounded-2xl bg-gray-200/70 dark:bg-gray-800/80 flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-300 overflow-x-auto">
              {[
                { id: "tous", label: "Tous" },
                { id: "payee", label: "Payées" },
                { id: "envoyee", label: "Envoyées" },
                { id: "brouillon", label: "Brouillons" },
                { id: "en_retard", label: "En retard" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatus(tab.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    selectedStatus === tab.id
                      ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                      : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Invoices Table Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Numéro</th>
                    <th className="py-3 px-3">Client & Entreprise</th>
                    <th className="py-3 px-3">Date d&apos;émission</th>
                    <th className="py-3 px-3">Échéance</th>
                    <th className="py-3 px-3 text-right">Montant TTC</th>
                    <th className="py-3 px-3 text-center">Statut</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-medium">
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-8 text-center text-gray-400 font-medium"
                      >
                        Aucune facture ne correspond à votre recherche.
                      </td>
                    </tr>
                  ) : (
                    filteredInvoices.map((inv) => (
                      <tr
                        key={inv.id}
                        onClick={() => router.push(`/factures/${inv.id}`)}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-colors group"
                      >
                        <td className="py-4 px-3 font-mono font-bold text-gray-900 dark:text-white">
                          #{inv.number}
                        </td>
                        <td className="py-4 px-3">
                          <p className="font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {inv.clientCompany}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {inv.clientName}
                          </p>
                        </td>
                        <td className="py-4 px-3 text-gray-600 dark:text-gray-400">
                          {formatDate(inv.issueDate)}
                        </td>
                        <td className="py-4 px-3 text-gray-600 dark:text-gray-400">
                          {formatDate(inv.dueDate)}
                        </td>
                        <td className="py-4 px-3 text-right font-black text-gray-900 dark:text-white text-xs">
                          {formatFCFA(inv.amount)}
                        </td>
                        <td className="py-4 px-3 text-center">
                          <StatusBadge status={inv.status} />
                        </td>
                        <td className="py-4 px-3 text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 group-hover:underline">
                            Détails <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
