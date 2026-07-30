"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, Download, FileText, ArrowUpRight, Search, X } from "lucide-react";
import { Invoice } from "@/lib/data/mock/fixtures";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatFCFA, formatDate } from "@/lib/utils";

interface RecentInvoicesProps {
  invoices: Invoice[];
  selectedStatus?: string;
  onStatusChange?: (status: string) => void;
  externalSearch?: string;
}

export function RecentInvoices({
  invoices,
  selectedStatus: propSelectedStatus,
  onStatusChange,
  externalSearch = "",
}: RecentInvoicesProps) {
  const [internalStatus, setInternalStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const currentStatus = propSelectedStatus !== undefined ? propSelectedStatus : internalStatus;

  const handleStatusChange = (status: string) => {
    if (onStatusChange) {
      onStatusChange(status);
    } else {
      setInternalStatus(status);
    }
  };

  const activeSearch = searchTerm || externalSearch;

  const filteredInvoices = invoices.filter((inv) => {
    const matchesStatus =
      currentStatus === "all" || inv.status === currentStatus;
    const searchLower = activeSearch.toLowerCase().trim();
    const matchesSearch =
      !searchLower ||
      inv.number.toLowerCase().includes(searchLower) ||
      inv.clientName.toLowerCase().includes(searchLower) ||
      inv.clientCompany.toLowerCase().includes(searchLower) ||
      inv.clientEmail.toLowerCase().includes(searchLower);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm flex flex-col justify-between space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>Dernières Factures</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold">
              {filteredInvoices.length} / {invoices.length}
            </span>
          </h2>
          <p className="text-xs text-gray-400">
            Recherchez une facture précisément par numéro, client ou entreprise
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-semibold overflow-x-auto">
            {[
              { id: "all", label: "Toutes" },
              { id: "payee", label: "Payées" },
              { id: "envoyee", label: "Envoyées" },
              { id: "en_retard", label: "En retard" },
              { id: "brouillon", label: "Brouillons" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleStatusChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all text-xs font-semibold whitespace-nowrap ${
                  currentStatus === tab.id
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm font-bold"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link
            href="/factures"
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline px-2 py-1.5 shrink-0"
          >
            <span>Voir tout</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Dedicated Invoice Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Chercher une facture précisément (ex: FAC-2026-0048, Amadou Diallo, SahelTech...)"
          className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Invoice Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Numéro</th>
              <th className="py-3 px-3">Client</th>
              <th className="py-3 px-3">Émission</th>
              <th className="py-3 px-3">Échéance</th>
              <th className="py-3 px-3 text-right">Montant Total</th>
              <th className="py-3 px-3 text-center">Statut</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-blue-50/40 dark:hover:bg-gray-800/60 transition-colors group"
                >
                  {/* Invoice Number */}
                  <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <Link
                      href={`/factures/${inv.id}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {inv.number}
                    </Link>
                  </td>

                  {/* Client Info */}
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {inv.clientName}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {inv.clientCompany}
                    </p>
                  </td>

                  {/* Issue Date */}
                  <td className="py-3.5 px-3 text-gray-600 dark:text-gray-400 font-medium">
                    {formatDate(inv.issueDate)}
                  </td>

                  {/* Due Date */}
                  <td className="py-3.5 px-3 font-medium">
                    <span
                      className={
                        inv.status === "en_retard"
                          ? "text-rose-600 font-bold"
                          : "text-gray-600 dark:text-gray-400"
                      }
                    >
                      {formatDate(inv.dueDate)}
                    </span>
                  </td>

                  {/* Amount in FCFA */}
                  <td className="py-3.5 px-3 text-right font-extrabold text-gray-900 dark:text-white">
                    {formatFCFA(inv.amount)}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3 text-center">
                    <StatusBadge status={inv.status} />
                  </td>

                  {/* Quick Action */}
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/factures/${inv.id}`}
                        title="Voir détails de la facture"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/factures/${inv.id}?download=true`}
                        title="Télécharger la facture (PDF)"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-gray-400 text-xs"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileText className="w-8 h-8 text-gray-300 dark:text-gray-600 stroke-[1.5]" />
                    <p className="font-semibold text-gray-700 dark:text-gray-300">
                      Aucune facture trouvée pour « {activeSearch} »
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Vérifiez l&apos;orthographe du nom ou réinitialisez la recherche.
                    </p>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="mt-2 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 font-bold text-xs hover:bg-blue-100"
                      >
                        Effacer la recherche
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
